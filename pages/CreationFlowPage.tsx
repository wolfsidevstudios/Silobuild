import React, { useState, useRef, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Project, Settings, TechStack, GeneratedFile } from '../types';
import { generateAppStream } from '../services/geminiService';
import { Spinner } from '../components/Spinner';
import { ReactIcon, HtmlIcon, SvelteIcon, MobileIcon, UpArrowIcon } from '../components/icons';
import { prompts } from '../data/prompts';

const initialSettings: Settings = {
  geminiApiKey: '',
  supabaseUrl: '',
  supabaseAnonKey: '',
  stripePublicKey: '',
  stripeSecretKey: '',
  githubPat: '',
  netlifyPat: '',
  model: 'gemini-2.5-flash',
};

const InfinityIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-purple-600">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.172 16.172a4 4 0 01-5.656 0l-3.364-3.364a4 4 0 115.656-5.656l.354.354a4 4 0 005.656 5.656l3.364 3.364a4 4 0 01-5.656 0l-.354-.354z" />
    </svg>
);


const StackCard: React.FC<{ icon: React.ReactNode; title: string; onClick: () => void; }> = ({ icon, title, onClick }) => (
    <button onClick={onClick} className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:border-gray-400 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
        <div className="w-5 h-5 flex items-center justify-center [&_svg]:w-full [&_svg]:h-full">{icon}</div>
        <span>{title}</span>
    </button>
);


type Stage = 'stack' | 'prompt' | 'generating_app' | 'complete';
type Plan = { summary: string; thoughts: string; files: string[]; };

export const CreationFlowPage: React.FC = () => {
    const [stage, setStage] = useState<Stage>('stack');
    const [techStack, setTechStack] = useState<TechStack | null>(null);
    const [prompt, setPrompt] = useState('');
    const [plan, setPlan] = useState<Plan | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [generatedFiles, setGeneratedFiles] = useState<GeneratedFile[]>([]);
    const [previewFile, setPreviewFile] = useState<GeneratedFile | null>(null);
    const [currentFile, setCurrentFile] = useState<string | null>(null);
    const [newProjectId, setNewProjectId] = useState<string | null>(null);
    
    const [, setProjects] = useLocalStorage<Project[]>('ai-app-builder-projects', []);
    const [settings] = useLocalStorage<Settings>('ai-app-builder-settings', initialSettings);
    
    const resetFlow = () => {
        setStage('stack');
        setTechStack(null);
        setPrompt('');
        setPlan(null);
        setGeneratedFiles([]);
        setPreviewFile(null);
    }
    
    const handlePromptSubmit = async (currentPrompt: string) => {
        if (!techStack) {
            setError("Please select a technology stack first.");
            return;
        }
        setPrompt(currentPrompt);
        setStage('generating_app');
        setIsLoading(true);
        setError(null);
        setPlan({ summary: '', thoughts: '', files: [] }); // Reset plan for progress display

        try {
            await generateAppStream(
                currentPrompt, 
                settings, 
                (update) => {
                    if (update.type === 'summary' && typeof update.summary === 'string') {
                        setPlan(prev => ({ ...prev!, summary: update.summary }));
                    } else if (update.type === 'thoughts' && typeof update.thoughts === 'string') {
                        setPlan(prev => ({ ...prev!, thoughts: update.thoughts }));
                    } else if (update.type === 'plan' && Array.isArray(update.files)) {
                        setPlan(prev => ({ ...prev!, files: update.files }));
                    } else if (update.type === 'file' && update.file) {
                        setGeneratedFiles(prev => [...prev.filter(f => f.path !== update.file.path), update.file]);
                        setCurrentFile(update.file.path);
                    } else if (update.type === 'previewFile' && update.file) {
                        setPreviewFile(update.file);
                    }
                }, 
                techStack
            );
            setStage('complete');
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred.");
            setStage('prompt'); // Go back to prompt on error
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const initialPrompt = sessionStorage.getItem('initialPrompt');
        if (initialPrompt) {
            setPrompt(initialPrompt);
            sessionStorage.removeItem('initialPrompt');
        }
        
        const urlParams = new URLSearchParams(window.location.search);
        const stackParam = urlParams.get('stack');
        if (stackParam && ['react', 'html', 'svelte', 'react-native', 'infinity'].includes(stackParam)) {
            handleStackSelect(stackParam as TechStack);
        }

    }, []);

    // Effect to create the project and trigger redirection
    useEffect(() => {
        if (stage === 'complete' && techStack && !newProjectId) {
            const now = new Date().toISOString();
            const project: Project = {
                id: crypto.randomUUID(),
                name: prompt.substring(0, 50) || 'New Project',
                createdAt: now,
                updatedAt: now,
                files: generatedFiles,
                previewFile: previewFile,
                stack: techStack,
                deployments: [],
                thoughts: plan?.thoughts,
            };
            setProjects(prev => [project, ...prev]);
            setNewProjectId(project.id); // Set the new ID to trigger the redirect effect
        }
    }, [stage, techStack, generatedFiles, previewFile, prompt, plan, setProjects, newProjectId]);

    // Effect that handles only the redirection
    useEffect(() => {
        if (newProjectId) {
            const timer = setTimeout(() => {
                window.location.hash = `#/project/${newProjectId}`;
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [newProjectId]);


    const handleStackSelect = (stack: TechStack) => {
        if (stack === 'infinity') {
            const now = new Date().toISOString();
            const newProject: Project = {
                id: crypto.randomUUID(),
                name: prompt || 'New Infinity App',
                createdAt: now,
                updatedAt: now,
                files: [],
                previewFile: null,
                stack: 'infinity',
                deployments: [],
            };
            setProjects(prev => [newProject, ...prev]);
            window.location.hash = `#/project/${newProject.id}`;
            return;
        }
        setTechStack(stack);
        setStage('prompt');
    }

    const renderContent = () => {
        switch (stage) {
            case 'stack':
                return (
                    <div className="text-center transition-opacity duration-500">
                        <h2 className="text-3xl font-bold mb-4">Choose your technology</h2>
                        <p className="text-gray-600 mb-8">Select a stack to generate code, or try the Infinity App for a simulated experience.</p>
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <StackCard icon={<ReactIcon />} title="React + TS" onClick={() => handleStackSelect('react')} />
                            <StackCard icon={<MobileIcon />} title="React Native" onClick={() => handleStackSelect('react-native')} />
                            <StackCard icon={<SvelteIcon />} title="Svelte + TS" onClick={() => handleStackSelect('svelte')} />
                            <StackCard icon={<HtmlIcon />} title="HTML + JS" onClick={() => handleStackSelect('html')} />
                            <StackCard icon={<InfinityIcon />} title="Infinity App" onClick={() => handleStackSelect('infinity')} />
                        </div>
                    </div>
                );
            case 'prompt':
                return (
                     <div className="w-full max-w-2xl text-center transition-opacity duration-500">
                        <h2 className="text-3xl font-bold mb-4">What should we build?</h2>
                        <p className="text-gray-600 mb-8">Describe the application you want to create. Be as specific as you can.</p>
                        <div className="w-full bg-stone-100/80 backdrop-blur-xl border border-stone-200 rounded-3xl shadow-2xl flex flex-col p-3 gap-2 transition-all duration-300 focus-within:border-stone-400">
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handlePromptSubmit(prompt); } }}
                                placeholder="e.g., A pomodoro timer with start, stop, and reset buttons"
                                className="w-full bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none resize-none overflow-y-auto text-base p-2 min-h-[8rem]"
                                rows={4}
                            />
                            <div className="flex items-center justify-between mt-1">
                                <button onClick={resetFlow} className="px-4 py-2 text-sm text-gray-600 hover:bg-stone-200 rounded-full transition-colors">Back</button>
                                <button
                                    onClick={() => handlePromptSubmit(prompt)}
                                    disabled={!prompt.trim()}
                                    className="bg-gray-800 text-white rounded-full p-2.5 flex items-center justify-center transition-all duration-300 hover:bg-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed flex-shrink-0"
                                    aria-label="Generate App"
                                >
                                    <UpArrowIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        <div className="text-left mt-6">
                            <p className="text-xs text-gray-500 mb-2">Or try an example:</p>
                            <div className="flex flex-wrap gap-2">
                                {prompts.slice(0, 3).map(p => (
                                    <button key={p.title} onClick={() => setPrompt(p.prompt)} className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-300">{p.title}</button>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case 'generating_app':
                const progress = plan?.files.length ? Math.round((generatedFiles.length / plan.files.length) * 100) : 0;
                return (
                    <div className="w-full max-w-lg text-center transition-opacity duration-500">
                        <h2 className="text-3xl font-bold mb-4">Codepilot is building...</h2>
                        {plan?.summary && <p className="text-gray-600 mb-2">{plan.summary.replace(/[\n-]/g, ' ')}</p>}
                        
                        <div className="w-full bg-gray-200 rounded-full h-2.5 my-4">
                           <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.5s' }}></div>
                        </div>

                        {currentFile && <p className="text-sm text-gray-500 font-mono animate-pulse">{currentFile}</p>}
                    </div>
                );
            case 'complete':
                return (
                    <div className="text-center transition-opacity duration-500">
                        <h2 className="text-3xl font-bold mb-4">Build Complete!</h2>
                        <p className="text-gray-600">Your new project has been created and saved.</p>
                        <p className="text-gray-600 mt-2">Redirecting you to the builder...</p>
                        <div className="mt-6 flex justify-center">
                            <Spinner className="w-8 h-8"/>
                        </div>
                    </div>
                );
        }
    };


    return (
        <div className="relative h-screen w-screen bg-gray-50 text-gray-900 flex flex-col justify-center items-center p-4 overflow-hidden">
            <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-200 rounded-full filter blur-3xl opacity-40" />
            <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-200 rounded-full filter blur-3xl opacity-40" />
            
            <a href="#/dashboard" className="absolute top-4 left-4 text-sm text-gray-600 hover:underline z-10">&larr; Back to Dashboard</a>

            <div className="relative z-10 w-full flex flex-col justify-center items-center">
                {renderContent()}
            </div>
        </div>
    );
};
import React, { useState, useRef, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Project, Settings, TechStack, GeneratedFile } from '../types';
import { generateAppStream } from '../services/geminiService';
import { Spinner } from '../components/Spinner';
import { ReactIcon, HtmlIcon, SvelteIcon, MobileIcon } from '../components/icons';
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
    }, []);

    useEffect(() => {
        if (stage === 'complete' && techStack) {
            const now = new Date().toISOString();
            const newProject: Project = {
                id: crypto.randomUUID(),
                name: prompt.substring(0, 30) || 'New Project',
                createdAt: now,
                updatedAt: now,
                files: generatedFiles,
                previewFile: previewFile,
                stack: techStack,
                deployments: [],
                thoughts: plan?.thoughts,
            };
            setProjects(prev => [newProject, ...prev]);
            
            setTimeout(() => {
                window.location.hash = `#/project/${newProject.id}`;
            }, 1500);
        }
    }, [stage, techStack, generatedFiles, previewFile, prompt, plan, setProjects]);


    const renderContent = () => {
        switch (stage) {
            case 'stack':
            case 'prompt':
                const PromptComponent = () => {
                    const [currentPrompt, setCurrentPrompt] = useState(prompt);
                    const textareaRef = useRef<HTMLTextAreaElement>(null);

                    useEffect(() => {
                        const textarea = textareaRef.current;
                        if (textarea) {
                          textarea.style.height = 'auto';
                          textarea.style.height = `${textarea.scrollHeight}px`;
                        }
                    }, [currentPrompt]);
                    
                    const handleSubmit = (e: React.FormEvent) => {
                        e.preventDefault();
                        if (currentPrompt.trim()) {
                            handlePromptSubmit(currentPrompt);
                        }
                    };

                    return (
                        <div className="w-full max-w-3xl">
                            <form onSubmit={handleSubmit}>
                                <div className="relative bg-white/50 border border-gray-200 rounded-2xl shadow-xl p-4 backdrop-blur-lg">
                                    <label className="text-left block text-sm font-medium text-gray-700 mb-2 px-2">Ask Codepilot to build a prototype of...</label>
                                    <textarea
                                        ref={textareaRef}
                                        value={currentPrompt}
                                        onChange={(e) => setCurrentPrompt(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                handleSubmit(e as any);
                                            }
                                        }}
                                        placeholder="a modern SaaS dashboard with a sidebar, charts, and a data table for user management"
                                        className="w-full h-24 bg-transparent resize-none text-gray-900 text-base placeholder-gray-500 focus:outline-none p-2"
                                    />
                                    <button type="submit" disabled={!currentPrompt.trim()} className="absolute bottom-4 right-4 bg-blue-600 text-white rounded-full p-2.5 flex items-center justify-center transition-all duration-300 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed">
                                        <svg className="w-6 h-6 transform -rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                                    </button>
                                </div>
                            </form>
                            <div className="flex items-center justify-center gap-2 mt-6 text-sm flex-wrap">
                                <span className="text-gray-500">Try one →</span>
                                <button onClick={() => setCurrentPrompt(prompts.find(p => p.title === "Kanban Board")?.prompt || '')} className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-full shadow-sm hover:bg-gray-100 transition-colors">Kanban Board</button>
                                <button onClick={() => setCurrentPrompt(prompts.find(p => p.title === "Movie Finder")?.prompt || '')} className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-full shadow-sm hover:bg-gray-100 transition-colors">Movie Finder</button>
                                <button onClick={() => setCurrentPrompt(prompts.find(p => p.title === "Pomodoro Timer")?.prompt || '')} className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-full shadow-sm hover:bg-gray-100 transition-colors">Pomodoro Timer</button>
                            </div>
                        </div>
                    );
                }
                return (
                    <div className="w-full max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl font-bold mb-4">Let's build something new</h1>
                        <p className="text-gray-600 mb-8">First, choose your technology stack.</p>
                        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
                            <StackCard icon={<ReactIcon />} title="React + TS" onClick={() => { setTechStack('react'); setStage('prompt'); }}/>
                            <StackCard icon={<MobileIcon />} title="React Native" onClick={() => { setTechStack('react-native'); setStage('prompt'); }}/>
                            <StackCard icon={<SvelteIcon />} title="Svelte + TS" onClick={() => { setTechStack('svelte'); setStage('prompt'); }}/>
                            <StackCard icon={<HtmlIcon />} title="HTML + JS" onClick={() => { setTechStack('html'); setStage('prompt'); }}/>
                            <StackCard icon={<InfinityIcon />} title="Infinity App" onClick={() => { window.location.hash = `#/project/infinity`; }}/>
                        </div>
                         {stage === 'prompt' && <PromptComponent />}
                    </div>
                );
            case 'generating_app':
                return (
                    <div className="w-full max-w-4xl mx-auto text-center">
                        <div className="flex flex-col items-center gap-4">
                            <Spinner className="w-12 h-12" />
                            <h2 className="text-2xl font-bold">Building your app...</h2>
                            <p className="text-gray-600">Codepilot is generating the code. This might take a minute.</p>
                        </div>
                        {plan?.files && plan.files.length > 0 && (
                            <div className="mt-8 text-left max-w-md mx-auto">
                                <h3 className="font-semibold mb-2">Generating Files:</h3>
                                <ul className="space-y-1 text-sm">
                                    {plan.files.map(file => {
                                        const isDone = generatedFiles.some(f => f.path === file);
                                        return (
                                            <li key={file} className={`flex items-center gap-2 transition-colors duration-300 ${isDone ? 'text-gray-500' : 'text-gray-800'}`}>
                                                <div className="w-4 h-4 flex items-center justify-center">
                                                    {isDone ? 
                                                        <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg> : 
                                                        <Spinner className="w-4 h-4" />
                                                    }
                                                </div>
                                                <span className={isDone ? 'line-through' : ''}>{file}</span>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        )}
                    </div>
                );
            case 'complete':
                 return (
                    <div className="w-full max-w-4xl mx-auto text-center">
                        <div className="flex flex-col items-center gap-4">
                            <svg className="w-16 h-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <h2 className="text-2xl font-bold">Build Complete!</h2>
                            <p className="text-gray-600">Redirecting to your new project...</p>
                        </div>
                    </div>
                );
        }
    }


    return (
        <div className="h-screen w-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="absolute top-4 left-4">
                <a href="#/dashboard" className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-full font-semibold hover:bg-gray-100">← Dashboard</a>
            </div>
            {error ? (
                <div className="w-full max-w-2xl text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">An Error Occurred</h2>
                    <p className="text-gray-700 bg-red-100 p-4 rounded-md">{error}</p>
                    <button onClick={resetFlow} className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md font-semibold">Start Over</button>
                </div>
            ) : renderContent()}
        </div>
    );
};

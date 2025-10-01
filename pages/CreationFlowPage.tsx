import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Project, Settings, TechStack, GeneratedFile } from '../types';
import { generateAppStream } from '../services/geminiService';
import { Spinner } from '../components/Spinner';
import { ReactIcon, HtmlIcon, SvelteIcon, MobileIcon } from '../components/icons';
import { prompts } from '../data/prompts';
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';

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


type Stage = 'stack' | 'prompt' | 'generating_plan' | 'approval' | 'refining' | 'generating_app' | 'complete';
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
    
    const streamIteratorRef = useRef<AsyncIterator<GenerateContentResponse> | null>(null);

    const resetFlow = () => {
        streamIteratorRef.current = null;
        setStage('stack');
        setTechStack(null);
        setPrompt('');
        setPlan(null);
        setGeneratedFiles([]);
        setPreviewFile(null);
    }
    
    const handleStream = useCallback(async (isPlanOnly: boolean) => {
        setIsLoading(true);
        setError(null);
        if (isPlanOnly && techStack) {
            setPlan(null);
            setStage('generating_plan');
            
            const planSystemInstruction = `You are an AI planning agent for a code generation tool. Your task is to take a user's app idea and generate a plan for building it as a ${techStack} application.
You must stream your response as a sequence of three specific JSON objects, each on a new line, in this exact order: 'summary', 'thoughts', 'plan'.

First, output a 'summary' object with a brief, user-friendly description of the app you are about to generate, outlining the key features in a bulleted list.
Example: {"type": "summary", "summary": "- A simple landing page\\n- Includes a header, feature section, and footer."}

Second, output a 'thoughts' object. The 'thoughts' property should be a string containing a detailed, step-by-step technical plan for how you will build the application.
Example: {"type": "thoughts", "thoughts": "1. I'll start with a standard HTML5 boilerplate... 2. The main content will be in a <main> tag..."}

Third, output a 'plan' object that lists all the file paths that will be created for a standard ${techStack} project structure.
Example: {"type": "plan", "files": ["index.html", "src/App.tsx", "src/index.css"]}

Your response MUST contain ONLY these three JSON objects and nothing else. After you output the 'plan' object, your task is complete. Do not output any file content, code, or any other text.
Ensure each JSON object is a single, complete line. Do not wrap your response in markdown backticks.`;

            const ai = new GoogleGenAI({ apiKey: settings.geminiApiKey || process.env.API_KEY });
            const responseStream = await ai.models.generateContentStream({
                model: settings.model || "gemini-2.5-flash",
                contents: `User request: "${prompt}"`,
                config: { systemInstruction: planSystemInstruction }
            });
            streamIteratorRef.current = responseStream[Symbol.asyncIterator]();
        }

        let buffer = '';
        let currentPlan: Plan = { summary: '', thoughts: '', files: [] };

        while (streamIteratorRef.current) {
            const { value, done } = await streamIteratorRef.current.next();
            if (done) {
                if(isPlanOnly) setError("The AI didn't provide a plan. Please try rephrasing your prompt.");
                else setStage('complete');
                setIsLoading(false);
                break;
            }

            buffer += value.text;
            let newlineIndex;
            while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
                const line = buffer.substring(0, newlineIndex).trim();
                buffer = buffer.substring(newlineIndex + 1);

                if (line) {
                    try {
                        const update = JSON.parse(line.replace(/^```json/, '').replace(/```$/, '').trim());
                        if (isPlanOnly) {
                            if (update.type === 'summary') currentPlan.summary = update.summary;
                            if (update.type === 'thoughts') currentPlan.thoughts = update.thoughts;
                            if (update.type === 'plan') {
                                currentPlan.files = update.files;
                                setPlan(currentPlan);
                                setStage('approval');
                                setIsLoading(false);
                                return; // Pause the stream
                            }
                        } else {
                           if (update.type === 'file') {
                                setGeneratedFiles(prev => [...prev, update.file]);
                                setCurrentFile(update.file.path);
                            } else if (update.type === 'previewFile') {
                                setPreviewFile(update.file);
                            }
                        }
                    } catch (e) { /* Ignore non-json lines */ }
                }
            }
        }
    }, [prompt, settings, techStack]);

    const handlePromptSubmit = (currentPrompt: string) => {
        setPrompt(currentPrompt);
        handleStream(true);
    };
    
    const handleDecline = () => {
        setStage('refining');
        streamIteratorRef.current = null; // Discard old stream
    };
    
    const handleApprove = async () => {
        setStage('generating_app');
        // This is a bit of a workaround. The current Gemini API for streaming doesn't seem to support continuing a stream.
        // So we have to re-initiate the entire generation process. The main `generateAppStream` in `geminiService` handles this.
        
        if (!prompt || !techStack) {
            setError("Missing prompt or tech stack.");
            return;
        }

        setIsLoading(true);
        setError(null);
        
        try {
            await generateAppStream(prompt, settings, (update) => {
                if (update.type === 'file' && update.file) {
                    setGeneratedFiles(prev => [...prev.filter(f => f.path !== update.file.path), update.file]);
                    setCurrentFile(update.file.path);
                } else if (update.type === 'previewFile' && update.file) {
                    setPreviewFile(update.file);
                }
            }, techStack);
            setStage('complete');
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

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
                return (
                    <div className="w-full max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl font-bold mb-4">Let's build something new</h1>
                        <p className="text-gray-600 mb-8">First, choose your technology stack.</p>
                        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
                            <StackCard icon={<ReactIcon />} title="React + TS" onClick={() => { setTechStack('react'); setStage('prompt'); }}/>
                            <StackCard icon={<MobileIcon />} title="React Native" onClick={() => { setTechStack('react-native'); setStage('prompt'); }}/>
                            <StackCard icon={<SvelteIcon />} title="Svelte + TS" onClick={() => { setTechStack('svelte'); setStage('prompt'); }}/>
                            <StackCard icon={<HtmlIcon />} title="HTML + JS" onClick={() => { setTechStack('html'); setStage('prompt'); }}/>
                            <StackCard icon={<InfinityIcon />} title="Infinity App" onClick={() => { setTechStack('infinity'); setStage('prompt'); }}/>
                        </div>
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handlePromptSubmit(prompt); } }}
                            placeholder="Describe the app you want to build..."
                            disabled={stage === 'stack'}
                            className="w-full h-32 p-4 bg-white/50 border border-gray-300 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200/50 disabled:cursor-not-allowed transition-all"
                        />
                        <div className="flex items-center justify-center gap-2 mt-4 text-sm flex-wrap">
                            <span className="text-gray-500">or try an idea:</span>
                            {prompts.slice(0, 3).map(p => (
                                <button key={p.title} onClick={() => setPrompt(p.prompt)} disabled={stage === 'stack'} className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-full shadow-sm hover:bg-gray-100 transition-colors disabled:opacity-50">
                                    {p.title}
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 'generating_plan':
                return (
                    <div className="text-center">
                        <Spinner className="w-10 h-10 mx-auto" />
                        <h2 className="text-2xl font-bold mt-4">Drafting a plan...</h2>
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                    </div>
                );
            case 'approval':
            case 'refining':
                return (
                    <div className="w-full max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-6">Here's the plan:</h2>
                        <div className="bg-white/50 border border-gray-200 rounded-xl shadow-lg p-6 space-y-4">
                            <div>
                                <h3 className="font-semibold text-lg">Summary</h3>
                                <ul className="list-disc list-inside text-gray-700">
                                    {plan?.summary.split('\n').map((item, i) => <li key={i}>{item.replace('- ','')}</li>)}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Files to be created</h3>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {plan?.files.map(file => <span key={file} className="bg-gray-200 text-gray-800 text-xs font-mono px-2 py-1 rounded">{file}</span>)}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center gap-4 mt-6">
                            <button onClick={handleDecline} className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-full hover:bg-gray-300 transition-colors">Decline</button>
                            <button onClick={handleApprove} className="px-6 py-2 bg-black text-white font-semibold rounded-full hover:bg-gray-800 transition-colors">Approve</button>
                        </div>
                    </div>
                );
            case 'generating_app':
                return (
                     <div className="text-center text-white">
                        <h2 className="text-4xl font-bold">Generating your app...</h2>
                        <div className="mt-8 flex justify-center">
                             <div className="bg-black/20 border border-white/20 rounded-full px-4 py-2 text-sm">
                                {currentFile ? `Working on: ${currentFile}` : 'Initializing build...'}
                            </div>
                        </div>
                    </div>
                );
            case 'complete':
                 return (
                     <div className="text-center text-white">
                        <h2 className="text-4xl font-bold">Build complete!</h2>
                        <p className="mt-2">Redirecting you to the editor...</p>
                    </div>
                );
        }
    };

    return (
        <div className="relative w-screen h-screen bg-white overflow-hidden flex items-center justify-center transition-colors duration-1000" style={{ backgroundColor: stage === 'generating_app' || stage === 'complete' ? '#111827' : '#FFFFFF'}}>
            <div className={`absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-200 rounded-full filter blur-3xl opacity-40 transition-transform duration-[2000ms] ease-in-out ${stage === 'generating_app' || stage === 'complete' ? 'scale-[10]' : 'scale-1'}`} />
            <div className={`absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-200 rounded-full filter blur-3xl opacity-40 transition-transform duration-[2000ms] ease-in-out ${stage === 'generating_app' || stage === 'complete' ? 'scale-[10]' : 'scale-1'}`} />

            <div className="relative z-10 p-4 w-full">
                {renderContent()}
            </div>
            
             <div className={`absolute bottom-0 left-0 right-0 p-4 transition-transform duration-500 ${stage === 'approval' || stage === 'refining' ? 'translate-y-0' : 'translate-y-full'}`}>
                <div className="w-full max-w-3xl mx-auto">
                    <input
                        type="text"
                        placeholder={stage === 'refining' ? "What would you like to change in the plan?" : "Enter a new prompt..."}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handlePromptSubmit((e.target as HTMLInputElement).value);
                                (e.target as HTMLInputElement).value = '';
                            }
                        }}
                        className="w-full p-4 bg-white/80 border border-gray-300 rounded-xl shadow-2xl backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
        </div>
    );
};
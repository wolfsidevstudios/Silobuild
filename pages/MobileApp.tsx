import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
// FIX: The `Prompt` type is defined in `../data/prompts.ts`, not `../types.ts`.
import { Project, Settings, TechStack, ChatMessage, GeneratedFile } from '../types';
import { timeAgo } from '../utils/projectUtils';
import { FileIcon, CloseIcon, SparklesIcon, HomeIcon, SettingsIcon, EyeIcon, ChatIcon, SaveIcon, DownloadIcon, PlusIcon, HelpCircleIcon, ChevronDownIcon } from '../components/icons';
import { useAuth } from '../context/AuthContext';
import { generateAppStream } from '../services/geminiService';
import { Spinner } from '../components/Spinner';
import { PromptInput } from '../components/PromptInput';
import { StackSelection } from '../components/StackSelection';
import { GeminiLogo, GithubIcon, NetlifyIcon, SupabaseLogo, StripeLogo } from '../components/icons';
import { prompts, Prompt } from '../data/prompts';


const GOOGLE_CLIENT_ID = '208835173647-6e2is6g6j3338hj4dq2reebcluk694jm.apps.googleusercontent.com';

declare global {
  interface Window {
    google: typeof import('google-one-tap');
  }
}

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

// --- AUTH COMPONENTS ---

const MobileLoginPage: React.FC = () => {
    const { login, loginAsGuest } = useAuth();
    const googleButtonContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (window.google) {
            window.google.accounts.id.initialize({
                client_id: GOOGLE_CLIENT_ID,
                callback: (response) => {
                    if (response.credential) {
                        login(response.credential);
                    }
                },
            });

            if (googleButtonContainerRef.current) {
                googleButtonContainerRef.current.innerHTML = '';
                window.google.accounts.id.renderButton(
                    googleButtonContainerRef.current,
                    { theme: 'outline', size: 'large', type: 'standard', text: 'continue_with', shape: 'pill' }
                );
            }
            window.google.accounts.id.prompt();
        }
    }, [login]);

    return (
        <div className="h-screen w-screen bg-gray-50 flex flex-col justify-center items-center p-4">
            <div className="text-center">
                <img src="https://i.ibb.co/svVCNWvV/Google-AI-Studio-2025-09-29-T00-23-01-230-Z-modified.png" alt="Silo Build Logo" className="h-12 w-auto mx-auto" />
                <h1 className="text-3xl font-bold mt-4">Silo Build Go</h1>
                <p className="text-gray-600 mt-2">Sign in or continue as a guest.</p>
            </div>
            <div className="mt-8" ref={googleButtonContainerRef}></div>
             <div className="relative flex py-5 items-center w-full max-w-xs">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-gray-400 text-sm">OR</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <button
                onClick={loginAsGuest}
                className="w-full max-w-xs text-center px-4 py-2 text-sm font-medium bg-white hover:bg-gray-100 border border-gray-300 text-gray-800 rounded-full transition-colors"
            >
                Continue as Guest
            </button>
        </div>
    )
}

// --- PROJECTS PAGE COMPONENTS ---

const FullscreenPreview: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
    if (!project.previewFile) return null;

    return (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
            <header className="flex-shrink-0 h-14 bg-gray-900 flex items-center justify-between px-4 border-b border-gray-700">
                <div className="flex items-center gap-3 overflow-hidden">
                    {project.appIcon ? 
                        <img src={project.appIcon} alt="" className="w-8 h-8 rounded-md" /> : 
                        <FileIcon className="w-7 h-7 text-white"/>
                    }
                    <h1 className="text-white font-semibold truncate">{project.name}</h1>
                </div>
                <button onClick={onClose} className="p-2 rounded-full text-white hover:bg-gray-700 transition-colors">
                    <CloseIcon />
                </button>
            </header>
            <main className="flex-1 bg-white">
                <iframe
                    srcDoc={project.previewFile.content}
                    title={project.name}
                    className="w-full h-full border-0"
                    sandbox="allow-scripts allow-same-origin"
                />
            </main>
        </div>
    );
};

const ProjectCard: React.FC<{ project: Project; onClick: () => void }> = ({ project, onClick }) => (
    <button 
        className="w-full bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4 text-left active:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={onClick}
    >
        <div className="w-14 h-14 rounded-lg bg-gray-100 flex-shrink-0 flex items-center justify-center border border-gray-200">
            {project.appIcon ? <img src={project.appIcon} alt={`${project.name} icon`} className="w-full h-full object-cover rounded-lg"/> : <FileIcon className="w-8 h-8 text-gray-400" />}
        </div>
        <div className="min-w-0">
            <p className="font-semibold text-gray-800 truncate">{project.name}</p>
            <p className="text-sm text-gray-500">
                Updated {timeAgo(project.updatedAt || project.createdAt)}
            </p>
        </div>
    </button>
);

const MobileProjectsPage: React.FC<{ onProjectClick: (project: Project) => void }> = ({ onProjectClick }) => {
    const [projects] = useLocalStorage<Project[]>('ai-app-builder-projects', []);
    
    const visualProjects = projects
        .filter(p => ['react', 'html', 'vue', 'svelte', 'react-native'].includes(p.stack) && p.previewFile)
        .sort((a, b) => new Date(b.updatedAt || b.createdAt).getTime() - new Date(a.updatedAt || a.createdAt).getTime());
        
    return (
        <>
            <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 p-4 sticky top-0 z-10">
                <div className="flex items-center justify-center gap-2">
                    <img src="https://i.ibb.co/svVCNWvV/Google-AI-Studio-2025-09-29-T00-23-01-230-Z-modified.png" alt="Silo Build Logo" className="h-7 w-auto" />
                    <h1 className="text-xl font-bold text-center">Silo Build Go</h1>
                </div>
            </header>
            <main className="p-4 space-y-3 pb-20">
                {visualProjects.length === 0 ? (
                    <div className="text-center text-gray-500 pt-20 px-4">
                        <SparklesIcon className="w-16 h-16 mx-auto text-gray-300" />
                        <h2 className="mt-4 text-lg font-semibold text-gray-700">No Apps Found</h2>
                        <p className="mt-1 text-sm">
                            Welcome to Silo Build Go! Create an app using the 'Create' button below, or build one on desktop to see it here.
                        </p>
                    </div>
                ) : (
                    visualProjects.map(project => (
                        <ProjectCard key={project.id} project={project} onClick={() => onProjectClick(project)} />
                    ))
                )}
            </main>
        </>
    );
}

// --- BUILDER PAGE ---

const MobileBuilderPage: React.FC<{ setView: (view: 'projects' | 'builder' | 'settings' | 'library' | 'help') => void; }> = ({ setView }) => {
    const [viewMode, setViewMode] = useState<'chat' | 'preview'>('chat');
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [multiFileCode, setMultiFileCode] = useState<GeneratedFile[]>([]);
    const [previewFile, setPreviewFile] = useState<GeneratedFile | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [techStack, setTechStack] = useState<TechStack | null>(null);
    const [isGenerated, setIsGenerated] = useState(false);
    const [settings] = useLocalStorage<Settings>('ai-app-builder-settings', initialSettings);
    const [projects, setProjects] = useLocalStorage<Project[]>('ai-app-builder-projects', []);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [initialPrompt, setInitialPrompt] = useState('');

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);
    
    useEffect(() => {
        const promptFromSession = sessionStorage.getItem('initialPrompt');
        if (promptFromSession) {
            setInitialPrompt(promptFromSession);
            sessionStorage.removeItem('initialPrompt');
        }
    }, []);

    const handleSend = useCallback(async (prompt: string, imageData?: string | null) => {
        const stackToUse = techStack;
        if (!stackToUse) {
            setError("Please select a technology stack first.");
            return;
        }

        const userMessage: ChatMessage = { role: 'user', content: prompt };
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);
        setError(null);

        try {
            await generateAppStream(prompt, settings, (update) => {
                if (update.type === 'file' && update.file) {
                    setMultiFileCode(prev => [...prev.filter(f => f.path !== update.file.path), update.file]);
                } else if (update.type === 'previewFile' && update.file) {
                    setPreviewFile(update.file);
                }
            }, stackToUse, isGenerated ? multiFileCode : undefined, undefined, undefined, undefined, imageData);

            setMessages(prev => [...prev, { role: 'model', content: isGenerated ? 'I\'ve updated the app.' : 'App generated! Check the preview.' }]);
            setIsGenerated(true);
            setViewMode('preview');

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
            setError(`Failed to generate app: ${errorMessage}`);
            setMessages(prev => [...prev, { role: 'model', content: `Sorry, I ran into an error: ${errorMessage}` }]);
        } finally {
            setIsLoading(false);
        }
    }, [techStack, isGenerated, multiFileCode, settings]);
    
    const handleSave = () => {
        if (!isGenerated || !techStack) {
            alert("Nothing to save yet. Generate an app first.");
            return;
        }
        const name = prompt("Enter a name for your new project:", "My Mobile App");
        if (name) {
            const now = new Date().toISOString();
            const newProject: Project = {
                id: crypto.randomUUID(),
                name,
                createdAt: now,
                updatedAt: now,
                files: multiFileCode,
                previewFile: previewFile,
                stack: techStack,
                deployments: [],
            };
            setProjects(prev => [newProject, ...prev]);
            alert(`Project "${name}" saved!`);
        }
    };


    return (
        <div className="h-full flex flex-col bg-gray-50">
            <header className="flex-shrink-0 bg-white/80 backdrop-blur-lg border-b border-gray-200 p-2 flex items-center justify-between sticky top-0 z-10">
                <button onClick={() => setView('projects')} className="p-2 text-gray-600 active:bg-gray-200 rounded-full">
                    <HomeIcon />
                </button>
                <div className="flex items-center gap-2">
                    {techStack && (
                        <div className="bg-gray-100 rounded-full p-1 flex items-center space-x-1">
                            <button onClick={() => setViewMode('chat')} className={`px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1 ${viewMode === 'chat' ? 'bg-blue-500 text-white' : 'text-gray-600'}`}><ChatIcon className="w-4 h-4" /> Chat</button>
                            <button onClick={() => setViewMode('preview')} className={`px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1 ${viewMode === 'preview' ? 'bg-blue-500 text-white' : 'text-gray-600'}`}><EyeIcon className="w-4 h-4" /> Preview</button>
                        </div>
                    )}
                    <button 
                        onClick={handleSave} 
                        disabled={!isGenerated} 
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white hover:bg-gray-100 border border-gray-300 text-gray-800 rounded-full transition-colors disabled:opacity-50"
                    >
                        <SaveIcon className="w-4 h-4" /> Save
                    </button>
                </div>
            </header>
            <main className="flex-1 overflow-hidden relative">
                {!techStack ? (
                     <StackSelection onSelect={setTechStack} />
                ) : (
                    <>
                        {viewMode === 'chat' && (
                             <div className="h-full overflow-y-auto p-4 space-y-4 pb-24">
                                {messages.map((msg, index) => (
                                    <div key={index} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                        <div className={`max-w-xs p-3 rounded-lg shadow-sm ${msg.role === 'user' ? 'bg-black text-white rounded-br-none' : 'bg-white text-black rounded-bl-none'}`}>
                                            <p className="text-sm">{msg.content}</p>
                                        </div>
                                    </div>
                                ))}
                                {isLoading && <div className="flex items-start"><div className="p-3 bg-white rounded-lg shadow-sm"><Spinner /></div></div>}
                                {error && <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}
                                <div ref={messagesEndRef} />
                            </div>
                        )}
                         {viewMode === 'preview' && (
                            previewFile ? (
                                <iframe srcDoc={previewFile.content} title="Preview" className="w-full h-full border-0 bg-white" sandbox="allow-scripts allow-same-origin" />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-500">Generate an app to see a preview.</div>
                            )
                        )}
                    </>
                )}
            </main>
            {techStack && viewMode === 'chat' && (
                <div className="bg-transparent">
                    <PromptInput 
                        onSend={handleSend}
                        isLoading={isLoading}
                        isAppGenerated={isGenerated}
                        isIdeaMode={false}
                        onToggleIdeaMode={() => {}}
                        isReadyToPrompt={!!techStack}
                        initialValue={initialPrompt}
                    />
                </div>
            )}
        </div>
    );
};

// --- SETTINGS PAGE ---

const SettingsInput: React.FC<{ label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder: string; isPassword?: boolean; }> = ({ label, value, onChange, placeholder, isPassword = true }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input type={isPassword ? 'password' : 'text'} value={value} onChange={onChange} placeholder={placeholder} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>
);

const IntegrationCard: React.FC<{ icon?: React.ReactNode; title: string; children: React.ReactNode; }> = ({ icon, title, children }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
            {icon}
            <h3 className="text-lg font-bold">{title}</h3>
        </div>
        <div className="space-y-4 border-t border-gray-200 pt-4">
            {children}
        </div>
    </div>
);


const MobileSettingsPage: React.FC<{ onInstallClick: () => void; canInstall: boolean; }> = ({ onInstallClick, canInstall }) => {
    const [settings, setSettings] = useLocalStorage<Settings>('ai-app-builder-settings', initialSettings);
    const [localSettings, setLocalSettings] = useState<Settings>(initialSettings);
    const [isSaved, setIsSaved] = useState(false);
    const [notificationPermission, setNotificationPermission] = useState('Notification' in window ? Notification.permission : 'unsupported');


    useEffect(() => {
        setLocalSettings(settings);
        if ('permissions' in navigator && typeof navigator.permissions.query === 'function') {
            navigator.permissions.query({ name: 'notifications' }).then((permissionStatus) => {
                setNotificationPermission(permissionStatus.state);
                permissionStatus.onchange = () => {
                    setNotificationPermission(permissionStatus.state);
                };
            }).catch(() => {
                setNotificationPermission('Notification' in window ? Notification.permission : 'unsupported');
            });
        } else if (!('Notification' in window)) {
            setNotificationPermission('unsupported');
        } else {
            setNotificationPermission(Notification.permission);
        }
    }, [settings]);

    const handleChange = (key: keyof Settings, value: string) => {
        setLocalSettings(prev => ({ ...prev, [key]: value }));
        setIsSaved(false);
    };

    const handleSave = () => {
        setSettings(localSettings);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };
    
    const handleEnableNotifications = async () => {
        if (!('Notification' in window)) {
            alert('This browser does not support notifications.');
            return;
        }
    
        if (Notification.permission === 'default') {
            const permission = await Notification.requestPermission();
            setNotificationPermission(permission);
        }
    };

    return (
        <div className="h-full flex flex-col bg-gray-50 pb-16">
            <header className="flex-shrink-0 bg-white/80 backdrop-blur-lg border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-10">
                <h1 className="text-xl font-bold">Settings</h1>
                <button onClick={handleSave} className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    {isSaved ? 'Saved!' : 'Save'}
                </button>
            </header>
            <main className="flex-1 overflow-y-auto p-4 space-y-4">
                 <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <DownloadIcon className="w-6 h-6 text-green-500" />
                        <h3 className="text-lg font-bold">Download for Android</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                        Install the Silo Build Go app on your Android device. This will add it to your home screen and app drawer, just like a native app from the Play Store.
                    </p>
                    <button
                        onClick={onInstallClick}
                        disabled={!canInstall}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        <DownloadIcon />
                        <span>{canInstall ? 'Install Web APK' : 'Installation not available'}</span>
                    </button>
                    {!canInstall && (
                        <p className="text-xs text-gray-500 mt-2 text-center">
                            To install manually, use the "Add to Home Screen" option in your browser's menu. This may not be available if the app is already installed.
                        </p>
                    )}
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <ChatIcon className="w-6 h-6 text-blue-500" />
                        <h3 className="text-lg font-bold">Notifications</h3>
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="font-medium text-sm text-gray-800">Browser Push Notifications</label>
                                <p className="text-xs text-gray-500">
                                    Status: <span className={`font-semibold capitalize ${
                                        notificationPermission === 'granted' ? 'text-green-600' :
                                        notificationPermission === 'denied' ? 'text-red-600' : 'text-gray-600'
                                    }`}>{notificationPermission}</span>
                                </p>
                            </div>
                            <button
                                onClick={handleEnableNotifications}
                                disabled={notificationPermission !== 'default'}
                                className="px-3 py-1.5 text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                Enable
                            </button>
                        </div>
                        {notificationPermission === 'denied' && (
                            <p className="text-xs text-red-500 mt-2">
                                Notifications are blocked. You'll need to enable them in your browser or OS settings.
                            </p>
                        )}
                    </div>
                </div>

                <IntegrationCard icon={<GeminiLogo className="h-7"/>} title="Google Gemini">
                    <SettingsInput label="Gemini API Key" value={localSettings.geminiApiKey} onChange={(e) => handleChange('geminiApiKey', e.target.value)} placeholder="Enter your Gemini API Key" />
                </IntegrationCard>
                <IntegrationCard icon={<GithubIcon className="w-6 h-6 text-black"/>} title="GitHub">
                    <SettingsInput label="GitHub Personal Access Token" value={localSettings.githubPat} onChange={(e) => handleChange('githubPat', e.target.value)} placeholder="Enter your GitHub PAT" />
                </IntegrationCard>
                 <IntegrationCard icon={<NetlifyIcon className="h-6"/>} title="Netlify">
                    <SettingsInput label="Netlify Access Token" value={localSettings.netlifyPat} onChange={(e) => handleChange('netlifyPat', e.target.value)} placeholder="Enter your Netlify Access Token" />
                </IntegrationCard>
                <IntegrationCard icon={<SupabaseLogo className="h-7"/>} title="Supabase">
                    <SettingsInput label="Supabase URL" value={localSettings.supabaseUrl} onChange={(e) => handleChange('supabaseUrl', e.target.value)} placeholder="https://....supabase.co" isPassword={false}/>
                    <SettingsInput label="Supabase Anon Key" value={localSettings.supabaseAnonKey} onChange={(e) => handleChange('supabaseAnonKey', e.target.value)} placeholder="Supabase public anon key" />
                </IntegrationCard>
                <IntegrationCard icon={<StripeLogo className="h-6"/>} title="Stripe">
                    <SettingsInput label="Stripe Public Key" value={localSettings.stripePublicKey} onChange={(e) => handleChange('stripePublicKey', e.target.value)} placeholder="pk_live_..." />
                    <SettingsInput label="Stripe Secret Key" value={localSettings.stripeSecretKey} onChange={(e) => handleChange('stripeSecretKey', e.target.value)} placeholder="sk_live_..." />
                </IntegrationCard>
            </main>
        </div>
    );
}

// --- PROMPT LIBRARY PAGE ---
const PromptCardMobile: React.FC<{ prompt: Prompt; onUse: (promptText: string) => void; }> = ({ prompt, onUse }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col justify-between">
            <div>
                <h3 className="font-bold text-gray-900">{prompt.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{prompt.description}</p>
            </div>
            <button
                onClick={() => onUse(prompt.prompt)}
                className="mt-4 w-full bg-gray-100 text-gray-800 px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-blue-600 hover:text-white transition-colors"
            >
                Use this prompt
            </button>
        </div>
    );
};

const MobilePromptLibraryPage: React.FC<{ onSelectPrompt: (prompt: string) => void; }> = ({ onSelectPrompt }) => {
    const groupedPrompts = useMemo(() => {
        return prompts.reduce((acc, prompt) => {
            (acc[prompt.category] = acc[prompt.category] || []).push(prompt);
            return acc;
        }, {} as Record<string, Prompt[]>);
    }, []);

    const categoryOrder = ["Productivity & Business", "Utilities & Tools", "Backend & APIs", "Games & Entertainment", "UI Components & Landing Pages", "Data & APIs"];

    return (
        <div className="h-full flex flex-col bg-gray-50 pb-16">
             <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 p-4 sticky top-0 z-10">
                <h1 className="text-xl font-bold text-center">Prompt Library</h1>
            </header>
            <main className="flex-1 overflow-y-auto p-4 space-y-6">
                {categoryOrder.map(category => (
                    groupedPrompts[category] && <div key={category}>
                        <h2 className="text-lg font-semibold mb-3">{category}</h2>
                        <div className="grid grid-cols-1 gap-4">
                            {groupedPrompts[category].map(prompt => (
                                <PromptCardMobile key={prompt.title} prompt={prompt} onUse={onSelectPrompt} />
                            ))}
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
};

// --- HELP PAGE ---
const FaqItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-gray-200 bg-white p-4 rounded-lg">
            <button className="w-full flex justify-between items-center text-left" onClick={() => setIsOpen(!isOpen)}>
                <span className="font-semibold text-gray-900">{question}</span>
                <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && <div className="pt-3 text-gray-700 text-sm"><p>{answer}</p></div>}
        </div>
    );
};

const MobileHelpPage: React.FC = () => {
    return (
         <div className="h-full flex flex-col bg-gray-50 pb-16">
             <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 p-4 sticky top-0 z-10">
                <h1 className="text-xl font-bold text-center">Help & Support</h1>
            </header>
            <main className="flex-1 overflow-y-auto p-4 space-y-4">
                 <FaqItem question="Where do I get a Google Gemini API key?" answer="You can get a Gemini API key from Google AI Studio. Visit the Google AI for Developers website, sign in with your Google account, and create a new API key in the dashboard." />
                 <FaqItem question="Are my API keys and project data secure?" answer="Yes. All your data, including API keys and project files, is stored exclusively in your browser's local storage. It is never sent to our servers, ensuring your information remains private and under your control." />
                 <FaqItem question="How are my projects saved?" answer="Projects are saved directly in your browser's local storage. This means they are tied to the browser you are using. If you clear your browser data or switch to a different browser or device, your projects will not be available." />
                 <FaqItem question="What technology stacks can the AI generate?" answer="Silo Build supports generating applications using React, Vue, Svelte, and Node.js (with Express), all using TypeScript. It can also generate simple, single-file vanilla HTML, CSS, and JavaScript applications with Tailwind CSS." />
            </main>
        </div>
    );
};


// --- MAIN APP ROUTER ---

const BottomNavBar: React.FC<{ activeView: string; setView: (view: 'projects' | 'builder' | 'settings' | 'library' | 'help') => void; }> = ({ activeView, setView }) => {
    const NavItem: React.FC<{ view: 'projects' | 'builder' | 'settings' | 'library' | 'help', icon: React.ReactNode, label: string }> = ({ view, icon, label }) => {
        const isActive = activeView === view;
        return (
            <button onClick={() => setView(view)} className={`flex flex-col items-center justify-center gap-1 w-full transition-colors ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                {icon}
                <span className="text-xs font-medium">{label}</span>
            </button>
        );
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-lg border-t border-gray-200 grid grid-cols-5 items-center z-20">
            <NavItem view="projects" icon={<HomeIcon />} label="Projects" />
            <NavItem view="library" icon={<SparklesIcon />} label="Library" />
            <NavItem view="builder" icon={<PlusIcon />} label="Create" />
            <NavItem view="help" icon={<HelpCircleIcon />} label="Help" />
            <NavItem view="settings" icon={<SettingsIcon />} label="Settings" />
        </div>
    );
};

export const MobileApp: React.FC = () => {
    const { user, isGuest } = useAuth();
    const [view, setView] = useState<'projects' | 'builder' | 'settings' | 'library' | 'help'>('projects');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

    useEffect(() => {
        const handler = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };
        window.addEventListener('beforeinstallprompt', handler);
        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
        };
    }, []);

    const handleInstallClick = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`User response to the install prompt: ${outcome}`);
            setDeferredPrompt(null);
        } else {
            alert('To install the app on Android, tap the menu button (⋮) in your browser and select "Install app" or "Add to Home Screen".');
        }
    };


    if (!user && !isGuest) {
        return <MobileLoginPage />;
    }

    const renderView = () => {
        switch(view) {
            case 'builder': return <MobileBuilderPage setView={setView} />;
            case 'settings': return <MobileSettingsPage onInstallClick={handleInstallClick} canInstall={!!deferredPrompt} />;
            case 'library': return <MobilePromptLibraryPage onSelectPrompt={(prompt) => { sessionStorage.setItem('initialPrompt', prompt); setView('builder'); }} />;
            case 'help': return <MobileHelpPage />;
            case 'projects':
            default:
                return <MobileProjectsPage onProjectClick={setSelectedProject} />;
        }
    }

    return (
        <div className="h-screen w-screen bg-gray-50 text-gray-900 font-sans">
            {selectedProject && (
                <FullscreenPreview project={selectedProject} onClose={() => setSelectedProject(null)} />
            )}
            
            <div className={`h-full w-full ${selectedProject ? 'hidden' : 'block'}`}>
                {renderView()}
                <BottomNavBar activeView={view} setView={setView} />
            </div>
        </div>
    );
};

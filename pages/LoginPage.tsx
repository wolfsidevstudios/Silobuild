import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { ChatIcon, LayoutIcon, MobileIcon, DownloadIcon, DatabaseIcon, SparklesIcon, CodeIcon, ChevronDownIcon, SupabaseLogo, StripeLogo, GithubIcon, GeminiLogo, VercelIcon, PaintBrushIcon, UploadIcon, CheckIcon, UsersIcon, HelpCircleIcon, CloseIcon, BugIcon } from '../components/icons';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Settings } from '../types';
import { generateHelpBotResponseStream } from '../services/geminiService';
import { Spinner } from '../components/Spinner';

const GOOGLE_CLIENT_ID = '208835173647-6e2is6g6j3338hj4dq2reebcluk694jm.apps.googleusercontent.com';

// FIX: Add missing 'netlifyPat' property to satisfy the Settings type.
const initialSettings: Settings = {
  geminiApiKey: '',
  vercelApiKey: '',
  supabaseUrl: '',
  supabaseAnonKey: '',
  stripePublicKey: '',
  stripeSecretKey: '',
  githubPat: '',
  netlifyPat: '',
};


declare global {
  interface Window {
    google: typeof import('google-one-tap');
  }
}

const kanbanPreview = `
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-900 p-2 sm:p-4 font-sans text-white overflow-hidden select-none">
  <div class="grid grid-cols-3 gap-2 h-full">
    <div class="bg-gray-800 rounded-lg p-2">
      <h3 class="font-bold text-xs sm:text-sm mb-2 text-gray-300">To Do</h3>
      <div class="bg-gray-700 p-2 rounded-md text-[10px] sm:text-xs mb-2">Design new landing page</div>
      <div class="bg-gray-700 p-2 rounded-md text-[10px] sm:text-xs">Write documentation</div>
    </div>
    <div class="bg-gray-800 rounded-lg p-2">
      <h3 class="font-bold text-xs sm:text-sm mb-2 text-gray-300">In Progress</h3>
      <div class="bg-gray-700 p-2 rounded-md text-[10px] sm:text-xs">Develop API endpoints</div>
    </div>
    <div class="bg-gray-800 rounded-lg p-2">
      <h3 class="font-bold text-xs sm:text-sm mb-2 text-gray-300">Done</h3>
      <div class="bg-gray-700 p-2 rounded-md text-[10px] sm:text-xs line-through opacity-60">Initial project setup</div>
    </div>
  </div>
</body>
</html>
`;

const musicPlayerPreview = `
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-purple-900 to-indigo-900 p-4 font-sans text-white overflow-hidden flex items-center justify-center select-none">
  <div class="bg-black/20 backdrop-blur-lg rounded-xl p-4 w-full max-w-xs text-center border border-white/10">
    <img src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=300&q=80" class="w-full aspect-square rounded-md shadow-lg mb-4" />
    <h3 class="font-bold">Starlight Echoes</h3>
    <p class="text-xs text-gray-400">Synthwave Rider</p>
    <div class="w-full h-1 bg-white/20 rounded-full mt-4"><div class="w-1/3 h-1 bg-white rounded-full"></div></div>
    <div class="flex justify-center items-center gap-6 mt-4 text-2xl">
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M8.445 14.832A1 1 0 0010 14.17V5.83a1 1 0 00-1.555-.832L4.12 8.168a1 1 0 000 1.664l4.325 3.001zM11 5.83a1 1 0 011.555-.832l4.325 3.001a1 1 0 010 1.664l-4.325 3.001A1 1 0 0111 14.17V5.83z"></path></svg>
      <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"></path></svg>
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M11.555 5.168A1 1 0 0010 5.83v8.34a1 1 0 001.555.832l4.325-3.001a1 1 0 000-1.664l-4.325-3.001zM9 5.83a1 1 0 00-1.555-.832L3.12 8.168a1 1 0 000 1.664l4.325 3.001A1 1 0 009 14.17V5.83z"></path></svg>
    </div>
  </div>
</body>
</html>
`;

const dashboardPreview = `
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-100 p-2 sm:p-4 font-sans text-gray-800 overflow-hidden select-none">
  <div class="grid grid-cols-2 gap-2 sm:gap-4">
    <div class="bg-white p-3 rounded-lg shadow-sm">
      <p class="text-[10px] sm:text-xs text-gray-500">Revenue</p>
      <p class="text-lg sm:text-xl font-bold">$12,450</p>
    </div>
    <div class="bg-white p-3 rounded-lg shadow-sm">
      <p class="text-[10px] sm:text-xs text-gray-500">New Users</p>
      <p class="text-lg sm:text-xl font-bold">142</p>
    </div>
  </div>
  <div class="bg-white p-3 rounded-lg shadow-sm mt-2 sm:mt-4">
    <p class="text-xs sm:text-sm font-semibold mb-2">Sales Over Time</p>
    <div class="flex items-end gap-2 h-24">
      <div class="w-1/6 bg-blue-500 rounded-t-sm" style="height: 40%"></div>
      <div class="w-1/6 bg-blue-500 rounded-t-sm" style="height: 60%"></div>
      <div class="w-1/6 bg-blue-500 rounded-t-sm" style="height: 50%"></div>
      <div class="w-1/6 bg-blue-500 rounded-t-sm" style="height: 80%"></div>
      <div class="w-1/6 bg-blue-500 rounded-t-sm" style="height: 75%"></div>
      <div class="w-1/6 bg-blue-400 rounded-t-sm" style="height: 90%"></div>
    </div>
  </div>
</body>
</html>
`;

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="relative p-6 rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-blue-300 hover:bg-white hover:-translate-y-1">
        <div className="flex items-start gap-4">
             <div className="flex-shrink-0 bg-blue-50 p-3 rounded-lg border border-blue-200">
                 {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: 'w-6 h-6 text-blue-600' })}
             </div>
             <div>
                <h4 className="text-lg font-bold text-gray-900">{title}</h4>
                <p className="text-gray-600 text-sm mt-1">{description}</p>
             </div>
        </div>
    </div>
);

const TestimonialCard: React.FC<{ quote: string; name: string; title: string; avatar: string }> = ({ quote, name, title, avatar }) => (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
        <p className="text-gray-700 mb-4 italic">"{quote}"</p>
        <div className="flex items-center gap-3">
            <img src={avatar} alt={name} className="w-10 h-10 rounded-full" />
            <div>
                <p className="font-semibold text-gray-900">{name}</p>
                <p className="text-sm text-gray-500">{title}</p>
            </div>
        </div>
    </div>
);

const FaqItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-gray-200">
            <button
                className="w-full flex justify-between items-center text-left py-4"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-semibold text-gray-900">{question}</span>
                <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="pb-4 text-gray-700">
                    <p>{answer}</p>
                </div>
            )}
        </div>
    );
};

interface BotMessage {
    role: 'user' | 'model';
    content: string;
}

const HelpBot: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [settings] = useLocalStorage<Settings>('ai-app-builder-settings', initialSettings);
    const [messages, setMessages] = useState<BotMessage[]>([{ role: 'model', content: "Hi! How can I help you with Silo Build today?" }]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

     useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        if (!settings.geminiApiKey) {
            setError("Please configure your Gemini API Key in the dashboard settings to use the help bot.");
            return;
        }

        const newUserMessage: BotMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, newUserMessage]);
        setInput('');
        setIsLoading(true);
        setError(null);
        
        setMessages(prev => [...prev, { role: 'model', content: '' }]);

        try {
            await generateHelpBotResponseStream(input, settings, (chunk) => {
                setMessages(prev => {
                    const lastMsgIndex = prev.length - 1;
                    const updatedMessages = [...prev];
                    updatedMessages[lastMsgIndex] = {
                        ...updatedMessages[lastMsgIndex],
                        content: updatedMessages[lastMsgIndex].content + chunk
                    };
                    return updatedMessages;
                });
            });
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
            setError(`Failed to get response: ${errorMessage}`);
            setMessages(prev => prev.slice(0, prev.length - 1)); // remove empty model message
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-20 right-5 w-full max-w-sm h-[70vh] max-h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-30">
            <header className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                    <HelpCircleIcon className="w-6 h-6 text-blue-600"/>
                    <h3 className="font-bold text-lg">Silo Help Bot</h3>
                </div>
                <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 text-gray-500">
                    <CloseIcon />
                </button>
            </header>
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                        <div className={`max-w-xs p-3 rounded-lg ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}>
                            <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                        </div>
                    </div>
                ))}
                 {isLoading && (
                    <div className="flex items-start">
                        <div className="p-3 bg-gray-100 text-gray-800 rounded-lg rounded-bl-none">
                           <Spinner className="w-4 h-4" />
                        </div>
                    </div>
                )}
                {error && <div className="p-3 bg-red-100 text-red-800 rounded-lg text-sm">{error}</div>}
                 <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSend} className="p-3 border-t border-gray-200 flex items-center gap-2">
                 <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask a question..."
                    disabled={isLoading}
                    className="w-full bg-gray-100 border border-gray-200 rounded-full py-2 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button type="submit" disabled={isLoading || !input.trim()} className="w-8 h-8 flex-shrink-0 bg-blue-600 text-white rounded-full flex items-center justify-center disabled:bg-gray-400">
                    <ChevronDownIcon className="w-5 h-5 transform -rotate-90" />
                </button>
            </form>
        </div>
    );
};


export const LoginPage: React.FC = () => {
  const { user, login, isGuest, loginAsGuest } = useAuth();
  const [prompt, setPrompt] = useState('');
  const [isBotOpen, setIsBotOpen] = useState(false);
  const googleButtonContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user || isGuest) {
        window.location.hash = '#/dashboard/projects';
        return;
    }

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
        // Prevent rendering the button multiple times on fast refresh
        googleButtonContainerRef.current.innerHTML = '';
        window.google.accounts.id.renderButton(
          googleButtonContainerRef.current,
          { 
            theme: 'outline', 
            size: 'large', 
            type: 'standard', 
            text: 'continue_with',
            shape: 'pill',
          }
        );
      }
      
      // Also show the one-tap prompt for a seamless sign-in experience for returning users
      window.google.accounts.id.prompt();
    }
  }, [user, isGuest, login]);
  
  const handleSignInClick = () => {
    if (window.google) {
        window.google.accounts.id.prompt();
    }
  };

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
        sessionStorage.setItem('initialPrompt', prompt);
        window.location.hash = '#/builder';
    }
  }

  return (
    <div className="bg-transparent text-gray-800 min-h-screen font-sans overflow-x-hidden">
        <header className="fixed top-0 left-0 right-0 bg-[#F8F7F4]/80 backdrop-blur-lg z-20 border-b border-gray-200">
            <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
                <a href="#/" className="flex items-center gap-2">
                    <img src="https://i.ibb.co/svVCNWvV/Google-AI-Studio-2025-09-29-T00-23-01-230-Z-modified.png" alt="Silo Build Logo" className="h-8 w-auto" />
                    <span className="text-xl font-bold">Silo Build</span>
                </a>
                {user ? (
                    <div className="flex items-center gap-4">
                         <a href="#/dashboard/projects" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Dashboard</a>
                         <div className="flex items-center gap-2">
                            <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full" />
                            <span className="text-sm font-semibold hidden sm:block">{user.name}</span>
                        </div>
                    </div>
                ) : (
                    <button onClick={handleSignInClick} className="bg-blue-600 text-white px-4 py-2 text-sm rounded-full font-semibold hover:bg-blue-700 transition-colors">
                        Sign In
                    </button>
                )}
            </nav>
        </header>

        <main>
             <section className="pt-32 pb-20 text-center relative overflow-hidden">
                <div className="container mx-auto px-6 relative">
                    <h1 className="text-5xl md:text-7xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-600 leading-tight">
                        From Prompt to Product, Instantly.
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
                        Describe your app, and let our AI generate production-ready code in seconds. Go from idea to deployed MVP faster than ever before.
                    </p>
                    <div className="flex justify-center">
                        {user || isGuest ? (
                            <div className="w-full max-w-3xl">
                                <form onSubmit={handlePromptSubmit}>
                                    <div className="relative bg-white/50 border border-gray-200 rounded-2xl shadow-2xl p-4 backdrop-blur-lg">
                                        <label className="text-left block text-sm font-medium text-gray-700 mb-2 px-2">Ask Silo Build to build a prototype of...</label>
                                        <textarea
                                            value={prompt}
                                            onChange={(e) => setPrompt(e.target.value)}
                                            placeholder="a pomodoro timer with a clean, minimalist interface and a task list"
                                            className="w-full h-24 bg-transparent resize-none text-gray-900 text-base placeholder-gray-500 focus:outline-none p-2"
                                        />
                                        <button type="submit" disabled={!prompt.trim()} className="absolute bottom-4 right-4 bg-blue-600 text-white rounded-full p-2.5 flex items-center justify-center transition-all duration-300 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed">
                                            <ChevronDownIcon className="w-6 h-6 transform -rotate-90" />
                                        </button>
                                    </div>
                                </form>
                                <div className="flex items-center justify-center gap-2 mt-6 text-sm flex-wrap">
                                    <span className="text-gray-500">Try one →</span>
                                    <button onClick={() => setPrompt('a landing page for a new SaaS product')} className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-full shadow-sm hover:bg-gray-100 transition-colors">Landing page</button>
                                    <button onClick={() => setPrompt('a personal portfolio website to showcase my projects')} className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-full shadow-sm hover:bg-gray-100 transition-colors">Personal website</button>
                                    <button onClick={() => setPrompt('a SaaS app for tracking habits')} className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-full shadow-sm hover:bg-gray-100 transition-colors">SaaS App</button>
                                </div>
                            </div>
                        ) : (
                             <div className="w-full max-w-sm bg-white/50 border border-gray-200 rounded-2xl shadow-2xl p-8 backdrop-blur-lg text-center">
                                <h3 className="text-2xl font-bold mb-4">Ready to Build?</h3>
                                <p className="text-gray-600 mb-6">Sign in to sync your projects across devices or continue as a guest.</p>
                                <div className="flex justify-center">
                                    <div ref={googleButtonContainerRef}></div>
                                </div>
                                <div className="relative flex py-5 items-center">
                                    <div className="flex-grow border-t border-gray-300"></div>
                                    <span className="flex-shrink mx-4 text-gray-400 text-sm">OR</span>
                                    <div className="flex-grow border-t border-gray-300"></div>
                                </div>
                                <button
                                    onClick={loginAsGuest}
                                    className="w-full text-center px-4 py-2 text-sm font-medium bg-white hover:bg-gray-100 border border-gray-300 text-gray-800 rounded-full transition-colors"
                                >
                                    Continue as Guest
                                </button>
                                <p className="text-xs text-gray-500 mt-2">Projects will be saved on this device only.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

             <section id="showcase" className="py-20 bg-transparent border-y border-gray-200">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold">Built with Silo Build</h2>
                        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">From simple utilities to complex dashboards, generate functional prototypes in minutes.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-md flex flex-col">
                            <div className="aspect-video bg-gray-900 rounded-md overflow-hidden flex-1">
                                <iframe
                                    srcDoc={kanbanPreview}
                                    title="Kanban Board Preview"
                                    className="w-full h-full border-0"
                                    sandbox="allow-scripts"
                                />
                            </div>
                            <h3 className="font-semibold text-center text-gray-700 mt-3">Kanban Board</h3>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-md flex flex-col">
                           <div className="aspect-video bg-indigo-900 rounded-md overflow-hidden flex-1">
                                <iframe
                                    srcDoc={musicPlayerPreview}
                                    title="Music Player Preview"
                                    className="w-full h-full border-0"
                                    sandbox="allow-scripts"
                                />
                            </div>
                            <h3 className="font-semibold text-center text-gray-700 mt-3">Music Player</h3>
                        </div>
                         <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-md flex flex-col">
                           <div className="aspect-video bg-slate-100 rounded-md overflow-hidden flex-1">
                                <iframe
                                    srcDoc={dashboardPreview}
                                    title="SaaS Dashboard Preview"
                                    className="w-full h-full border-0"
                                    sandbox="allow-scripts"
                                />
                            </div>
                             <h3 className="font-semibold text-center text-gray-700 mt-3">SaaS Dashboard</h3>
                        </div>
                    </div>
                </div>
            </section>


            <section id="how-it-works" className="py-24">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h3 className="text-5xl font-bold text-gray-900">How It Works</h3>
                        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Go from prompt to product with a simple, conversational workflow. Build, publish, and iterate all in one place.</p>
                    </div>
                    
                    <div className="max-w-6xl mx-auto space-y-8">
                        {/* Build Card */}
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2 items-stretch">
                            <div className="p-12 flex flex-col justify-center">
                                <h4 className="text-4xl font-bold text-indigo-900">Build</h4>
                                <p className="mt-4 text-gray-600 leading-relaxed">
                                    Build apps and websites by chatting with AI. No code required. It really just works.
                                </p>
                            </div>
                            <div className="p-8 h-full bg-gradient-to-br from-orange-400 to-yellow-300 flex items-center justify-center min-h-[300px] md:min-h-0 rounded-b-3xl md:rounded-bl-none md:rounded-r-3xl">
                                <div className="w-full max-w-sm bg-white rounded-full shadow-xl p-4 flex items-center text-gray-600 font-medium">
                                    <span>Build me a</span>
                                    <span className="inline-block w-0.5 h-5 bg-gray-800 animate-pulse ml-1"></span>
                                </div>
                            </div>
                        </div>

                        {/* Publish Card */}
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2 items-stretch">
                            <div className="p-8 h-full bg-gradient-to-br from-cyan-400 to-teal-400 flex items-center justify-center order-first md:order-first min-h-[300px] md:min-h-0 rounded-t-3xl md:rounded-tr-none md:rounded-l-3xl">
                               <button className="bg-white rounded-xl shadow-xl px-8 py-4 flex items-center gap-3 font-semibold text-gray-800 text-lg">
                                    <UploadIcon className="w-6 h-6" />
                                    <span>Publish</span>
                                </button>
                            </div>
                             <div className="p-12 flex flex-col justify-center">
                                <h4 className="text-4xl font-bold text-indigo-900">Publish</h4>
                                <p className="mt-4 text-gray-600 leading-relaxed">
                                    Deploy your apps in 1 click. Use a provided domain or bring your own.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section id="coming-soon" className="py-20 bg-gray-900 text-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h3 className="text-5xl font-bold">Coming Soon: Silo Build V1.5</h3>
                        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                            A quantum leap forward. We're rebuilding from the ground up for unprecedented speed, smarter AI, and the features you've been asking for.
                        </p>
                    </div>
                    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
                        <div className="flex items-start gap-4">
                            <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/30">
                                <UsersIcon className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <h4 className="font-bold">Real-time Collaboration</h4>
                                <p className="text-sm text-gray-400">Build together in real-time with your team, just like in a Google Doc.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/30">
                                <BugIcon className="w-6 h-6 text-green-400" />
                            </div>
                            <div>
                                <h4 className="font-bold">AI-Powered Debugging</h4>
                                <p className="text-sm text-gray-400">Find and fix bugs conversationally. Just describe the problem and let the AI handle it.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/30">
                                <CodeIcon className="w-6 h-6 text-purple-400" />
                            </div>
                            <div>
                                <h4 className="font-bold">Expanded Tech Stacks</h4>
                                <p className="text-sm text-gray-400">Support for more frameworks like Next.js and backend languages like Python and Go.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/30">
                                <PaintBrushIcon className="w-6 h-6 text-yellow-400" />
                            </div>
                            <div>
                                <h4 className="font-bold">Theme & Component Studio</h4>
                                <p className="text-sm text-gray-400">Visually design your theme and create reusable components with AI assistance.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="features" className="py-20 bg-transparent border-y border-gray-200">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h3 className="text-4xl font-bold">A New Way to Build Software</h3>
                        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">Everything you need to go from concept to code, powered by AI.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        <FeatureCard icon={<SparklesIcon />} title="AI-Powered Generation" description="Just describe the app you want, and watch as the AI scaffolds a complete multi-file React application with TypeScript." />
                        <FeatureCard icon={<ChatIcon />} title="Conversational Refinement" description="Your app isn't static. Chat with the AI to make changes, add features, or fix bugs, iterating as you go." />
                        <FeatureCard icon={<LayoutIcon />} title="Live Code & Preview" description="See your generated code and a live, interactive preview of your app side-by-side, updating in real-time." />
                        <FeatureCard icon={<MobileIcon />} title="PWA-Ready by Default" description="Every app is generated as a Progressive Web App, complete with a manifest and service worker for offline capabilities." />
                        <FeatureCard icon={<DownloadIcon />} title="Full Project Download" description="Receive a complete project with a logical file structure. Download a ZIP file and you're ready to run locally." />
                        <FeatureCard icon={<DatabaseIcon />} title="Service Integrations" description="The AI can automatically integrate with services like Supabase and Stripe if you provide your keys, wiring them up for you." />
                    </div>
                </div>
            </section>

            <section id="workflow" className="py-20 bg-transparent border-t border-gray-200">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h3 className="text-4xl font-bold">From Idea to Live URL</h3>
                        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                            Silo Build streamlines your entire development workflow, not just the initial code generation.
                        </p>
                    </div>
                    <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-center relative">
                        {/* Dashed line connecting steps */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-px -translate-y-1/2">
                            <svg className="w-full" height="2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path strokeDasharray="8 8" d="M0 1H1000" stroke="#CBD5E1" strokeWidth="2"/>
                            </svg>
                        </div>
                        <div className="relative bg-[#F8F7F4] p-6 rounded-lg z-10">
                            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 border-4 border-[#F8F7F4]">
                                <DownloadIcon className="w-8 h-8 text-blue-600" />
                            </div>
                            <h4 className="font-bold text-lg">1. Generate & Download</h4>
                            <p className="text-sm text-gray-600 mt-1">
                                Get a complete, well-structured project as a ZIP file, ready for local development.
                            </p>
                        </div>
                        <div className="relative bg-[#F8F7F4] p-6 rounded-lg z-10">
                            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 border-4 border-[#F8F7F4]">
                                <GithubIcon className="w-8 h-8 text-black" />
                            </div>
                            <h4 className="font-bold text-lg">2. Push to GitHub</h4>
                            <p className="text-sm text-gray-600 mt-1">
                                Create a new repository and push your project to GitHub with a single click.
                            </p>
                        </div>
                        <div className="relative bg-[#F8F7F4] p-6 rounded-lg z-10">
                            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 border-4 border-[#F8F7F4]">
                                <VercelIcon className="h-7 text-black" />
                            </div>
                            <h4 className="font-bold text-lg">3. Deploy with Vercel</h4>
                            <p className="text-sm text-gray-600 mt-1">
                                Go live instantly with our seamless Vercel deployment integration (simulation).
                            </p>
                        </div>
                    </div>
                </div>
            </section>

             <section id="for-who" className="py-20 bg-transparent">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h3 className="text-4xl font-bold">Built for Modern Builders</h3>
                        <p className="text-gray-600 mt-2">Whether you're a seasoned developer or just starting, Silo Build accelerates your workflow.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <FeatureCard icon={<SparklesIcon />} title="Indie Hackers & Founders" description="Go from idea to MVP in record time. Validate your concepts without writing weeks of boilerplate code." />
                        <FeatureCard icon={<PaintBrushIcon />} title="Designers Who Code" description="Bring your designs to life effortlessly. Describe your UI and get functional React components in seconds." />
                        <FeatureCard icon={<LayoutIcon />} title="Teams & Enterprises" description="Rapidly prototype new features and internal tools. Free up your engineers to focus on complex problems." />
                    </div>
                </div>
            </section>

            <section id="collaboration" className="py-20 bg-transparent border-t border-gray-200">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className="text-4xl font-bold">Built for Collaboration</h3>
                            <p className="text-gray-600 mt-4 leading-relaxed">
                                Invite your team, share projects, and build together. Silo Build makes it easy to collaborate on prototypes and internal tools, keeping everyone in sync.
                            </p>
                            <ul className="mt-6 space-y-3">
                                <li className="flex items-start gap-3">
                                    <UsersIcon className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold">Team Management</h4>
                                        <p className="text-sm text-gray-500">Create teams, invite members, and manage roles from a simple dashboard.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <LayoutIcon className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold">Shared Projects</h4>
                                        <p className="text-sm text-gray-500">All team members can access and contribute to shared projects, ensuring consistent development.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-lg">
                            <h4 className="font-semibold mb-3">Project Members</h4>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" className="w-10 h-10 rounded-full" />
                                        <div>
                                            <p className="font-medium text-sm">Sarah L.</p>
                                            <p className="text-xs text-gray-500">sara.l@example.com</p>
                                        </div>
                                    </div>
                                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">Owner</span>
                                </div>
                                 <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="w-10 h-10 rounded-full" />
                                        <div>
                                            <p className="font-medium text-sm">Mike R.</p>
                                            <p className="text-xs text-gray-500">mike.r@example.com</p>
                                        </div>
                                    </div>
                                    <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full font-semibold">Member</span>
                                </div>
                                 <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="User" className="w-10 h-10 rounded-full" />
                                        <div>
                                            <p className="font-medium text-sm">Jessica P.</p>
                                            <p className="text-xs text-gray-500">jess.p@example.com</p>
                                        </div>
                                    </div>
                                    <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full font-semibold">Member</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="integrations" className="py-20 bg-transparent border-t border-gray-200">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <p className="text-sm font-bold text-blue-600 mb-2">INTEGRATIONS</p>
                        <h3 className="text-4xl font-bold">Works With Your Favorite Tools</h3>
                        <p className="text-gray-600 mt-2">The AI can directly use your API keys to build full-stack applications.</p>
                    </div>
                    <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 text-gray-500">
                        <GeminiLogo className="h-8" />
                        <GithubIcon className="h-8 w-8 text-gray-800" />
                        <SupabaseLogo className="h-8" />
                        <StripeLogo className="h-8 text-gray-700" />
                        <VercelIcon className="h-7 text-black" />
                    </div>
                </div>
            </section>

            <section id="testimonials" className="py-20 bg-transparent border-y border-gray-200">
                 <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h3 className="text-4xl font-bold">Loved by Developers</h3>
                        <p className="text-gray-600 mt-2">See what others are saying about the AI App Builder.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <TestimonialCard 
                            quote="This tool is a game-changer. I went from a rough idea to a deployed PWA in an afternoon. The conversational edits feel like magic."
                            name="Sarah L."
                            title="Indie Developer"
                            avatar="https://randomuser.me/api/portraits/women/44.jpg"
                        />
                         <TestimonialCard 
                            quote="As a designer who codes, this helps me bridge the gap beautifully. I can describe UI/UX concepts and get functional React components instantly."
                            name="Mike R."
                            title="UI/UX Designer"
                            avatar="https://randomuser.me/api/portraits/men/32.jpg"
                        />
                         <TestimonialCard 
                            quote="The boilerplate code it generates is surprisingly clean. It sets up PWAs and integrates with Supabase flawlessly, saving hours of setup time."
                            name="Jessica P."
                            title="Frontend Engineer"
                            avatar="https://randomuser.me/api/portraits/women/65.jpg"
                        />
                    </div>
                </div>
            </section>

            <section id="pricing" className="py-20 bg-transparent border-t border-gray-200">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h3 className="text-4xl font-bold">Simple, Transparent Pricing</h3>
                        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                            Start for free and upgrade when you're ready. No hidden fees.
                        </p>
                    </div>
                    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-start">
                        <div className="border border-gray-200 rounded-2xl p-8">
                            <h4 className="text-lg font-semibold">Hobby</h4>
                            <p className="text-gray-500 mt-2">Perfect for personal projects and getting started.</p>
                            <p className="mt-6 text-4xl font-bold">
                                Free
                            </p>
                            <p className="text-gray-500 mt-1">Bring your own API key</p>
                            <ul className="mt-8 space-y-3 text-sm text-gray-700">
                                <li className="flex items-center gap-2"><CheckIcon className="w-5 h-5 text-green-500"/> Unlimited Projects</li>
                                <li className="flex items-center gap-2"><CheckIcon className="w-5 h-5 text-green-500"/> Full Code Download</li>
                                <li className="flex items-center gap-2"><CheckIcon className="w-5 h-5 text-green-500"/> Community Support</li>
                            </ul>
                            <a href="#/builder" className="w-full mt-8 bg-gray-100 text-gray-800 py-2.5 rounded-lg font-semibold hover:bg-gray-200 transition-colors block text-center">
                                Get Started
                            </a>
                        </div>
                        <div className="border-2 border-blue-600 rounded-2xl p-8 relative shadow-2xl
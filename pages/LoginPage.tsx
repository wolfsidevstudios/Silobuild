import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { ChatIcon, LayoutIcon, MobileIcon, DownloadIcon, DatabaseIcon, SparklesIcon, CodeIcon, ChevronDownIcon, SupabaseLogo, StripeLogo, GithubIcon, GeminiLogo, NetlifyIcon, PaintBrushIcon, UploadIcon, CheckIcon, UsersIcon, HelpCircleIcon, CloseIcon, BugIcon, AgentIcon, CloudUploadIcon } from '../components/icons';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Settings } from '../types';
import { generateHelpBotResponseStream } from '../services/geminiService';
import { Spinner } from '../components/Spinner';
import { SupabaseAuth } from '../components/SupabaseAuth';

const GOOGLE_CLIENT_ID = '208835173647-6e2is6g6j3338hj4dq2reebcluk694jm.apps.googleusercontent.com';

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


declare global {
  interface Window {
    google: typeof import('google-one-tap');
  }
}

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
  const { user, loginWithGoogle, isGuest, loginAsGuest } = useAuth();
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
            loginWithGoogle(response.credential);
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
  }, [user, isGuest, loginWithGoogle]);
  
  const handleSignInClick = () => {
    // This function can be used to trigger sign-in if needed, for now the UI shows all options.
    // If you have a single "Sign In" button, you could show a modal with all providers here.
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
                    <span className="text-xl font-bold">Silo Build <span className="text-xs align-top bg-blue-100 text-blue-600 font-bold px-2 py-0.5 rounded-full">2.0</span></span>
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
                        Build with Codepilot v1.
                    </h1>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-700 leading-tight">Powerful apps from a single prompt.</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
                        Describe your app, and let Codepilot v1, our next-generation AI agent, generate complete, production-ready code in seconds. Experience a new era of AI-powered development.
                    </p>
                    <div className="flex justify-center">
                        {user || isGuest ? (
                            <div className="w-full max-w-3xl">
                                <form onSubmit={handlePromptSubmit}>
                                    <div className="relative bg-white/50 border border-gray-200 rounded-2xl shadow-2xl p-4 backdrop-blur-lg">
                                        <label className="text-left block text-sm font-medium text-gray-700 mb-2 px-2">Ask Codepilot to build a prototype of...</label>
                                        <textarea
                                            value={prompt}
                                            onChange={(e) => setPrompt(e.target.value)}
                                            placeholder="a modern SaaS dashboard with a sidebar, charts, and a data table for user management"
                                            className="w-full h-24 bg-transparent resize-none text-gray-900 text-base placeholder-gray-500 focus:outline-none p-2"
                                        />
                                        <button type="submit" disabled={!prompt.trim()} className="absolute bottom-4 right-4 bg-blue-600 text-white rounded-full p-2.5 flex items-center justify-center transition-all duration-300 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed">
                                            <ChevronDownIcon className="w-6 h-6 transform -rotate-90" />
                                        </button>
                                    </div>
                                </form>
                                <div className="flex items-center justify-center gap-2 mt-6 text-sm flex-wrap">
                                    <span className="text-gray-500">Try one →</span>
                                    <button onClick={() => setPrompt('a kanban board with draggable cards and multiple columns')} className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-full shadow-sm hover:bg-gray-100 transition-colors">Kanban Board</button>
                                    <button onClick={() => setPrompt('a movie search app using the TMDB API')} className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-full shadow-sm hover:bg-gray-100 transition-colors">Movie Finder</button>
                                    <button onClick={() => setPrompt('a real-time chat application')} className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-full shadow-sm hover:bg-gray-100 transition-colors">Chat App</button>
                                </div>
                            </div>
                        ) : (
                            <div className="w-full max-w-sm bg-white/50 border border-gray-200 rounded-2xl shadow-2xl p-8 backdrop-blur-lg text-center">
                                <h3 className="text-2xl font-bold mb-4">Ready to Build?</h3>
                                <p className="text-gray-600 mb-6">Sign in to sync your projects or continue as a guest.</p>
                                
                                <SupabaseAuth />

                                <div className="relative flex py-5 items-center">
                                    <div className="flex-grow border-t border-gray-300"></div>
                                    <span className="flex-shrink mx-4 text-gray-400 text-xs">OR</span>
                                    <div className="flex-grow border-t border-gray-300"></div>
                                </div>

                                <div className="flex justify-center" ref={googleButtonContainerRef}></div>
                                
                                <p className="text-xs text-gray-500 mt-6">
                                    No account? <button onClick={loginAsGuest} className="font-semibold text-blue-600 hover:underline">Continue as a guest</button> to try it out.
                                </p>
                            </div>
                        )}
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
                        <FeatureCard icon={<AgentIcon />} title="Silo AI Integration" description="Incorporate generative AI into your app. Prompt for a chatbot, provide a Gemini API key, and Codepilot will build it in for client-side use." />
                        <FeatureCard icon={<MobileIcon />} title="PWA-Ready by Default" description="Every app is generated as a Progressive Web App, complete with a manifest and service worker for offline capabilities." />
                        <FeatureCard icon={<DownloadIcon />} title="Full Project Download" description="Receive a complete project with a logical file structure. Download a ZIP file and you're ready to run locally." />
                        <FeatureCard icon={<DatabaseIcon />} title="Service Integrations" description="The AI can automatically integrate with services like Supabase and Stripe if you provide your keys, wiring them up for you." />
                    </div>
                </div>
            </section>

            <section id="silo-ai-announcement" className="py-20 bg-gray-900 text-white">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <h2 className="text-4xl font-bold">The Next Evolution: Silo AI Tools</h2>
                    <p className="mt-4 text-lg text-gray-300">Seamlessly integrating the power of Google's Gemini AI.</p>
                    
                    <div className="mt-12 text-left space-y-6 text-gray-300 leading-relaxed bg-white/5 p-8 rounded-xl border border-white/10">
                        <p>Our platform, Silo Build, has always been about empowering creators with a simple and intuitive way to bring their ideas to life. But we recognized a key challenge: integrating advanced AI features was often a technical hurdle, requiring users to navigate complex APIs and backend services.</p>
                        <p className="font-bold text-white">That's why we're thrilled to announce the next evolution of our platform: Silo AI Tools, powered by Gemini AI.</p>
                        <div className="flex justify-center py-4">
                            <GeminiLogo className="h-10 text-white" />
                        </div>
                        <p>Silo AI Tools is not a separate product—it's a game-changing set of built-in capabilities that seamlessly integrates the power of Google's Gemini AI directly into your Silo Build experience. This powerful synergy allows you to go from a simple idea to a fully functional, AI-powered app in seconds, without ever needing to touch a complex backend like Supabase.</p>
                        <p>With a single click, you can now add the most advanced large language models to your application. Want to build a chatbot? A content generator? A tool that can analyze and summarize text? Silo AI Tools handles all the heavy lifting for you, so you can focus on the user experience and the core functionality of your app.</p>
                        
                        <div className="pt-6 border-t border-white/10">
                            <h3 className="text-2xl font-semibold text-white text-center">Coming Soon: Silo Cloud</h3>
                            <div className="flex justify-center py-4">
                                <CloudUploadIcon className="w-12 h-12 text-blue-400" />
                            </div>
                            <p>But we're just getting started. In the coming months, we will be rolling out Silo Cloud. This revolutionary feature will use AI to automatically add backend functionality to your apps, create and manage databases, and handle all the complexities of deployment. This means you will soon be able to deploy your AI-powered apps directly to the Apple App Store, the Google Play Store, our own upcoming Silo Labs Marketplace, and even to Google Cloud, all with the simplicity and speed you've come to expect from Silo Build.</p>
                        </div>
                        
                        <p className="mt-6 text-center italic text-gray-400">We believe that the power of AI should be accessible to everyone. Silo Build, with its new Silo AI Tools and upcoming Silo Cloud features, is built for innovators, entrepreneurs, and creators who want to build the future without the technical roadblocks of the past.</p>
                    </div>
                </div>
            </section>

            <section id="silo-ai" className="py-20 bg-gray-50 border-y border-gray-200">
                <div className="container mx-auto px-6 text-center">
                    <h3 className="text-4xl font-bold">Introducing Silo AI</h3>
                    <p className="text-gray-600 mt-4 max-w-3xl mx-auto text-lg">
                        Effortlessly embed powerful generative AI features directly into your applications, no backend required. With Silo AI, you can build chatbots, content generators, summarizers, and more, all running on the client-side.
                    </p>
                    <div className="mt-12 max-w-4xl mx-auto text-left grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <h4 className="font-bold text-lg text-gray-900"><span className="text-blue-600 font-black text-2xl mr-2">1.</span>Prompt for a Feature</h4>
                            <p className="mt-2 text-sm text-gray-600">
                                Simply describe the AI feature you want in the chat. For example, "Add a chatbot to answer user questions" or "Create a tool to summarize articles from a URL".
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <h4 className="font-bold text-lg text-gray-900"><span className="text-blue-600 font-black text-2xl mr-2">2.</span>Provide Your API Key</h4>
                            <p className="mt-2 text-sm text-gray-600">
                                Codepilot will recognize your request and ask for the necessary API key (like a Google Gemini key). Your key is only used for your generated app.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <h4 className="font-bold text-lg text-gray-900"><span className="text-blue-600 font-black text-2xl mr-2">3.</span>Get Functional Code</h4>
                            <p className="mt-2 text-sm text-gray-600">
                                Codepilot will generate the complete, functional code that integrates the AI feature, ready for you to download and use.
                            </p>
                        </div>
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
                                <NetlifyIcon className="h-7" />
                            </div>
                            <h4 className="font-bold text-lg">3. Deploy with Netlify</h4>
                            <p className="text-sm text-gray-600 mt-1">
                                Go live instantly with our seamless Netlify deployment integration.
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
                        <NetlifyIcon className="h-7" />
                    </div>
                </div>
            </section>

            <section id="dear-silo" className="py-20 bg-gray-50 border-y border-gray-200">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-center text-4xl font-bold text-gray-900 mb-4">A Letter to Silo</h2>
                        <div className="bg-white p-8 sm:p-12 rounded-lg border border-gray-200 shadow-xl mt-10">
                            <p className="text-gray-700 leading-relaxed mb-6">Dear Silo Build Team,</p>
                            <p className="text-gray-700 leading-relaxed mb-6">
                                I had an idea for a small non-profit app to connect local volunteers with community gardens. I'm not a professional developer, and the thought of spending months learning or hiring someone was daunting. I stumbled upon Silo Build, and honestly, I was skeptical.
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-6">
                                Within a single weekend, I went from a simple prompt—"build an app to list community gardens and let volunteers sign up for events"—to a fully functional, deployed prototype. I was able to show this to local community leaders, and the visual, working app made all the difference. We secured a small grant based on that prototype alone.
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-8">
                                Your tool didn't just build an app for me; it brought my project to life when it was just an idea. You've empowered someone outside the traditional tech world to make a real impact. Thank you for that.
                            </p>
                            <p className="text-gray-800 font-semibold">Sincerely,</p>
                            <p className="font-serif italic text-xl text-gray-900">Alex Johnson</p>
                            <p className="text-sm text-gray-600">Founder, GardenConnect</p>
                        </div>
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
                            <a href="#/builder" className="w-full mt-8 bg-gray-100 text-gray-800 py-2.5 rounded-full font-semibold hover:bg-gray-200 transition-colors block text-center">
                                Get Started
                            </a>
                        </div>
                        <div className="border-2 border-blue-600 rounded-2xl p-8 relative shadow-2xl">
                            <div className="absolute top-0 -translate-y-1/2 bg-blue-600 text-white px-3 py-1 text-xs font-semibold rounded-full">
                                Popular
                            </div>
                            <h4 className="text-lg font-semibold">Pro</h4>
                            <p className="text-gray-500 mt-2">For professionals and teams who need more power.</p>
                            <p className="mt-6 text-4xl font-bold">
                                $20<span className="text-lg font-medium text-gray-500">/mo</span>
                            </p>
                            <p className="text-gray-500 mt-1">Includes all Hobby features, plus:</p>
                            <ul className="mt-8 space-y-3 text-sm text-gray-700">
                                <li className="flex items-center gap-2"><CheckIcon className="w-5 h-5 text-green-500"/> AI-Powered Debugging</li>
                                <li className="flex items-center gap-2"><CheckIcon className="w-5 h-5 text-green-500"/> Team Collaboration</li>
                                <li className="flex items-center gap-2"><CheckIcon className="w-5 h-5 text-green-500"/> Priority Support</li>
                            </ul>
                            <a href="#/dashboard" className="w-full mt-8 bg-blue-600 text-white py-2.5 rounded-full font-semibold hover:bg-blue-700 transition-colors block text-center">
                                Go Pro
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section id="faq" className="py-20 bg-transparent">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-12">
                        <h3 className="text-4xl font-bold">Frequently Asked Questions</h3>
                    </div>
                    <div className="space-y-2">
                        <FaqItem
                            question="Where do I get a Google Gemini API key?"
                            answer="You can get a Gemini API key from Google AI Studio. Visit the Google AI for Developers website, sign in with your Google account, and create a new API key in the dashboard."
                        />
                        <FaqItem
                            question="Are my API keys and project data secure?"
                            answer="Yes. All your data, including API keys and project files, is stored exclusively in your browser's local storage. It is never sent to our servers, ensuring your information remains private and under your control."
                        />
                        <FaqItem
                            question="How are my projects saved?"
                            answer="Projects are saved directly in your browser's local storage. This means they are tied to the browser you are using. If you clear your browser's data or switch to a different browser or device, your projects will not be available."
                        />
                        <FaqItem
                            question="What technology stacks can the AI generate?"
                            answer="Silo Build supports generating applications using React, Vue, Svelte, and Node.js (with Express), all using TypeScript. It can also generate simple, single-file vanilla HTML, CSS, and JavaScript applications with Tailwind CSS."
                        />
                    </div>
                </div>
            </section>

            <section id="cta" className="py-20 bg-transparent border-t border-gray-200">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold">Ready to Start Building?</h2>
                    <p className="text-gray-600 mt-4 max-w-xl mx-auto">
                        Sign up for free and turn your ideas into applications today. No credit card required.
                    </p>
                    <div className="mt-8">
                         <a href="#/dashboard" className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-700 transition-colors">
                            Start Building for Free
                        </a>
                    </div>
                </div>
            </section>

        </main>

        <footer className="bg-transparent border-t border-gray-200">
            <div className="container mx-auto px-6 py-8 text-center text-sm text-gray-500">
                <p>&copy; {new Date().getFullYear()} Silo Build. All rights reserved.</p>
                <div className="mt-4 flex justify-center gap-4">
                    <a href="#/terms" className="hover:underline">Terms of Service</a>
                    <span>&middot;</span>
                    <a href="#/privacy" className="hover:underline">Privacy Policy</a>
                </div>
            </div>
        </footer>

        <button 
            onClick={() => setIsBotOpen(true)}
            className="fixed bottom-5 right-5 w-16 h-16 bg-blue-600 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-blue-700 transition-transform hover:scale-110"
        >
            <HelpCircleIcon className="w-8 h-8"/>
        </button>
        {isBotOpen && <HelpBot onClose={() => setIsBotOpen(false)} />}
    </div>
  );
};
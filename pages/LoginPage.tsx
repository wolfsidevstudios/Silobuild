import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { ChatIcon, LayoutIcon, MobileIcon, DownloadIcon, DatabaseIcon, SparklesIcon, SendIcon, EditIcon, CodeIcon } from '../components/icons';

const GOOGLE_CLIENT_ID = '208835173647-6e2is6g6j3338hj4dq2reebcluk694jm.apps.googleusercontent.com';

declare global {
  interface Window {
    google: typeof import('google-one-tap');
  }
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="bg-white/5 p-6 rounded-lg border border-white/10 transition-all duration-300 hover:border-white/20 hover:bg-white/10">
        <div className="text-blue-400 mb-4">{React.cloneElement(icon as React.ReactElement, { className: 'w-8 h-8' })}</div>
        <h4 className="text-lg font-bold mb-2 text-white">{title}</h4>
        <p className="text-gray-400 text-sm">{description}</p>
    </div>
);

const HowItWorksCard: React.FC<{ icon: React.ReactNode; step: string; title: string; description: string }> = ({ icon, step, title, description }) => (
    <div className="bg-white/5 p-6 rounded-lg border border-white/10 text-center">
        <div className="inline-flex items-center justify-center bg-blue-500/10 text-blue-400 rounded-full w-12 h-12 mb-4 border border-blue-500/20">{icon}</div>
        <p className="text-sm font-bold text-blue-400 mb-2">{step}</p>
        <h4 className="text-xl font-bold mb-2 text-white">{title}</h4>
        <p className="text-gray-400 text-sm">{description}</p>
    </div>
);

const TestimonialCard: React.FC<{ quote: string; name: string; title: string; avatar: string }> = ({ quote, name, title, avatar }) => (
    <div className="bg-white/5 p-6 rounded-lg border border-white/10">
        <p className="text-gray-300 mb-4 italic">"{quote}"</p>
        <div className="flex items-center gap-3">
            <img src={avatar} alt={name} className="w-10 h-10 rounded-full" />
            <div>
                <p className="font-semibold text-white">{name}</p>
                <p className="text-sm text-gray-400">{title}</p>
            </div>
        </div>
    </div>
);


export const LoginPage: React.FC = () => {
  const { user, login } = useAuth();
  const [prompt, setPrompt] = useState('');
  const googleButtonContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user && window.google) {
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
            theme: 'filled_black', 
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
  }, [user, login]);
  
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
    <div className="bg-black text-white min-h-screen font-sans overflow-x-hidden">
        <header className="fixed top-0 left-0 right-0 bg-black/30 backdrop-blur-lg z-20 border-b border-white/10">
            <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
                <a href="#/" className="text-xl font-bold">AI App Builder</a>
                {user ? (
                    <div className="flex items-center gap-4">
                         <a href="#/dashboard/projects" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Dashboard</a>
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
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
                
                <div className="container mx-auto px-6 relative">
                    <h2 className="text-5xl md:text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 leading-tight">
                        Build & Deploy React Apps with AI
                    </h2>
                    <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                        Describe your application in plain English, and our AI will generate a complete, production-ready application in seconds. From idea to PWA in minutes.
                    </p>
                    <div className="flex justify-center">
                        {user ? (
                            <form onSubmit={handlePromptSubmit} className="w-full max-w-2xl mx-auto">
                                <div className="relative">
                                    <textarea
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                        placeholder="e.g., a pomodoro timer with a clean, minimalist interface and a task list..."
                                        className="w-full h-32 resize-none bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl p-4 pr-16 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                                    />
                                    <button type="submit" disabled={!prompt.trim()} className="absolute top-4 right-4 bg-blue-500 text-white rounded-md p-2.5 flex items-center justify-center transition-all duration-300 hover:bg-blue-600 disabled:bg-gray-500 disabled:cursor-not-allowed">
                                        <SendIcon />
                                    </button>
                                </div>
                            </form>
                        ) : (
                             <div className="flex flex-col items-center gap-6 w-full max-w-2xl">
                                <div className="w-full bg-white/5 border border-dashed border-white/20 rounded-lg p-8 text-center">
                                    <h3 className="text-xl font-bold mb-4">Ready to Build?</h3>
                                    <p className="text-gray-400 mb-6">Sign in with your Google account to start creating.</p>
                                    <div className="flex justify-center">
                                        <div ref={googleButtonContainerRef}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
            
            <section id="how-it-works" className="py-20 bg-black">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h3 className="text-4xl font-bold">How It Works</h3>
                        <p className="text-gray-400 mt-2">Get your app running in three simple steps.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <HowItWorksCard icon={<EditIcon />} step="STEP 1" title="Describe Your Idea" description="Start with a simple prompt. Describe the app you want to build, its features, and the look and feel." />
                        <HowItWorksCard icon={<SparklesIcon />} step="STEP 2" title="Generate The Code" description="Our AI analyzes your prompt and generates a complete, multi-file application with clean, production-ready code." />
                        <HowItWorksCard icon={<ChatIcon />} step="STEP 3" title="Iterate & Refine" description="Request changes and new features in the chat. The AI will update the code, allowing you to refine your app." />
                    </div>
                </div>
            </section>

            <section id="features" className="py-20 bg-white/5 border-y border-white/10">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h3 className="text-4xl font-bold">A New Way to Build Software</h3>
                        <p className="text-gray-400 mt-2">Everything you need to go from concept to code, powered by AI.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <FeatureCard icon={<CodeIcon />} title="AI-Powered Generation" description="Just describe the app you want, and watch as the AI scaffolds a complete multi-file React application with TypeScript." />
                        <FeatureCard icon={<ChatIcon />} title="Conversational Refinement" description="Your app isn't static. Chat with the AI to make changes, add features, or fix bugs, iterating as you go." />
                        <FeatureCard icon={<LayoutIcon />} title="Live Code & Preview" description="See your generated code and a live, interactive preview of your app side-by-side, updating in real-time." />
                        <FeatureCard icon={<MobileIcon />} title="PWA-Ready by Default" description="Every app is generated as a Progressive Web App, complete with a manifest and service worker for offline capabilities." />
                        <FeatureCard icon={<DownloadIcon />} title="Full Project Download" description="Receive a complete project with a logical file structure. Download a ZIP file, `npm install`, and you're ready to run locally." />
                        <FeatureCard icon={<DatabaseIcon />} title="Service Integrations" description="The AI can automatically integrate with services like Supabase and Stripe if you provide your keys, wiring them up for you." />
                    </div>
                </div>
            </section>

            <section id="testimonials" className="py-20 bg-black">
                 <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h3 className="text-4xl font-bold">Loved by Developers</h3>
                        <p className="text-gray-400 mt-2">See what others are saying about the AI App Builder.</p>
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
        </main>

        <footer className="py-8 text-center text-gray-500 border-t border-white/10">
            <div className="container mx-auto px-6">
                <p>&copy; {new Date().getFullYear()} AI App Builder. All rights reserved.</p>
                <div className="flex justify-center gap-6 mt-4">
                  <a href="#/terms" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                  <a href="#/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                </div>
            </div>
        </footer>
    </div>
  );
};
import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { ChatIcon, LayoutIcon, MobileIcon, DownloadIcon, DatabaseIcon, SparklesIcon, CodeIcon, ChevronDownIcon, SupabaseLogo, StripeLogo, GithubIcon, GeminiLogo, VercelIcon, PaintBrushIcon } from '../components/icons';

const GOOGLE_CLIENT_ID = '208835173647-6e2is6g6j3338hj4dq2reebcluk694jm.apps.googleusercontent.com';

declare global {
  interface Window {
    google: typeof import('google-one-tap');
  }
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="relative p-6 rounded-xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-blue-400/50 hover:bg-white/[.07] hover:-translate-y-1">
        <div className="flex items-start gap-4">
             <div className="flex-shrink-0 bg-black/30 p-3 rounded-lg border border-white/10">
                 {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: 'w-6 h-6 text-blue-400' })}
             </div>
             <div>
                <h4 className="text-lg font-bold text-white">{title}</h4>
                <p className="text-gray-400 text-sm mt-1">{description}</p>
             </div>
        </div>
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

const FaqItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-white/10">
            <button
                className="w-full flex justify-between items-center text-left py-4"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-semibold text-white">{question}</span>
                <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="pb-4 text-gray-300">
                    <p>{answer}</p>
                </div>
            )}
        </div>
    );
};


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
    <div className="bg-gray-950 text-white min-h-screen font-sans overflow-x-hidden">
        <header className="fixed top-0 left-0 right-0 bg-gray-950/30 backdrop-blur-lg z-20 border-b border-white/10">
            <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
                <a href="#/" className="text-xl font-bold">Silo Build</a>
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
                <div className="absolute inset-0 -z-20 bg-gray-950"></div>
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

                <div className="container mx-auto px-6 relative">
                    <h1 className="text-5xl md:text-7xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 leading-tight">
                        From Prompt to Product, Instantly.
                    </h1>
                    <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-10">
                        Describe your app, and let our AI generate production-ready code in seconds. Go from idea to deployed MVP faster than ever before.
                    </p>
                    <div className="flex justify-center">
                        {user ? (
                            <div className="w-full max-w-3xl">
                                <form onSubmit={handlePromptSubmit}>
                                    <div className="relative bg-black/30 border border-white/10 rounded-2xl shadow-2xl p-4 backdrop-blur-lg">
                                        <label className="text-left block text-sm font-medium text-gray-300 mb-2 px-2">Ask Silo Build to build a prototype of...</label>
                                        <textarea
                                            value={prompt}
                                            onChange={(e) => setPrompt(e.target.value)}
                                            placeholder="a pomodoro timer with a clean, minimalist interface and a task list"
                                            className="w-full h-24 bg-transparent resize-none text-white text-base placeholder-gray-500 focus:outline-none p-2"
                                        />
                                        <button type="submit" disabled={!prompt.trim()} className="absolute bottom-4 right-4 bg-blue-600 text-white rounded-full p-2.5 flex items-center justify-center transition-all duration-300 hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed">
                                            <ChevronDownIcon className="w-6 h-6 transform -rotate-90" />
                                        </button>
                                    </div>
                                </form>
                                <div className="flex items-center justify-center gap-2 mt-6 text-sm flex-wrap">
                                    <span className="text-gray-400">Try one →</span>
                                    <button onClick={() => setPrompt('a landing page for a new SaaS product')} className="bg-white/10 px-3 py-1.5 rounded-full hover:bg-white/20 transition-colors">Landing page</button>
                                    <button onClick={() => setPrompt('a personal portfolio website to showcase my projects')} className="bg-white/10 px-3 py-1.5 rounded-full hover:bg-white/20 transition-colors">Personal website</button>
                                    <button onClick={() => setPrompt('a SaaS app for tracking habits')} className="bg-white/10 px-3 py-1.5 rounded-full hover:bg-white/20 transition-colors">SaaS App</button>
                                </div>
                            </div>
                        ) : (
                             <div className="w-full max-w-3xl bg-black/30 border border-white/10 rounded-2xl shadow-2xl p-8 backdrop-blur-lg text-center">
                                <h3 className="text-2xl font-bold mb-4">Ready to Build?</h3>
                                <p className="text-gray-400 mb-6">Sign in with your Google account to start creating.</p>
                                <div className="flex justify-center">
                                    <div ref={googleButtonContainerRef}></div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

             <section id="showcase" className="py-20 bg-gray-950 border-y border-white/10">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold">Built with Silo Build</h2>
                        <p className="text-gray-400 mt-2 max-w-2xl mx-auto">From simple utilities to complex dashboards, generate functional prototypes in minutes.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                            <div className="aspect-video bg-gray-800 rounded-md mb-3 flex items-center justify-center"><p className="text-gray-500">Kanban Board</p></div>
                        </div>
                        <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                           <div className="aspect-video bg-gray-800 rounded-md mb-3 flex items-center justify-center"><p className="text-gray-500">Music Player</p></div>
                        </div>
                         <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                           <div className="aspect-video bg-gray-800 rounded-md mb-3 flex items-center justify-center"><p className="text-gray-500">SaaS Dashboard</p></div>
                        </div>
                    </div>
                </div>
            </section>


            <section id="how-it-works" className="py-20 bg-gray-950">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h3 className="text-4xl font-bold">How It Works</h3>
                        <p className="text-gray-400 mt-2 max-w-2xl mx-auto">Go from prompt to product with a simple, conversational workflow. Build, publish, and iterate all in one place.</p>
                    </div>
                    <div className="relative max-w-5xl mx-auto">
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2 -z-10"></div>
                        <div className="grid md:grid-cols-3 gap-16 text-center">
                            <div className="relative">
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-xl font-bold border-4 border-gray-950">1</div>
                                <h4 className="text-xl font-bold mt-12">Prompt</h4>
                                <p className="text-gray-400 mt-2">Describe your app idea in plain English. The more detail, the better.</p>
                            </div>
                            <div className="relative">
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-xl font-bold border-4 border-gray-950">2</div>
                                <h4 className="text-xl font-bold mt-12">Generate</h4>
                                <p className="text-gray-400 mt-2">AI generates the code, file structure, and a live preview in real-time.</p>
                            </div>
                            <div className="relative">
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-xl font-bold border-4 border-gray-950">3</div>
                                <h4 className="text-xl font-bold mt-12">Iterate</h4>
                                <p className="text-gray-400 mt-2">Refine your app by chatting. Add features, fix bugs, and change styles.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section id="features" className="py-20 bg-black border-y border-white/10">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h3 className="text-4xl font-bold">A New Way to Build Software</h3>
                        <p className="text-gray-400 mt-2 max-w-2xl mx-auto">Everything you need to go from concept to code, powered by AI.</p>
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

             <section id="for-who" className="py-20 bg-gray-950">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h3 className="text-4xl font-bold">Built for Modern Builders</h3>
                        <p className="text-gray-400 mt-2">Whether you're a seasoned developer or just starting, Silo Build accelerates your workflow.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <FeatureCard icon={<SparklesIcon />} title="Indie Hackers & Founders" description="Go from idea to MVP in record time. Validate your concepts without writing weeks of boilerplate code." />
                        <FeatureCard icon={<PaintBrushIcon />} title="Designers Who Code" description="Bring your designs to life effortlessly. Describe your UI and get functional React components in seconds." />
                        <FeatureCard icon={<LayoutIcon />} title="Teams & Enterprises" description="Rapidly prototype new features and internal tools. Free up your engineers to focus on complex problems." />
                    </div>
                </div>
            </section>

            <section id="integrations" className="py-20 bg-black border-t border-white/10">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <p className="text-sm font-bold text-blue-400 mb-2">INTEGRATIONS</p>
                        <h3 className="text-4xl font-bold">Works With Your Favorite Tools</h3>
                        <p className="text-gray-400 mt-2">The AI can directly use your API keys to build full-stack applications.</p>
                    </div>
                    <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 text-gray-500">
                        <GeminiLogo className="h-8" />
                        <GithubIcon className="h-8 w-8 text-white" />
                        <SupabaseLogo className="h-8" />
                        <StripeLogo className="h-8 text-white" />
                        <VercelIcon className="h-7" />
                    </div>
                </div>
            </section>

            <section id="testimonials" className="py-20 bg-white/5 border-y border-white/10">
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

             <section id="faq" className="py-20 bg-gray-950">
                <div className="container mx-auto px-6 max-w-3xl">
                    <div className="text-center mb-12">
                        <h3 className="text-4xl font-bold">Frequently Asked Questions</h3>
                    </div>
                    <div className="space-y-4">
                        <FaqItem
                            question="Who owns the code that's generated?"
                            answer="You do. All generated code is yours to use, modify, and distribute as you see fit, for both personal and commercial projects. We claim no ownership over the output."
                        />
                        <FaqItem
                            question="Are my API keys and project data secure?"
                            answer="Yes. All your data, including API keys and project files, is stored exclusively in your browser's local storage. It never touches our servers, ensuring your information remains private and under your control."
                        />
                        <FaqItem
                            question="How much does it cost to use?"
                            answer="Silo Build itself is free to use. However, you are responsible for the costs associated with the API services you use, such as the Google Gemini API, which is accessed via your own API key."
                        />
                        <FaqItem
                            question="What technology stack does it use?"
                            answer="The AI generates standard, production-ready React applications using TypeScript. For styling, it utilizes Tailwind CSS. The generated code is clean, un-opinionated, and easy to extend."
                        />
                    </div>
                </div>
            </section>
            
            <section id="cta" className="py-20">
                <div className="container mx-auto px-6">
                    <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl rounded-2xl sm:px-16 border border-white/10">
                        <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Ready to build your next idea?
                        </h2>
                        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
                            Stop wiring boilerplate and start creating. Your next project is just a prompt away.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            {user ? (
                                <a href="#/builder" className="bg-blue-600 text-white px-6 py-3 text-sm rounded-full font-semibold hover:bg-blue-700 transition-colors">
                                    Go to Builder
                                </a>
                            ) : (
                                <button onClick={handleSignInClick} className="bg-blue-600 text-white px-6 py-3 text-sm rounded-full font-semibold hover:bg-blue-700 transition-colors">
                                    Sign In & Get Started
                                </button>
                            )}
                        </div>
                        <div className="absolute -top-24 right-0 -z-10 transform-gpu blur-3xl" aria-hidden="true">
                            <div className="aspect-[1404/767] w-[87.75rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25" style={{clipPath: 'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 37.9%, 73.6% 51.7%)'}}></div>
                        </div>
                    </div>
                </div>
            </section>

        </main>

        <footer className="py-8 text-center text-gray-500 border-t border-white/10">
            <div className="container mx-auto px-6">
                <p>&copy; {new Date().getFullYear()} Silo Build. All rights reserved.</p>
                <div className="flex justify-center gap-6 mt-4">
                  <a href="#/terms" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                  <a href="#/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                </div>
            </div>
        </footer>
    </div>
  );
};
import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { ChatIcon, LayoutIcon, MobileIcon, CodeIcon, DownloadIcon, DatabaseIcon, SparklesIcon } from '../components/icons';

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


export const LoginPage: React.FC = () => {
  const { login } = useAuth();

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

      window.google.accounts.id.renderButton(
        document.getElementById('google-signin-button')!,
        { theme: 'outline', size: 'large', type: 'standard', shape: 'pill', text: 'signin_with' }
      );
      
      window.google.accounts.id.prompt();
    }
  }, [login]);
  
  const handleSignInClick = () => {
    if (window.google) {
        window.google.accounts.id.prompt();
    }
  };

  return (
    <div className="bg-black text-white min-h-screen font-sans overflow-x-hidden">
        <header className="fixed top-0 left-0 right-0 bg-black/30 backdrop-blur-lg z-20 border-b border-white/10">
            <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
                <h1 className="text-xl font-bold">AI App Builder</h1>
                <button onClick={handleSignInClick} className="bg-blue-600 text-white px-4 py-2 text-sm rounded-full font-semibold hover:bg-blue-700 transition-colors">
                    Sign In
                </button>
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
                        Describe your application in plain English, and our AI will generate a complete, production-ready React application in seconds. From idea to PWA in minutes.
                    </p>
                    <div className="flex justify-center">
                        <div id="google-signin-button"></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-4">Get started for free. No credit card required.</p>
                </div>
            </section>

            <section id="features" className="py-20 bg-white/5 border-y border-white/10">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h3 className="text-4xl font-bold">A New Way to Build Software</h3>
                        <p className="text-gray-400 mt-2">Everything you need to go from concept to code, powered by AI.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <FeatureCard icon={<SparklesIcon />} title="AI-Powered Generation" description="Just describe the app you want, and watch as the AI scaffolds a complete multi-file React application with TypeScript." />
                        <FeatureCard icon={<ChatIcon />} title="Conversational Refinement" description="Your app isn't static. Chat with the AI to make changes, add features, or fix bugs, iterating as you go." />
                        <FeatureCard icon={<LayoutIcon />} title="Live Code & Preview" description="See your generated code and a live, interactive preview of your app side-by-side, updating in real-time." />
                        <FeatureCard icon={<MobileIcon />} title="PWA-Ready by Default" description="Every app is generated as a Progressive Web App, complete with a manifest and service worker for offline capabilities." />
                        <FeatureCard icon={<DownloadIcon />} title="Full Project Download" description="Receive a complete project with a logical file structure. Download a ZIP file, `npm install`, and you're ready to run locally." />
                        <FeatureCard icon={<DatabaseIcon />} title="Service Integrations" description="The AI can automatically integrate with services like Supabase and Stripe if you provide your keys, wiring them up for you." />
                    </div>
                </div>
            </section>
        </main>

        <footer className="py-8 text-center text-gray-500">
            <div className="container mx-auto px-6">
                <p>&copy; {new Date().getFullYear()} AI App Builder. All rights reserved.</p>
            </div>
        </footer>
    </div>
  );
};
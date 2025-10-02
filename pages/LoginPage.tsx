import React, { useState } from 'react';
import { LandingHeader } from '../components/Header';
import { LandingFooter } from '../components/Sidebar';
import { MagicWandIcon, CodeBrowserIcon, RocketIcon, ArrowRightIcon } from '../components/icons';
import { ImprovementModal } from '../components/ImprovementModal';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string; }> = ({ icon, title, description }) => (
    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 transform transition-transform duration-300 hover:-translate-y-2">
        <div className="bg-blue-500/10 text-blue-400 w-12 h-12 rounded-lg flex items-center justify-center border border-blue-500/20 text-2xl">
            {icon}
        </div>
        <h3 className="mt-4 font-bold text-lg text-white">{title}</h3>
        <p className="mt-1 text-sm text-gray-400">{description}</p>
    </div>
);

export const LandingPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);

    return (
        <div className="bg-gray-950 text-white">
            <ImprovementModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <LandingHeader />

            {/* Hero Section */}
            <main className="pt-32 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-gray-800/20 [mask-image:linear-gradient(to_bottom,white_10%,transparent_100%)]"></div>
                <div className="container mx-auto px-6 text-center relative">
                    <h1 className="text-5xl md:text-7xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 leading-tight">
                        Create Apps at the Speed of Thought
                    </h1>
                    <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-10">
                        Silo Build is a next-generation AI agent that generates complete, production-ready code from a single prompt. Go from idea to deployment faster than ever.
                    </p>
                    <a href="#/auth" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all transform hover:scale-105">
                        Start Building for Free
                        <ArrowRightIcon />
                    </a>
                </div>
            </main>

            {/* Features Section */}
            <section id="features" className="py-24 bg-black/20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold">From Prompt to Product</h2>
                        <p className="text-gray-400 mt-3 max-w-2xl mx-auto">An entire development workflow, supercharged by AI.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <FeatureCard 
                            icon={<MagicWandIcon />}
                            title="AI-Powered Generation"
                            description="Describe your app in plain English and watch as Silo generates multi-file applications in React, Vue, Svelte, and more."
                        />
                        <FeatureCard 
                            icon={<CodeBrowserIcon />}
                            title="Production-Ready Code"
                            description="Get clean, well-structured, and production-quality code that you can download, customize, and own completely."
                        />
                        <FeatureCard 
                            icon={<RocketIcon />}
                            title="One-Click Deployment"
                            description="Integrate with your favorite hosting providers like Netlify and Vercel to go live with a single click."
                        />
                    </div>
                </div>
            </section>
            
            <LandingFooter />
        </div>
    );
};

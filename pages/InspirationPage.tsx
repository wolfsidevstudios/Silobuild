import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Settings } from '../types';
import { generateIdeaStream } from '../services/geminiService';
import { InspirationIcon, SparklesIcon, DownloadIcon } from '../components/icons';
import { Spinner } from '../components/Spinner';
import saveAs from 'file-saver';

const initialSettings: Settings = {
  geminiApiKey: '',
  supabaseUrl: '',
  supabaseAnonKey: '',
  stripePublicKey: '',
  stripeSecretKey: '',
  githubPat: '',
  netlifyPat: '',
};

export const InspirationPage: React.FC = () => {
    const [settings] = useLocalStorage<Settings>('ai-app-builder-settings', initialSettings);
    
    const [prompt, setPrompt] = useState('');
    const [idea, setIdea] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isCopied, setIsCopied] = useState(false);

    const generateIdea = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!prompt.trim()) return;
        if (!settings.geminiApiKey) {
            setError("Please configure your Gemini API Key in the dashboard settings to use the idea generator.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setIdea('');
        try {
            await generateIdeaStream(`Brainstorm a detailed app idea and a good starting prompt for building it. The initial concept is: "${prompt}"`, settings, (chunk) => {
                setIdea(prev => prev + chunk);
            });
        } catch (e) {
            setError(e instanceof Error ? e.message : 'An error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = () => {
        if (idea) {
            navigator.clipboard.writeText(idea);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }
    };

    const handleDownload = () => {
        if (idea) {
            const blob = new Blob([idea], { type: 'text/plain;charset=utf-8' });
            saveAs(blob, `silo-build-idea.txt`);
        }
    };
    
    const handleUsePrompt = (promptText: string) => {
        sessionStorage.setItem('initialPrompt', promptText);
        window.location.hash = '#/builder';
    };

    return (
        <div 
            className="h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('https://i.ibb.co/Df8NHGR8/IMG-3906.png')" }}
        >
            <div className="h-full w-full bg-black/60 p-8 overflow-y-auto flex flex-col justify-center items-center text-center">
                
                <div className="flex items-center gap-3 mb-4">
                    <InspirationIcon className="w-8 h-8 text-yellow-300" />
                    <h1 className="text-3xl font-bold text-white">Inspiration</h1>
                </div>
                <p className="text-gray-300 mb-8 max-w-2xl">
                    Describe a concept, and let AI generate a detailed app idea and a prompt for you to build it.
                </p>

                <div className="w-full max-w-2xl">
                    <form onSubmit={generateIdea} className="relative">
                        <input
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Brainstorm an app for..."
                            className="w-full bg-white rounded-full py-4 pl-6 pr-32 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-lg text-lg"
                        />
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="absolute top-1/2 right-2 -translate-y-1/2 bg-yellow-400 text-black px-5 py-2.5 font-semibold rounded-full hover:bg-yellow-500 transition-colors disabled:bg-gray-400 text-base"
                        >
                            Generate
                        </button>
                    </form>

                    <div className="flex flex-wrap justify-center gap-2 mt-4 text-sm">
                        <button onClick={() => setPrompt('a productivity tool for remote teams')} className="bg-white/10 text-white px-3 py-1.5 rounded-full hover:bg-white/20 transition-colors">Productivity Tool</button>
                        <button onClick={() => setPrompt('a mobile game for casual players')} className="bg-white/10 text-white px-3 py-1.5 rounded-full hover:bg-white/20 transition-colors">Mobile Game</button>
                        <button onClick={() => setPrompt('a SaaS for small businesses')} className="bg-white/10 text-white px-3 py-1.5 rounded-full hover:bg-white/20 transition-colors">SaaS App</button>
                        <button onClick={() => setPrompt('a social app for local events')} className="bg-white/10 text-white px-3 py-1.5 rounded-full hover:bg-white/20 transition-colors">Social App</button>
                    </div>

                    {(isLoading || idea || error) && (
                        <div className="mt-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 text-left transition-all duration-500">
                            {isLoading && (
                                <div className="flex items-center justify-center gap-2 text-white">
                                    <Spinner className="w-5 h-5 text-white" /> Brainstorming...
                                </div>
                            )}
                            {error && <p className="text-red-400 text-sm">{error}</p>}
                            {idea && !isLoading && (
                                <div className="space-y-4">
                                    <p className="text-white whitespace-pre-wrap">{idea}</p>
                                    <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                                        <button onClick={handleCopy} className="bg-white/10 text-white px-4 py-2 text-sm rounded-lg hover:bg-white/20 transition-colors">
                                            {isCopied ? 'Copied!' : 'Copy'}
                                        </button>
                                        <button onClick={handleDownload} className="flex items-center gap-2 bg-white/10 text-white px-4 py-2 text-sm rounded-lg hover:bg-white/20 transition-colors">
                                            <DownloadIcon className="w-4 h-4" />
                                            Download
                                        </button>
                                        <button onClick={() => handleUsePrompt(idea)} className="flex items-center gap-2 ml-auto bg-yellow-400 text-black px-4 py-2 text-sm font-semibold rounded-lg hover:bg-yellow-500 transition-colors">
                                            <SparklesIcon className="w-4 h-4" />
                                            Build with this prompt
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
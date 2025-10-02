import React, { useState } from 'react';
import { PlusIcon, SunIcon } from './icons';
import { Spinner } from './Spinner';

interface InitialPromptViewProps {
    onSubmit: (prompt: string) => void;
}

export const InitialPromptView: React.FC<InitialPromptViewProps> = ({ onSubmit }) => {
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (prompt.trim()) {
            setIsLoading(true);
            onSubmit(prompt.trim());
        }
    };

    return (
        <div className="w-full flex flex-col items-center justify-center text-center relative max-h-screen overflow-hidden">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>

            <div className="relative z-10 w-full max-w-2xl px-4">
                <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
                    What should we build today?
                </h1>
                <p className="text-lg text-gray-400 mb-12">
                    Create stunning apps & websites by chatting with AI.
                </p>

                <form onSubmit={handleSubmit} className="w-full">
                    <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl shadow-2xl p-4">
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            className="w-full h-24 bg-transparent text-lg text-white placeholder-gray-500 resize-none focus:outline-none"
                            placeholder="Type your idea and we'll build it together."
                            disabled={isLoading}
                        />
                        <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2">
                                <button type="button" className="h-8 w-8 flex items-center justify-center bg-gray-700/50 hover:bg-gray-700 rounded-full text-gray-300">
                                    <PlusIcon className="w-5 h-5" />
                                </button>
                                <div className="flex items-center gap-2 text-gray-300 bg-gray-700/50 px-3 py-1.5 rounded-full text-sm">
                                    <SunIcon className="w-4 h-4 text-yellow-400" />
                                    <span>v1 Agent</span>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="h-10 w-10 flex items-center justify-center bg-blue-600 hover:bg-blue-500 rounded-full text-white disabled:bg-blue-800 disabled:cursor-wait"
                                disabled={isLoading || !prompt.trim()}
                                aria-label="Submit prompt"
                            >
                                {isLoading ? <Spinner className="w-5 h-5" /> : (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                        <path d="M12 4L12 15M12 4L16 8M12 4L8 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M4 12L4 20C4 20.5523 4.44772 21 5 21L19 21C19.5523 21 20 20.5523 20 20L20 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            
            <div className="absolute bottom-[-150px] left-1/2 -translate-x-1/2 w-[150%] h-[300px] bg-gradient-to-t from-blue-500/50 to-transparent blur-3xl rounded-full" style={{
                background: 'radial-gradient(ellipse at 50% 100%, rgba(59, 130, 246, 0.3), transparent 60%)'
            }}></div>
        </div>
    );
};
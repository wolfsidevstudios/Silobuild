import React, { useState } from 'react';
import { PlusIcon, SunIcon, ArrowUpIcon } from './icons';
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
        <div 
            className="w-full h-full flex flex-col items-center justify-center text-center relative overflow-hidden"
            style={{ background: 'radial-gradient(ellipse at center, rgba(99, 36, 36, 0.5) 0%, #030712 70%)' }}
        >
            <div className="relative z-10 w-full max-w-2xl px-4">
                <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
                    What should we build today?
                </h1>
                <p className="text-lg text-gray-400 mb-12">
                    Create stunning apps & websites by chatting with AI.
                </p>

                <form onSubmit={handleSubmit} className="w-full">
                    <div className="bg-[#2c1e1e]/70 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-4">
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
                                className="h-10 w-10 flex items-center justify-center bg-white hover:bg-gray-200 rounded-full text-black disabled:bg-gray-300 disabled:cursor-wait"
                                disabled={isLoading || !prompt.trim()}
                                aria-label="Submit prompt"
                            >
                                {isLoading ? <Spinner className="w-5 h-5 !text-black" /> : (
                                    <ArrowUpIcon className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
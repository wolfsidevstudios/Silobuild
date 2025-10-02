import React, { useState } from 'react';
import { SendIcon } from './icons';
import { Spinner } from './Spinner';

interface PromptInputProps {
    onSend: (prompt: string) => void;
    isLoading: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ onSend, isLoading }) => {
    const [prompt, setPrompt] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (prompt.trim() && !isLoading) {
            onSend(prompt.trim());
            setPrompt('');
        }
    };

    return (
        <div className="flex-shrink-0 p-4 border-t border-gray-800 bg-gray-900">
            <form onSubmit={handleSubmit} className="relative">
                <textarea 
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-4 pr-12 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none disabled:opacity-50"
                    placeholder="Describe the component you want to build..."
                    rows={2}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    disabled={isLoading}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            handleSubmit(e);
                        }
                    }}
                />
                <button 
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-blue-800 disabled:cursor-not-allowed"
                    aria-label="Send prompt"
                    disabled={isLoading || !prompt.trim()}
                >
                    {isLoading ? <Spinner className="w-5 h-5" /> : <SendIcon className="w-5 h-5" />}
                </button>
            </form>
        </div>
    );
};

import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpIcon, PlusIcon } from './icons';
import { Spinner } from './Spinner';

interface PromptInputProps {
    onSend: (prompt: string) => void;
    isLoading: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ onSend, isLoading }) => {
    const [prompt, setPrompt] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleInput = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (prompt.trim() && !isLoading) {
            onSend(prompt.trim());
            setPrompt('');
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
            }
        }
    };
    
    useEffect(handleInput, [prompt]);

    return (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900 to-transparent">
             <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700/50">
                <form onSubmit={handleSubmit} className="flex items-end gap-2 p-3">
                    <button 
                        type="button"
                        className="flex-shrink-0 h-9 w-9 flex items-center justify-center bg-gray-700/50 hover:bg-gray-600 rounded-full text-gray-300 transition-colors"
                        aria-label="Add file"
                    >
                        <PlusIcon className="w-5 h-5" />
                    </button>
                    <textarea 
                        ref={textareaRef}
                        className="w-full bg-transparent text-white placeholder:text-gray-500 focus:outline-none resize-none max-h-48"
                        placeholder="How can we help you today?"
                        rows={1}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        disabled={isLoading}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                handleSubmit(e);
                            }
                        }}
                        onInput={handleInput}
                    />
                    <button 
                        type="submit"
                        className="flex-shrink-0 h-9 w-9 flex items-center justify-center rounded-full bg-white hover:bg-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                        aria-label="Send prompt"
                        disabled={isLoading || !prompt.trim()}
                    >
                        {isLoading ? <Spinner className="w-5 h-5 !text-black" /> : <ArrowUpIcon className="w-5 h-5" />}
                    </button>
                </form>
            </div>
        </div>
    );
};

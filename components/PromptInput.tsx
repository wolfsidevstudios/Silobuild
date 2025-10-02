import React from 'react';
import { SendIcon } from './icons';

export const PromptInput: React.FC = () => {
    return (
        <div className="flex-shrink-0 p-4 border-t border-gray-800 bg-gray-900">
            <form className="relative">
                <textarea 
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-4 pr-12 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                    placeholder="Describe the component you want to build..."
                    rows={2}
                />
                <button 
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                    aria-label="Send prompt"
                >
                    <SendIcon className="w-5 h-5" />
                </button>
            </form>
        </div>
    );
};
import React from 'react';
import { BotIcon } from './icons';

export const ApiKeyCard: React.FC = () => {
    return (
        <div className="flex items-start gap-3 my-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-yellow-500/20 text-yellow-400">
                <span className="material-symbols-outlined text-lg">key</span>
            </div>
            <div className="p-4 rounded-lg max-w-xs md:max-w-md bg-yellow-900/50 border border-yellow-700/50 text-yellow-200 w-full">
                <h3 className="font-bold text-md mb-2">
                    Action Required: Add API Key
                </h3>
                <p className="text-sm">
                    I've added an AI-powered feature! To make it work, you'll need to add your Gemini API key.
                </p>
                <p className="text-sm mt-2">
                    Please open <code className="bg-gray-800 px-1 py-0.5 rounded text-xs font-mono text-white">script.js</code> and replace the placeholder with your key.
                </p>
            </div>
        </div>
    );
};

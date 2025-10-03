// FIX: The entire component has been updated to remove user-configurable API keys and models,
// aligning with the guideline that these should be managed via environment variables.
import React from 'react';

export const SettingsPage: React.FC = () => {
    return (
        <div className="container mx-auto p-6 lg:p-8">
            <h1 className="text-3xl font-bold text-white mb-6">Settings</h1>

            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 max-w-2xl">
                <h2 className="text-xl font-semibold text-white mb-4">API Configuration</h2>
                <div className="space-y-4">
                    <p className="text-gray-300">
                        The Google Gemini API key and model selection are configured by your administrator via environment variables.
                    </p>
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                         <p className="text-sm text-gray-400 font-semibold">Current Configuration:</p>
                         <ul className="text-sm text-gray-300 list-disc list-inside mt-2 space-y-1">
                            <li>API Key is loaded from <code className="bg-black/50 px-1 py-0.5 rounded text-xs font-mono">process.env.API_KEY</code>.</li>
                            <li>AI Model is set to <code className="bg-black/50 px-1 py-0.5 rounded text-xs font-mono">gemini-2.5-flash</code>.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

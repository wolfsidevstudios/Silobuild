import React, { useState } from 'react';

interface ApiKeyModalProps {
    isOpen: boolean;
    onSave: (apiKey: string) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onSave }) => {
    const [apiKey, setApiKey] = useState('');

    const handleSave = () => {
        if (apiKey.trim()) {
            onSave(apiKey.trim());
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"></div>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div 
                    className="relative bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-lg m-4 transform transition-all text-white"
                >
                    <div className="p-6">
                        <div className="flex items-start gap-4">
                             <div className="bg-blue-500/10 text-blue-400 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                <span className="material-symbols-outlined">key</span>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">Gemini API Key Required</h2>
                                <p className="text-gray-400 mt-2 text-sm">
                                    To build applications with AI features, please provide your Google Gemini API key. Your key is stored securely in your browser's local storage.
                                </p>
                                <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline text-sm mt-1 inline-block">
                                    Get your API key from Google AI Studio &rarr;
                                </a>
                            </div>
                        </div>
                        <div className="mt-6 space-y-4">
                            <div>
                                <label htmlFor="gemini-api-key" className="block text-sm font-medium text-gray-300 mb-1">
                                    Your Gemini API Key
                                </label>
                                <input
                                    type="password"
                                    id="gemini-api-key"
                                    value={apiKey}
                                    onChange={(e) => setApiKey(e.target.value)}
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    placeholder="Enter your Gemini API Key"
                                />
                            </div>
                            <div className="flex items-center justify-end gap-4 pt-2">
                                <button
                                    onClick={handleSave}
                                    disabled={!apiKey.trim()}
                                    className="bg-white text-black px-5 py-2 rounded-full font-semibold hover:bg-gray-200 transition-colors text-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    Save & Continue
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

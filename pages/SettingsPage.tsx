import React, { useState, useEffect } from 'react';

export const SettingsPage: React.FC = () => {
    const [apiKey, setApiKey] = useState('');
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saved'>('idle');

    useEffect(() => {
        const storedKey = localStorage.getItem('gemini_api_key');
        if (storedKey) {
            setApiKey(storedKey);
        }
    }, []);

    const handleSave = () => {
        localStorage.setItem('gemini_api_key', apiKey);
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 2000);
    };

    return (
        <>
            <header className="bg-gray-950/80 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-10">
                <div className="container mx-auto px-6 py-4">
                    <h1 className="text-2xl font-bold text-white">Settings</h1>
                </div>
            </header>
            <main className="container mx-auto p-6">
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 max-w-2xl">
                    <h2 className="text-xl font-semibold text-white mb-4">API Configuration</h2>
                    <p className="text-gray-400 mb-4 text-sm">
                        Your Gemini API key is stored securely in your browser's local storage and is never sent to our servers.
                    </p>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="api-key" className="block text-sm font-medium text-gray-300 mb-1">
                                Google Gemini API Key
                            </label>
                            <input
                                type="password"
                                id="api-key"
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="Enter your Gemini API Key"
                            />
                             <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline text-xs mt-2 inline-block">
                                Get your API key from Google AI Studio &rarr;
                            </a>
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={handleSave}
                                disabled={saveStatus === 'saved'}
                                className="bg-white text-black px-5 py-2 rounded-full font-semibold hover:bg-gray-200 transition-colors text-sm disabled:bg-green-500 disabled:text-white"
                            >
                                {saveStatus === 'saved' ? 'Saved!' : 'Save Key'}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};
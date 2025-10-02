import React, { useState, useEffect } from 'react';

export const SettingsPage: React.FC = () => {
    const [apiKey, setApiKey] = useState('');
    const [model, setModel] = useState('gemini-2.5-flash');
    const [saveStatus, setSaveStatus] = useState('');

    useEffect(() => {
        const storedApiKey = localStorage.getItem('gemini_api_key') || '';
        const storedModel = localStorage.getItem('gemini_model') || 'gemini-2.5-flash';
        setApiKey(storedApiKey);
        setModel(storedModel);
    }, []);

    const handleSave = () => {
        localStorage.setItem('gemini_api_key', apiKey);
        localStorage.setItem('gemini_model', model);
        setSaveStatus('Settings saved successfully!');
        setTimeout(() => setSaveStatus(''), 3000);
    };

    return (
        <div className="container mx-auto p-6 lg:p-8">
            <h1 className="text-3xl font-bold text-white mb-6">Settings</h1>

            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 max-w-2xl">
                <h2 className="text-xl font-semibold text-white mb-4">API Configuration</h2>
                <div className="space-y-6">
                    <div>
                        <label htmlFor="api-key" className="block text-sm font-medium text-gray-300 mb-1">
                            Gemini API Key
                        </label>
                        <input
                            type="password"
                            id="api-key"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Enter your Gemini API Key"
                        />
                         <p className="text-xs text-gray-500 mt-2">Your API key is stored securely in your browser's local storage and is never sent to our servers.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Model Selection
                        </label>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
                           <div className="flex items-center">
                               <input id="gemini-flash" name="model" type="radio" value="gemini-2.5-flash" checked={model === 'gemini-2.5-flash'} onChange={(e) => setModel(e.target.value)} className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500"/>
                               <label htmlFor="gemini-flash" className="ml-2 block text-sm text-gray-300">gemini-2.5-flash</label>
                           </div>
                           <div className="flex items-center">
                               <input id="gemini-pro" name="model" type="radio" value="gemini-2.5-pro" checked={model === 'gemini-2.5-pro'} onChange={(e) => setModel(e.target.value)} className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500"/>
                               <label htmlFor="gemini-pro" className="ml-2 block text-sm text-gray-300">gemini-2.5-pro</label>
                           </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-end gap-4 pt-2">
                         {saveStatus && <p className="text-sm text-green-400 animate-pulse">{saveStatus}</p>}
                        <button
                            onClick={handleSave}
                            className="bg-white text-black px-5 py-2 rounded-full font-semibold hover:bg-gray-200 transition-colors text-sm"
                        >
                            Save Settings
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
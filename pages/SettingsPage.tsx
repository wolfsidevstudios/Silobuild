import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Settings } from '../types';
import { GeminiLogo, StripeLogo, SupabaseLogo } from '../components/icons';

const initialSettings: Settings = {
  geminiApiKey: '',
  vercelApiKey: '',
  supabaseUrl: '',
  supabaseAnonKey: '',
  stripePublicKey: '',
  stripeSecretKey: '',
};

export const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useLocalStorage<Settings>('ai-app-builder-settings', initialSettings);
  const [localSettings, setLocalSettings] = useState<Settings>(settings);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSettings(localSettings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-8 h-full overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
        
        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <GeminiLogo />
            <h2 className="text-xl font-semibold">Gemini API</h2>
          </div>
          <p className="text-sm text-gray-400 mb-4">
            Your Google AI Gemini API Key. This is stored in your browser's local storage and is required to generate applications.
          </p>
          <div>
            <label htmlFor="geminiApiKey" className="block text-sm font-medium text-gray-300 mb-1">
              Gemini API Key
            </label>
            <input
              type="password"
              id="geminiApiKey"
              name="geminiApiKey"
              value={localSettings.geminiApiKey}
              onChange={handleInputChange}
              className="w-full bg-white/5 border border-white/10 rounded-md p-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Vercel</h2>
          <p className="text-sm text-gray-400 mb-4">
            Used for deploying your generated applications (simulation).
          </p>
          <div>
            <label htmlFor="vercelApiKey" className="block text-sm font-medium text-gray-300 mb-1">
              Vercel Access Token
            </label>
            <input
              type="password"
              id="vercelApiKey"
              name="vercelApiKey"
              value={localSettings.vercelApiKey}
              onChange={handleInputChange}
              className="w-full bg-white/5 border border-white/10 rounded-md p-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <SupabaseLogo />
            <h2 className="text-xl font-semibold">Supabase</h2>
          </div>
          <p className="text-sm text-gray-400 mb-4">
            Provide these keys to allow the AI to generate code with Supabase integration.
          </p>
          <div className="space-y-4">
            <div>
              <label htmlFor="supabaseUrl" className="block text-sm font-medium text-gray-300 mb-1">
                Supabase URL
              </label>
              <input
                type="text"
                id="supabaseUrl"
                name="supabaseUrl"
                value={localSettings.supabaseUrl}
                onChange={handleInputChange}
                placeholder="https://<your-project-ref>.supabase.co"
                className="w-full bg-white/5 border border-white/10 rounded-md p-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="supabaseAnonKey" className="block text-sm font-medium text-gray-300 mb-1">
                Supabase Anon (Public) Key
              </label>
              <input
                type="text"
                id="supabaseAnonKey"
                name="supabaseAnonKey"
                value={localSettings.supabaseAnonKey}
                onChange={handleInputChange}
                className="w-full bg-white/5 border border-white/10 rounded-md p-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <StripeLogo />
            <h2 className="text-xl font-semibold">Stripe</h2>
          </div>
           <p className="text-sm text-gray-400 mb-4">
            Provide these keys to allow the AI to generate code with Stripe integration.
          </p>
          <div className="space-y-4">
            <div>
              <label htmlFor="stripePublicKey" className="block text-sm font-medium text-gray-300 mb-1">
                Stripe Public Key
              </label>
              <input
                type="text"
                id="stripePublicKey"
                name="stripePublicKey"
                value={localSettings.stripePublicKey}
                onChange={handleInputChange}
                className="w-full bg-white/5 border border-white/10 rounded-md p-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="stripeSecretKey" className="block text-sm font-medium text-gray-300 mb-1">
                Stripe Secret Key
              </label>
              <input
                type="password"
                id="stripeSecretKey"
                name="stripeSecretKey"
                value={localSettings.stripeSecretKey}
                onChange={handleInputChange}
                className="w-full bg-white/5 border border-white/10 rounded-md p-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
            <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors"
            >
                Save Settings
            </button>
            {saved && <span className="text-green-400 text-sm">Settings saved!</span>}
        </div>
      </form>
    </div>
  );
};
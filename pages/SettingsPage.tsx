import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Settings } from '../types';
import { SettingsIcon, StripeLogo, SupabaseLogo } from '../components/icons';

// FIX: `geminiApiKey` is removed from settings per guidelines.
const initialSettings: Settings = {
  vercelApiKey: '',
  supabaseUrl: '',
  supabaseAnonKey: '',
  stripePublicKey: '',
  stripeSecretKey: '',
};

export const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useLocalStorage<Settings>('ai-app-builder-settings', initialSettings);
  const [showSaved, setShowSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // The hook already saves on change, but we can show a confirmation.
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <SettingsIcon className="w-8 h-8 text-blue-400" />
        <h1 className="text-3xl font-bold text-white">Settings & Integrations</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* FIX: Gemini API Key section removed. Key is now managed via environment variables. */}

        {/* Vercel */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Vercel</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="vercelApiKey" className="block text-sm font-medium text-gray-300 mb-1">Access Token</label>
              <input type="password" name="vercelApiKey" id="vercelApiKey" value={settings.vercelApiKey} onChange={handleChange} className="w-full bg-black/30 border border-white/20 rounded-md p-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your Vercel token" />
            </div>
          </div>
        </div>

        {/* Supabase */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <SupabaseLogo className="h-8" />
            <h2 className="text-xl font-bold">Supabase</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="supabaseUrl" className="block text-sm font-medium text-gray-300 mb-1">Project URL</label>
              <input type="text" name="supabaseUrl" id="supabaseUrl" value={settings.supabaseUrl} onChange={handleChange} className="w-full bg-black/30 border border-white/20 rounded-md p-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="https://<project-ref>.supabase.co" />
            </div>
            <div>
              <label htmlFor="supabaseAnonKey" className="block text-sm font-medium text-gray-300 mb-1">Anon (Public) Key</label>
              <input type="password" name="supabaseAnonKey" id="supabaseAnonKey" value={settings.supabaseAnonKey} onChange={handleChange} className="w-full bg-black/30 border border-white/20 rounded-md p-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your anon key" />
            </div>
          </div>
        </div>

        {/* Stripe */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <StripeLogo className="h-8" />
            <h2 className="text-xl font-bold">Stripe</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="stripePublicKey" className="block text-sm font-medium text-gray-300 mb-1">Publishable Key</label>
              <input type="text" name="stripePublicKey" id="stripePublicKey" value={settings.stripePublicKey} onChange={handleChange} className="w-full bg-black/30 border border-white/20 rounded-md p-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="pk_test_..." />
            </div>
            <div>
              <label htmlFor="stripeSecretKey" className="block text-sm font-medium text-gray-300 mb-1">Secret Key</label>
              <input type="password" name="stripeSecretKey" id="stripeSecretKey" value={settings.stripeSecretKey} onChange={handleChange} className="w-full bg-black/30 border border-white/20 rounded-md p-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="sk_test_..." />
               <p className="text-xs text-gray-500 mt-1">Your secret key is used exclusively in the AI prompt and is never exposed client-side.</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end items-center">
            {showSaved && <p className="text-green-400 text-sm transition-opacity duration-300">Settings saved!</p>}
            <button type="submit" className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors ml-4">
                Save Settings
            </button>
        </div>
      </form>
    </div>
  );
};
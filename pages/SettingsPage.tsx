import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Settings } from '../types';
import { GeminiLogo, StripeLogo, SupabaseLogo, GithubIcon, SparklesIcon } from '../components/icons';

const initialSettings: Settings = {
  geminiApiKey: '',
  vercelApiKey: '',
  supabaseUrl: '',
  supabaseAnonKey: '',
  stripePublicKey: '',
  stripeSecretKey: '',
  githubPat: '',
};

export const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useLocalStorage<Settings>('ai-app-builder-settings', initialSettings);
  const [localSettings, setLocalSettings] = useState<Settings>(settings);
  const [saved, setSaved] = useState(false);
  const [isPro, setIsPro] = useLocalStorage<boolean>('silo-build-is-pro', false);

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
           <div className="flex items-center gap-3 mb-4">
            <GithubIcon className="h-6 w-6" />
            <h2 className="text-xl font-semibold">GitHub</h2>
          </div>
          <p className="text-sm text-gray-400 mb-4">
            Used for creating repositories and pushing your generated code. Create a <a href="https://github.com/settings/tokens/new?scopes=repo" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Personal Access Token</a> with `repo` scope.
          </p>
          <div>
            <label htmlFor="githubPat" className="block text-sm font-medium text-gray-300 mb-1">
              Personal Access Token (PAT)
            </label>
            <input
              type="password"
              id="githubPat"
              name="githubPat"
              value={localSettings.githubPat}
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

        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <SparklesIcon className="h-6 w-6 text-yellow-400" />
            <h2 className="text-xl font-semibold">Pro Plan</h2>
            {isPro && (
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-2.5 py-0.5 rounded-full text-xs font-bold">
                PRO
              </span>
            )}
          </div>
          {isPro ? (
            <div>
              <p className="text-sm text-gray-400 mb-4">
                Thank you for your support! Your Pro badge is now active on your profile.
              </p>
              <button
                type="button"
                onClick={() => setIsPro(false)}
                className="bg-white/10 text-white px-4 py-2 text-sm rounded-md font-semibold hover:bg-white/20 transition-colors"
              >
                Deactivate Pro Badge
              </button>
            </div>
          ) : (
            <div>
              <p className="text-sm text-gray-400 mb-4">
                Support the development of Silo Build and get a "PRO" badge next to your name.
              </p>
              <a
                href="https://pay.digitalfemsa.io/link/3dfd409c47a041e9bdc310578db6a91e"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-yellow-500 text-black px-6 py-2 rounded-md font-bold hover:bg-yellow-600 transition-colors"
              >
                Upgrade to Pro
              </a>
              <button
                type="button"
                onClick={() => setIsPro(true)}
                className="ml-4 text-xs text-gray-400 hover:text-white underline"
              >
                Already upgraded? Activate badge.
              </button>
            </div>
          )}
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
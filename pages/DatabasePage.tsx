import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Settings } from '../types';
import { SupabaseLogo } from '../components/icons';

const initialSettings: Settings = {
    vercelApiKey: '',
    supabaseUrl: '',
    supabaseAnonKey: '',
    stripePublicKey: '',
    stripeSecretKey: '',
};

export const DatabasePage: React.FC = () => {
    const [settings] = useLocalStorage<Settings>('ai-app-builder-settings', initialSettings);

  return (
    <div className="p-8 h-full overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6">Database Integration</h1>
      
      <div className="bg-white/5 border border-white/10 rounded-lg p-6 max-w-2xl">
        <div className="flex items-center gap-4 mb-4">
            <SupabaseLogo className="h-8" />
            <h2 className="text-2xl font-semibold">Supabase</h2>
        </div>
        <p className="text-gray-400 mb-6">
            Your Supabase credentials are used by the AI to generate code that directly interacts with your database. 
            You can configure your keys in the Settings page.
        </p>

        {settings.supabaseUrl && settings.supabaseAnonKey ? (
            <div>
                <h3 className="text-lg font-semibold mb-3">Current Configuration:</h3>
                <div className="space-y-3 text-sm">
                    <div>
                        <label className="block text-gray-400 text-xs mb-1">Supabase URL</label>
                        <p className="font-mono bg-black/30 p-2 rounded-md truncate">{settings.supabaseUrl}</p>
                    </div>
                    <div>
                        <label className="block text-gray-400 text-xs mb-1">Supabase Anon Key</label>
                        <p className="font-mono bg-black/30 p-2 rounded-md truncate">{settings.supabaseAnonKey}</p>
                    </div>
                </div>
                <a href="#/dashboard/settings" className="mt-6 inline-block text-blue-400 hover:underline">
                    Update settings &rarr;
                </a>
            </div>
        ) : (
            <div className="text-center p-6 border-2 border-dashed border-white/20 rounded-lg">
                <p className="text-gray-300">You haven't configured your Supabase credentials yet.</p>
                <a href="#/dashboard/settings" className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600 transition-colors">
                    Configure Now
                </a>
            </div>
        )}
      </div>
    </div>
  );
};

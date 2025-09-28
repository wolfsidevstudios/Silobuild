import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Settings } from '../types';
import { DatabaseIcon, SettingsIcon, SupabaseLogo } from '../components/icons';

// FIX: `geminiApiKey` is removed from settings per guidelines.
const initialSettings: Settings = {
  vercelApiKey: '',
  supabaseUrl: '',
  supabaseAnonKey: '',
  stripePublicKey: '',
  stripeSecretKey: '',
};

export const DatabasePage: React.FC = () => {
  const [settings] = useLocalStorage<Settings>('ai-app-builder-settings', initialSettings);

  const isConfigured = settings.supabaseUrl && settings.supabaseAnonKey;

  return (
    <div className="p-8">
      <div className="flex items-center gap-4 mb-8">
        <DatabaseIcon className="w-8 h-8 text-blue-400" />
        <h1 className="text-3xl font-bold text-white">Database Viewer</h1>
      </div>
      
      <div className="bg-white/5 border border-white/10 rounded-xl p-8">
        <div className="flex items-center gap-4 mb-6">
            <SupabaseLogo className="h-10" />
            <div>
                <h2 className="text-xl font-bold">Supabase Integration</h2>
                <p className={`text-sm ${isConfigured ? 'text-green-400' : 'text-yellow-400'}`}>
                    {isConfigured ? 'Credentials configured' : 'Not configured'}
                </p>
            </div>
        </div>

        {!isConfigured ? (
            <div className="text-center py-10">
                <p className="text-gray-300 mb-4">
                    Please add your Supabase URL and Anon Key in the settings to view your database tables.
                </p>
                <a href="#/dashboard/settings" className="bg-blue-500 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-600 transition-colors text-sm inline-flex items-center gap-2">
                    <SettingsIcon className="w-4 h-4" /> Go to Settings
                </a>
            </div>
        ) : (
            <div className="text-center py-10">
                <p className="text-gray-300">
                    Database table viewer is coming soon!
                </p>
                <p className="text-gray-500 text-sm mt-2">
                    Once implemented, you'll be able to see your tables and data right here.
                </p>
            </div>
        )}
      </div>
    </div>
  );
};
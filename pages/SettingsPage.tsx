// FIX: Replaced placeholder content with a fully functional SettingsPage component.
import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Settings } from '../types';
import { KeyIcon, GeminiLogo, VercelIcon, SupabaseLogo, StripeLogo, GithubIcon, SaveIcon, NetlifyIcon } from '../components/icons';

const initialSettings: Settings = {
  geminiApiKey: '',
  vercelApiKey: '',
  supabaseUrl: '',
  supabaseAnonKey: '',
  stripePublicKey: '',
  stripeSecretKey: '',
  githubPat: '',
  netlifyPat: '',
};

const SettingsInput: React.FC<{
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    icon: React.ReactNode;
    isPassword?: boolean;
}> = ({ label, value, onChange, placeholder, icon, isPassword = true }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {icon}
            </div>
            <input
                type={isPassword ? 'password' : 'text'}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    </div>
);


export const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useLocalStorage<Settings>('ai-app-builder-settings', initialSettings);
  const [localSettings, setLocalSettings] = useState<Settings>(initialSettings);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof Settings) => {
    setLocalSettings({ ...localSettings, [key]: e.target.value });
    setIsSaved(false);
  };

  const handleSave = () => {
    setSettings(localSettings);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-6">
        <KeyIcon className="w-8 h-8 text-blue-500" />
        <h1 className="text-3xl font-bold">API Key Settings</h1>
      </div>
      <p className="text-gray-600 mb-8 max-w-3xl">
        Your API keys are stored securely in your browser's local storage and are never sent to our servers. They are used directly by your browser to communicate with the respective services.
      </p>

      <div className="max-w-2xl mx-auto space-y-8 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
        <SettingsInput 
            label="Google Gemini API Key"
            value={localSettings.geminiApiKey}
            onChange={(e) => handleChange(e, 'geminiApiKey')}
            placeholder="Enter your Gemini API Key"
            icon={<GeminiLogo />}
        />
        <SettingsInput 
            label="Vercel Access Token"
            value={localSettings.vercelApiKey}
            onChange={(e) => handleChange(e, 'vercelApiKey')}
            placeholder="Enter your Vercel Access Token"
            icon={<VercelIcon className="h-5 w-5 text-black" />}
        />
         <SettingsInput 
            label="GitHub Personal Access Token"
            value={localSettings.githubPat}
            onChange={(e) => handleChange(e, 'githubPat')}
            placeholder="Enter your GitHub PAT"
            icon={<GithubIcon className="w-5 h-5 text-black" />}
        />
        <SettingsInput
            label="Netlify Access Token"
            value={localSettings.netlifyPat}
            onChange={(e) => handleChange(e, 'netlifyPat')}
            placeholder="Enter your Netlify Access Token"
            icon={<NetlifyIcon className="w-5 h-5" />}
        />
        <div className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Service Integrations</h2>
            <div className="space-y-6">
                <div>
                     <h3 className="text-lg font-medium mb-3 flex items-center gap-2"><SupabaseLogo /> Supabase</h3>
                     <div className="space-y-4">
                        <SettingsInput 
                            label="Supabase URL"
                            value={localSettings.supabaseUrl}
                            onChange={(e) => handleChange(e, 'supabaseUrl')}
                            placeholder="https://<project-id>.supabase.co"
                            icon={<div className="w-5 h-5"/>}
                            isPassword={false}
                        />
                         <SettingsInput 
                            label="Supabase Anon Key"
                            value={localSettings.supabaseAnonKey}
                            onChange={(e) => handleChange(e, 'supabaseAnonKey')}
                            placeholder="Supabase public anon key"
                            icon={<div className="w-5 h-5"/>}
                        />
                     </div>
                </div>
                 <div>
                     <h3 className="text-lg font-medium mb-3 flex items-center gap-2"><StripeLogo /> Stripe</h3>
                     <div className="space-y-4">
                        <SettingsInput 
                            label="Stripe Public Key"
                            value={localSettings.stripePublicKey}
                            onChange={(e) => handleChange(e, 'stripePublicKey')}
                            placeholder="pk_live_..."
                             icon={<div className="w-5 h-5"/>}
                        />
                         <SettingsInput 
                            label="Stripe Secret Key (optional)"
                            value={localSettings.stripeSecretKey}
                            onChange={(e) => handleChange(e, 'stripeSecretKey')}
                            placeholder="sk_live_... (used for AI-generated backend logic)"
                             icon={<div className="w-5 h-5"/>}
                        />
                     </div>
                </div>
            </div>
        </div>
        <div className="flex justify-end pt-6">
            <button 
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
                <SaveIcon />
                {isSaved ? 'Saved!' : 'Save Settings'}
            </button>
        </div>
      </div>
    </div>
  );
};
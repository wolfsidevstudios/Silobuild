import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Settings, GeminiModel, Secret } from '../types';
import { IntegrationsIcon, GeminiLogo, VercelIcon, SupabaseLogo, StripeLogo, GithubIcon, NetlifyIcon, SaveIcon, KeyIcon, TrashIcon } from '../components/icons';
import { showLocalNotification } from '../utils/projectUtils';
import { GitHubDeviceFlowModal } from '../components/GitHubDeviceFlowModal';
import { getGitHubUser } from '../services/githubService';
import { Spinner } from '../components/Spinner';

const initialSettings: Settings = {
  geminiApiKey: '',
  supabaseUrl: '',
  supabaseAnonKey: '',
  stripePublicKey: '',
  stripeSecretKey: '',
  githubPat: '',
  netlifyPat: '',
  model: 'gemini-2.5-flash',
  secrets: [],
};

const SettingsInput: React.FC<{
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    isPassword?: boolean;
}> = ({ label, value, onChange, placeholder, isPassword = true }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input
            type={isPassword ? 'password' : 'text'}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    </div>
);


const IntegrationCard: React.FC<{
    icon?: React.ReactNode;
    title: string;
    description: string;
    children: React.ReactNode;
}> = ({ icon, title, description, children }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-4 mb-3 min-h-[40px]">
            {icon}
            <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <div className="space-y-4 border-t border-gray-200 pt-4">
            {children}
        </div>
    </div>
);


export const IntegrationsPage: React.FC = () => {
    const [settings, setSettings] = useLocalStorage<Settings>('ai-app-builder-settings', initialSettings);
    const [localSettings, setLocalSettings] = useState<Settings>(initialSettings);
    const [isSaved, setIsSaved] = useState(false);
    const [newSecretName, setNewSecretName] = useState('');
    const [newSecretValue, setNewSecretValue] = useState('');
    const [isDeviceFlowModalOpen, setIsDeviceFlowModalOpen] = useState(false);
    const [githubUser, setGithubUser] = useState<{ login: string; avatar_url: string; } | null>(null);
    const [isLoadingGitHubUser, setIsLoadingGitHubUser] = useState(false);


    useEffect(() => {
        setLocalSettings(settings);
    }, [settings]);

    useEffect(() => {
        const fetchUser = async () => {
            if (localSettings.githubPat && !githubUser) {
                setIsLoadingGitHubUser(true);
                try {
                    const user = await getGitHubUser(localSettings.githubPat);
                    setGithubUser(user);
                } catch (error) {
                    console.error("Failed to fetch GitHub user, token might be invalid.", error);
                    // Token is likely invalid, clear it
                    handleChange('githubPat', '');
                    setGithubUser(null);
                } finally {
                    setIsLoadingGitHubUser(false);
                }
            } else if (!localSettings.githubPat) {
                setGithubUser(null);
            }
        };
        fetchUser();
    }, [localSettings.githubPat]);

    const handleChange = (key: keyof Settings, value: any) => {
        setLocalSettings(prev => ({ ...prev, [key]: value }));
        setIsSaved(false);
    };

    const handleSave = () => {
        setSettings(localSettings);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
        showLocalNotification('Warning: Settings Changed', {
            body: 'Your integration settings have been updated.',
        });
    };

    const handleAddSecret = () => {
        if (!newSecretName.trim() || !newSecretValue.trim()) {
            alert("Please provide both a name and a value for the secret.");
            return;
        }
        const newSecret = {
            id: crypto.randomUUID(),
            name: newSecretName,
            value: newSecretValue,
        };
        const updatedSecrets = [...(localSettings.secrets || []), newSecret];
        handleChange('secrets', updatedSecrets);
        setNewSecretName('');
        setNewSecretValue('');
    };
    
    const handleDeleteSecret = (id: string) => {
        const updatedSecrets = (localSettings.secrets || []).filter(s => s.id !== id);
        handleChange('secrets', updatedSecrets);
    };

    const handleGitHubConnectSuccess = (token: string) => {
        handleChange('githubPat', token);
    };
    
    const handleGitHubDisconnect = () => {
        handleChange('githubPat', '');
        setGithubUser(null);
    };

  return (
    <div className="p-8">
        <div className="sticky top-0 bg-gray-50/80 backdrop-blur-md z-10 py-4 -my-4 mb-4">
             <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <IntegrationsIcon className="w-8 h-8 text-blue-500" />
                    <h1 className="text-3xl font-bold">Integrations</h1>
                </div>
                 <button 
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                    <SaveIcon />
                    {isSaved ? 'Saved!' : 'Save Settings'}
                </button>
            </div>
             <p className="text-gray-600 mt-2 max-w-3xl">
                Connect your favorite tools. Your keys are stored securely in your browser and are never sent to our servers. These integrations are for Silo Build's own features (e.g., code generation, deployment). To build an app that uses an AI service, simply ask Codepilot in the builder and it will prompt you for the necessary API keys for your app.
            </p>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <IntegrationCard 
            icon={<GeminiLogo className="h-8"/>}
            title="Google Gemini"
            description="The core AI model that powers code generation and chat."
        >
             <SettingsInput 
                label="Gemini API Key"
                value={localSettings.geminiApiKey}
                onChange={(e) => handleChange('geminiApiKey', e.target.value)}
                placeholder="Enter your Gemini API Key"
            />
            <div className="pt-4 mt-4 border-t border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">Model Selection</label>
                <div className="flex flex-col sm:flex-row gap-4">
                    <label className="flex items-start sm:items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50 flex-1">
                        <input
                            type="radio"
                            name="gemini-model"
                            value="gemini-2.5-flash"
                            checked={localSettings.model === 'gemini-2.5-flash' || !localSettings.model}
                            onChange={() => handleChange('model', 'gemini-2.5-flash')}
                            className="h-4 w-4 mt-1 sm:mt-0 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <div>
                            <span className="text-sm font-medium text-gray-800">Gemini 2.5 Flash</span>
                            <p className="text-xs text-gray-500">Fast and cost-effective for most tasks.</p>
                        </div>
                    </label>
                    <label className="flex items-start sm:items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50 flex-1">
                        <input
                            type="radio"
                            name="gemini-model"
                            value="gemini-2.5-pro"
                            checked={localSettings.model === 'gemini-2.5-pro'}
                            onChange={() => handleChange('model', 'gemini-2.5-pro')}
                            className="h-4 w-4 mt-1 sm:mt-0 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <div>
                            <span className="text-sm font-medium text-gray-800">Gemini 2.5 Pro</span>
                            <p className="text-xs text-gray-500">Highest capability for complex tasks.</p>
                        </div>
                    </label>
                </div>
            </div>
        </IntegrationCard>
        <IntegrationCard 
            icon={<GithubIcon className="w-7 h-7 text-black"/>}
            title="GitHub"
            description="Enable creating repositories and pushing code directly to GitHub."
        >
            {isLoadingGitHubUser ? (
                <div className="flex items-center justify-center h-20">
                    <Spinner />
                </div>
            ) : githubUser ? (
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src={githubUser.avatar_url} alt={githubUser.login} className="w-10 h-10 rounded-full" />
                        <div>
                            <p className="font-semibold">{githubUser.login}</p>
                            <p className="text-sm text-gray-500">Connected</p>
                        </div>
                    </div>
                    <button 
                        onClick={handleGitHubDisconnect}
                        className="px-3 py-1.5 text-sm font-medium bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                    >
                        Disconnect
                    </button>
                </div>
            ) : (
                <div>
                     <p className="text-sm text-gray-500 mb-2">Authorize Silo Build to access your repositories.</p>
                     <button 
                        onClick={() => setIsDeviceFlowModalOpen(true)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors"
                    >
                        <GithubIcon />
                        <span>Connect with GitHub</span>
                    </button>
                </div>
            )}
        </IntegrationCard>
        <IntegrationCard 
            icon={<NetlifyIcon className="h-7"/>}
            title="Netlify"
            description="Connect your Netlify account for one-click deployments."
        >
             <SettingsInput
                label="Netlify Access Token"
                value={localSettings.netlifyPat}
                onChange={(e) => handleChange('netlifyPat', e.target.value)}
                placeholder="Enter your Netlify Access Token"
            />
        </IntegrationCard>
         <IntegrationCard 
            icon={<SupabaseLogo className="h-8"/>}
            title="Supabase"
            description="Scaffold projects with a Supabase backend for database and auth."
        >
            <SettingsInput 
                label="Supabase URL"
                value={localSettings.supabaseUrl}
                onChange={(e) => handleChange('supabaseUrl', e.target.value)}
                placeholder="https://<project-id>.supabase.co"
                isPassword={false}
            />
            <SettingsInput 
                label="Supabase Anon Key"
                value={localSettings.supabaseAnonKey}
                onChange={(e) => handleChange('supabaseAnonKey', e.target.value)}
                placeholder="Supabase public anon key"
            />
        </IntegrationCard>
        <IntegrationCard 
            icon={<StripeLogo className="h-7"/>}
            title="Stripe"
            description="Generate applications with payment processing capabilities."
        >
             <SettingsInput 
                label="Stripe Public Key"
                value={localSettings.stripePublicKey}
                onChange={(e) => handleChange('stripePublicKey', e.target.value)}
                placeholder="pk_live_..."
            />
            <SettingsInput 
                label="Stripe Secret Key (optional)"
                value={localSettings.stripeSecretKey}
                onChange={(e) => handleChange('stripeSecretKey', e.target.value)}
                placeholder="sk_live_... (used for backend logic)"
            />
        </IntegrationCard>
        <IntegrationCard
            icon={<KeyIcon />}
            title="Custom Secrets"
            description="Store custom API keys or other secrets. The AI can use these in your projects if you reference them by name in your prompts."
        >
            <div className="space-y-3">
                {(localSettings.secrets || []).map(secret => (
                    <div key={secret.id} className="flex items-center justify-between gap-4 p-2 bg-gray-50 rounded-lg border border-gray-200">
                        <span className="font-mono text-sm text-gray-800 truncate">{secret.name}</span>
                        <div className="flex items-center gap-2">
                            <input
                                type="password"
                                readOnly
                                value={secret.value}
                                className="font-mono text-sm text-gray-500 bg-transparent border-none p-0 w-24 text-right focus:outline-none"
                            />
                            <button onClick={() => handleDeleteSecret(secret.id)} className="text-gray-400 hover:text-red-500 flex-shrink-0">
                                <TrashIcon className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
                {(!localSettings.secrets || localSettings.secrets.length === 0) && (
                    <p className="text-sm text-gray-500 text-center py-2">No custom secrets added yet.</p>
                )}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                <h4 className="text-sm font-medium text-gray-800">Add New Secret</h4>
                <div className="flex flex-col sm:flex-row gap-2">
                    <input
                        value={newSecretName}
                        onChange={(e) => setNewSecretName(e.target.value)}
                        placeholder="Secret Name (e.g., MY_API_KEY)"
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        value={newSecretValue}
                        onChange={(e) => setNewSecretValue(e.target.value)}
                        placeholder="Secret Value"
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={handleAddSecret}
                        className="px-4 py-2 text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300 rounded-lg transition-colors"
                    >
                        Add Secret
                    </button>
                </div>
            </div>
        </IntegrationCard>
      </div>
      <GitHubDeviceFlowModal
        isOpen={isDeviceFlowModalOpen}
        onClose={() => setIsDeviceFlowModalOpen(false)}
        onSuccess={handleGitHubConnectSuccess}
      />
    </div>
  );
};
import React, { useState, useEffect, useRef } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { AuthConfig } from '../types';
import { KeyIcon, SaveIcon, GithubIcon, UploadIcon } from '../components/icons';
import { showLocalNotification } from '../utils/projectUtils';

const GoogleIcon = () => <svg viewBox="0 0 48 48" className="w-5 h-5"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path><path fill="#FF3D00" d="M6.306 14.691c-1.645 3.121-2.483 6.64-2.483 10.309c0 3.669.838 7.188 2.483 10.309l-5.657 5.657C.623 37.062 0 32.54 0 28s.623-9.062 2.649-12.967l5.657 5.658z"></path><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-5.657-5.657c-1.556 1.036-3.46 1.652-5.752 1.652c-4.796 0-8.91-2.756-10.638-6.638l-5.657 5.657C7.031 39.103 14.864 44 24 44z"></path><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l5.657 5.657c3.128-2.857 5.21-6.942 5.21-11.614c0-1.341-.138-2.65-.389-3.917z"></path></svg>;
const XIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>;

const initialAuthConfig: AuthConfig = {
  appName: 'My Awesome App',
  appLogo: null,
  providers: {
    google: { enabled: true, clientId: '' },
    github: { enabled: false, clientId: '', clientSecret: '' },
    x: { enabled: false, clientId: '', clientSecret: '' },
  },
};

const ToggleSwitch: React.FC<{ enabled: boolean; onChange: (enabled: boolean) => void; }> = ({ enabled, onChange }) => (
    <button type="button" className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${enabled ? 'bg-blue-600' : 'bg-gray-200'}`} onClick={() => onChange(!enabled)}>
        <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enabled ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
);

export const AuthPage: React.FC = () => {
    const [authConfig, setAuthConfig] = useLocalStorage<AuthConfig>('silo-build-auth-config', initialAuthConfig);
    const [localConfig, setLocalConfig] = useState<AuthConfig>(initialAuthConfig);
    const [isSaved, setIsSaved] = useState(true);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setLocalConfig(authConfig);
    }, [authConfig]);

    const handleSave = () => {
        setAuthConfig(localConfig);
        setIsSaved(true);
        showLocalNotification('Settings Saved', { body: 'Authentication configuration has been updated.' });
    };

    const handleConfigChange = (path: string, value: any) => {
        const keys = path.split('.');
        setLocalConfig(prev => {
            const newConfig = JSON.parse(JSON.stringify(prev)); // Deep copy
            let current = newConfig;
            for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]];
            }
            current[keys[keys.length - 1]] = value;
            return newConfig;
        });
        setIsSaved(false);
    };
    
    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            handleConfigChange('appLogo', reader.result as string);
          };
          reader.readAsDataURL(file);
        }
    };


    return (
        <div className="h-full w-full grid grid-cols-2">
            {/* Left side: Preview */}
            <div className="bg-gray-100 flex items-center justify-center p-8">
                <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-gray-200 p-8">
                    <div className="text-center mb-8">
                        {localConfig.appLogo ? (
                            <img src={localConfig.appLogo} alt="App Logo" className="w-16 h-16 mx-auto rounded-xl mb-4" />
                        ) : (
                            <div className="w-16 h-16 mx-auto rounded-xl bg-gray-200 mb-4"></div>
                        )}
                        <h1 className="text-2xl font-bold">{localConfig.appName}</h1>
                        <p className="text-gray-500 text-sm">Sign in to continue</p>
                    </div>
                    <form className="space-y-4">
                        <input type="email" placeholder="Email" className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-sm" disabled/>
                        <input type="password" placeholder="Password" className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-sm" disabled/>
                        <button className="w-full p-3 bg-gray-800 text-white rounded-lg font-semibold" disabled>Sign In</button>
                    </form>
                    <div className="relative flex py-5 items-center">
                        <div className="flex-grow border-t border-gray-200"></div>
                        <span className="flex-shrink mx-4 text-gray-400 text-xs">OR CONTINUE WITH</span>
                        <div className="flex-grow border-t border-gray-200"></div>
                    </div>
                    <div className="space-y-3">
                        {localConfig.providers.google.enabled && <button className="w-full flex items-center justify-center gap-3 p-3 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50" disabled><GoogleIcon /> Google</button>}
                        {localConfig.providers.github.enabled && <button className="w-full flex items-center justify-center gap-3 p-3 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50" disabled><GithubIcon className="w-5 h-5"/> GitHub</button>}
                        {localConfig.providers.x.enabled && <button className="w-full flex items-center justify-center gap-3 p-3 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50" disabled><XIcon /> X</button>}
                    </div>
                </div>
            </div>

            {/* Right side: Config */}
            <div className="p-8 overflow-y-auto">
                <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        <KeyIcon className="w-8 h-8 text-blue-500" />
                        <h1 className="text-3xl font-bold">Authentication</h1>
                    </div>
                    <button onClick={handleSave} disabled={isSaved} className="flex items-center gap-2 px-6 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:bg-gray-400">
                        <SaveIcon />
                        {isSaved ? 'Saved' : 'Save Changes'}
                    </button>
                </div>
                <p className="text-gray-600 mb-8 max-w-2xl">Configure how users will sign in to your generated applications. The AI will use these settings to build your login flow.</p>
                
                <div className="space-y-8">
                    {/* App Details */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="text-lg font-bold mb-4">App Details</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">App Name</label>
                                <input type="text" value={localConfig.appName} onChange={e => handleConfigChange('appName', e.target.value)} className="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">App Logo</label>
                                <input type="file" accept="image/*" onChange={handleLogoChange} ref={fileInputRef} className="hidden" />
                                <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-white hover:bg-gray-100 border border-gray-300 text-gray-800 rounded-lg transition-colors">
                                    <UploadIcon />
                                    {localConfig.appLogo ? "Change Logo" : "Upload Logo"}
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Providers */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="text-lg font-bold mb-4">Providers</h3>
                        <div className="space-y-6">
                            {/* Google */}
                            <div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3"><GoogleIcon /><span className="font-semibold">Google</span></div>
                                    <ToggleSwitch enabled={localConfig.providers.google.enabled} onChange={val => handleConfigChange('providers.google.enabled', val)} />
                                </div>
                                {localConfig.providers.google.enabled && <div className="mt-4 pl-8 space-y-2">
                                    <input type="text" value={localConfig.providers.google.clientId} onChange={e => handleConfigChange('providers.google.clientId', e.target.value)} placeholder="Google Client ID" className="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg text-sm"/>
                                </div>}
                            </div>
                             {/* GitHub */}
                            <div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3"><GithubIcon className="w-5 h-5" /><span className="font-semibold">GitHub</span></div>
                                    <ToggleSwitch enabled={localConfig.providers.github.enabled} onChange={val => handleConfigChange('providers.github.enabled', val)} />
                                </div>
                                {localConfig.providers.github.enabled && <div className="mt-4 pl-8 space-y-2">
                                    <input type="text" value={localConfig.providers.github.clientId} onChange={e => handleConfigChange('providers.github.clientId', e.target.value)} placeholder="GitHub Client ID" className="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg text-sm"/>
                                    <input type="password" value={localConfig.providers.github.clientSecret} onChange={e => handleConfigChange('providers.github.clientSecret', e.target.value)} placeholder="GitHub Client Secret" className="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg text-sm"/>
                                </div>}
                            </div>
                             {/* X */}
                            <div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3"><XIcon /><span className="font-semibold">X (Twitter)</span></div>
                                    <ToggleSwitch enabled={localConfig.providers.x.enabled} onChange={val => handleConfigChange('providers.x.enabled', val)} />
                                </div>
                                {localConfig.providers.x.enabled && <div className="mt-4 pl-8 space-y-2">
                                    <input type="text" value={localConfig.providers.x.clientId} onChange={e => handleConfigChange('providers.x.clientId', e.target.value)} placeholder="X Client ID (API Key)" className="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg text-sm"/>
                                    <input type="password" value={localConfig.providers.x.clientSecret} onChange={e => handleConfigChange('providers.x.clientSecret', e.target.value)} placeholder="X Client Secret (API Key Secret)" className="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg text-sm"/>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
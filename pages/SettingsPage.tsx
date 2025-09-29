// FIX: Replaced API key management with application-level settings for notifications and data management.
import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { SettingsIcon, TrashIcon } from '../components/icons';

interface UserPreferences {
  notifications: {
    updates: boolean;
    deployments: boolean;
  };
}

const initialPreferences: UserPreferences = {
  notifications: {
    updates: true,
    deployments: true,
  }
};

const ToggleSwitch: React.FC<{ label: string; enabled: boolean; onChange: (enabled: boolean) => void; description: string; }> = ({ label, enabled, onChange, description }) => (
    <div className="flex items-center justify-between py-4 border-b border-gray-200">
        <div>
            <label className="font-medium text-gray-800">{label}</label>
            <p className="text-sm text-gray-500">{description}</p>
        </div>
        <button
            type="button"
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                enabled ? 'bg-blue-600' : 'bg-gray-200'
            }`}
            onClick={() => onChange(!enabled)}
        >
            <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    enabled ? 'translate-x-5' : 'translate-x-0'
                }`}
            />
        </button>
    </div>
);


export const SettingsPage: React.FC = () => {
  const [preferences, setPreferences] = useLocalStorage<UserPreferences>('silo-build-preferences', initialPreferences);
  const [, setProjects] = useLocalStorage('ai-app-builder-projects', []);
  const [, setSettings] = useLocalStorage('ai-app-builder-settings', {});

  const handleToggle = (key: keyof UserPreferences['notifications']) => {
      setPreferences(prev => ({
          ...prev,
          notifications: {
              ...prev.notifications,
              [key]: !prev.notifications[key]
          }
      }));
  };
  
  const handleClearProjects = () => {
    if(window.confirm('Are you sure you want to delete all your projects? This action cannot be undone.')) {
        setProjects([]);
        alert('All projects have been deleted.');
    }
  };

  const handleClearSettings = () => {
      if(window.confirm('Are you sure you want to delete all your API keys and settings? This action cannot be undone.')) {
        setSettings({});
        alert('All settings have been deleted.');
    }
  }

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-6">
        <SettingsIcon className="w-8 h-8 text-blue-500" />
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>
      <p className="text-gray-600 mb-8 max-w-3xl">
        Manage your application preferences and data. API keys and service credentials can be configured on the <a href="#/dashboard/integrations" className="text-blue-600 hover:underline">Integrations</a> page.
      </p>

      <div className="max-w-2xl mx-auto space-y-10">
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Notifications</h2>
            <p className="text-gray-500 mb-4 text-sm">Configure which notifications you want to receive.</p>
            <ToggleSwitch 
                label="Product Updates"
                description="Receive notifications about new features and improvements."
                enabled={preferences.notifications.updates}
                onChange={() => handleToggle('updates')}
            />
             <ToggleSwitch 
                label="Deployment Status"
                description="Get notified when your deployments succeed or fail."
                enabled={preferences.notifications.deployments}
                onChange={() => handleToggle('deployments')}
            />
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Data Management</h2>
            <p className="text-gray-500 mb-4 text-sm">Manage the data stored in your browser's local storage.</p>
            <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div>
                        <h3 className="font-medium">Clear Project Data</h3>
                        <p className="text-sm text-gray-500">This will permanently delete all of your saved projects.</p>
                    </div>
                     <button onClick={handleClearProjects} className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors">
                        <TrashIcon className="w-4 h-4" />
                        Clear Projects
                    </button>
                </div>
                 <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div>
                        <h3 className="font-medium">Clear Settings Data</h3>
                        <p className="text-sm text-gray-500">This will permanently delete all saved API keys and credentials.</p>
                    </div>
                     <button onClick={handleClearSettings} className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors">
                        <TrashIcon className="w-4 h-4" />
                        Clear Settings
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
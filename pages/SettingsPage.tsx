// FIX: Replaced API key management with application-level settings for notifications and data management.
import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { SettingsIcon, TrashIcon } from '../components/icons';
import { showLocalNotification } from '../utils/projectUtils';

interface UserPreferences {
  notifications: {
    updates: boolean;
    deployments: boolean;
  };
  layout?: {
    promptInputLayout: 'floating' | 'inline';
  };
}

const initialPreferences: UserPreferences = {
  notifications: {
    updates: true,
    deployments: true,
  },
  layout: {
    promptInputLayout: 'floating',
  },
};

const ToggleSwitch: React.FC<{ label: string; enabled: boolean; onChange: (enabled: boolean) => void; description: string; disabled?: boolean; }> = ({ label, enabled, onChange, description, disabled = false }) => (
    <div className={`flex items-center justify-between py-4 border-b border-gray-200 last:border-b-0 ${disabled ? 'opacity-50' : ''}`}>
        <div>
            <label className={`font-medium ${disabled ? 'text-gray-500' : 'text-gray-800'}`}>{label}</label>
            <p className="text-sm text-gray-500">{description}</p>
        </div>
        <button
            type="button"
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                enabled ? 'bg-blue-600' : 'bg-gray-200'
            } ${disabled ? 'cursor-not-allowed' : ''}`}
            onClick={() => !disabled && onChange(!enabled)}
            disabled={disabled}
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
  const [notificationPermission, setNotificationPermission] = useState('Notification' in window ? Notification.permission : 'unsupported');

  useEffect(() => {
    // For modern browsers that support the Permissions API and onchange event
    if ('permissions' in navigator && typeof navigator.permissions.query === 'function') {
        navigator.permissions.query({ name: 'notifications' }).then((permissionStatus) => {
            setNotificationPermission(permissionStatus.state);
            permissionStatus.onchange = () => {
                setNotificationPermission(permissionStatus.state);
            };
        }).catch(() => {
            // Fallback for browsers that might have the API but error (e.g., Firefox in some contexts)
            setNotificationPermission('Notification' in window ? Notification.permission : 'unsupported');
        });
    } else if (!('Notification' in window)) {
        setNotificationPermission('unsupported');
    } else {
        // Fallback for older browsers like Safari on iOS pre-Permissions API for notifications
        setNotificationPermission(Notification.permission);
    }
  }, []);


  const handleToggle = (key: keyof UserPreferences['notifications']) => {
      const newPreference = !preferences.notifications[key];
      setPreferences(prev => ({
          ...prev,
          notifications: {
              ...prev.notifications,
              [key]: newPreference
          }
      }));
      showLocalNotification('Warning: Settings Changed', {
          body: `Notifications for "${key}" have been ${newPreference ? 'enabled' : 'disabled'}.`
      });
  };

    const handleLayoutChange = (layout: 'floating' | 'inline') => {
        setPreferences(prev => ({
            ...prev,
            layout: {
                ...prev.layout,
                promptInputLayout: layout,
            }
        }));
    };
  
  const handleClearProjects = () => {
    if(window.confirm('Are you sure you want to delete all your projects? This action cannot be undone.')) {
        setProjects([]);
        alert('All projects have been deleted.');
        showLocalNotification('Warning: Data Cleared', {
            body: 'All project data has been permanently deleted.'
        });
    }
  };

  const handleClearSettings = () => {
      if(window.confirm('Are you sure you want to delete all your API keys and settings? This action cannot be undone.')) {
        setSettings({});
        alert('All settings have been deleted.');
        showLocalNotification('Warning: Data Cleared', {
            body: 'All integration settings have been permanently deleted.'
        });
    }
  }

   const handleEnableNotifications = async () => {
    if (!('Notification' in window)) {
        alert('This browser does not support desktop notifications.');
        return;
    }

    if (Notification.permission === 'default') {
        const permission = await Notification.requestPermission();
        setNotificationPermission(permission);
    }
  };

  const currentLayout = preferences.layout?.promptInputLayout || 'floating';


  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-6">
        <SettingsIcon className="w-8 h-8 text-blue-500" />
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>
      <p className="text-gray-600 mb-8 max-w-3xl">
        Manage your application preferences and data. API keys, model selection, and service credentials can be configured on the <a href="#/dashboard/integrations" className="text-blue-600 hover:underline">Integrations</a> page.
      </p>

      <div className="max-w-2xl mx-auto space-y-10">
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Interface</h2>
            <p className="text-gray-500 mb-4 text-sm">Customize the builder layout.</p>

            <div className="py-4 border-b border-gray-200 last:border-b-0">
                <label className="font-medium text-gray-800">Prompt Input Layout</label>
                <p className="text-sm text-gray-500 mb-3">Choose where the prompt input box appears in the builder.</p>
                <fieldset className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <input
                            id="layout-floating"
                            type="radio"
                            name="layout"
                            value="floating"
                            checked={currentLayout === 'floating'}
                            onChange={() => handleLayoutChange('floating')}
                            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <label htmlFor="layout-floating" className="text-sm text-gray-700">Floating</label>
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            id="layout-inline"
                            type="radio"
                            name="layout"
                            value="inline"
                            checked={currentLayout === 'inline'}
                            onChange={() => handleLayoutChange('inline')}
                            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <label htmlFor="layout-inline" className="text-sm text-gray-700">In Chat Panel</label>
                    </div>
                </fieldset>
            </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Notifications</h2>
            <p className="text-gray-500 mb-4 text-sm">Enable browser notifications and choose what you want to be notified about.</p>

            <div className="flex items-center justify-between py-4 border-b border-gray-200">
                <div>
                    <label className="font-medium text-gray-800">Browser Push Notifications</label>
                    <p className="text-sm text-gray-500">
                        Status: <span className={`font-semibold capitalize ${
                            notificationPermission === 'granted' ? 'text-green-600' :
                            notificationPermission === 'denied' ? 'text-red-600' : 'text-gray-600'
                        }`}>{notificationPermission}</span>
                    </p>
                    {notificationPermission === 'denied' && (
                        <p className="text-xs text-red-500 mt-1">
                            Notifications are blocked. You'll need to enable them in your browser or OS settings.
                        </p>
                    )}
                </div>
                <button
                    onClick={handleEnableNotifications}
                    disabled={notificationPermission !== 'default'}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    Enable
                </button>
            </div>

            <ToggleSwitch 
                label="Product Updates"
                description="Receive notifications about new features and improvements."
                enabled={preferences.notifications.updates}
                onChange={() => handleToggle('updates')}
                disabled={notificationPermission !== 'granted'}
            />
             <ToggleSwitch 
                label="Deployment Status"
                description="Get notified when your deployments succeed or fail."
                enabled={preferences.notifications.deployments}
                onChange={() => handleToggle('deployments')}
                disabled={notificationPermission !== 'granted'}
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
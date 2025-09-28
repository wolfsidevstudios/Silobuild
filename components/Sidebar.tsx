import React from 'react';
import { UserProfile } from './UserProfile';
import { HomeIcon, SparklesIcon, SchemaIcon, DatabaseIcon, SettingsIcon, CodeIcon } from './icons';

interface SidebarProps {
    activeRoute: string;
}

const NavLink: React.FC<{ href: string; label: string; icon: React.ReactNode; isActive: boolean }> = ({ href, label, icon, isActive }) => (
    <a 
        href={href} 
        className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            isActive ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'
        }`}
    >
        {icon}
        {label}
    </a>
);

export const Sidebar: React.FC<SidebarProps> = ({ activeRoute }) => {
    const navItems = [
        { href: '#/dashboard/projects', label: 'Projects', icon: <HomeIcon />, id: 'projects' },
        { href: '#/dashboard/prompts', label: 'Prompt Library', icon: <SparklesIcon />, id: 'prompts' },
        { href: '#/dashboard/schema', label: 'Schema Builder', icon: <SchemaIcon />, id: 'schema' },
        { href: '#/dashboard/database', label: 'Database', icon: <DatabaseIcon />, id: 'database' },
        { href: '#/dashboard/beta', label: 'Beta Program', icon: <CodeIcon />, id: 'beta' },
    ];
    
    const settingsItem = { href: '#/dashboard/settings', label: 'Settings', icon: <SettingsIcon />, id: 'settings' };

    const checkActive = (id: string) => {
        if (id === 'projects') {
            return activeRoute.startsWith('#/dashboard') && !navItems.slice(1).some(item => activeRoute.includes(item.id)) && !activeRoute.includes(settingsItem.id);
        }
        return activeRoute.includes(id);
    }
    
    return (
        <aside className="w-64 bg-black/50 border-r border-white/10 flex flex-col p-4">
            <div className="mb-6">
                <a href="#/" className="text-xl font-bold">Silo Build</a>
            </div>
            <nav className="flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                    {navItems.map(item => (
                        <NavLink 
                            key={item.id} 
                            href={item.href} 
                            label={item.label} 
                            icon={item.icon} 
                            isActive={checkActive(item.id)}
                        />
                    ))}
                </div>
                <div>
                     <NavLink 
                        href={settingsItem.href} 
                        label={settingsItem.label} 
                        icon={settingsItem.icon} 
                        isActive={checkActive(settingsItem.id)}
                    />
                </div>
            </nav>
            <div className="mt-6 border-t border-white/10 pt-4">
                <UserProfile />
            </div>
        </aside>
    );
};

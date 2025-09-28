import React from 'react';
import { DatabaseIcon, HomeIcon, SettingsIcon } from './icons';
import { UserProfile } from './UserProfile';

const SidebarNavLink: React.FC<{ href: string; icon: React.ReactNode; label: string; }> = ({ href, icon, label }) => {
    // This hook ensures the component re-renders on hash change to update active styles
    const [hash, setHash] = React.useState(window.location.hash);
    React.useEffect(() => {
        const handleHashChange = () => setHash(window.location.hash);
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const isActive = hash.startsWith(href);

    return (
        <a 
            href={href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
        >
            {icon}
            {label}
        </a>
    )
}


export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white/5 border-r border-white/10 flex flex-col p-4">
      <div className="mb-8">
        <a href="#/dashboard" className="flex items-center gap-2 text-white font-bold text-xl px-2">
            AI App Builder
        </a>
      </div>
      <nav className="flex-1 flex flex-col gap-2">
        <SidebarNavLink href="#/dashboard/projects" icon={<HomeIcon />} label="Projects" />
        <SidebarNavLink href="#/dashboard/database" icon={<DatabaseIcon />} label="Database" />
        <SidebarNavLink href="#/dashboard/settings" icon={<SettingsIcon />} label="Settings" />
      </nav>
      <div className="mt-auto">
        <UserProfile />
      </div>
    </aside>
  );
};

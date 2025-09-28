import React from 'react';
import { HomeIcon, SettingsIcon, DatabaseIcon, FileIcon } from './icons';
import { UserProfile } from './UserProfile';

interface SidebarProps {
  activeRoute: string;
}

const NavLink: React.FC<{ href: string; isActive: boolean; icon: React.ReactNode; label: string }> = ({ href, isActive, icon, label }) => (
  <a
    href={href}
    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
      isActive ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'
    }`}
  >
    {icon}
    {label}
  </a>
);

export const Sidebar: React.FC<SidebarProps> = ({ activeRoute }) => {
  const page = activeRoute.split('/')[2] || 'projects';

  return (
    <aside className="w-64 bg-black/20 p-4 flex flex-col">
      <div className="mb-8">
        <a href="#/" className="flex items-center gap-2 text-white font-bold text-xl px-2">
          AI App Builder
        </a>
      </div>
      <nav className="flex flex-col gap-2">
        <NavLink href="#/dashboard/projects" isActive={page === 'projects'} icon={<FileIcon />} label="Projects" />
        <NavLink href="#/dashboard/database" isActive={page === 'database'} icon={<DatabaseIcon />} label="Database Viewer" />
        <NavLink href="#/dashboard/settings" isActive={page === 'settings'} icon={<SettingsIcon />} label="Settings & Integrations" />
      </nav>
      <div className="mt-auto space-y-4">
         <UserProfile />
         <NavLink href="#/" isActive={false} icon={<HomeIcon />} label="Back to Builder" />
      </div>
    </aside>
  );
};

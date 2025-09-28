import React from 'react';
import { DatabaseIcon, HomeIcon, ProjectIcon, SettingsIcon } from './icons';

interface SidebarProps {
  activeRoute: string;
}

const SidebarLink: React.FC<{
  href: string;
  isActive: boolean;
  icon: React.ReactNode;
  label: string;
}> = ({ href, isActive, icon, label }) => {
  return (
    <a
      href={href}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
        isActive
          ? 'bg-blue-500/20 text-blue-300'
          : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
      }`}
    >
      {icon}
      {label}
    </a>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ activeRoute }) => {
  return (
    <aside className="w-64 bg-black/50 border-r border-white/10 p-4 flex flex-col">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-white">AI App Builder</h1>
        <p className="text-xs text-gray-400">Dashboard</p>
      </div>
      <nav className="flex-1 flex flex-col gap-2">
        <SidebarLink
            href="#/dashboard"
            isActive={activeRoute === '#/dashboard' || activeRoute.startsWith('#/dashboard/projects')}
            icon={<ProjectIcon />}
            label="Projects"
        />
        <SidebarLink
            href="#/dashboard/database"
            isActive={activeRoute.startsWith('#/dashboard/database')}
            icon={<DatabaseIcon />}
            label="Database"
        />
        <SidebarLink
            href="#/dashboard/settings"
            isActive={activeRoute.startsWith('#/dashboard/settings')}
            icon={<SettingsIcon />}
            label="Settings & Integrations"
        />
      </nav>
      <div>
        <SidebarLink
            href="#/"
            isActive={false}
            icon={<HomeIcon />}
            label="Back to Builder"
        />
      </div>
    </aside>
  );
};

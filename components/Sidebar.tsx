import React from 'react';
import { DatabaseIcon, HomeIcon, SettingsIcon, PlusIcon, SparklesIcon, SchemaIcon, FlaskIcon, BugIcon, PaintBrushIcon, UsersIcon, AgentIcon } from './icons';
import { UserProfile } from './UserProfile';
import { useLocalStorage } from '../hooks/useLocalStorage';

const SidebarNavLink: React.FC<{ href: string; icon: React.ReactNode; label: string; isBeta?: boolean }> = ({ href, icon, label, isBeta }) => {
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
            className={`flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
        >
            <div className="flex items-center gap-3">
                {icon}
                {label}
            </div>
            {isBeta && <span className="text-xs font-bold bg-yellow-400/20 text-yellow-700 px-2 py-0.5 rounded-full">BETA</span>}
        </a>
    )
}


export const Sidebar: React.FC = () => {
  const [isBetaMember] = useLocalStorage('isBetaMember', false);

  return (
    <aside className="w-64 bg-white/50 backdrop-blur-md border-r border-gray-200 flex flex-col p-4">
      <div className="mb-4">
        <a href="#/dashboard" className="flex items-center gap-2 text-gray-900 font-bold text-xl px-2">
            Silo Build
        </a>
      </div>
       <div className="mb-6 px-2 space-y-2">
        <a 
          href="#/builder" 
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300"
        >
            <PlusIcon />
            New AI App
        </a>
        <a 
          href="#/agent-builder" 
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-300"
        >
            <AgentIcon />
            New AI Agent
        </a>
      </div>
      <nav className="flex-1 flex flex-col gap-2">
        <SidebarNavLink href="#/dashboard/projects" icon={<HomeIcon />} label="Projects" />
        <SidebarNavLink href="#/dashboard/agents" icon={<AgentIcon />} label="Agents" />
        <SidebarNavLink href="#/dashboard/prompt-library" icon={<SparklesIcon />} label="Prompt Library" />
        <SidebarNavLink href="#/dashboard/database" icon={<DatabaseIcon />} label="Database" />
        <SidebarNavLink href="#/dashboard/schema-builder" icon={<SchemaIcon />} label="Schema Builder" />
        <SidebarNavLink href="#/dashboard/teams" icon={<UsersIcon />} label="Teams" />
        
        {isBetaMember && (
            <>
                <SidebarNavLink href="#/dashboard/debugger" icon={<BugIcon />} label="AI Debugger" isBeta />
                <SidebarNavLink href="#/dashboard/theme-editor" icon={<PaintBrushIcon />} label="Theme Editor" isBeta />
            </>
        )}
        
        <div className="mt-auto border-t border-gray-200 pt-2 flex flex-col gap-2">
          <SidebarNavLink href="#/dashboard/beta" icon={<FlaskIcon />} label="Beta Program" />
          <SidebarNavLink href="#/dashboard/settings" icon={<SettingsIcon />} label="Settings" />
        </div>
      </nav>
      <div className="mt-4">
        <UserProfile />
      </div>
    </aside>
  );
};
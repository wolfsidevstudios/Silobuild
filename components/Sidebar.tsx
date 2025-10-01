import React from 'react';
import { DatabaseIcon, HomeIcon, SettingsIcon, PlusIcon, SparklesIcon, BugIcon, PaintBrushIcon, UsersIcon, AgentIcon, CloudUploadIcon, HelpCircleIcon, BetaIcon, IntegrationsIcon, InspirationIcon } from './icons';
import { UserProfile } from './UserProfile';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ChevronLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
);


const SidebarNavLink: React.FC<{ href: string; icon: React.ReactNode; label: string; isBeta?: boolean, isCollapsed: boolean }> = ({ href, icon, label, isBeta, isCollapsed }) => {
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
            title={isCollapsed ? label : undefined}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            } ${isCollapsed ? 'justify-center' : 'justify-between'}`}
        >
            <div className="flex items-center gap-3">
                {icon}
                {!isCollapsed && label}
            </div>
            {!isCollapsed && isBeta && <span className="text-xs font-bold bg-yellow-400/20 text-yellow-700 px-2 py-0.5 rounded-full">BETA</span>}
        </a>
    )
}


export const Sidebar: React.FC = () => {
  const [isBetaMember] = useLocalStorage('isBetaMember', false);
  const [isCollapsed, setIsCollapsed] = useLocalStorage('sidebar-collapsed', false);

  return (
    <aside className={`relative bg-white/50 backdrop-blur-md border-r border-gray-200 flex flex-col p-4 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="flex items-center justify-between mb-4">
        <a href="#/dashboard" className="flex items-center gap-2 px-2" title="Silo Build">
            <img src="https://i.ibb.co/svVCNWvV/Google-AI-Studio-2025-09-29-T00-23-01-230-Z-modified.png" alt="Silo Build Logo" className="h-8 w-auto" />
            {!isCollapsed && <span className="font-bold text-xl">Silo Build <span className="text-xs align-top bg-blue-100 text-blue-600 font-bold px-1.5 py-0.5 rounded-full">2.0</span></span>}
        </a>
         <button 
            onClick={() => setIsCollapsed(!isCollapsed)} 
            className="absolute -right-3 top-8 bg-white border border-gray-300 rounded-full p-1.5 text-gray-500 hover:bg-gray-100 hover:text-black transition-all"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
            <ChevronLeftIcon className={`w-3 h-3 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : 'rotate-0'}`} />
        </button>
      </div>
       <div className={`mb-6 space-y-2 ${isCollapsed ? 'px-0' : 'px-2'}`}>
        <a 
          href="#/builder"
          title={isCollapsed ? 'New App with Codepilot' : ''}
          className={`w-full flex items-center gap-2 px-4 py-2 text-sm font-medium bg-gray-900 hover:bg-gray-800 text-white rounded-full transition-colors duration-300 ${isCollapsed ? 'justify-center' : ''}`}
        >
            <SparklesIcon />
            {!isCollapsed && "New App"}
        </a>
        <a 
          href="#/agent-builder" 
          title={isCollapsed ? 'New AI Agent' : ''}
          className={`w-full flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white hover:bg-gray-100 text-gray-900 rounded-full transition-colors duration-300 border border-gray-200 ${isCollapsed ? 'justify-center' : ''}`}
        >
            <AgentIcon />
            {!isCollapsed && "New Agent"}
        </a>
      </div>
      <nav className="flex-1 flex flex-col gap-2">
        <SidebarNavLink href="#/dashboard/projects" icon={<HomeIcon />} label="Projects" isCollapsed={isCollapsed} />
        <SidebarNavLink href="#/dashboard/agents" icon={<AgentIcon />} label="Agents" isCollapsed={isCollapsed} />
        <SidebarNavLink href="#/dashboard/assist" icon={<InspirationIcon />} label="Silo Build Assist" isCollapsed={isCollapsed} />
        <SidebarNavLink href="#/dashboard/deployments" icon={<CloudUploadIcon />} label="Deployments" isCollapsed={isCollapsed} />
        <SidebarNavLink href="#/dashboard/prompt-library" icon={<SparklesIcon />} label="Prompt Library" isCollapsed={isCollapsed} />
        <SidebarNavLink href="#/dashboard/database" icon={<DatabaseIcon />} label="Database" isCollapsed={isCollapsed} />
        <SidebarNavLink href="#/dashboard/teams" icon={<UsersIcon />} label="Teams" isCollapsed={isCollapsed} />
        <SidebarNavLink href="#/dashboard/integrations" icon={<IntegrationsIcon />} label="Integrations" isCollapsed={isCollapsed} />
        
        {isBetaMember && (
            <>
                <SidebarNavLink href="#/dashboard/debugger" icon={<BugIcon />} label="AI Debugger" isBeta isCollapsed={isCollapsed} />
                <SidebarNavLink href="#/dashboard/theme-editor" icon={<PaintBrushIcon />} label="Theme Editor" isBeta isCollapsed={isCollapsed} />
            </>
        )}
        
        <div className="mt-auto border-t border-gray-200 pt-2 flex flex-col gap-2">
          <SidebarNavLink href="#/dashboard/beta" icon={<BetaIcon />} label="Beta Program" isCollapsed={isCollapsed} />
          <SidebarNavLink href="#/dashboard/help" icon={<HelpCircleIcon />} label="Help & Support" isCollapsed={isCollapsed} />
          <SidebarNavLink href="#/dashboard/settings" icon={<SettingsIcon />} label="Settings" isCollapsed={isCollapsed} />
        </div>
      </nav>
      <div className="mt-4">
        <UserProfile isCollapsed={isCollapsed} />
      </div>
    </aside>
  );
};
import React, { useState, useEffect } from 'react';
import { ProjectsIcon, SettingsIcon, MenuIcon, ChevronLeftIcon, NewsIcon } from './icons';

interface NavLinkProps {
    href: string;
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    isCollapsed: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ href, icon, label, isActive, isCollapsed }) => (
    <a 
        href={href}
        className={`flex items-center gap-4 px-3 py-2.5 rounded-lg transition-all duration-200 ${isActive ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
        title={isCollapsed ? label : undefined}
    >
        {icon}
        <span className={`font-medium whitespace-nowrap transition-opacity duration-200 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>{label}</span>
    </a>
);

interface SidebarProps {
    isCollapsed: boolean;
    onToggle: () => void;
}

export const DashboardSidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
    const [activeRoute, setActiveRoute] = useState(window.location.hash);

    useEffect(() => {
        const handleHashChange = () => setActiveRoute(window.location.hash);
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    return (
        <aside className={`flex flex-col p-4 bg-gray-900/50 backdrop-blur-lg border-r border-white/10 shadow-2xl transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-64'}`}>
            <div className={`flex items-center mb-8 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
                <a href="#/projects" className={`flex items-center gap-2 transition-opacity duration-200 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                    <img src="https://i.ibb.co/svVCNWvV/Google-AI-Studio-2025-09-29-T00-23-01-230-Z-modified.png" alt="Silo Build Logo" className="h-8 w-auto" />
                    <span className="font-bold text-xl text-white">Silo Build</span>
                </a>
                <button onClick={onToggle} className="p-1 text-gray-400 hover:text-white">
                    {isCollapsed ? <MenuIcon className="w-6 h-6" /> : <ChevronLeftIcon className="w-6 h-6" />}
                </button>
            </div>
            
            <nav className="flex-1 space-y-2">
                <NavLink 
                    href="#/projects" 
                    icon={<ProjectsIcon className="w-6 h-6 flex-shrink-0" />} 
                    label="Projects" 
                    isActive={activeRoute.startsWith('#/projects') || activeRoute === '#/' || activeRoute === ''}
                    isCollapsed={isCollapsed}
                />
                <NavLink 
                    href="#/news" 
                    icon={<NewsIcon className="w-6 h-6 flex-shrink-0" />} 
                    label="News" 
                    isActive={activeRoute.startsWith('#/news')}
                    isCollapsed={isCollapsed}
                />
                <NavLink 
                    href="#/settings" 
                    icon={<SettingsIcon className="w-6 h-6 flex-shrink-0" />} 
                    label="Settings" 
                    isActive={activeRoute.startsWith('#/settings')}
                    isCollapsed={isCollapsed}
                />
            </nav>

            <div className="mt-auto">
                <div className={`flex items-center gap-3 p-2 rounded-lg bg-gray-800/50 ${isCollapsed ? 'justify-center' : ''}`}>
                    <div className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                        D
                    </div>
                    <div className={`transition-opacity duration-200 ${isCollapsed ? 'opacity-0 w-0 h-0 overflow-hidden' : 'opacity-100'}`}>
                        <p className="text-sm font-semibold text-white whitespace-nowrap">Dev User</p>
                        <p className="text-xs text-gray-400 whitespace-nowrap">dev.user@example.com</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export const LandingFooter: React.FC = () => {
  return (
    <footer className="bg-gray-950 border-t border-gray-800">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="https://i.ibb.co/svVCNWvV/Google-AI-Studio-2025-09-29-T00-23-01-230-Z-modified.png" alt="Silo Build Logo" className="h-7 w-auto" />
            <span className="font-semibold text-lg text-white">Silo Build</span>
          </div>
          <p className="text-gray-400 text-sm mt-4 md:mt-0">
            &copy; {new Date().getFullYear()} Silo Build. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
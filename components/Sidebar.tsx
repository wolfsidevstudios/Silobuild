import React, { useState, useEffect } from 'react';
import { ProjectsIcon, SettingsIcon } from './icons';

const NavLink: React.FC<{ href: string; icon: React.ReactNode; label: string; isActive: boolean }> = ({ href, icon, label, isActive }) => (
    <a 
        href={href}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
    >
        {icon}
        <span className="font-medium">{label}</span>
    </a>
);

export const DashboardSidebar: React.FC = () => {
    const [activeRoute, setActiveRoute] = useState(window.location.hash);

    useEffect(() => {
        const handleHashChange = () => {
            setActiveRoute(window.location.hash);
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    return (
        <aside className="w-64 bg-gray-900 p-4 flex-shrink-0 flex flex-col rounded-r-2xl shadow-lg">
            <a href="#/projects" className="flex items-center gap-2 px-3 mb-8">
                <img src="https://i.ibb.co/svVCNWvV/Google-AI-Studio-2025-09-29-T00-23-01-230-Z-modified.png" alt="Silo Build Logo" className="h-8 w-auto" />
                <span className="font-bold text-xl text-white">Silo Build</span>
            </a>
            <nav className="flex-1 space-y-2">
                <NavLink 
                    href="#/projects" 
                    icon={<ProjectsIcon className="w-5 h-5" />} 
                    label="Projects" 
                    isActive={activeRoute.startsWith('#/projects') || activeRoute === '#/' || activeRoute === ''}
                />
                <NavLink 
                    href="#/settings" 
                    icon={<SettingsIcon className="w-5 h-5" />} 
                    label="Settings" 
                    isActive={activeRoute.startsWith('#/settings')}
                />
            </nav>
            <div className="mt-auto">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50">
                    <div className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold">
                        D
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-white">Dev User</p>
                        <p className="text-xs text-gray-400">dev.user@example.com</p>
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
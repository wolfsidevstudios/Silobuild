import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { ProjectsPage } from './ProjectsPage';
import { DatabasePage } from './DatabasePage';
import { SettingsPage } from './SettingsPage';
import { PromptLibraryPage } from './PromptLibraryPage';

interface DashboardLayoutProps {
  route: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ route }) => {
  const renderPage = () => {
    if (route.startsWith('#/dashboard/prompt-library')) {
      return <PromptLibraryPage />;
    }
    if (route.startsWith('#/dashboard/projects')) {
      return <ProjectsPage />;
    }
    if (route.startsWith('#/dashboard/database')) {
      return <DatabasePage />;
    }
    if (route.startsWith('#/dashboard/settings')) {
      return <SettingsPage />;
    }
    // Default to projects page
    return <ProjectsPage />;
  };

  return (
    <div className="h-screen w-screen bg-black text-white flex font-sans overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        {renderPage()}
      </main>
    </div>
  );
};
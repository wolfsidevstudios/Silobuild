import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { ProjectsPage } from './ProjectsPage';
import { SettingsPage } from './SettingsPage';
import { DatabasePage } from './DatabasePage';

interface DashboardLayoutProps {
  route: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ route }) => {
  const renderPage = () => {
    // Check for specific sub-pages first
    if (route.startsWith('#/dashboard/settings')) {
      return <SettingsPage />;
    }
    if (route.startsWith('#/dashboard/database')) {
      return <DatabasePage />;
    }
    
    // Explicitly handle the main dashboard route and any other /dashboard/* paths as the Projects page.
    // This ensures that visiting `#/dashboard` correctly shows the projects list.
    return <ProjectsPage />;
  };

  return (
    <div className="flex h-screen bg-gray-900/30">
      <Sidebar activeRoute={route} />
      <main className="flex-1 overflow-y-auto">
        {renderPage()}
      </main>
    </div>
  );
};

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
    // This is a more explicit router.
    // It defaults to 'projects' if no sub-page is specified in the hash.
    const page = route.split('/')[2] || 'projects';

    switch (page) {
      case 'settings':
        return <SettingsPage />;
      case 'database':
        return <DatabasePage />;
      case 'projects':
        return <ProjectsPage />;
      default:
        // This case handles '#/dashboard' which correctly defaults to 'projects'.
        // It also handles any other unknown sub-path by showing the projects list.
        return <ProjectsPage />;
    }
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

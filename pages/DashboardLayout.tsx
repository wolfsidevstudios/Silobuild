import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { ProjectsPage } from './ProjectsPage';
import { DatabasePage } from './DatabasePage';
import { SettingsPage } from './SettingsPage';
import { PromptLibraryPage } from './PromptLibraryPage';
import { BetaProgramPage } from './BetaProgramPage';
import { TeamsPage } from './TeamsPage';
import { AgentProjectsPage } from './AgentProjectsPage';
import { DeploymentsPage } from './DeploymentsPage';
import { HelpPage } from './HelpPage';

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
    if (route.startsWith('#/dashboard/agents')) {
      return <AgentProjectsPage />;
    }
    if (route.startsWith('#/dashboard/database')) {
      return <DatabasePage />;
    }
     if (route.startsWith('#/dashboard/teams')) {
      return <TeamsPage />;
    }
    if (route.startsWith('#/dashboard/deployments')) {
        return <DeploymentsPage />;
    }
    if (route.startsWith('#/dashboard/beta')) {
      return <BetaProgramPage />;
    }
    if (route.startsWith('#/dashboard/help')) {
        return <HelpPage />;
    }
    if (route.startsWith('#/dashboard/settings')) {
      return <SettingsPage />;
    }
    // Default to projects page
    return <ProjectsPage />;
  };

  return (
    <div className="h-screen w-screen bg-transparent text-gray-900 flex font-sans overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-gray-50 rounded-tl-3xl">
        {renderPage()}
      </main>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
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
import { IntegrationsPage } from './IntegrationsPage';
import { InspirationPage } from './InspirationPage';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { SiloAiAnnouncementModal } from '../components/SiloAiAnnouncementModal';

interface DashboardLayoutProps {
  route: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ route }) => {
  const [hasSeenAnnouncement, setHasSeenAnnouncement] = useLocalStorage('hasSeenSiloAiAnnouncementV2', false);
  const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(false);

  useEffect(() => {
    // Show announcement after a short delay to not be too intrusive on load
    const timer = setTimeout(() => {
      if (!hasSeenAnnouncement) {
        setIsAnnouncementOpen(true);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [hasSeenAnnouncement]);

  const handleCloseAnnouncement = () => {
    setIsAnnouncementOpen(false);
    setHasSeenAnnouncement(true);
  };

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
    if (route.startsWith('#/dashboard/integrations')) {
        return <IntegrationsPage />;
    }
    if (route.startsWith('#/dashboard/inspiration')) {
        return <InspirationPage />;
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
    <div className="relative h-screen w-screen bg-gray-50 text-gray-900 flex font-sans overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-200 rounded-full filter blur-3xl opacity-40" />
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-200 rounded-full filter blur-3xl opacity-40" />
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-transparent rounded-tl-3xl z-0">
            {renderPage()}
        </main>
        {isAnnouncementOpen && <SiloAiAnnouncementModal onClose={handleCloseAnnouncement} />}
    </div>
  );
};
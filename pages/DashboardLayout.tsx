import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { ProjectsPage } from './ProjectsPage';
import { SettingsPage } from './SettingsPage';
import { DatabasePage } from './DatabasePage';
import { PromptLibraryPage } from './PromptLibraryPage';
import { SchemaBuilderPage } from './SchemaBuilderPage';
import { BetaProgramPage } from './BetaProgramPage';


interface DashboardLayoutProps {
    route: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ route }) => {
    
    const renderContent = () => {
        if (route.startsWith('#/dashboard/settings')) {
            return <SettingsPage />;
        }
        if (route.startsWith('#/dashboard/database')) {
            return <DatabasePage />;
        }
        if (route.startsWith('#/dashboard/prompts')) {
            return <PromptLibraryPage />;
        }
        if (route.startsWith('#/dashboard/schema')) {
            return <SchemaBuilderPage />;
        }
        if (route.startsWith('#/dashboard/beta')) {
            return <BetaProgramPage />;
        }
        // Default to projects page
        return <ProjectsPage />;
    };

    return (
        <div className="h-screen w-screen bg-black text-white flex font-sans overflow-hidden">
            <Sidebar activeRoute={route} />
            <main className="flex-1 overflow-hidden">
                {renderContent()}
            </main>
        </div>
    );
};

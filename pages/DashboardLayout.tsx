import React, { useState } from 'react';
import { DashboardSidebar } from '../components/Sidebar';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    return (
        <div className="flex h-screen bg-gray-950 text-gray-100">
            <DashboardSidebar 
                isCollapsed={isSidebarCollapsed}
                onToggle={() => setIsSidebarCollapsed(prev => !prev)}
            />
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    );
};
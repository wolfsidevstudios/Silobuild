import React, { useState, useEffect } from 'react';
import { LandingPage } from './pages/LoginPage';
import { AuthPage } from './pages/AuthPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { BuilderPage } from './pages/BuilderPage';
import { SettingsPage } from './pages/SettingsPage';
import { DashboardLayout } from './pages/DashboardLayout';
import { CreationFlowPage } from './pages/CreationFlowPage';

export const App: React.FC = () => {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const renderPage = () => {
    if (route.startsWith('#/auth')) {
      return <AuthPage />;
    }
    if (route.startsWith('#/builder')) {
        return <BuilderPage />;
    }
    if (route.startsWith('#/create')) {
        return <CreationFlowPage />;
    }
    if (route.startsWith('#/projects')) {
      return <DashboardLayout><ProjectsPage /></DashboardLayout>;
    }
    if (route.startsWith('#/settings')) {
      return <DashboardLayout><SettingsPage /></DashboardLayout>;
    }
    return <LandingPage />;
  };

  return <div className="min-h-screen bg-gray-950 text-gray-100">{renderPage()}</div>;
};
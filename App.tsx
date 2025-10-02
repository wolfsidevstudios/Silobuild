import React, { useState, useEffect } from 'react';
import { LandingPage } from './pages/LoginPage';
import { AuthPage } from './pages/AuthPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { BuilderPage } from './pages/BuilderPage';

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
    if (route.startsWith('#/projects')) {
      return <ProjectsPage />;
    }
    if (route.startsWith('#/builder')) {
        return <BuilderPage />;
    }
    return <LandingPage />;
  };

  return <div className="min-h-screen bg-gray-950 text-gray-100">{renderPage()}</div>;
};
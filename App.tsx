import React, { useState, useEffect } from 'react';
import { Builder } from './components/Builder';
import { DashboardLayout } from './pages/DashboardLayout';
import { useAuth } from './context/AuthContext';
import { LoginPage } from './pages/LoginPage';

export const App: React.FC = () => {
  const { user } = useAuth();
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

  if (!user) {
    return <LoginPage />;
  }

  if (route.startsWith('#/dashboard')) {
    return <DashboardLayout route={route} />;
  }
  
  if (route.startsWith('#/project/')) {
    const projectId = route.split('/')[2];
    return <Builder projectId={projectId} />;
  }

  return <Builder />;
};

import React, { useState, useEffect } from 'react';
import { Builder } from './components/Builder';
import { DashboardLayout } from './pages/DashboardLayout';

const App: React.FC = () => {
  const [route, setRoute] = useState(window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash || '#/');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const renderContent = () => {
    if (route.startsWith('#/dashboard')) {
      return <DashboardLayout route={route} />;
    }
    // Default to builder, potentially passing a project ID
    const projectId = route.startsWith('#/project/') ? route.split('/')[2] : undefined;
    return <Builder projectId={projectId} />;
  };

  return <div className="h-screen w-screen bg-black text-white font-sans">{renderContent()}</div>;
};

export default App;

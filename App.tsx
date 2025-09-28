import React, { useState, useEffect } from 'react';
import { Builder } from './components/Builder';
import { DashboardLayout } from './pages/DashboardLayout';
import { useAuth } from './context/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { Spinner } from './components/Spinner';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { StudioPage } from './pages/StudioPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Give the auth context a moment to load the user from local storage
    const timer = setTimeout(() => setIsChecking(false), 50);
    return () => clearTimeout(timer);
  }, []);

  if (isChecking) {
    return (
      <div className="h-screen w-screen bg-black flex items-center justify-center">
        <Spinner className="w-10 h-10" />
      </div>
    );
  }

  if (!user) {
    window.location.hash = '#/';
    return null;
  }

  return <>{children}</>;
};

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
  
  if (route.startsWith('#/terms')) {
    return <TermsPage />;
  }

  if (route.startsWith('#/privacy')) {
    return <PrivacyPolicyPage />;
  }

  if (route.startsWith('#/dashboard')) {
    return <ProtectedRoute><DashboardLayout route={route} /></ProtectedRoute>;
  }
  
  if (route.startsWith('#/project/')) {
    const projectId = route.split('/')[2];
    return <ProtectedRoute><Builder projectId={projectId} /></ProtectedRoute>;
  }
  
  if (route.startsWith('#/builder')) {
    return <ProtectedRoute><Builder /></ProtectedRoute>;
  }

  if (route.startsWith('#/studio/')) {
    const projectId = route.split('/')[2];
    return <ProtectedRoute><StudioPage projectId={projectId} /></ProtectedRoute>;
  }

  // Default to the main landing page
  return <LoginPage />;
};

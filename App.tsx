import React, { useState, useEffect } from 'react';
import { Builder } from './components/Builder';
import { DashboardLayout } from './pages/DashboardLayout';
import { useAuth } from './context/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { Spinner } from './components/Spinner';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { StudioPage } from './pages/StudioPage';
import { AgentBuilderPage } from './pages/AgentBuilderPage';
import { MobileApp } from './pages/MobileApp';

const isMobile = () => window.innerWidth < 768;

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  
  useEffect(() => {
    if (!loading && !user) {
      window.location.hash = '#/';
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Spinner className="w-10 h-10" />
      </div>
    );
  }

  if (user) {
     return <>{children}</>;
  }

  return null;
};

export const App: React.FC = () => {
  const [isMobileView, setIsMobileView] = useState(isMobile());
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(isMobile());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  useEffect(() => {
    // Request notification permission on app load for PWA notifications
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  if (isMobileView) {
    return <MobileApp />;
  }
  
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

  if (route.startsWith('#/agent-builder/')) {
    const projectId = route.split('/')[2];
    return <ProtectedRoute><AgentBuilderPage projectId={projectId} /></ProtectedRoute>;
  }
  
  if (route.startsWith('#/agent-builder')) {
    return <ProtectedRoute><AgentBuilderPage /></ProtectedRoute>;
  }


  if (route.startsWith('#/studio/')) {
    const projectId = route.split('/')[2];
    return <ProtectedRoute><StudioPage projectId={projectId} /></ProtectedRoute>;
  }

  // Default to the main landing page
  return <LoginPage />;
};
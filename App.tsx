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
import { prompts } from './data/prompts';
import { showLocalNotification } from './utils/projectUtils';
import { CommunityAppPage } from './pages/CommunityAppPage';

const isMobile = () => window.innerWidth < 768;

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isGuest } = useAuth();

  // The main loading state is now handled by the App component,
  // so we can reliably check the user status here.
  if (!user && !isGuest) {
    window.location.hash = '#/';
    return null;
  }

  return <>{children}</>;
};

export const App: React.FC = () => {
  const [isMobileView, setIsMobileView] = useState(isMobile());
  const [route, setRoute] = useState(window.location.hash);
  const { user, isGuest, loading } = useAuth();

  useEffect(() => {
    let intervalId: number | undefined;

    const showPromptSuggestion = () => {
      if ('Notification' in window && Notification.permission === 'granted') {
        const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
        // FIX: Removed deprecated 'renotify' property from NotificationOptions. The 'tag' property ensures notifications replace each other, which is the desired behavior.
        showLocalNotification('Silo Build Prompt Idea ✨', {
          body: `Try building: "${randomPrompt.title}". Tap to start building!`,
          tag: 'prompt-suggestion',
        });
      }
    };
    
    if ('Notification' in window && Notification.permission === 'granted') {
      intervalId = window.setInterval(showPromptSuggestion, 60000); // Every minute
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

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

  // Handle the auth loading state globally. This prevents race conditions
  // where the app tries to render a protected route before the user is loaded.
  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Spinner className="w-10 h-10" />
      </div>
    );
  }

  if (isMobileView) {
    return <MobileApp />;
  }

  if ((user || isGuest) && (route === '#/' || route === '')) {
    window.location.hash = '#/dashboard';
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Spinner className="w-10 h-10" />
      </div>
    );
  }
  
  if (route.startsWith('#/terms')) {
    return <TermsPage />;
  }

  if (route.startsWith('#/privacy')) {
    return <PrivacyPolicyPage />;
  }

  if (route.startsWith('#/community/app/')) {
    const communityProjectId = route.split('/')[3];
    return <CommunityAppPage communityProjectId={communityProjectId} />;
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
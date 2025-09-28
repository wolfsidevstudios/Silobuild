import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

// This is your Google Cloud client ID
const GOOGLE_CLIENT_ID = '208835173647-6e2is6g6j3338hj4dq2reebcluk694jm.apps.googleusercontent.com';

declare global {
  // FIX: Extend the Window interface to include the 'google' property
  // for Google One Tap, resolving the TypeScript error on line 15.
  interface Window {
    google: typeof import('google-one-tap');
  }
}

export const LoginPage: React.FC = () => {
  const { login } = useAuth();

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: (response) => {
          if (response.credential) {
            login(response.credential);
          }
        },
      });

      window.google.accounts.id.renderButton(
        document.getElementById('google-signin-button')!,
        { theme: 'outline', size: 'large', type: 'standard', shape: 'pill' }
      );
      
      window.google.accounts.id.prompt();
    }
  }, [login]);

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="p-10 bg-white/5 border border-white/10 rounded-xl max-w-sm w-full text-center shadow-2xl">
        <h1 className="text-3xl font-bold mb-2">AI App Builder</h1>
        <p className="text-gray-400 mb-8">Sign in to continue</p>
        <div id="google-signin-button" className="flex justify-center"></div>
      </div>
    </div>
  );
};

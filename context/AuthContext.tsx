import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { DecodedCredential } from '../types';
import { jwtDecode } from 'jwt-decode';
import { supabase } from '../services/supabaseClient';

interface AuthContextType {
  user: DecodedCredential | null;
  isGuest: boolean;
  login: (credential: string) => void;
  logout: () => void;
  loginAsGuest: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// A static key for storing the user object itself. This should not be user-scoped.
const USER_STORAGE_KEY = 'ai-app-builder-user';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<DecodedCredential | null>(null);
  const [isGuest, setIsGuest] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('isGuest') === 'true';
    }
    return false;
  });

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.provider_token) {
        try {
          const decoded: DecodedCredential = jwtDecode(session.provider_token);
          setUser(decoded);
          window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(decoded));
          setIsGuest(false);
          sessionStorage.removeItem('isGuest');
        } catch (error) {
          console.error("Failed to decode JWT from session:", error);
          setUser(null);
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        window.localStorage.removeItem(USER_STORAGE_KEY);
        setIsGuest(false);
        sessionStorage.removeItem('isGuest');
      }
    });

    // Check initial session on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.provider_token) {
         try {
            const decoded: DecodedCredential = jwtDecode(session.provider_token);
            setUser(decoded);
            window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(decoded));
        } catch (error) {
            console.error("Failed to decode JWT from initial session:", error);
            setUser(null);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);


  const login = async (credential: string) => {
    const { error } = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: credential,
    });

    if (error) {
      console.error("Supabase sign-in error:", error);
      // The onAuthStateChange handler will eventually receive a SIGNED_OUT event if login fails,
      // which will clear the user state.
    }
    // On successful login, onAuthStateChange will fire and update the user state.
  };

  const loginAsGuest = () => {
    if (typeof window !== 'undefined') {
        sessionStorage.setItem('isGuest', 'true');
        window.localStorage.removeItem(USER_STORAGE_KEY);
    }
    setUser(null);
    setIsGuest(true);
    supabase.auth.signOut(); // Ensure no Supabase session while in guest mode.
  };

  const logout = async () => {
    await supabase.auth.signOut();
    // The onAuthStateChange handler will clear the user state.
  };

  return (
    <AuthContext.Provider value={{ user, isGuest, login, logout, loginAsGuest }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
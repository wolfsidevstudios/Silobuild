import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { DecodedCredential } from '../types';
import { supabase } from '../services/supabaseClient';
import { Spinner } from '../components/Spinner';

// Using a minimal type to avoid dependency issues with @supabase/supabase-js
interface SupabaseUser {
  id: string;
  email?: string;
  email_confirmed_at?: string;
  user_metadata: { [key: string]: any };
}

interface AuthContextType {
  user: DecodedCredential | null;
  isGuest: boolean;
  loginWithGoogle: (credential: string) => Promise<void>;
  signInWithPassword: (email: string, password: string) => Promise<void>;
  signUpWithPassword: (email: string, password: string) => Promise<any>;
  logout: () => void;
  loginAsGuest: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const USER_STORAGE_KEY = 'ai-app-builder-user';

const mapSupabaseUserToCredential = (user: SupabaseUser): DecodedCredential => ({
  name: user.user_metadata?.name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
  picture: user.user_metadata?.picture || user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${user.email}`,
  email: user.email || '',
  email_verified: !!user.email_confirmed_at,
  sub: user.id
});


export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<DecodedCredential | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('isGuest') === 'true';
    }
    return false;
  });

  useEffect(() => {
    // Check for user session on initial load
    const getInitialSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
            const mappedUser = mapSupabaseUserToCredential(session.user as SupabaseUser);
            setUser(mappedUser);
            window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(mappedUser));
        }
        setLoading(false);
    };

    getInitialSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const mappedUser = mapSupabaseUserToCredential(session.user as SupabaseUser);
        setUser(mappedUser);
        window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(mappedUser));
        setIsGuest(false);
        sessionStorage.removeItem('isGuest');
      } else {
        setUser(null);
        window.localStorage.removeItem(USER_STORAGE_KEY);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loginWithGoogle = async (credential: string) => {
    const { error } = await supabase.auth.signInWithIdToken({ provider: 'google', token: credential });
    if (error) {
        console.error("Google sign-in with Supabase failed:", error);
        // Clear everything on failure
        await logout();
        throw error;
    }
    // onAuthStateChange will handle setting the user
  };
  
  const signInWithPassword = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signUpWithPassword = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  };

  const loginAsGuest = () => {
    if (typeof window !== 'undefined') {
        sessionStorage.setItem('isGuest', 'true');
        window.localStorage.removeItem(USER_STORAGE_KEY);
    }
    setUser(null);
    setIsGuest(true);
    // Ensure we are signed out of supabase
    supabase.auth.signOut();
  };

  const logout = async () => {
    await supabase.auth.signOut();
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('isGuest');
      if (window.google?.accounts) {
        window.google.accounts.id.disableAutoSelect();
      }
    }
    // onAuthStateChange will clear user state
    setIsGuest(false);
  };

  // Render a loading state to prevent flash of login page for authenticated users
  if (loading) {
    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <Spinner className="w-10 h-10" />
        </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, isGuest, loginWithGoogle, signInWithPassword, signUpWithPassword, logout, loginAsGuest }}>
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
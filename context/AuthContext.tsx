import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { DecodedCredential } from '../types';
import { supabase } from '../services/supabaseClient';
import { Spinner } from '../components/Spinner';
import { jwtDecode } from 'jwt-decode';

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
  loginWithGoogle: (credential: string) => void;
  signInWithPassword: (email: string, password: string) => Promise<void>;
  signUpWithPassword: (email: string, password: string) => Promise<any>;
  logout: () => void;
  loginAsGuest: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const USER_STORAGE_KEY_GOOGLE = 'ai-app-builder-user-google';

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
    const getInitialUser = async () => {
      // Check for active Supabase session first
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(mapSupabaseUserToCredential(session.user as SupabaseUser));
      } else {
        // If no Supabase session, check for a stored Google user
        const storedGoogleUser = window.localStorage.getItem(USER_STORAGE_KEY_GOOGLE);
        if (storedGoogleUser) {
          try {
            setUser(JSON.parse(storedGoogleUser));
          } catch (e) {
            window.localStorage.removeItem(USER_STORAGE_KEY_GOOGLE);
          }
        }
      }
      setLoading(false);
    };

    getInitialUser();

    // Listen for Supabase auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        // A Supabase session takes precedence
        setUser(mapSupabaseUserToCredential(session.user as SupabaseUser));
        window.localStorage.removeItem(USER_STORAGE_KEY_GOOGLE);
        setIsGuest(false);
        sessionStorage.removeItem('isGuest');
      }
      // Note: We don't handle the 'else' case (sign-out) here,
      // as the explicit logout function is the source of truth for clearing all user states.
    });

    return () => subscription.unsubscribe();
  }, []);

  const loginWithGoogle = (credential: string) => {
    supabase.auth.signOut(); // Ensure no supabase session is active
    const decoded: DecodedCredential = jwtDecode(credential);
    setUser(decoded);
    window.localStorage.setItem(USER_STORAGE_KEY_GOOGLE, JSON.stringify(decoded));
    setIsGuest(false);
    sessionStorage.removeItem('isGuest');
  };
  
  const signInWithPassword = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    // onAuthStateChange will handle setting the user
  };

  const signUpWithPassword = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  };

  const loginAsGuest = () => {
    supabase.auth.signOut(); // Ensure no sessions are active
    window.localStorage.removeItem(USER_STORAGE_KEY_GOOGLE);
    sessionStorage.setItem('isGuest', 'true');
    setUser(null);
    setIsGuest(true);
  };

  const logout = async () => {
    await supabase.auth.signOut(); // This will trigger onAuthStateChange
    window.localStorage.removeItem(USER_STORAGE_KEY_GOOGLE); // Clear Google user
    sessionStorage.removeItem('isGuest'); // Clear guest status
    if (window.google?.accounts) {
      window.google.accounts.id.disableAutoSelect();
    }
    setUser(null);
    setIsGuest(false);
  };

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
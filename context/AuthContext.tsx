import React, { createContext, useState, useContext, ReactNode } from 'react';
import { DecodedCredential } from '../types';
import { jwtDecode } from 'jwt-decode';

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
  const [user, setUser] = useState<DecodedCredential | null>(() => {
    // On initial load, try to read the user from local storage.
    try {
      if (typeof window !== 'undefined') {
        const item = window.localStorage.getItem(USER_STORAGE_KEY);
        return item ? JSON.parse(item) : null;
      }
      return null;
    } catch (error) {
      console.error("Error reading user from local storage", error);
      return null;
    }
  });

  const [isGuest, setIsGuest] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('isGuest') === 'true';
    }
    return false;
  });

  const login = (credential: string) => {
    try {
      const decoded: DecodedCredential = jwtDecode(credential);
      // Persist user to local storage and update state
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(decoded));
        sessionStorage.removeItem('isGuest');
      }
      setUser(decoded);
      setIsGuest(false);
    } catch (error) {
      console.error("Failed to decode JWT:", error);
      // Clear any invalid user data
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(USER_STORAGE_KEY);
      }
      setUser(null);
    }
  };

  const loginAsGuest = () => {
    if (typeof window !== 'undefined') {
        sessionStorage.setItem('isGuest', 'true');
        window.localStorage.removeItem(USER_STORAGE_KEY);
    }
    setUser(null);
    setIsGuest(true);
  };

  const logout = () => {
    // Clear user from local storage and state
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(USER_STORAGE_KEY);
      sessionStorage.removeItem('isGuest');
    }
    setUser(null);
    setIsGuest(false);
    // You might also want to call google.accounts.id.disableAutoSelect() here
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
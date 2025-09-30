import React, { createContext, useState, useContext, ReactNode } from 'react';
import { DecodedCredential } from '../types';
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
  user: DecodedCredential | null;
  login: (credential: string) => void;
  logout: () => void;
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

  const login = (credential: string) => {
    try {
      const decoded: DecodedCredential = jwtDecode(credential);
      // Persist user to local storage and update state
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(decoded));
      }
      setUser(decoded);
    } catch (error) {
      console.error("Failed to decode JWT:", error);
      // Clear any invalid user data
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(USER_STORAGE_KEY);
      }
      setUser(null);
    }
  };

  const logout = () => {
    // Clear user from local storage and state
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(USER_STORAGE_KEY);
    }
    setUser(null);
    // You might also want to call google.accounts.id.disableAutoSelect() here
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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

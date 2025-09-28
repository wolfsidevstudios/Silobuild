import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { DecodedCredential } from '../types';
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
  user: DecodedCredential | null;
  login: (credential: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useLocalStorage<DecodedCredential | null>('ai-app-builder-user', null);

  const login = (credential: string) => {
    try {
      const decoded: DecodedCredential = jwtDecode(credential);
      setUser(decoded);
    } catch (error) {
      console.error("Failed to decode JWT:", error);
      setUser(null);
    }
  };

  const logout = () => {
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

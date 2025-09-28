import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogoutIcon } from './icons';

export const UserProfile: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="border-t border-white/10 pt-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full" />
        <span className="text-sm font-medium text-gray-200">{user.name}</span>
      </div>
      <button 
        onClick={logout} 
        className="text-gray-400 hover:text-white transition-colors"
        title="Sign Out"
      >
        <LogoutIcon />
      </button>
    </div>
  );
};

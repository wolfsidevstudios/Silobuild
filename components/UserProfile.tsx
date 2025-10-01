import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogoutIcon } from './icons';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const UserProfile: React.FC<{ isCollapsed?: boolean }> = ({ isCollapsed = false }) => {
  const { user, logout } = useAuth();
  const [isPro] = useLocalStorage<boolean>('silo-build-is-pro', false);

  if (!user) {
    return null;
  }
  
  if (isCollapsed) {
    return (
      <div className="flex flex-col items-center gap-2">
         <img
          src={user.picture}
          alt={user.name}
          className="w-9 h-9 rounded-full"
          title={`${user.name} (${user.email})`}
        />
        <button
          onClick={logout}
          className="p-2 text-gray-500 rounded-full hover:bg-gray-200 hover:text-gray-800 transition-colors"
          aria-label="Log out"
          title="Log out"
        >
          <LogoutIcon />
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between p-2 bg-white/0 hover:bg-gray-100 rounded-lg">
      <div className="flex items-center gap-3 overflow-hidden">
        <img
          src={user.picture}
          alt={user.name}
          className="w-9 h-9 rounded-full flex-shrink-0"
        />
        <div className="flex flex-col overflow-hidden">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-800 truncate">{user.name}</span>
            {isPro && (
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-2 py-0.5 rounded-full text-[10px] font-bold flex-shrink-0">
                PRO
              </span>
            )}
          </div>
          <span className="text-xs text-gray-500 truncate">{user.email}</span>
        </div>
      </div>
      <button
        onClick={logout}
        className="p-2 text-gray-500 rounded-full hover:bg-gray-200 hover:text-gray-800 transition-colors flex-shrink-0"
        aria-label="Log out"
      >
        <LogoutIcon />
      </button>
    </div>
  );
};
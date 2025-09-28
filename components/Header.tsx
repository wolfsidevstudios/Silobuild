import React from 'react';
import { AppMode, Project } from '../types';
import { ChatIcon, CodeIcon, EyeIcon, HomeIcon, SaveIcon, GithubIcon } from './icons';

interface HeaderProps {
  activeMode: AppMode;
  setAppMode: (mode: AppMode) => void;
  onSaveProject: () => void;
  isSaveEnabled: boolean;
  isGithubLinked?: boolean;
  onCommitAndPush?: () => void;
  project?: Project | null;
}

const NavButton: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}> = ({ label, isActive, onClick, icon }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ease-in-out
        ${
          isActive
            ? 'bg-blue-500 text-white'
            : 'text-gray-300 hover:bg-white/10 hover:text-white'
        }`}
    >
      {icon}
      {label}
    </button>
  );
};

export const Header: React.FC<HeaderProps> = ({
  activeMode,
  setAppMode,
  onSaveProject,
  isSaveEnabled,
  isGithubLinked,
  onCommitAndPush,
  project
}) => {
  return (
    <header className="flex justify-between items-center p-4">
       <a href="#/dashboard" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white rounded-full transition-colors duration-300">
          <HomeIcon />
          Dashboard
      </a>

      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-full p-1 flex items-center space-x-1 shadow-lg">
        <NavButton
          label="Chat"
          isActive={activeMode === 'CHAT'}
          onClick={() => setAppMode('CHAT')}
          icon={<ChatIcon />}
        />
        <NavButton
          label="Code"
          isActive={activeMode === 'CODE'}
          onClick={() => setAppMode('CODE')}
          icon={<CodeIcon />}
        />
        <NavButton
          label="Preview"
          isActive={activeMode === 'PREVIEW'}
          onClick={() => setAppMode('PREVIEW')}
          icon={<EyeIcon />}
        />
      </div>
      
      <div className="w-auto flex items-center justify-end gap-4">
        {project?.teamId && (
            <div className="flex items-center -space-x-2" title="This is a team project">
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-gray-800 object-cover" src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-gray-800 object-cover" src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
                <div className="inline-flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-gray-800 bg-gray-600 text-xs font-bold text-white">+2</div>
            </div>
        )}
        {isSaveEnabled && (
          isGithubLinked && onCommitAndPush ? (
            <button onClick={onCommitAndPush} className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-gray-700 hover:bg-gray-600 text-white rounded-full transition-colors duration-300">
              <GithubIcon className="w-4 h-4" />
              Commit & Push
            </button>
          ) : (
            <button onClick={onSaveProject} className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-green-600 hover:bg-green-700 text-white rounded-full transition-colors duration-300">
              <SaveIcon />
              Save Project
            </button>
          )
        )}
      </div>
    </header>
  );
};
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
            : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
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
    <header className="flex justify-between items-center p-4 bg-white/50 backdrop-blur-md border-b border-gray-200">
       <a href="#/dashboard" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-full transition-colors duration-300">
          <HomeIcon />
          Dashboard
      </a>

      <div className="bg-gray-100/50 backdrop-blur-lg border border-gray-200 rounded-full p-1 flex items-center space-x-1 shadow-lg">
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
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
                <div className="inline-flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-white bg-gray-600 text-xs font-bold text-white">+2</div>
            </div>
        )}
        {isSaveEnabled && (
          isGithubLinked && onCommitAndPush ? (
            <button onClick={onCommitAndPush} className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-gray-800 hover:bg-gray-900 text-white rounded-full transition-colors duration-300">
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
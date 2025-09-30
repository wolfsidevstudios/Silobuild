import React from 'react';
import { AppMode, Project } from '../types';
import { ChatIcon, CodeIcon, EyeIcon, HomeIcon, SaveIcon, GithubIcon, WorkflowIcon, UploadIcon, DatabaseIcon, DownloadIcon } from './icons';

interface HeaderProps {
  activeMode: AppMode;
  setAppMode: (mode: AppMode) => void;
  project?: Project | null;
  hasWorkflow: boolean;
  onAddSupabase: () => void;
  onConnectGitHub: () => void;
  onDownload: () => void;
  isGithubConnected: boolean;
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
  project,
  hasWorkflow,
  onAddSupabase,
  onConnectGitHub,
  onDownload,
  isGithubConnected,
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
        {hasWorkflow && (
          <NavButton
            label="Backend"
            isActive={activeMode === 'WORKFLOW'}
            onClick={() => setAppMode('WORKFLOW')}
            icon={<WorkflowIcon />}
          />
        )}
        <NavButton
          label="Publish"
          isActive={activeMode === 'PUBLISH'}
          onClick={() => setAppMode('PUBLISH')}
          icon={<UploadIcon />}
        />
      </div>
      
      <div className="w-auto flex items-center justify-end gap-2 min-w-[200px]">
        {project?.teamId && (
            <div className="flex items-center -space-x-2" title="This is a team project">
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
                <div className="inline-flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-white bg-gray-600 text-xs font-bold text-white">+2</div>
            </div>
        )}
         <button onClick={onAddSupabase} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white hover:bg-gray-100 border border-gray-300 text-gray-800 rounded-full transition-colors">
            <DatabaseIcon className="w-4 h-4 text-green-500" /> Connect Supabase
        </button>
        {!isGithubConnected && (
            <button onClick={onConnectGitHub} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white hover:bg-gray-100 border border-gray-300 text-gray-800 rounded-full transition-colors">
                <GithubIcon className="w-4 h-4" /> Connect GitHub
            </button>
        )}
        <button onClick={onDownload} disabled={!project} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white hover:bg-gray-100 border border-gray-300 text-gray-800 rounded-full transition-colors disabled:opacity-50">
            <DownloadIcon className="w-4 h-4" /> Download
        </button>
      </div>
    </header>
  );
};
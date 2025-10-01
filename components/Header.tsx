import React from 'react';
import { AppMode, Project } from '../types';
import { ChatIcon, CodeIcon, EyeIcon, HomeIcon, SaveIcon, GithubIcon, WorkflowIcon, UploadIcon, DatabaseIcon, DownloadIcon, KeyIcon, TemplateIcon, SparklesIcon, PaintBrushIcon } from './icons';

interface HeaderProps {
  activeMode: AppMode;
  setAppMode: (mode: AppMode) => void;
  project?: Project | null;
  onAddSupabase: () => void;
  onAddAuth: () => void;
  onConnectGitHub: () => void;
  onDownload: () => void;
  isGithubConnected: boolean;
  onOpenVersionHistory: () => void;
  pilot: 'code' | 'design';
  setPilot: (pilot: 'code' | 'design') => void;
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

const PilotToggle: React.FC<{ activePilot: 'code' | 'design'; setPilot: (pilot: 'code' | 'design') => void }> = ({ activePilot, setPilot }) => (
    <div className="flex items-center gap-1 bg-gray-100/50 backdrop-blur-lg border border-gray-200 rounded-full p-1 shadow-lg">
        <button onClick={() => setPilot('code')} className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${activePilot === 'code' ? 'bg-blue-500 text-white shadow' : 'text-gray-600 hover:bg-gray-200'}`}>
            <SparklesIcon /> Codepilot
        </button>
        <button onClick={() => setPilot('design')} className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${activePilot === 'design' ? 'bg-purple-500 text-white shadow' : 'text-gray-600 hover:bg-gray-200'}`}>
            <PaintBrushIcon /> Designpilot
        </button>
    </div>
);

export const Header: React.FC<HeaderProps> = ({
  activeMode,
  setAppMode,
  project,
  onAddSupabase,
  onAddAuth,
  onConnectGitHub,
  onDownload,
  isGithubConnected,
  onOpenVersionHistory,
  pilot,
  setPilot,
}) => {
  return (
    <header className="flex justify-between items-center p-4 bg-white/50 backdrop-blur-md border-b border-gray-200">
       <a href="#/dashboard" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-full transition-colors duration-300">
          <HomeIcon />
          Dashboard
      </a>

      <div className="flex items-center gap-4">
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
            <NavButton
                label="Backend"
                isActive={activeMode === 'WORKFLOW'}
                onClick={() => setAppMode('WORKFLOW')}
                icon={<WorkflowIcon />}
            />
            <NavButton
            label="Publish"
            isActive={activeMode === 'PUBLISH'}
            onClick={() => setAppMode('PUBLISH')}
            icon={<UploadIcon />}
            />
        </div>
        <PilotToggle activePilot={pilot} setPilot={setPilot} />
      </div>
      
      <div className="w-auto flex items-center justify-end gap-2 min-w-[200px]">
        {project?.teamId && (
            <div className="flex items-center -space-x-2" title="This is a team project">
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
                <div className="inline-flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-white bg-gray-600 text-xs font-bold text-white">+2</div>
            </div>
        )}
        <button 
            onClick={onAddAuth} 
            className="flex items-center justify-center w-9 h-9 bg-white hover:bg-gray-100 border border-gray-300 text-gray-800 rounded-full transition-colors"
            title="Add Authentication"
          >
            <KeyIcon className="w-5 h-5 text-yellow-600" />
        </button>
        <button 
            onClick={onOpenVersionHistory} 
            className="flex items-center justify-center w-9 h-9 bg-white hover:bg-gray-100 border border-gray-300 text-gray-800 rounded-full transition-colors"
            title="Version History"
          >
            <TemplateIcon className="w-5 h-5 text-purple-600" />
        </button>
         <button 
            onClick={onAddSupabase} 
            className="flex items-center justify-center w-9 h-9 bg-white hover:bg-gray-100 border border-gray-300 text-gray-800 rounded-full transition-colors"
            title="Connect Supabase"
          >
            <DatabaseIcon className="w-5 h-5 text-green-500" />
        </button>
        {!isGithubConnected && (
            <button 
              onClick={onConnectGitHub} 
              className="flex items-center justify-center w-9 h-9 bg-white hover:bg-gray-100 border border-gray-300 text-gray-800 rounded-full transition-colors"
              title="Connect GitHub"
            >
                <GithubIcon className="w-5 h-5" />
            </button>
        )}
        <button 
          onClick={onDownload} 
          disabled={!project} 
          className="flex items-center justify-center w-9 h-9 bg-white hover:bg-gray-100 border border-gray-300 text-gray-800 rounded-full transition-colors disabled:opacity-50"
          title="Download Project"
        >
            <DownloadIcon className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};
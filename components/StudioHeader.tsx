import React from 'react';
import { DownloadIcon, HomeIcon, SaveIcon } from './icons';

interface StudioHeaderProps {
  projectName: string;
  onSave: () => void;
  onDownload: () => void;
  isSaveEnabled: boolean;
}

export const StudioHeader: React.FC<StudioHeaderProps> = ({
  projectName,
  onSave,
  onDownload,
  isSaveEnabled,
}) => {
  return (
    <header className="flex-shrink-0 flex justify-between items-center p-2 border-b border-white/10 bg-black">
      <div className="flex items-center gap-4">
        <a
          href="#/dashboard"
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white rounded-md transition-colors"
        >
          <HomeIcon />
          Dashboard
        </a>
        <span className="text-sm font-semibold text-gray-400">/</span>
        <h1 className="text-lg font-bold">{projectName}</h1>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onDownload}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white rounded-md transition-colors"
        >
          <DownloadIcon />
          Download
        </button>
        <button
          onClick={onSave}
          disabled={!isSaveEnabled}
          className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          <SaveIcon />
          Save
        </button>
      </div>
    </header>
  );
};

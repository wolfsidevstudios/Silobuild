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
    <header className="flex-shrink-0 flex justify-between items-center p-2 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-4">
        <a
          href="#/dashboard"
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-colors"
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
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-colors"
        >
          <DownloadIcon />
          Download
        </button>
        <button
          onClick={onSave}
          disabled={!isSaveEnabled}
          className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <SaveIcon />
          Save
        </button>
      </div>
    </header>
  );
};
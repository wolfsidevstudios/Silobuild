
import React, { useState } from 'react';
import { GeneratedFile } from '../types';
import { FileIcon } from './icons';

export const WorkspaceView: React.FC<{ files: GeneratedFile[] }> = ({ files }) => {
  const [activeFile, setActiveFile] = useState<string | null>(files.length > 0 ? files[0].path : null);

  const displayedFile = files.find(f => f.path === activeFile);

  if (files.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        <p>No code generated yet. Use the chat to create an app.</p>
      </div>
    );
  }

  return (
    <div className="h-full flex bg-gray-900">
      <aside className="w-48 bg-gray-900/50 border-r border-white/10 p-2 overflow-y-auto">
        <h3 className="text-sm font-semibold text-gray-400 mb-2 px-2">Files</h3>
        <ul>
          {files.map(file => (
            <li key={file.path}>
              <button
                onClick={() => setActiveFile(file.path)}
                className={`w-full text-left text-sm px-2 py-1.5 rounded flex items-center gap-2 transition-colors duration-200 ${
                  activeFile === file.path
                    ? 'bg-blue-500/20 text-blue-300'
                    : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                <FileIcon />
                {file.path}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <main className="flex-1 overflow-hidden">
        {displayedFile ? (
          <pre className="h-full w-full overflow-auto p-4 text-sm font-mono bg-transparent">
            <code>{displayedFile.content}</code>
          </pre>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            <p>Select a file to view its content.</p>
          </div>
        )}
      </main>
    </div>
  );
};

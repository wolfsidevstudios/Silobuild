import React, { useState, useEffect } from 'react';
import { GeneratedFile } from '../types';
import { FileIcon, PlusIcon, TrashIcon } from './icons';

interface WorkspaceViewProps {
  files: GeneratedFile[];
  onFileUpdate: (path: string, content: string) => void;
  onFileDelete: (path: string) => void;
  onFileAdd: (path: string) => boolean;
}

export const WorkspaceView: React.FC<WorkspaceViewProps> = ({ files, onFileUpdate, onFileDelete, onFileAdd }) => {
  const [activeFile, setActiveFile] = useState<string | null>(null);

  useEffect(() => {
    // If the active file is deleted or not set, default to the first file
    if ((!activeFile || !files.some(f => f.path === activeFile)) && files.length > 0) {
      setActiveFile(files[0].path);
    } else if (files.length === 0) {
      setActiveFile(null);
    }
  }, [files, activeFile]);

  const displayedFile = files.find(f => f.path === activeFile);

  const handleNewFile = () => {
    const path = prompt("Enter the new file path (e.g., src/components/Button.tsx):");
    if (path) {
      const success = onFileAdd(path);
      if (success) {
        setActiveFile(path);
      }
    }
  };

  const handleDelete = (path: string) => {
    if (window.confirm(`Are you sure you want to delete ${path}?`)) {
      onFileDelete(path);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const codeSnippet = e.dataTransfer.getData('text/plain');
    if (codeSnippet && displayedFile) {
        const textarea = e.currentTarget;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const currentContent = displayedFile.content;
        const newContent = currentContent.substring(0, start) + codeSnippet + currentContent.substring(end);
        
        onFileUpdate(displayedFile.path, newContent);

        // Move cursor to end of inserted snippet
        setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd = start + codeSnippet.length;
            textarea.focus();
        }, 0);
    }
  };


  if (files.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-500 bg-gray-900">
        <p className="mb-4">No code generated yet.</p>
        <button onClick={handleNewFile} className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors duration-300">
          <PlusIcon />
          Create New File
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex bg-gray-900">
      <aside className="w-56 bg-gray-900/50 border-r border-white/10 p-2 flex flex-col">
        <div className="flex items-center justify-between mb-2 px-2">
            <h3 className="text-sm font-semibold text-gray-400">Files</h3>
            <button onClick={handleNewFile} className="p-1 text-gray-400 hover:text-white" aria-label="New File">
                <PlusIcon className="w-4 h-4" />
            </button>
        </div>
        <ul className="flex-1 overflow-y-auto">
          {files.map(file => (
            <li key={file.path} className="group flex items-center justify-between rounded pr-1 text-sm">
              <button
                onClick={() => setActiveFile(file.path)}
                className={`w-full text-left pl-2 py-1.5 rounded flex items-center gap-2 transition-colors duration-200 truncate ${
                  activeFile === file.path
                    ? 'bg-blue-500/20 text-blue-300'
                    : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                <FileIcon className="w-5 h-5 flex-shrink-0" />
                <span className="truncate">{file.path}</span>
              </button>
              <button 
                onClick={() => handleDelete(file.path)}
                className="p-1 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                aria-label={`Delete ${file.path}`}
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <main className="flex-1 overflow-hidden">
        {displayedFile ? (
          <textarea
            key={displayedFile.path}
            value={displayedFile.content}
            onChange={(e) => onFileUpdate(displayedFile.path, e.target.value)}
            spellCheck="false"
            className="h-full w-full overflow-auto p-4 text-sm font-mono bg-transparent text-white focus:outline-none resize-none"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            <p>Select a file to view its content.</p>
          </div>
        )}
      </main>
    </div>
  );
};
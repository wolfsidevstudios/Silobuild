import React from 'react';
import { ChatMessage, GeneratedFile, ViewMode } from '../types';
import { CodeIcon, EyeIcon, CheckIcon } from './icons';
import { WorkspaceView } from './WorkspaceView';
import { PreviewView } from './PreviewView';
import { Spinner } from './Spinner';

interface ChatViewProps {
  messages: ChatMessage[];
  multiFileCode: GeneratedFile[];
  previewFile: GeneratedFile | null;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  isLoading: boolean;
  error: string | null;
  generationPlan: string[];
  generatedFilesProgress: string[];
  isIdeaMode: boolean;
  vercelToken: string;
}

const ViewModeToggle: React.FC<{
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}> = ({ viewMode, setViewMode }) => (
  <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-full p-1 flex items-center space-x-1 shadow-lg mb-2">
    <button
      onClick={() => setViewMode('CODE')}
      className={`flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full transition-all duration-300 ${
        viewMode === 'CODE' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-white/10'
      }`}
    >
      <CodeIcon /> Code
    </button>
    <button
      onClick={() => setViewMode('PREVIEW')}
      className={`flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full transition-all duration-300 ${
        viewMode === 'PREVIEW' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-white/10'
      }`}
    >
      <EyeIcon /> Preview
    </button>
  </div>
);

const FileGenerationChecklist: React.FC<{ plan: string[]; progress: string[] }> = ({ plan, progress }) => {
  if (plan.length === 0) {
    return null;
  }

  return (
    <div className="border-t border-white/10 mt-3 pt-3">
      <h4 className="text-xs font-semibold text-gray-400 mb-2">Generating Files:</h4>
      <ul className="space-y-1.5 text-sm">
        {plan.map(filePath => {
          const isDone = progress.includes(filePath);
          return (
            <li key={filePath} className={`flex items-center gap-2 transition-colors duration-300 ${isDone ? 'text-gray-400' : 'text-gray-200'}`}>
              <div className="w-4 h-4 flex items-center justify-center">
                {isDone ? (
                  <CheckIcon className="text-green-400" />
                ) : (
                  <Spinner className="h-4 w-4" />
                )}
              </div>
              <span className={isDone ? 'line-through' : ''}>
                {filePath}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};


export const ChatView: React.FC<ChatViewProps> = ({
  messages,
  multiFileCode,
  previewFile,
  viewMode,
  setViewMode,
  isLoading,
  error,
  generationPlan,
  generatedFilesProgress,
  isIdeaMode,
  vercelToken,
}) => {
  return (
    <div className={`flex-1 grid grid-cols-1 ${isIdeaMode ? '' : 'md:grid-cols-2'} gap-4 p-4 overflow-hidden`}>
      <div className="flex flex-col bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <h2 className="text-lg font-bold p-4 border-b border-white/10">Chat</h2>
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-md p-3 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-gray-700 text-gray-200 rounded-bl-none'
                }`}
              >
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start">
               <div className="max-w-md w-full p-3 rounded-lg bg-gray-700 text-gray-200 rounded-bl-none">
                <div className="flex items-center gap-2">
                  <Spinner />
                  <span>{ isIdeaMode ? 'Thinking...' : 'Generating application...'}</span>
                </div>
                { !isIdeaMode && <FileGenerationChecklist plan={generationPlan} progress={generatedFilesProgress} />}
              </div>
            </div>
          )}
           {error && (
            <div className="flex items-start">
               <div className="max-w-md p-3 rounded-lg bg-red-800 text-white rounded-bl-none">
                <p className="text-sm font-semibold">Error</p>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      {!isIdeaMode && (
        <div className="flex flex-col bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <div className="flex justify-between items-center p-2 border-b border-white/10">
            <h2 className="text-lg font-bold px-2">
                {viewMode === 'CODE' ? 'Code Workspace' : 'App Preview'}
            </h2>
            <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
            </div>
            <div className="flex-1 overflow-hidden">
            {viewMode === 'CODE' ? (
                <WorkspaceView files={multiFileCode} />
            ) : (
                <PreviewView file={previewFile} vercelToken={vercelToken} />
            )}
            </div>
        </div>
      )}
    </div>
  );
};

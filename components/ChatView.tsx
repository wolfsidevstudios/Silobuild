import React from 'react';
import { ChatMessage, GeneratedFile, ViewMode, TechStack, Deployment, AiGeneratedTable } from '../types';
import { CodeIcon, EyeIcon, CheckIcon } from './icons';
import { WorkspaceView } from './WorkspaceView';
import { PreviewView } from './PreviewView';
import { Spinner } from './Spinner';
import { StackSelection } from './StackSelection';

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
  generationSummary: string | null;
  isIdeaMode: boolean;
  vercelToken: string;
  onFileUpdate: (path: string, content: string) => void;
  onFileDelete: (path: string) => void;
  onFileAdd: (path: string) => boolean;
  projectName?: string;
  showStackSelector: boolean;
  onSelectStack: (stack: TechStack) => void;
  onToggleMacPreview: () => void;
  deployments: Deployment[];
  onNewDeployment: (deployment: Deployment) => void;
  onAddSupabase: () => void;
  techStack: TechStack | null;
}

const ViewModeToggle: React.FC<{
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}> = ({ viewMode, setViewMode }) => (
  <div className="bg-gray-100/50 backdrop-blur-lg border border-gray-200 rounded-full p-1 flex items-center space-x-1 shadow-sm mb-2">
    <button
      onClick={() => setViewMode('CODE')}
      className={`flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full transition-all duration-300 ${
        viewMode === 'CODE' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-200'
      }`}
    >
      <CodeIcon /> Code
    </button>
    <button
      onClick={() => setViewMode('PREVIEW')}
      className={`flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full transition-all duration-300 ${
        viewMode === 'PREVIEW' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-200'
      }`}
    >
      <EyeIcon /> Preview
    </button>
  </div>
);

const GenerationSummary: React.FC<{ summary: string }> = ({ summary }) => {
  const summaryItems = summary
    .split('\n')
    .map(line => line.trim().replace(/^- \s*/, '').replace(/^\* \s*/, ''))
    .filter(Boolean);

  if (summaryItems.length === 0) return null;

  return (
    <div className="border-t border-gray-200 mt-3 pt-3">
      <h4 className="text-xs font-semibold text-gray-500 mb-2">Summary:</h4>
      <ul className="space-y-1 text-sm list-disc list-inside text-gray-700">
        {summaryItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

const DatabaseSchemaView: React.FC<{ schema: AiGeneratedTable }> = ({ schema }) => {
    return (
        <div className="mt-3 border-t border-gray-200 pt-3">
            <h4 className="text-xs font-semibold text-gray-500 mb-2">Database Schema Update: <span className="font-mono bg-gray-200 px-1 rounded">{schema.name}</span></h4>
            <div className="text-sm space-y-1">
                {schema.columns.map((col, i) => (
                    <div key={i} className="flex items-center gap-2 font-mono text-xs">
                        <span className="font-semibold text-gray-800">{col.name}</span>
                        <span className="text-gray-500">{col.dataType}</span>
                        {col.isPrimaryKey && <span className="text-yellow-600 font-bold text-[10px] bg-yellow-100 px-1 rounded">PK</span>}
                        {!col.isNullable && <span className="text-red-600 font-bold text-[10px] bg-red-100 px-1 rounded">NN</span>}
                        {col.isUnique && <span className="text-blue-600 font-bold text-[10px] bg-blue-100 px-1 rounded">UQ</span>}
                    </div>
                ))}
            </div>
        </div>
    );
};

const FileGenerationChecklist: React.FC<{ plan: string[]; progress: string[] }> = ({ plan, progress }) => {
  if (plan.length === 0) {
    return null;
  }

  return (
    <div className="border-t border-gray-200 mt-3 pt-3">
      <h4 className="text-xs font-semibold text-gray-500 mb-2">Generating Files:</h4>
      <ul className="space-y-1.5 text-sm">
        {plan.map(filePath => {
          const isDone = progress.includes(filePath);
          return (
            <li key={filePath} className={`flex items-center gap-2 transition-colors duration-300 ${isDone ? 'text-gray-500' : 'text-gray-800'}`}>
              <div className="w-4 h-4 flex items-center justify-center">
                {isDone ? (
                  <CheckIcon className="text-green-500" />
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
  generationSummary,
  isIdeaMode,
  vercelToken,
  onFileUpdate,
  onFileDelete,
  onFileAdd,
  projectName,
  showStackSelector,
  onSelectStack,
  onToggleMacPreview,
  deployments,
  onNewDeployment,
  onAddSupabase,
  techStack,
}) => {
  return (
    <div className={`flex-1 grid grid-cols-1 ${isIdeaMode ? '' : 'md:grid-cols-2'} gap-4 p-4 overflow-hidden`}>
      <div className="flex flex-col bg-white/50 backdrop-blur-md border border-gray-200 rounded-xl overflow-hidden shadow-lg">
        <h2 className="text-lg font-bold p-4 border-b border-gray-200">Chat</h2>
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {showStackSelector ? (
            <StackSelection onSelect={onSelectStack} />
          ) : (
            <>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-md p-3 rounded-lg ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-800 rounded-bl-none border border-gray-200'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    {msg.schema && <DatabaseSchemaView schema={msg.schema} />}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start">
                  <div className="max-w-md w-full p-3 rounded-lg bg-gray-100 text-gray-800 rounded-bl-none border border-gray-200">
                    <div className="flex items-center gap-2">
                      <Spinner />
                      <span>{ isIdeaMode ? 'Thinking...' : 'Generating application...'}</span>
                    </div>
                    { !isIdeaMode && generationSummary && <GenerationSummary summary={generationSummary} />}
                    { !isIdeaMode && <FileGenerationChecklist plan={generationPlan} progress={generatedFilesProgress} />}
                  </div>
                </div>
              )}
              {error && (
                <div className="flex items-start">
                  <div className="max-w-md p-3 rounded-lg bg-red-100 text-red-800 rounded-bl-none border border-red-200">
                    <p className="text-sm font-semibold">Error</p>
                    <p className="text-sm">{error}</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {!isIdeaMode && (
        <div className="flex flex-col bg-white/50 backdrop-blur-md border border-gray-200 rounded-xl overflow-hidden shadow-lg">
            <div className="flex justify-between items-center p-2 border-b border-gray-200">
            <h2 className="text-lg font-bold px-2">
                {viewMode === 'CODE' ? 'Code Workspace' : 'App Preview'}
            </h2>
            <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
            </div>
            <div className="flex-1 overflow-hidden">
            {viewMode === 'CODE' ? (
                <WorkspaceView 
                  files={multiFileCode}
                  onFileUpdate={onFileUpdate}
                  onFileDelete={onFileDelete}
                  onFileAdd={onFileAdd}
                />
            ) : (
                <PreviewView 
                  file={previewFile} 
                  vercelToken={vercelToken}
                  multiFileCode={multiFileCode}
                  projectName={projectName}
                  onToggleMacPreview={onToggleMacPreview}
                  deployments={deployments}
                  onNewDeployment={onNewDeployment}
                  onAddSupabase={onAddSupabase}
                  techStack={techStack}
                />
            )}
            </div>
        </div>
      )}
    </div>
  );
};
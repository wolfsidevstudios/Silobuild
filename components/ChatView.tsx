import React, { useState } from 'react';
import { ChatMessage, GeneratedFile, ViewMode, TechStack, Deployment, AiGeneratedTable, Project } from '../types';
import { CodeIcon, EyeIcon, CheckIcon, DatabaseIcon, GithubIcon, UploadIcon, DownloadIcon, SparklesIcon } from './icons';
import { WorkspaceView } from './WorkspaceView';
import { PreviewView } from './PreviewView';
import { Spinner } from './Spinner';
import { downloadProjectAsZip } from '../utils/projectUtils';
import { CredentialRequestForm } from './CredentialRequestForm';
import { ThoughtsModal } from './ThoughtsModal';
import { PromptInput } from './PromptInput';

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
  onFileUpdate: (path: string, content: string) => void;
  onFileDelete: (path: string) => void;
  onFileAdd: (path: string) => boolean;
  onToggleMacPreview: () => void;
  deployments: Deployment[];
  techStack: TechStack | null;
  onCredentialSubmit: (credentials: Record<string, string>) => void;
  promptInputLayout: 'floating' | 'inline';
  onSend: (prompt: string, imageData?: string | null) => void;
  isAppGenerated: boolean;
  onToggleIdeaMode: () => void;
  isReadyToPrompt: boolean;
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
  isGeneratingSuggestions: boolean;
}

const SuggestionPills: React.FC<{
  suggestions: string[];
  onClick: (suggestion: string) => void;
  isLoading: boolean;
}> = ({ suggestions, onClick, isLoading }) => {
  if (isLoading || suggestions.length === 0) {
    return null;
  }

  return (
    <div className="flex-shrink-0 px-4 pb-2 flex items-center justify-center gap-2">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => onClick(suggestion)}
          className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-700 hover:bg-gray-100 hover:border-gray-300 transition-all duration-200 shadow-sm animate-fade-in-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <SparklesIcon className="w-4 h-4 text-blue-500" />
          <span>{suggestion}</span>
        </button>
      ))}
    </div>
  );
};


const ViewModeToggle: React.FC<{
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}> = ({ viewMode, setViewMode }) => (
  <div className="bg-gray-100/50 backdrop-blur-lg border border-gray-200 rounded-full p-1 flex items-center space-x-1 shadow-sm">
    <button
      onClick={() => setViewMode('CODE')}
      className={`flex items-center justify-center p-2 rounded-full transition-all duration-300 ${
        viewMode === 'CODE' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-200'
      }`}
      aria-label="Code view"
      title="Code view"
    >
      <CodeIcon />
    </button>
    <button
      onClick={() => setViewMode('PREVIEW')}
      className={`flex items-center justify-center p-2 rounded-full transition-all duration-300 ${
        viewMode === 'PREVIEW' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-200'
      }`}
      aria-label="Preview view"
      title="Preview view"
    >
      <EyeIcon />
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
  onFileUpdate,
  onFileDelete,
  onFileAdd,
  onToggleMacPreview,
  deployments,
  techStack,
  onCredentialSubmit,
  promptInputLayout,
  onSend,
  isAppGenerated,
  onToggleIdeaMode,
  isReadyToPrompt,
  suggestions,
  onSuggestionClick,
  isGeneratingSuggestions,
}) => {
  const [modalThoughts, setModalThoughts] = useState<string | null>(null);

  const mainContentSpan = isIdeaMode ? 'col-span-1' : 'md:col-span-2';
  const allFilesGenerated = generationPlan.length > 0 && generationPlan.every(filePath => generatedFilesProgress.includes(filePath));

  return (
    <div className={`flex-1 grid grid-cols-1 ${isIdeaMode ? '' : 'md:grid-cols-5'} gap-4 p-4 overflow-hidden`}>
      <div className={`flex flex-col overflow-hidden ${mainContentSpan}`}>
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-xl w-full p-3 rounded-2xl shadow-md ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                {msg.thoughts && (
                  <div className="mt-3 border-t border-gray-200 pt-3">
                    <button
                      onClick={() => setModalThoughts(msg.thoughts ?? null)}
                      className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full transition-colors"
                    >
                      <SparklesIcon className="w-4 h-4" />
                      View Plan
                    </button>
                  </div>
                )}
                {msg.schema && <DatabaseSchemaView schema={msg.schema} />}
                {msg.credentialRequest && (
                  <CredentialRequestForm 
                    request={msg.credentialRequest}
                    onSubmit={onCredentialSubmit}
                  />
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start">
              <div className="max-w-md w-full p-3 rounded-2xl bg-white text-gray-800 rounded-bl-none border border-gray-200 shadow-md">
                <div className="flex items-center gap-2">
                  <Spinner />
                  <span>{ isIdeaMode ? 'Thinking...' : allFilesGenerated ? 'Verifying application...' : 'Generating application...'}</span>
                </div>
                { !isIdeaMode && generationSummary && <GenerationSummary summary={generationSummary} />}
                { !isIdeaMode && <FileGenerationChecklist plan={generationPlan} progress={generatedFilesProgress} />}
                { !isIdeaMode && allFilesGenerated && (
                  <div className="border-t border-gray-200 mt-3 pt-3">
                    <h4 className="text-xs font-semibold text-gray-500 mb-2">Finalizing:</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-800">
                      <Spinner className="h-4 w-4" />
                      <span>Silo Code Pilot is checking its work...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {error && (
            <div className="flex items-start">
              <div className="max-w-md p-3 rounded-2xl bg-red-100 text-red-800 rounded-bl-none border border-red-200 shadow-md">
                <p className="text-sm font-semibold">Error</p>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          )}
        </div>
        {promptInputLayout === 'inline' && (
          <div className="flex flex-col">
            <SuggestionPills
              suggestions={suggestions}
              onClick={onSuggestionClick}
              isLoading={isGeneratingSuggestions || isLoading}
            />
            <PromptInput
              layoutStyle="inline"
              onSend={onSend}
              isLoading={isLoading}
              isAppGenerated={isAppGenerated}
              isIdeaMode={isIdeaMode}
              onToggleIdeaMode={onToggleIdeaMode}
              isReadyToPrompt={isReadyToPrompt}
            />
          </div>
        )}
      </div>
      {mainContentSpan === 'md:col-span-2' && (
        <div className="md:col-span-3 flex flex-col bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-lg">
            <div className="flex justify-between items-center p-2.5 border-b border-gray-200">
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
                  onToggleMacPreview={onToggleMacPreview}
                  deployments={deployments}
                  techStack={techStack}
                />
            )}
            </div>
        </div>
      )}
      {modalThoughts && <ThoughtsModal thoughts={modalThoughts} onClose={() => setModalThoughts(null)} />}
    </div>
  );
};
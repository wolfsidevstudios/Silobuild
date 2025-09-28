import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './Header';
import { PromptInput } from './PromptInput';
import { ChatView } from './ChatView';
import { WorkspaceView } from './WorkspaceView';
import { PreviewView } from './PreviewView';
import { generateAppStream } from '../services/geminiService';
import { AppMode, ChatMessage, GeneratedFile, ViewMode, Project, Settings } from '../types';
import { Spinner } from './Spinner';
import { useLocalStorage } from '../hooks/useLocalStorage';

const initialSettings: Settings = {
  geminiApiKey: '',
  vercelApiKey: '',
  supabaseUrl: '',
  supabaseAnonKey: '',
  stripePublicKey: '',
  stripeSecretKey: '',
};

interface BuilderProps {
  projectId?: string;
}

export const Builder: React.FC<BuilderProps> = ({ projectId }) => {
  const [appMode, setAppMode] = useState<AppMode>('CHAT');
  const [chatModeView, setChatModeView] = useState<ViewMode>('PREVIEW');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [multiFileCode, setMultiFileCode] = useState<GeneratedFile[]>([]);
  const [previewFile, setPreviewFile] = useState<GeneratedFile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generationPlan, setGenerationPlan] = useState<string[]>([]);
  const [generatedFilesProgress, setGeneratedFilesProgress] = useState<string[]>([]);
  const [isGenerated, setIsGenerated] = useState(false);
  
  const [projects, setProjects] = useLocalStorage<Project[]>('ai-app-builder-projects', []);
  const [settings] = useLocalStorage<Settings>('ai-app-builder-settings', initialSettings);

  useEffect(() => {
    if (projectId) {
      const project = projects.find(p => p.id === projectId);
      if (project) {
        setMultiFileCode(project.files);
        setPreviewFile(project.previewFile);
        setMessages([{ role: 'model', content: `Loaded project: ${project.name}` }]);
        setIsGenerated(true);
        setAppMode('CHAT');
        setChatModeView('PREVIEW');
      }
    }
  }, [projectId, projects]);


  const handleSend = useCallback(async (prompt: string) => {
    if (!prompt.trim()) return;

    const userMessage: ChatMessage = { role: 'user', content: prompt };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);
    setMultiFileCode([]);
    setPreviewFile(null);
    setGenerationPlan([]);
    setGeneratedFilesProgress([]);
    setIsGenerated(false);

    const tempMultiFileCode: GeneratedFile[] = [];
    let tempPreviewFile: GeneratedFile | null = null;

    try {
      await generateAppStream(prompt, settings, (update) => {
        if (update.type === 'plan' && Array.isArray(update.files)) {
          setGenerationPlan(update.files);
        } else if (update.type === 'file' && update.file) {
          tempMultiFileCode.push(update.file);
          setGeneratedFilesProgress(prev => [...prev, update.file.path]);
        } else if (update.type === 'previewFile' && update.file) {
          tempPreviewFile = update.file;
          setPreviewFile(update.file);
        }
      });

      setMultiFileCode(tempMultiFileCode);

      const modelMessage: ChatMessage = {
        role: 'model',
        content: 'I have generated the application code. You can save it as a new project.'
      };
      setMessages(prev => [...prev, modelMessage]);
      setAppMode('CHAT');
      setChatModeView('PREVIEW');
      setIsGenerated(true);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to generate app: ${errorMessage}`);
      const modelErrorMessage: ChatMessage = { role: 'model', content: `Sorry, I ran into an error: ${errorMessage}` };
      setMessages(prev => [...prev, modelErrorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [settings]);

  const handleSaveProject = () => {
    const projectName = prompt('Enter a name for your project:') || `Project ${Date.now()}`;
    if (projectName && multiFileCode.length > 0) {
      const newProject: Project = {
        id: Date.now().toString(),
        name: projectName,
        createdAt: new Date().toISOString(),
        files: multiFileCode,
        previewFile: previewFile,
      };
      setProjects(prev => [...prev, newProject]);
      alert(`Project "${projectName}" saved!`);
    }
  };


  const renderContent = () => {
    switch (appMode) {
      case 'CHAT':
        return (
          <ChatView
            messages={messages}
            multiFileCode={multiFileCode}
            previewFile={previewFile}
            viewMode={chatModeView}
            setViewMode={setChatModeView}
            isLoading={isLoading}
            error={error}
            generationPlan={generationPlan}
            generatedFilesProgress={generatedFilesProgress}
            vercelToken={settings.vercelApiKey}
          />
        );
      case 'CODE':
        return <WorkspaceView files={multiFileCode} />;
      case 'PREVIEW':
        return <PreviewView file={previewFile} vercelToken={settings.vercelApiKey} />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col font-sans overflow-hidden">
      <Header 
        activeMode={appMode} 
        setAppMode={setAppMode}
        onSaveProject={handleSaveProject}
        isSaveEnabled={isGenerated && !isLoading}
      />
      <main className="flex-1 flex flex-col overflow-hidden pb-24 relative">
        {isLoading && appMode !== 'CHAT' && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
            <Spinner className="h-10 w-10" />
          </div>
        )}
        {renderContent()}
      </main>
      <PromptInput onSend={handleSend} isLoading={isLoading} />
    </div>
  );
};
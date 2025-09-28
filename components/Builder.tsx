import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './Header';
import { PromptInput } from './PromptInput';
import { ChatView } from './ChatView';
import { WorkspaceView } from './WorkspaceView';
import { PreviewView } from './PreviewView';
import { generateAppStream, generateIdeaStream } from '../services/geminiService';
import { AppMode, ChatMessage, GeneratedFile, ViewMode, Project, Settings } from '../types';
import { Spinner } from './Spinner';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ProjectMetadataModal } from './ProjectMetadataModal';

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
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isIdeaMode, setIsIdeaMode] = useState(false);

  const handleSend = useCallback(async (prompt: string) => {
    if (!prompt.trim()) return;

    const userMessage: ChatMessage = { role: 'user', content: prompt };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);
    
    if (isIdeaMode) {
      // Handle idea generation chat
      setMessages(prev => [...prev, { role: 'model', content: '' }]);
      try {
        await generateIdeaStream(prompt, settings, (chunk) => {
          setMessages(prev => prev.map((msg, index) => 
            index === prev.length - 1 
              ? { ...msg, content: msg.content + chunk } 
              : msg
          ));
        });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
        setError(`Failed to get response: ${errorMessage}`);
        const errorContent = `Sorry, I ran into an error: ${errorMessage}`;
        setMessages(prev => prev.map((msg, index) => 
            index === prev.length - 1 
              ? { ...msg, content: errorContent } 
              : msg
        ));
      } finally {
        setIsLoading(false);
      }
    } else {
      // Handle app generation/editing
      setGenerationPlan([]);
      setGeneratedFilesProgress([]);

      const isEdit = isGenerated;
      const filesForContext = isEdit ? multiFileCode : undefined;
      const appName = currentProject?.name;
      const appIcon = currentProject?.appIcon;

      try {
        let planReceived = false;

        await generateAppStream(prompt, settings, (update) => {
          if (update.type === 'plan' && Array.isArray(update.files)) {
              if(!planReceived) {
                  setMultiFileCode([]);
                  setPreviewFile(null);
                  planReceived = true;
              }
              setGenerationPlan(update.files);
          } else if (update.type === 'file' && update.file) {
            setMultiFileCode(prev => [...prev, update.file]);
            setGeneratedFilesProgress(prev => [...prev, update.file.path]);
          } else if (update.type === 'previewFile' && update.file) {
            setPreviewFile(update.file);
          }
        }, filesForContext, appName, appIcon);

        const modelMessage: ChatMessage = {
          role: 'model',
          content: isEdit 
            ? 'I have applied the changes to the application.' 
            : 'I have generated the application code. You can save it as a new project.'
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
    }
  }, [settings, isGenerated, multiFileCode, currentProject, isIdeaMode]);


  useEffect(() => {
    if (projectId) {
      const project = projects.find(p => p.id === projectId);
      if (project) {
        setCurrentProject(project);
        setMultiFileCode(project.files);
        setPreviewFile(project.previewFile);
        setMessages([{ role: 'model', content: `Loaded project: ${project.name}` }]);
        setIsGenerated(true);
        setAppMode('CHAT');
        setChatModeView('PREVIEW');
      }
    } else {
        // This is a new project. Check for an initial prompt from the landing page.
        const initialPrompt = sessionStorage.getItem('initialPrompt');
        if (initialPrompt) {
            sessionStorage.removeItem('initialPrompt');
            handleSend(initialPrompt);
        } else {
           setCurrentProject(null);
        }
    }
  }, [projectId, projects, handleSend]);

  const toggleIdeaMode = () => setIsIdeaMode(prev => !prev);


  const handleSaveProject = (name: string, icon: string | null) => {
    if (name && multiFileCode.length > 0) {
      const newProject: Project = {
        id: currentProject?.id || Date.now().toString(),
        name: name,
        appIcon: icon || undefined,
        createdAt: currentProject?.createdAt || new Date().toISOString(),
        files: multiFileCode,
        previewFile: previewFile,
      };

      if (currentProject) {
        setProjects(prev => prev.map(p => p.id === newProject.id ? newProject : p));
      } else {
        setProjects(prev => [...prev, newProject]);
      }
      setCurrentProject(newProject);
      alert(`Project "${name}" saved!`);
      setIsSaveModalOpen(false);
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
            isIdeaMode={isIdeaMode}
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
        onSaveProject={() => setIsSaveModalOpen(true)}
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
      <PromptInput
        onSend={handleSend}
        isLoading={isLoading}
        isAppGenerated={isGenerated}
        isIdeaMode={isIdeaMode}
        onToggleIdeaMode={toggleIdeaMode}
      />
      <ProjectMetadataModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onSave={handleSaveProject}
        initialName={currentProject?.name}
        initialIcon={currentProject?.appIcon}
        title={currentProject ? "Save Project Details" : "Save New Project"}
      />
    </div>
  );
};
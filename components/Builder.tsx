import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './Header';
import { PromptInput } from './PromptInput';
import { ChatView } from './ChatView';
import { WorkspaceView } from './WorkspaceView';
import { PreviewView } from './PreviewView';
import { generateAppStream, generateIdeaStream } from '../services/geminiService';
import { createAndPushToRepo, pushToRepo } from '../services/githubService';
import { AppMode, ChatMessage, GeneratedFile, ViewMode, Project, Settings, TechStack, Deployment, Team } from '../types';
import { Spinner } from './Spinner';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ProjectMetadataModal } from './ProjectMetadataModal';
import { MacPreview } from './MacPreview';

const initialSettings: Settings = {
  geminiApiKey: '',
  vercelApiKey: '',
  supabaseUrl: '',
  supabaseAnonKey: '',
  stripePublicKey: '',
  stripeSecretKey: '',
  githubPat: '',
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
  const [isPushing, setIsPushing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generationPlan, setGenerationPlan] = useState<string[]>([]);
  const [generatedFilesProgress, setGeneratedFilesProgress] = useState<string[]>([]);
  const [isGenerated, setIsGenerated] = useState(false);
  
  const [projects, setProjects] = useLocalStorage<Project[]>('ai-app-builder-projects', []);
  const [settings] = useLocalStorage<Settings>('ai-app-builder-settings', initialSettings);
  const [teams] = useLocalStorage<Team[]>('silo-build-teams', []);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isIdeaMode, setIsIdeaMode] = useState(false);
  const [techStack, setTechStack] = useState<TechStack | null>(null);
  const [isMacPreviewVisible, setIsMacPreviewVisible] = useState(false);
  const [initialPrompt, setInitialPrompt] = useState<string | null>(null);
  const [deployments, setDeployments] = useState<Deployment[]>([]);


  const handleSend = useCallback(async (prompt: string, stackOverride?: TechStack) => {
    if (!prompt.trim()) return;

    const userMessage: ChatMessage = { role: 'user', content: prompt };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);
    
    const stackToUse = stackOverride || techStack;

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
      if (!stackToUse) {
          setError("Please select a technology stack before generating an app.");
          setIsLoading(false);
          setMessages(prev => prev.slice(0, prev.length -1)); // remove user message
          return;
      }
      // Handle app generation/editing
      setGenerationPlan([]);
      setGeneratedFilesProgress([]);
      // Clear old deployments for a new generation
      if (!isGenerated) {
        setDeployments([]);
      }

      const isEdit = isGenerated;
      const filesForContext = isEdit ? multiFileCode : undefined;
      const appName = currentProject?.name;
      const appIcon = currentProject?.appIcon;

      try {
        let planReceived = false;
        let tempFiles: GeneratedFile[] = [];

        await generateAppStream(prompt, settings, (update) => {
          if (update.type === 'plan' && Array.isArray(update.files)) {
              if(!planReceived) {
                  tempFiles = [];
                  setPreviewFile(null);
                  planReceived = true;
              }
              setGenerationPlan(update.files);
          } else if (update.type === 'file' && update.file) {
            tempFiles.push(update.file);
            setMultiFileCode([...tempFiles]);
            setGeneratedFilesProgress(prev => [...prev, update.file.path]);
          } else if (update.type === 'previewFile' && update.file) {
            setPreviewFile(update.file);
          }
        }, stackToUse, filesForContext, appName, appIcon);

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
  }, [settings, isGenerated, multiFileCode, currentProject, isIdeaMode, techStack]);


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
        setTechStack(project.stack || 'react'); // Default old projects to react
        setDeployments(project.deployments || []);
      }
    } else {
        // This is a new project. Reset everything.
        setCurrentProject(null);
        setMultiFileCode([]);
        setPreviewFile(null);
        setMessages([]);
        setIsGenerated(false);
        setTechStack(null);
        setDeployments([]);

        const promptFromStorage = sessionStorage.getItem('initialPrompt');
        if (promptFromStorage) {
            setInitialPrompt(promptFromStorage);
            sessionStorage.removeItem('initialPrompt');
        }
    }
  }, [projectId, projects]);

  const handleSelectStack = (stack: TechStack) => {
    setTechStack(stack);
    if (initialPrompt) {
        handleSend(initialPrompt, stack);
        setInitialPrompt(null);
    }
  };

  const toggleIdeaMode = () => setIsIdeaMode(prev => !prev);


  const handleSaveProject = async (name: string, icon: string | null, createRepo: boolean, teamId: string | null) => {
    if (!name.trim() || multiFileCode.length === 0 || !techStack) {
      alert("Cannot save: project name, code, or tech stack is missing.");
      return;
    }
    
    setIsSaveModalOpen(false);

    const now = new Date().toISOString();
    const projectStub: Omit<Project, 'id'> = {
        name: name,
        appIcon: icon || undefined,
        createdAt: currentProject?.createdAt || now,
        updatedAt: now,
        files: multiFileCode,
        previewFile: previewFile,
        stack: techStack,
        deployments: deployments,
        githubUrl: currentProject?.githubUrl,
        teamId: teamId || undefined,
    };

    let projectToSave: Project;
    let isNewProject = !currentProject;

    if (isNewProject) {
        projectToSave = { ...projectStub, id: Date.now().toString() };
        setProjects(prev => [...prev, projectToSave]);
    } else {
        projectToSave = { ...projectStub, id: currentProject.id };
        setProjects(prev => prev.map(p => p.id === projectToSave.id ? projectToSave : p));
    }
    setCurrentProject(projectToSave);
    
    if (createRepo && !projectToSave.githubUrl) {
      if (!settings.githubPat) {
        alert("Please set your GitHub Personal Access Token in the Settings page to create a repository.");
        return;
      }
      setIsPushing(true);
      try {
        const repoUrl = await createAndPushToRepo(settings.githubPat, name, multiFileCode);
        const updatedProjectWithRepo = { ...projectToSave, githubUrl: repoUrl };
        setProjects(prev => prev.map(p => p.id === updatedProjectWithRepo.id ? updatedProjectWithRepo : p));
        setCurrentProject(updatedProjectWithRepo);
        alert(`Successfully created and pushed to ${repoUrl}`);
      } catch (error) {
        console.error("GitHub repo creation failed:", error);
        alert(`Failed to create GitHub repository: ${error instanceof Error ? error.message : 'Unknown error'}`);
      } finally {
        setIsPushing(false);
      }
    } else {
       alert(`Project "${name}" saved!`);
    }

    if(isNewProject) {
        window.location.hash = `#/project/${projectToSave.id}`;
    }
  };

  const handleCommitAndPush = async () => {
    if (!currentProject?.githubUrl) {
      alert("This project is not linked to a GitHub repository.");
      return;
    }
     if (!settings.githubPat) {
        alert("Please set your GitHub Personal Access Token in the Settings page.");
        return;
      }

    const commitMessage = prompt("Enter a commit message:", "feat: Update project from Silo Build");
    if (!commitMessage) return;
    
    setIsPushing(true);
    try {
        await pushToRepo(settings.githubPat, currentProject.githubUrl, multiFileCode, commitMessage);
        alert("Successfully pushed changes to GitHub!");
    } catch (error) {
        console.error("GitHub push failed:", error);
        alert(`Failed to push to GitHub: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
        setIsPushing(false);
    }
  };
  
  const handleFileUpdate = (path: string, content: string) => {
    setMultiFileCode(prev => prev.map(f => f.path === path ? { ...f, content } : f));
    setIsGenerated(true); // Mark as having content to save
  };

  const handleFileDelete = (path: string) => {
    setMultiFileCode(prev => prev.filter(f => f.path !== path));
  };

  const handleFileAdd = (path: string): boolean => {
    if (multiFileCode.some(f => f.path === path)) {
        alert(`File "${path}" already exists.`);
        return false;
    }
    setMultiFileCode(prev => [...prev, { path, content: '' }]);
    setIsGenerated(true);
    return true;
  };

  const handleNewDeployment = (deployment: Deployment) => {
    // Add new deployment to the front, replacing any previous one with the same URL
    setDeployments(prev => [deployment, ...prev.filter(d => d.url !== deployment.url)]);
    setIsGenerated(true); // Enable save button if a deployment is made
  };


  const showStackSelector = !isGenerated && !techStack && !isIdeaMode;

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
            onFileUpdate={handleFileUpdate}
            onFileDelete={handleFileDelete}
            onFileAdd={handleFileAdd}
            projectName={currentProject?.name}
            showStackSelector={showStackSelector}
            onSelectStack={handleSelectStack}
            onToggleMacPreview={() => setIsMacPreviewVisible(true)}
            deployments={deployments}
            onNewDeployment={handleNewDeployment}
          />
        );
      case 'CODE':
        return (
          <WorkspaceView 
            files={multiFileCode} 
            onFileUpdate={handleFileUpdate}
            onFileDelete={handleFileDelete}
            onFileAdd={handleFileAdd}
          />
        );
      case 'PREVIEW':
        return <PreviewView 
          file={previewFile} 
          vercelToken={settings.vercelApiKey}
          multiFileCode={multiFileCode}
          projectName={currentProject?.name}
          onToggleMacPreview={() => setIsMacPreviewVisible(true)}
          deployments={deployments}
          onNewDeployment={handleNewDeployment}
        />;
      default:
        return null;
    }
  };
  
  const isBusy = isLoading || isPushing;

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col font-sans overflow-hidden">
      <Header 
        activeMode={appMode} 
        setAppMode={setAppMode}
        onSaveProject={() => setIsSaveModalOpen(true)}
        isSaveEnabled={isGenerated && !isBusy && !!techStack}
        isGithubLinked={!!currentProject?.githubUrl}
        onCommitAndPush={handleCommitAndPush}
        project={currentProject}
      />
      <main className="flex-1 flex flex-col overflow-hidden pb-24 relative">
        {isBusy && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="flex flex-col items-center gap-2">
                <Spinner className="h-10 w-10" />
                <span className="text-sm text-gray-300">
                    {isPushing ? 'Pushing to GitHub...' : 'Generating...'}
                </span>
            </div>
          </div>
        )}
        {renderContent()}
      </main>
      <PromptInput
        onSend={handleSend}
        isLoading={isBusy}
        isAppGenerated={isGenerated}
        isIdeaMode={isIdeaMode}
        onToggleIdeaMode={toggleIdeaMode}
        isReadyToPrompt={!!techStack || isGenerated}
      />
       {isMacPreviewVisible && previewFile && (
        <MacPreview
            previewFile={previewFile}
            projectName={currentProject?.name || 'My App'}
            appIcon={currentProject?.appIcon || null}
            onClose={() => setIsMacPreviewVisible(false)}
        />
      )}
      <ProjectMetadataModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onSave={handleSaveProject}
        initialName={currentProject?.name}
        initialIcon={currentProject?.appIcon}
        title={currentProject ? "Save Project Details" : "Save New Project"}
        isGithubLinked={!!currentProject?.githubUrl}
        teams={teams}
        initialTeamId={currentProject?.teamId}
      />
    </div>
  );
};
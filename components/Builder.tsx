import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './Header';
import { PromptInput } from './PromptInput';
import { ChatView } from './ChatView';
import { WorkspaceView } from './WorkspaceView';
import { PreviewView } from './PreviewView';
import { generateAppStream } from '../services/geminiService';
import { createAndPushToRepo, pushToRepo } from '../services/githubService';
import { AppMode, ChatMessage, GeneratedFile, ViewMode, Project, Settings, TechStack, Deployment, Team, Table, WorkflowDefinition } from '../types';
import { Spinner } from './Spinner';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ProjectMetadataModal } from './ProjectMetadataModal';
import { MacPreview } from './MacPreview';
import { showLocalNotification, downloadProjectAsZip } from '../utils/projectUtils';
import { WorkflowBuilderPage } from '../pages/WorkflowBuilderPage';
import { DeployModal } from './DeployModal';
import { PublishView } from './PublishView';
import { InfinityView } from './InfinityView';

const initialSettings: Settings = {
  geminiApiKey: '',
  supabaseUrl: '',
  supabaseAnonKey: '',
  stripePublicKey: '',
  stripeSecretKey: '',
  githubPat: '',
  netlifyPat: '',
  model: 'gemini-2.5-flash',
};

// This type is also defined in SettingsPage.tsx. We define it here to use with useLocalStorage.
interface UserPreferences {
  notifications: {
    updates: boolean;
    deployments: boolean;
  };
  layout?: {
    promptInputLayout: 'floating' | 'inline';
  };
}

const initialPreferences: UserPreferences = {
  notifications: {
    updates: true,
    deployments: true,
  },
  layout: {
      promptInputLayout: 'floating',
  }
};

interface BuilderProps {
  projectId: string;
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
  const [generationSummary, setGenerationSummary] = useState<string | null>(null);
  
  const [projects, setProjects] = useLocalStorage<Project[]>('ai-app-builder-projects', []);
  const [settings] = useLocalStorage<Settings>('ai-app-builder-settings', initialSettings);
  const [preferences] = useLocalStorage<UserPreferences>('silo-build-preferences', initialPreferences);
  const [teams] = useLocalStorage<Team[]>('silo-build-teams', []);
  const [schema, setSchema] = useLocalStorage<Table[]>('silo-build-schema', []);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isIdeaMode, setIsIdeaMode] = useState(false);
  const [techStack, setTechStack] = useState<TechStack | null>(null);
  const [isMacPreviewVisible, setIsMacPreviewVisible] = useState(false);
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [workflow, setWorkflow] = useState<WorkflowDefinition | null>(null);

  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentError, setDeploymentError] = useState<string | null>(null);
  const [promptForCredentials, setPromptForCredentials] = useState<string | null>(null);

  const executeBuild = useCallback(async (prompt: string, stackOverride?: TechStack, customCredentials?: Record<string, string>, imageData?: string | null) => {
      const stackToUse = stackOverride || techStack;
      if (!stackToUse) {
          setError("Tech stack is not defined for this project.");
          setIsLoading(false);
          return;
      }
      
      setAppMode('CHAT');
      setIsLoading(true);
      setError(null);
      setGenerationPlan([]);
      setGeneratedFilesProgress([]);
      setGenerationSummary(null);

      const filesForContext = multiFileCode;
      let appName = currentProject?.name;
      const appIcon = currentProject?.appIcon;

      let wasCredentialRequestHandled = false;
      try {
        let planReceived = false;
        let tempFiles: GeneratedFile[] = [];

        await generateAppStream(prompt, settings, (update) => {
          if (update.type === 'summary' && typeof update.summary === 'string') {
            setGenerationSummary(update.summary);
          } else if (update.type === 'thoughts' && update.thoughts) {
            const thoughtsMessage: ChatMessage = { role: 'model', content: "I've drafted a plan to apply your changes.", thoughts: update.thoughts };
            setMessages(prev => [...prev, thoughtsMessage]);
          } else if (update.type === 'plan' && Array.isArray(update.files)) {
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
          } else if (update.type === 'database_schema' && update.schema) {
              const newTable: Table = {
                id: crypto.randomUUID(),
                name: update.schema.name,
                columns: update.schema.columns.map((col: any) => ({ ...col, id: crypto.randomUUID() }))
              };

              setSchema(prevSchema => {
                  const existingTableIndex = prevSchema.findIndex(t => t.name === newTable.name);
                  if (existingTableIndex > -1) {
                      const updatedSchema = [...prevSchema];
                      updatedSchema[existingTableIndex] = newTable;
                      return updatedSchema;
                  } else {
                      return [...prevSchema, newTable];
                  }
              });

              const schemaMessage: ChatMessage = {
                  role: 'model',
                  content: `I've created/updated the database schema for the '${update.schema.name}' table. I will now generate code that uses this structure.`,
                  schema: update.schema
              };
              setMessages(prev => [...prev, schemaMessage]);
          } else if (update.type === 'workflow_definition' && update.workflow) {
            setWorkflow(update.workflow);
            const workflowMessage: ChatMessage = {
                role: 'model',
                content: "I've created or updated the workflow for your application. You can view it in the 'Workflow' tab."
            };
            setMessages(prev => [...prev, workflowMessage]);
          } else if (update.type === 'credential_request' && update.request) {
              const credentialMessage: ChatMessage = {
                  role: 'model',
                  content: `To continue, I need some information for ${update.request.toolName}.`,
                  credentialRequest: update.request,
              };
              setMessages(prev => [...prev, credentialMessage]);
              setPromptForCredentials(prompt);
              wasCredentialRequestHandled = true;
              throw new Error('CREDENTIAL_REQUEST_PENDING');
          }
        }, stackToUse, filesForContext, appName, appIcon, customCredentials, imageData);

        const modelMessage: ChatMessage = {
          role: 'model',
          content: 'I have applied the changes to the application.'
        };
        setMessages(prev => [...prev, modelMessage]);
        setAppMode('CHAT');
        setChatModeView('PREVIEW');

        showLocalNotification(
            'Build Complete!',
            {
                body: `Your project "${appName || 'New App'}" has finished generating.`,
                icon: 'https://i.ibb.co/svVCNWvV/Google-AI-Studio-2025-09-29-T00-23-01-230-Z-modified.png',
                tag: `build-${currentProject?.id || Date.now()}`
            }
        );

      } catch (err) {
        if (err instanceof Error && err.message === 'CREDENTIAL_REQUEST_PENDING') {
            setIsLoading(false);
            return;
        }
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
        setError(`Failed to generate app: ${errorMessage}`);
        const modelErrorMessage: ChatMessage = { role: 'model', content: `Sorry, I ran into an error: ${errorMessage}` };
        setMessages(prev => [...prev, modelErrorMessage]);
      } finally {
        if (!wasCredentialRequestHandled) {
            setIsLoading(false);
        }
      }
  }, [settings, multiFileCode, currentProject, techStack, setSchema]);


  const handleSend = useCallback(async (prompt: string, imageData?: string | null) => {
    if (!prompt.trim() && !imageData) return;

    const userMessage: ChatMessage = { role: 'user', content: prompt || "Updating app from image..." };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);
    
    executeBuild(prompt, undefined, undefined, imageData);
    
  }, [settings, techStack, executeBuild]);

  const handleCredentialSubmit = (credentials: Record<string, string>) => {
    if (!promptForCredentials) return;

    const userMessage: ChatMessage = { role: 'user', content: "Okay, I've provided the credentials." };
    setMessages(prev => [...prev, userMessage]);
    
    executeBuild(promptForCredentials, techStack, credentials);

    setPromptForCredentials(null);
  };
  
  const handleAddSupabase = () => {
    if (!settings.supabaseUrl || !settings.supabaseAnonKey) {
        setError("Supabase credentials are not configured. Please add them in the Settings page.");
        setMessages(prev => [...prev, {role: 'model', content: "Supabase credentials are not configured. Please add them in the Settings page."}]);
        return;
    }
    const supabasePrompt = "Please integrate Supabase into this project. Create a `src/supabaseClient.ts` file that exports a configured Supabase client. Use the Supabase URL and Anon Key provided in the system instructions. Also, make sure to import and use this client in the main App component to demonstrate its usage, for example, by fetching a list of items from a 'todos' table and displaying them.";
    executeBuild(supabasePrompt);
  };


  useEffect(() => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      setCurrentProject(project);
      setMultiFileCode(project.files);
      setPreviewFile(project.previewFile);
      const initialMessages: ChatMessage[] = [{ role: 'model', content: `Loaded project: ${project.name}` }];
      if (project.thoughts) {
        initialMessages.push({ role: 'model', content: "I've loaded my previous plan for this project.", thoughts: project.thoughts });
      }
      setMessages(initialMessages);
      setAppMode('CHAT');
      setChatModeView('PREVIEW');
      setTechStack(project.stack || 'react'); // Default old projects to react
      setDeployments(project.deployments || []);
      setWorkflow(project.workflow || null);
    } else {
        // Project not found, redirect to dashboard
        window.location.hash = '#/dashboard/projects';
    }
  }, [projectId, projects]);

  const handleSaveProject = async (name: string, icon: string | null, createRepo: boolean, teamId: string | null) => {
    if (!name.trim() || multiFileCode.length === 0 || !techStack || !currentProject) {
      alert("Cannot save: project name, code, or tech stack is missing.");
      return;
    }
    
    setIsSaveModalOpen(false);
    
    const lastThoughts = [...messages].reverse().find(m => m.thoughts)?.thoughts;
    const now = new Date().toISOString();
    
    const projectToSave: Project = {
        ...currentProject,
        name: name,
        appIcon: icon || undefined,
        updatedAt: now,
        files: multiFileCode,
        previewFile: previewFile,
        stack: techStack,
        deployments: deployments,
        githubUrl: currentProject?.githubUrl,
        teamId: teamId || undefined,
        workflow: workflow || undefined,
        thoughts: lastThoughts || currentProject?.thoughts,
    };

    setProjects(prev => prev.map(p => p.id === projectToSave.id ? projectToSave : p));
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
    return true;
  };

  const handleNewDeployment = (deployment: Deployment) => {
    // Add new deployment to the front, replacing any previous one with the same URL
    setDeployments(prev => [deployment, ...prev.filter(d => d.url !== deployment.url)]);
  };
  
  const handleDeploy = async (token: string, newSiteName: string) => {
    if (!token || !previewFile) {
      setDeploymentError("Netlify token is missing or there is no preview file to deploy.");
      return;
    }

    setIsDeploying(true);
    setDeploymentError(null);

    const createAndDeploy = async (siteName: string): Promise<any> => {
        const JSZip = (await import('jszip')).default;
        const zip = new JSZip();
        zip.file('index.html', previewFile.content);
        const zipBlob = await zip.generateAsync({ type: 'blob' });

        const response = await fetch(`https://api.netlify.com/api/v1/sites?name=${siteName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/zip',
                Authorization: `Bearer ${token}`,
            },
            body: zipBlob,
        });

        if (!response.ok) {
            const errorData = await response.json();
            if (response.status === 409) {
                // Specific error for site name conflict
                throw new Error('SITE_NAME_TAKEN');
            }
            throw new Error(errorData.message || 'Failed to create and deploy site.');
        }
        return response.json();
    };

    try {
        let sanitizedSiteName = (newSiteName || currentProject?.name || 'silo-build-app')
            .toLowerCase()
            .replace(/[^a-z0-9-]/g, '-')
            .substring(0, 50);

        let siteData;
        try {
            siteData = await createAndDeploy(sanitizedSiteName);
        } catch (error) {
            if (error instanceof Error && error.message === 'SITE_NAME_TAKEN') {
                console.warn(`Site name "${sanitizedSiteName}" is taken. Retrying with a random suffix.`);
                const randomSuffix = Math.random().toString(36).substring(2, 8);
                sanitizedSiteName = `${sanitizedSiteName}-${randomSuffix}`;
                siteData = await createAndDeploy(sanitizedSiteName);
            } else {
                throw error; // Re-throw other errors
            }
        }
      
      const newDeployment: Deployment = {
        url: siteData.ssl_url || siteData.url,
        timestamp: new Date().toISOString(),
      };
      handleNewDeployment(newDeployment);
      setIsDeployModalOpen(false);

    } catch (error) {
      console.error("Netlify deployment failed:", error);
      const message = error instanceof Error ? error.message : "An unknown error occurred during deployment.";
      setDeploymentError(`Deployment failed: ${message}`);
    } finally {
      setIsDeploying(false);
    }
  };

  const handleDownload = () => {
    if (!currentProject) {
        alert("Please save the project first to give it a name.");
        return;
    }
    const projectToDownload: Project = {
        ...currentProject,
        files: multiFileCode,
        previewFile: previewFile,
    };
    downloadProjectAsZip(projectToDownload);
  };

  const promptInputLayout = preferences.layout?.promptInputLayout || 'floating';

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
            generationSummary={generationSummary}
            isIdeaMode={isIdeaMode}
            onFileUpdate={handleFileUpdate}
            onFileDelete={handleFileDelete}
            onFileAdd={handleFileAdd}
            onToggleMacPreview={() => setIsMacPreviewVisible(true)}
            deployments={deployments}
            techStack={techStack}
            onCredentialSubmit={handleCredentialSubmit}
            promptInputLayout={promptInputLayout}
            onSend={handleSend}
            isAppGenerated={true}
            onToggleIdeaMode={() => setIsIdeaMode(prev => !prev)}
            isReadyToPrompt={true}
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
          onToggleMacPreview={() => setIsMacPreviewVisible(true)}
          deployments={deployments}
          techStack={techStack}
        />;
      case 'PUBLISH':
        return <PublishView 
            project={currentProject}
            deployments={deployments}
            onCommitAndPush={handleCommitAndPush}
            onDeployClick={() => setIsDeployModalOpen(true)}
            onConnectGitHub={() => setIsSaveModalOpen(true)}
            isPushing={isPushing}
        />;
      case 'WORKFLOW':
        return workflow ? <WorkflowBuilderPage workflow={workflow} /> : 
          <div className="flex items-center justify-center h-full text-gray-500">
            No workflow defined for this project.
          </div>;
      default:
        return null;
    }
  };
  
  const isBusy = isLoading || isPushing;

  if (techStack === 'infinity') {
      return <InfinityView settings={settings} />;
  }

  return (
    <div className="h-screen w-screen bg-white text-gray-900 flex flex-col font-sans overflow-hidden">
      <Header 
        activeMode={appMode} 
        setAppMode={setAppMode}
        project={currentProject}
        onAddSupabase={handleAddSupabase}
        onConnectGitHub={() => setIsSaveModalOpen(true)}
        onDownload={handleDownload}
        isGithubConnected={!!currentProject?.githubUrl}
      />
      <main className={`flex-1 flex flex-col overflow-hidden relative ${promptInputLayout === 'floating' ? 'pb-24' : ''}`}>
        {isPushing && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="flex flex-col items-center gap-2">
                <Spinner className="h-10 w-10" />
                <span className="text-sm text-gray-600">Pushing to GitHub...</span>
            </div>
          </div>
        )}
        {renderContent()}
      </main>
      {promptInputLayout === 'floating' && (
        <PromptInput
          onSend={handleSend}
          isLoading={isBusy}
          isAppGenerated={true}
          isIdeaMode={isIdeaMode}
          onToggleIdeaMode={() => setIsIdeaMode(prev => !prev)}
          isReadyToPrompt={true}
          layoutStyle="floating"
        />
      )}
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
       <DeployModal 
        isOpen={isDeployModalOpen}
        onClose={() => {
            setIsDeployModalOpen(false);
            setDeploymentError(null);
        }}
        onDeploy={handleDeploy}
        isDeploying={isDeploying}
        initialProjectName={currentProject?.name}
        initialToken={settings.netlifyPat}
        deploymentError={deploymentError}
      />
    </div>
  );
};
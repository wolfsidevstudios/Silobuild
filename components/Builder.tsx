import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './Header';
import { PromptInput } from './PromptInput';
import { ChatView } from './ChatView';
import { WorkspaceView } from './WorkspaceView';
import { PreviewView } from './PreviewView';
import { generateAppStream, generateIdeaStream } from '../services/geminiService';
import { createAndPushToRepo, pushToRepo } from '../services/githubService';
import { AppMode, ChatMessage, GeneratedFile, ViewMode, Project, Settings, TechStack, Deployment, Team, Table, WorkflowDefinition } from '../types';
import { Spinner } from './Spinner';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ProjectMetadataModal } from './ProjectMetadataModal';
import { MacPreview } from './MacPreview';
import { showLocalNotification } from '../utils/projectUtils';
import { WorkflowBuilderPage } from '../pages/WorkflowBuilderPage';
import { DeployModal } from './DeployModal';

const initialSettings: Settings = {
  geminiApiKey: '',
  vercelApiKey: '',
  supabaseUrl: '',
  supabaseAnonKey: '',
  stripePublicKey: '',
  stripeSecretKey: '',
  githubPat: '',
  netlifyPat: '',
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
  const [generationSummary, setGenerationSummary] = useState<string | null>(null);
  const [isGenerated, setIsGenerated] = useState(false);
  
  const [projects, setProjects] = useLocalStorage<Project[]>('ai-app-builder-projects', []);
  const [settings] = useLocalStorage<Settings>('ai-app-builder-settings', initialSettings);
  const [teams] = useLocalStorage<Team[]>('silo-build-teams', []);
  const [schema, setSchema] = useLocalStorage<Table[]>('silo-build-schema', []);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isIdeaMode, setIsIdeaMode] = useState(false);
  const [techStack, setTechStack] = useState<TechStack | null>(null);
  const [isMacPreviewVisible, setIsMacPreviewVisible] = useState(false);
  const [initialPrompt, setInitialPrompt] = useState<string | null>(null);
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [workflow, setWorkflow] = useState<WorkflowDefinition | null>(null);

  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentError, setDeploymentError] = useState<string | null>(null);


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
      setGenerationSummary(null);
      // Clear old deployments for a new generation
      if (!isGenerated) {
        setDeployments([]);
      }

      const isEdit = isGenerated;
      const filesForContext = isEdit ? multiFileCode : undefined;
      let appName = currentProject?.name;
      const appIcon = currentProject?.appIcon;

      try {
        let planReceived = false;
        let tempFiles: GeneratedFile[] = [];

        await generateAppStream(prompt, settings, (update) => {
          if (update.type === 'summary' && typeof update.summary === 'string') {
            setGenerationSummary(update.summary);
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
            // Infer app name from preview title if not set
            if (!appName) {
                const titleMatch = update.file.content.match(/<title>(.*?)<\/title>/);
                if (titleMatch && titleMatch[1]) {
                    appName = titleMatch[1];
                }
            }
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

        showLocalNotification(
            'Build Complete!',
            {
                body: `Your project "${appName || 'New App'}" has finished generating.`,
                icon: 'https://i.ibb.co/svVCNWvV/Google-AI-Studio-2025-09-29-T00-23-01-230-Z-modified.png',
                tag: `build-${currentProject?.id || Date.now()}`
            }
        );

      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
        setError(`Failed to generate app: ${errorMessage}`);
        const modelErrorMessage: ChatMessage = { role: 'model', content: `Sorry, I ran into an error: ${errorMessage}` };
        setMessages(prev => [...prev, modelErrorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  }, [settings, isGenerated, multiFileCode, currentProject, isIdeaMode, techStack, setSchema]);
  
  const handleAddSupabase = () => {
    if (!settings.supabaseUrl || !settings.supabaseAnonKey) {
        setError("Supabase credentials are not configured. Please add them in the Settings page.");
        setMessages(prev => [...prev, {role: 'model', content: "Supabase credentials are not configured. Please add them in the Settings page."}]);
        return;
    }
    const supabasePrompt = "Please integrate Supabase into this project. Create a `src/supabaseClient.ts` file that exports a configured Supabase client. Use the Supabase URL and Anon Key provided in the system instructions. Also, make sure to import and use this client in the main App component to demonstrate its usage, for example, by fetching a list of items from a 'todos' table and displaying them.";
    handleSend(supabasePrompt);
  };


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
        setWorkflow(project.workflow || null);
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
        setWorkflow(null);

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
        workflow: workflow || undefined,
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
  
    const handleDeploy = async (token: string, newProjectName: string) => {
    if (!token || multiFileCode.length === 0) {
      setDeploymentError("Vercel token is missing or there are no files to deploy.");
      return;
    }

    setIsDeploying(true);
    setDeploymentError(null);

    try {
      const filesForApi = multiFileCode.map(({ path, content }) => ({
        file: path,
        data: content,
      }));

      const sanitizedProjectName = (newProjectName || 'silo-build-app').toLowerCase().replace(/[^a-z0-9-]/g, '-').substring(0, 50);

      filesForApi.push({
        file: 'package.json',
        data: JSON.stringify({
          name: sanitizedProjectName,
          version: '0.1.0',
          private: true,
        }),
      });

      const response = await fetch('https://api.vercel.com/v13/deployments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: sanitizedProjectName,
          files: filesForApi,
          projectSettings: {
            framework: null, // Let Vercel auto-detect
          },
          target: 'production',
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error?.message || 'Failed to deploy to Vercel.');
      }

      const newDeployment: Deployment = {
        url: `https://${result.url}`,
        timestamp: new Date().toISOString(),
      };
      handleNewDeployment(newDeployment);
      setIsDeployModalOpen(false);

    } catch (error) {
      console.error("Vercel deployment failed:", error);
      const message = error instanceof Error ? error.message : "An unknown error occurred during deployment.";
      setDeploymentError(`Deployment failed: ${message}`);
    } finally {
      setIsDeploying(false);
    }
  };


  const showStackSelector = !isGenerated && !techStack && !isIdeaMode;
  const isBusy = isLoading || isPushing;

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
            showStackSelector={showStackSelector}
            onSelectStack={handleSelectStack}
            onToggleMacPreview={() => setIsMacPreviewVisible(true)}
            deployments={deployments}
            onAddSupabase={handleAddSupabase}
            techStack={techStack}
            currentProject={currentProject}
            onDeployClick={() => setIsDeployModalOpen(true)}
            onSaveClick={() => setIsSaveModalOpen(true)}
            onCommitAndPush={handleCommitAndPush}
            // Props for PromptInput
            onSend={handleSend}
            isPromptInputLoading={isBusy}
            isAppGenerated={isGenerated}
            onToggleIdeaMode={toggleIdeaMode}
            isReadyToPrompt={!!techStack || isGenerated}
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
          multiFileCode={multiFileCode}
          onToggleMacPreview={() => setIsMacPreviewVisible(true)}
          deployments={deployments}
          techStack={techStack}
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
  

  return (
    <div className="h-screen w-screen bg-white text-gray-900 flex flex-col font-sans overflow-hidden">
      <Header 
        activeMode={appMode} 
        setAppMode={setAppMode}
        project={currentProject}
        hasWorkflow={!!workflow}
      />
      <main className="flex-1 flex flex-col overflow-hidden relative">
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
        initialToken={settings.vercelApiKey}
        deploymentError={deploymentError}
      />
    </div>
  );
};
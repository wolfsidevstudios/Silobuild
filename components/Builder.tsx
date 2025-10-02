import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './Header';
import { PromptInput } from './PromptInput';
import { ChatView } from './ChatView';
import { WorkspaceView } from './WorkspaceView';
import { PreviewView } from './PreviewView';
import { generateAppStream, generateSuggestions } from '../services/geminiService';
import { createAndPushToRepo, pushToRepo } from '../services/githubService';
import { AppMode, ChatMessage, GeneratedFile, ViewMode, Project, Settings, TechStack, Deployment, Team, Table, WorkflowDefinition, CredentialRequest, AuthConfig, Version } from '../types';
import { Spinner } from './Spinner';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ProjectMetadataModal } from './ProjectMetadataModal';
import { MacPreview } from './MacPreview';
import { showLocalNotification, downloadProjectAsZip, timeAgo } from '../utils/projectUtils';
import { WorkflowBuilderPage } from '../pages/WorkflowBuilderPage';
import { DeployModal } from './DeployModal';
import { VercelDeployModal } from './VercelDeployModal';
import { PublishView } from './PublishView';
import { InfinityView } from './InfinityView';
import { AddAuthModal } from './AddAuthModal';
import { VersionHistoryModal } from './VersionHistoryModal';
import { ReactIcon, HtmlIcon, SvelteIcon, MobileIcon, UpArrowIcon, KeyIcon } from './icons';
import { prompts } from '../data/prompts';
import { useUsageLimit } from '../hooks/useUsageLimit';
import { PublishToCommunityModal } from './PublishToCommunityModal';
import { ShareUrlModal } from './ShareUrlModal';
import { supabase } from '../services/supabaseClient';
import { useAuth } from '../context/AuthContext';

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

const initialAuthConfig: AuthConfig = {
  appName: 'My App',
  appLogo: null,
  providers: {
    google: { enabled: false, clientId: '' },
    github: { enabled: false, clientId: '', clientSecret: '' },
    x: { enabled: false, clientId: '', clientSecret: '' },
  },
};

const StackCard: React.FC<{ icon: React.ReactNode; title: string; onClick: () => void; }> = ({ icon, title, onClick }) => (
    <button onClick={onClick} className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:border-gray-400 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
        <div className="w-5 h-5 flex items-center justify-center [&_svg]:w-full [&_svg]:h-full">{icon}</div>
        <span>{title}</span>
    </button>
);

const CreationCredentialForm: React.FC<{ request: CredentialRequest; onSubmit: (credentials: Record<string, string>) => void; }> = ({ request, onSubmit }) => {
  const [credentials, setCredentials] = useState<Record<string, string>>(() => 
    request.fields.reduce((acc, field) => ({ ...acc, [field.key]: '' }), {})
  );

  const handleChange = (key: string, value: string) => setCredentials(prev => ({ ...prev, [key]: value }));
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSubmit(credentials); };
  const isFormValid = request.fields.every(field => credentials[field.key]?.trim() !== '');

  return (
    <form onSubmit={handleSubmit} className="space-y-3 text-left">
      {request.fields.map(field => (
        <div key={field.key}>
          <label htmlFor={field.key} className="block text-xs font-medium text-gray-700">{field.label}</label>
          <div className="mt-1 relative rounded-md shadow-sm">
             <input type="password" id={field.key} value={credentials[field.key]} onChange={(e) => handleChange(field.key, e.target.value)} className="block w-full rounded-md border-gray-300 bg-gray-50 p-2 text-sm focus:border-blue-500 focus:ring-blue-500" required />
          </div>
        </div>
      ))}
      <div className="flex justify-end">
        <button type="submit" disabled={!isFormValid} className="bg-blue-600 text-white px-3 py-1.5 text-xs rounded-md font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400">
          Add API Key & Continue
        </button>
      </div>
    </form>
  );
};

interface BuilderProps {
  projectId?: string;
}

export const Builder: React.FC<BuilderProps> = ({ projectId }) => {
  // --- STATE ---
  const [appMode, setAppMode] = useState<AppMode>('CHAT');
  const [chatModeView, setChatModeView] = useState<ViewMode>('PREVIEW');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [multiFileCode, setMultiFileCode] = useState<GeneratedFile[]>([]);
  const [previewFile, setPreviewFile] = useState<GeneratedFile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPushing, setIsPushing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [projects, setProjects] = useLocalStorage<Project[]>('ai-app-builder-projects', []);
  const [settings] = useLocalStorage<Settings>('ai-app-builder-settings', initialSettings);
  const [authConfig] = useLocalStorage<AuthConfig>('silo-build-auth-config', initialAuthConfig);
  const [preferences] = useLocalStorage<UserPreferences>('silo-build-preferences', initialPreferences);
  const [teams] = useLocalStorage<Team[]>('silo-build-teams', []);
  const [schema, setSchema] = useLocalStorage<Table[]>('silo-build-schema', []);
  const { recordUsage } = useUsageLimit();
  const { user } = useAuth();


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
  const [isVercelDeployModalOpen, setIsVercelDeployModalOpen] = useState(false);
  const [isVercelDeploying, setIsVercelDeploying] = useState(false);
  const [vercelDeploymentError, setVercelDeploymentError] = useState<string | null>(null);
  const [promptForCredentials, setPromptForCredentials] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isRedeploying, setIsRedeploying] = useState<'netlify' | 'vercel' | null>(null);
  
  // --- COMMUNITY PUBLISH STATE ---
  const [isCommunityPublishModalOpen, setIsCommunityPublishModalOpen] = useState(false);
  const [isPublishingToCommunity, setIsPublishingToCommunity] = useState(false);
  const [communityPublishError, setCommunityPublishError] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState<string | null>(null);

  
  // --- CREATION FLOW STATE ---
  const [creationStage, setCreationStage] = useState<'stack' | 'prompt'>('stack');
  const [creationPrompt, setCreationPrompt] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);
  const [generationPlan, setGenerationPlan] = useState<string[]>([]);
  const [generatedFilesProgress, setGeneratedFilesProgress] = useState<string[]>([]);
  const [generationSummary, setGenerationSummary] = useState<string | null>(null);
  const [pendingCredentialRequest, setPendingCredentialRequest] = useState<CredentialRequest | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isGeneratingSuggestions, setIsGeneratingSuggestions] = useState(false);


  const executeBuild = useCallback(async (buildPrompt: string, imageData?: string | null, customCredentials?: Record<string, string>, authConfigToUse?: AuthConfig) => {
    const stackToUse = techStack;
    if (!stackToUse) {
        setError("Tech stack is not defined.");
        return;
    }
    
    // For new projects, record usage
    if (!currentProject) {
        if (!recordUsage()) {
            setError("You have reached your monthly creation limit.");
            setCreationStage('prompt');
            return;
        }
    }

    if (currentProject) { // This is an update in the builder
        const userMessage: ChatMessage = { role: 'user', content: buildPrompt || "Updating app from image..." };
        setMessages(prev => [...prev, userMessage]);
    }

    setIsLoading(true);
    setError(null);
    setGenerationPlan([]);
    setGeneratedFilesProgress([]);
    setGenerationSummary(null);
    setSuggestions([]);

    const filesForContext = currentProject ? multiFileCode : undefined;
    let credentialRequestReceived = false;

    try {
        let tempFiles: GeneratedFile[] = filesForContext ? [...filesForContext] : [];
        let tempPreviewFile: GeneratedFile | null = currentProject ? previewFile : null;
        let thoughts = '';

        await generateAppStream(buildPrompt, settings, (update) => {
          if (update.type === 'summary') setGenerationSummary(update.summary);
          if (update.type === 'thoughts') thoughts = update.thoughts;
          if (update.type === 'plan') setGenerationPlan(update.files);
          if (update.type === 'file') {
            const existingFileIndex = tempFiles.findIndex(f => f.path === update.file.path);
            if (existingFileIndex !== -1) {
              tempFiles[existingFileIndex] = update.file;
            } else {
              tempFiles.push(update.file);
            }
            setGeneratedFilesProgress(prev => [...new Set([...prev, update.file.path])]);
          }
          if (update.type === 'previewFile') tempPreviewFile = update.file;
          if (update.type === 'database_schema') {
              const newTable: Table = { id: crypto.randomUUID(), name: update.schema.name, columns: update.schema.columns.map((col: any) => ({ ...col, id: crypto.randomUUID() })) };
              setSchema(prev => prev.find(t => t.name === newTable.name) ? prev.map(t => t.name === newTable.name ? newTable : t) : [...prev, newTable]);
              const schemaMessage: ChatMessage = { role: 'model', content: `I've created/updated the schema for the '${update.schema.name}' table.`, schema: update.schema };
              setMessages(prev => [...prev, schemaMessage]);
          }
          if (update.type === 'workflow_definition') {
            setWorkflow(update.workflow);
            setMessages(prev => [...prev, { role: 'model', content: "I've created/updated the workflow." }]);
          }
          if (update.type === 'credential_request' && update.request) {
            setPendingCredentialRequest(update.request);
            setPromptForCredentials(buildPrompt);
            credentialRequestReceived = true;
            if (currentProject) {
                throw new Error('CREDENTIAL_REQUEST_PENDING');
            }
          }
        }, stackToUse, filesForContext, currentProject?.name, currentProject?.appIcon, customCredentials, imageData, authConfigToUse);
        
        if (credentialRequestReceived) {
            setIsLoading(false);
            return;
        }
        
        const now = new Date().toISOString();

        if (!currentProject) { // This was a new project creation
            const newProject: Project = {
                id: crypto.randomUUID(),
                name: buildPrompt.substring(0, 50).trim() || 'New Project',
                createdAt: now,
                updatedAt: now,
                files: tempFiles,
                previewFile: tempPreviewFile,
                stack: techStack!,
                deployments: [],
                thoughts: thoughts,
                workflow: workflow || undefined,
                versionHistory: [],
            };
            setCurrentProject(newProject);
            setProjects(prev => [newProject, ...prev]);
            setMultiFileCode(newProject.files);
            setPreviewFile(newProject.previewFile);
            setDeployments(newProject.deployments);
            setWorkflow(newProject.workflow);
            setMessages([{ role: 'model', content: `Generated and saved project: ${newProject.name}`, thoughts: thoughts }]);
        } else { // This was an update
             const newVersion: Version = {
                id: crypto.randomUUID(),
                timestamp: now,
                message: buildPrompt,
                files: multiFileCode, // The files before the change
                previewFile: previewFile, // The preview before the change
            };
            const updatedProject: Project = { 
                ...currentProject, 
                files: tempFiles, 
                previewFile: tempPreviewFile, 
                thoughts: thoughts, 
                updatedAt: now,
                versionHistory: [...(currentProject.versionHistory || []), newVersion]
            };
            setMultiFileCode(tempFiles);
            setPreviewFile(tempPreviewFile);
            setCurrentProject(updatedProject);
            setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
            setMessages(prev => [...prev, { role: 'model', content: "✅ I've applied the changes. This new version has been saved automatically.", thoughts: thoughts }]);
        }

        setAppMode('CHAT');
        setChatModeView('PREVIEW');

    } catch (err) {
        if (err instanceof Error && err.message === 'CREDENTIAL_REQUEST_PENDING') {
            const credentialMessage: ChatMessage = { role: 'model', content: `I need some info to continue.`, credentialRequest: pendingCredentialRequest! };
            setMessages(prev => [...prev, credentialMessage]);
            setIsLoading(false); // Pause loading, form is now visible in chat
            return;
        }
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
        setError(errorMessage);
        if (currentProject) {
            setMessages(prev => [...prev, { role: 'model', content: `Sorry, I ran into an error: ${errorMessage}` }]);
        }
    } finally {
        if (!credentialRequestReceived) {
            setIsLoading(false);
        }
    }
  }, [techStack, settings, currentProject, multiFileCode, previewFile, setProjects, setSchema, recordUsage]);

  useEffect(() => {
    if (projectId) {
      const project = projects.find(p => p.id === projectId);
      if (project) {
        setCurrentProject({ ...project, versionHistory: project.versionHistory || [] });
        setMultiFileCode(project.files);
        setPreviewFile(project.previewFile);
        const initialMessages: ChatMessage[] = [{ role: 'model', content: `Loaded project: ${project.name}` }];
        if (project.thoughts) {
          initialMessages.push({ role: 'model', content: "I've loaded my previous plan for this project.", thoughts: project.thoughts });
        }
        setMessages(initialMessages);
        setTechStack(project.stack || 'react');
        setDeployments(project.deployments || []);
        setWorkflow(project.workflow || null);
      } else if (projects.length > 0) {
        window.location.hash = '#/dashboard/projects';
      }
    } else {
        const initialPromptFromSession = sessionStorage.getItem('initialPrompt');
        if (initialPromptFromSession) {
            setCreationPrompt(initialPromptFromSession);
            sessionStorage.removeItem('initialPrompt');
        }
        
        const hash = window.location.hash;
        const stackParam = new URLSearchParams(hash.split('?')[1] || '').get('stack');
        if (stackParam && ['react', 'html', 'svelte', 'react-native', 'infinity'].includes(stackParam)) {
            const validStack = stackParam as TechStack;
            setTechStack(validStack);
            if (validStack === 'infinity') {
                // Infinity App has its own view, handle it separately.
            } else {
                setCreationStage('prompt');
            }
        }
    }
    setIsInitialized(true);
  }, [projectId, projects]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (multiFileCode.length > 0 && !isLoading && !isIdeaMode && currentProject) {
        setIsGeneratingSuggestions(true);
        try {
          const newSuggestions = await generateSuggestions(multiFileCode, messages, settings);
          setSuggestions(newSuggestions);
        } catch (error) {
          console.error("Failed to fetch suggestions:", error);
          setSuggestions([]); // Clear on error
        } finally {
          setIsGeneratingSuggestions(false);
        }
      }
    };
    
    // Fetch suggestions when loading stops (after a build)
    if (!isLoading) {
      // Use a timeout to avoid fetching on every minor state change and wait for UI to settle
      const timer = setTimeout(fetchSuggestions, 1000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, multiFileCode.length, currentProject]);
  
  const handleSaveProject = async (name: string, icon: string | null, createRepo: boolean, teamId: string | null) => {
    if (!name.trim() || !techStack || !currentProject) {
      alert("Cannot save: project name, code, or tech stack is missing.");
      return;
    }
    setIsSaveModalOpen(false);
    
    const isNewProjectSave = !projects.some(p => p.id === currentProject.id);
    const lastThoughts = [...messages].reverse().find(m => m.thoughts)?.thoughts;
    const now = new Date().toISOString();
    
    const projectToSave: Project = { ...currentProject, name, appIcon: icon || undefined, updatedAt: now, files: multiFileCode, previewFile, stack: techStack, deployments, githubUrl: currentProject?.githubUrl, teamId: teamId || undefined, workflow: workflow || undefined, thoughts: lastThoughts || currentProject?.thoughts, versionHistory: currentProject?.versionHistory || [] };

    let finalProjectUrl = `#/project/${projectToSave.id}`;

    if (createRepo && !projectToSave.githubUrl) {
      if (!settings.githubPat) { alert("Please set your GitHub Personal Access Token in Settings."); return; }
      setIsPushing(true);
      try {
        const repoUrl = await createAndPushToRepo(settings.githubPat, name, multiFileCode);
        projectToSave.githubUrl = repoUrl;
        alert(`Successfully created and pushed to ${repoUrl}`);
      } catch (error) { 
        alert(`GitHub repo creation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      } finally { 
        setIsPushing(false);
      }
    }
    
    setProjects(prev => isNewProjectSave ? [projectToSave, ...prev] : prev.map(p => p.id === projectToSave.id ? projectToSave : p));
    setCurrentProject(projectToSave);

    if (isNewProjectSave) {
        window.location.hash = finalProjectUrl;
    } else {
        alert(`Project "${name}" saved!`);
    }
  };

  const handleCredentialSubmit = (credentials: Record<string, string>) => {
    if (!promptForCredentials) return;
    setMessages(prev => [...prev, { role: 'user', content: "Okay, I've provided the credentials." }]);
    executeBuild(promptForCredentials, null, credentials);
    setPromptForCredentials(null);
  };
  
  const handleCreationCredentialSubmit = (credentials: Record<string, string>) => {
      if (promptForCredentials) {
          setPendingCredentialRequest(null);
          executeBuild(promptForCredentials, null, credentials);
          setPromptForCredentials(null);
      }
  };

  const handleAddSupabase = () => {
    if (!settings.supabaseUrl || !settings.supabaseAnonKey) {
        setMessages(prev => [...prev, {role: 'model', content: "Supabase credentials are not configured. Please add them in the Settings page."}]);
        return;
    }
    executeBuild("Please integrate Supabase into this project. Create a `src/supabaseClient.ts` file that exports a configured Supabase client. Use the Supabase URL and Anon Key provided in the system instructions. Also, make sure to import and use this client in the main App component to demonstrate its usage, for example, by fetching a list of items from a 'todos' table and displaying them.");
  };
  
  const handleAddAuth = () => {
    setIsAuthModalOpen(false);
    executeBuild("Please generate a complete authentication system for this application using the configuration provided in the system instructions. This should include a main login/signup page, buttons and logic for each enabled provider, user state management, a protected profile page, and a logout button.", null, undefined, authConfig);
  };

  const handleCommitAndPush = async () => {
    if (!currentProject?.githubUrl || !settings.githubPat) { alert("GitHub not configured."); return; }
    const commitMessage = prompt("Enter commit message:", "feat: Update project from Silo Build");
    if (!commitMessage) return;
    setIsPushing(true);
    try {
        await pushToRepo(settings.githubPat, currentProject.githubUrl, multiFileCode, commitMessage);
        alert("Successfully pushed to GitHub!");
    } catch (error) { alert(`Failed to push: ${error instanceof Error ? error.message : 'Unknown error'}`); } 
    finally { setIsPushing(false); }
  };
  
  const handleFileUpdate = (path: string, content: string) => setMultiFileCode(prev => prev.map(f => f.path === path ? { ...f, content } : f));
  const handleFileDelete = (path: string) => setMultiFileCode(prev => prev.filter(f => f.path !== path));
  const handleFileAdd = (path: string): boolean => {
    if (multiFileCode.some(f => f.path === path)) { alert("File already exists."); return false; }
    setMultiFileCode(prev => [...prev, { path, content: '' }]);
    return true;
  };

  const handleNewDeployment = (deployment: Deployment) => {
    const newDeployments = [deployment, ...(currentProject?.deployments || [])];
    setDeployments(newDeployments);
    if (currentProject) {
        const updatedProject: Project = {
            ...currentProject,
            deployments: newDeployments,
            updatedAt: new Date().toISOString(),
        };
        setCurrentProject(updatedProject);
        setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
    }
  };

  const handleDeploy = async (token: string, newSiteName: string) => {
    if (!token) { setDeploymentError("Netlify token is missing."); return; }
    if (!currentProject) { setDeploymentError("Project data is not available."); return; }

    setIsDeploying(true);
    setDeploymentError(null);

    try {
        const JSZip = (await import('jszip')).default;
        const zip = new JSZip();
        const { stack } = currentProject;

        if (stack === 'react' || stack === 'vue' || stack === 'svelte') {
            if (multiFileCode.length === 0) throw new Error("Project has no source files to build and deploy.");
            multiFileCode.forEach(file => zip.file(file.path, file.content));
            zip.file('netlify.toml', `[build]\n  command = "npm install && npm run build"\n  publish = "dist"\n`);
        } else if (stack === 'html' || stack === 'react-native') {
            if (!previewFile) throw new Error("Preview file is missing.");
            zip.file('index.html', previewFile.content);
        } else {
            throw new Error(`Deployment for "${stack}" is not supported.`);
        }
        const zipBlob = await zip.generateAsync({ type: 'blob' });

        let siteName = (newSiteName || currentProject.name || 'silo-build-app').toLowerCase().replace(/[^a-z0-9-]/g, '-');
        
        let createSiteResponse = await fetch(`https://api.netlify.com/api/v1/sites`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ name: siteName }),
        });

        if (createSiteResponse.status === 422) {
            const errorData = await createSiteResponse.json();
            if (errorData.message?.includes('must be unique')) {
                siteName = `${siteName}-${Math.random().toString(36).substring(2, 8)}`;
                createSiteResponse = await fetch(`https://api.netlify.com/api/v1/sites`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                    body: JSON.stringify({ name: siteName }),
                });
            }
        }

        if (!createSiteResponse.ok) {
            const err = await createSiteResponse.json();
            throw new Error(`Failed to create Netlify site: ${err.message || createSiteResponse.statusText}`);
        }
        const siteData = await createSiteResponse.json();

        const deployResponse = await fetch(`https://api.netlify.com/api/v1/sites/${siteData.id}/deploys`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/zip', Authorization: `Bearer ${token}` },
            body: zipBlob,
        });

        if (!deployResponse.ok) {
            const err = await deployResponse.json();
            try {
                await fetch(`https://api.netlify.com/api/v1/sites/${siteData.id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
            } catch (deleteError) { console.error("Failed to clean up Netlify site.", deleteError); }
            throw new Error(`Failed to deploy: ${err.message || deployResponse.statusText}`);
        }
        
        handleNewDeployment({ url: siteData.ssl_url || siteData.url, timestamp: new Date().toISOString(), siteId: siteData.id, provider: 'netlify' });
        setIsDeployModalOpen(false);

    } catch (error) {
        setDeploymentError(`Deployment failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
        setIsDeploying(false);
    }
  };

  const handleRedeployNetlify = async () => {
    if (!currentProject || !settings.netlifyPat) return;
    const latestNetlifyDeployment = deployments.find(d => d.provider === 'netlify');
    if (!latestNetlifyDeployment?.siteId) { alert("Could not find a previous Netlify deployment to update."); return; }
    if (!window.confirm(`Are you sure you want to redeploy to ${latestNetlifyDeployment.url}?`)) return;
    
    setIsRedeploying('netlify');
    setDeploymentError(null);
    
    try {
        const JSZip = (await import('jszip')).default;
        const zip = new JSZip();
        const { stack } = currentProject;

        if (stack === 'react' || stack === 'vue' || stack === 'svelte') {
            multiFileCode.forEach(file => zip.file(file.path, file.content));
            zip.file('netlify.toml', `[build]\n  command = "npm install && npm run build"\n  publish = "dist"\n`);
        } else if (stack === 'html' || stack === 'react-native') {
            if (!previewFile) throw new Error("Preview file is missing.");
            zip.file('index.html', previewFile.content);
        }
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        
        const deployResponse = await fetch(`https://api.netlify.com/api/v1/sites/${latestNetlifyDeployment.siteId}/deploys`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/zip', Authorization: `Bearer ${settings.netlifyPat}` },
            body: zipBlob,
        });

        if (!deployResponse.ok) {
            const err = await deployResponse.json();
            throw new Error(`Failed to redeploy: ${err.message || deployResponse.statusText}`);
        }
        
        handleNewDeployment({ url: latestNetlifyDeployment.url, timestamp: new Date().toISOString(), siteId: latestNetlifyDeployment.siteId, provider: 'netlify' });

    } catch (error) {
        setDeploymentError(`Redeployment failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        alert(deploymentError);
    } finally {
        setIsRedeploying(null);
    }
  };

  const handleVercelDeploy = async (token: string, newSiteName: string) => {
    if (!token) { setVercelDeploymentError("Vercel token is missing."); return; }
    if (!currentProject) { setVercelDeploymentError("Project data is not available."); return; }

    setIsVercelDeploying(true);
    setVercelDeploymentError(null);

    try {
        const { stack } = currentProject;
        const filesToDeploy: { file: string; data: string }[] = [];
        
        if (stack === 'react' || stack === 'vue' || stack === 'svelte') {
            multiFileCode.forEach(f => filesToDeploy.push({ file: f.path, data: f.content }));
        } else if (stack === 'html' || stack === 'react-native') {
            if (!previewFile) throw new Error("Preview file is missing.");
            filesToDeploy.push({ file: 'index.html', data: previewFile.content });
        } else {
            throw new Error(`Deployment for "${stack}" is not supported on Vercel.`);
        }

        filesToDeploy.push({ file: 'vercel.json', data: `{"rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]}` });
        
        const projectName = (newSiteName || currentProject.name).toLowerCase().replace(/[^a-z0-9-]/g, '-');
        
        const response = await fetch(`https://api.vercel.com/v13/deployments?forceNew=1`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: projectName,
                files: filesToDeploy,
                projectSettings: { framework: stack === 'react' || stack === 'svelte' || stack === 'vue' ? 'vite' : null }
            }),
        });
        
        if (!response.ok) {
            const err = await response.json();
            throw new Error(`Vercel deployment failed: ${err.error?.message || response.statusText}`);
        }

        const deploymentData = await response.json();
        handleNewDeployment({ url: `https://${deploymentData.url}`, timestamp: new Date().toISOString(), siteId: deploymentData.projectId, provider: 'vercel' });
        setIsVercelDeployModalOpen(false);

    } catch (error) {
        setVercelDeploymentError(`Deployment failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
        setIsVercelDeploying(false);
    }
  };
  
   const handleRedeployVercel = async () => {
    if (!currentProject || !settings.vercelPat) return;
    const latestVercelDeployment = deployments.find(d => d.provider === 'vercel');
    if (!latestVercelDeployment?.siteId) { alert("Could not find a previous Vercel deployment to update."); return; }
    if (!window.confirm(`Are you sure you want to redeploy to ${latestVercelDeployment.url}?`)) return;

    setIsRedeploying('vercel');
    setVercelDeploymentError(null);

    try {
        const { stack } = currentProject;
        const filesToDeploy: { file: string; data: string }[] = [];
        
        if (stack === 'react' || stack === 'vue' || stack === 'svelte') {
            multiFileCode.forEach(f => filesToDeploy.push({ file: f.path, data: f.content }));
        } else if (stack === 'html' || stack === 'react-native') {
            if (!previewFile) throw new Error("Preview file is missing.");
            filesToDeploy.push({ file: 'index.html', data: previewFile.content });
        }
        filesToDeploy.push({ file: 'vercel.json', data: `{"rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]}` });
        
        const response = await fetch('https://api.vercel.com/v13/deployments', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${settings.vercelPat}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: currentProject.name.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
                project: latestVercelDeployment.siteId,
                files: filesToDeploy,
                projectSettings: { framework: stack === 'react' || stack === 'svelte' || stack === 'vue' ? 'vite' : null }
            }),
        });
        
        if (!response.ok) {
            const err = await response.json();
            throw new Error(`Vercel redeployment failed: ${err.error?.message || response.statusText}`);
        }

        const deploymentData = await response.json();
        handleNewDeployment({ url: `https://${deploymentData.url}`, timestamp: new Date().toISOString(), siteId: latestVercelDeployment.siteId, provider: 'vercel' });
    } catch (error) {
        setVercelDeploymentError(`Redeployment failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        alert(vercelDeploymentError);
    } finally {
        setIsRedeploying(null);
    }
  };

  const handlePublishToCommunity = async (name: string, description: string, imageDataUrl: string) => {
    if (!currentProject || !user || !currentProject.previewFile) {
        setCommunityPublishError("Missing project data, user info, or preview file.");
        return;
    }

    setIsPublishingToCommunity(true);
    setCommunityPublishError(null);

    try {
        const { data: { user: supabaseUser } } = await supabase.auth.getUser();
        if (!supabaseUser) {
            throw new Error("You must be signed in to publish to the community.");
        }

        const res = await fetch(imageDataUrl);
        const blob = await res.blob();
        const file = new File([blob], 'preview.png', { type: 'image/png' });
        
        const filePath = `${supabaseUser.id}/${currentProject.id}-${Date.now()}.png`;
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('project-previews')
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
            .from('project-previews')
            .getPublicUrl(uploadData.path);
            
        const projectToPublish = {
            name,
            description,
            prompt: [...messages].reverse().find(m => m.role === 'user')?.content || 'No prompt found.',
            preview_image_url: urlData.publicUrl,
            author_name: user.name,
            author_image_url: user.picture,
            project_id: currentProject.id,
            user_id: supabaseUser.id,
            preview_content: currentProject.previewFile.content,
        };

        const { data: insertData, error: insertError } = await supabase
            .from('community_projects')
            .insert([projectToPublish])
            .select()
            .single();

        if (insertError) throw insertError;
        
        const communityProjectId = insertData.id;
        const updatedProject = { ...currentProject, communityId: communityProjectId };
        setCurrentProject(updatedProject);
        setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
        
        setIsCommunityPublishModalOpen(false);
        setShareUrl(`${window.location.origin}${window.location.pathname}#/community/app/${insertData.id}`);

    } catch (error) {
        const message = error instanceof Error ? error.message : "An unknown error occurred.";
        setCommunityPublishError(message);
        console.error(error);
    } finally {
        setIsPublishingToCommunity(false);
    }
};

  const handleDownload = () => { if (currentProject) downloadProjectAsZip({ ...currentProject, files: multiFileCode, previewFile }); };
  const handleSkipToBuilder = () => {
    if (!techStack) return;
    if (!recordUsage()) {
        setError("You have reached your monthly creation limit.");
        return;
    }
    const now = new Date().toISOString();
    const newProject: Project = { id: crypto.randomUUID(), name: 'New Blank Project', createdAt: now, updatedAt: now, files: [], previewFile: null, stack: techStack, deployments: [], versionHistory: [] };
    setCurrentProject(newProject);
    setProjects(prev => [newProject, ...prev]);
    setMessages([{ role: 'model', content: `Started a new blank ${techStack} project. What would you like to build first?` }]);
  };

  const handleRestoreVersion = (version: Version) => {
    if (window.confirm(`Are you sure you want to restore to the version from ${timeAgo(version.timestamp)}? This will overwrite your current code.`)) {
        setMultiFileCode(version.files);
        setPreviewFile(version.previewFile);
        setCurrentProject(prev => prev ? ({ ...prev, files: version.files, previewFile: version.previewFile }) : null);
        setMessages(prev => [...prev, { role: 'model', content: `Restored project to version saved ${timeAgo(version.timestamp)}.` }]);
        setIsHistoryModalOpen(false);
    }
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    if (!isLoading) {
      executeBuild(suggestion);
    }
  };


  if (!isInitialized) {
    return <div className="h-screen w-screen flex items-center justify-center"><Spinner className="w-10 h-10" /></div>;
  }
  
  if (techStack === 'infinity') {
      return <InfinityView settings={settings} />;
  }
  
  if (!currentProject) {
    // --- CREATION FLOW UI ---
    if (creationStage === 'stack') {
        return (
            <div className="relative h-screen w-screen flex flex-col items-center justify-center bg-gray-50 p-4 overflow-hidden">
                <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-200 rounded-full filter blur-3xl opacity-40" />
                <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-200 rounded-full filter blur-3xl opacity-40" />
                 <div className="relative text-center mb-8">
                    <h2 className="text-3xl font-bold">Choose your tech stack</h2>
                    <p className="text-gray-600">Select a technology to generate code for.</p>
                </div>
                <div className="relative flex flex-wrap items-center justify-center gap-3">
                    <StackCard icon={<ReactIcon />} title="React + TS" onClick={() => { setTechStack('react'); setCreationStage('prompt'); }} />
                    <StackCard icon={<MobileIcon />} title="React Native" onClick={() => { setTechStack('react-native'); setCreationStage('prompt'); }} />
                    <StackCard icon={<SvelteIcon />} title="Svelte + TS" onClick={() => { setTechStack('svelte'); setCreationStage('prompt'); }} />
                    <StackCard icon={<HtmlIcon />} title="HTML + JS" onClick={() => { setTechStack('html'); setCreationStage('prompt'); }} />
                </div>
                 <div className="relative flex py-8 items-center w-full max-w-xs">
                    <div className="flex-grow border-t border-gray-300"></div><span className="flex-shrink mx-4 text-gray-400 text-sm">OR</span><div className="flex-grow border-t border-gray-300"></div>
                </div>
                 <div className="relative text-center">
                     <h2 className="text-2xl font-bold">Try the Infinity App</h2>
                    <p className="text-gray-600 max-w-md mt-1 mb-4">A new experimental way to interact with AI. No code, just conversation.</p>
                    <button onClick={() => setTechStack('infinity')} className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition-colors">Launch Infinity App</button>
                </div>
            </div>
        );
    }
    if (creationStage === 'prompt') {
        if (isLoading) {
             return (
                 <div className="relative h-screen w-screen flex flex-col items-center justify-center bg-gray-50 p-4 text-center overflow-hidden">
                    <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-200 rounded-full filter blur-3xl opacity-40" />
                    <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-200 rounded-full filter blur-3xl opacity-40" />
                    <Spinner className="relative w-12 h-12 mb-6" />
                    <h2 className="relative text-2xl font-bold mb-2">{pendingCredentialRequest ? "Action Required" : "Building your app..."}</h2>
                    <p className="relative text-gray-600 mb-6 max-w-md">{pendingCredentialRequest ? "Please provide the required API keys to continue." : (generationSummary || "The AI is analyzing your prompt...")}</p>
                    {generationPlan.length > 0 && !pendingCredentialRequest && (
                        <div className="relative text-left w-full max-w-sm bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                            <h3 className="font-semibold text-sm mb-2">Generating files:</h3>
                            <ul className="space-y-1.5 text-sm">
                                {generationPlan.map(file => (
                                    <li key={file} className={`flex items-center gap-2 ${generatedFilesProgress.includes(file) ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                                        {generatedFilesProgress.includes(file) ? <div className="w-4 h-4 text-green-500">✓</div> : <Spinner className="w-4 h-4"/>}
                                        <span>{file}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {pendingCredentialRequest && (
                      <div className="relative bg-white p-4 rounded-lg shadow-xl border border-gray-200 w-full max-w-sm z-10">
                        <div className="flex items-center gap-2 mb-2"><KeyIcon className="w-5 h-5 text-yellow-500"/><h3 className="font-bold text-sm text-left">Add API Key</h3></div>
                        <p className="text-xs text-gray-600 text-left mb-3">The AI needs the following keys to build your app:</p>
                        <CreationCredentialForm request={pendingCredentialRequest} onSubmit={handleCreationCredentialSubmit} />
                      </div>
                    )}
                 </div>
            );
        }
        return (
            <div className="relative h-screen w-screen flex flex-col items-center justify-center bg-gray-50 p-4 overflow-hidden">
                <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-200 rounded-full filter blur-3xl opacity-40" />
                <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-200 rounded-full filter blur-3xl opacity-40" />
                <h2 className="relative text-3xl font-bold mb-2">What do you want to build?</h2>
                <p className="relative text-gray-600 mb-4 max-w-xl text-center">Describe your application in detail. The more specific you are, the better the result.</p>
                
                <div className="relative w-full max-w-2xl">
                    {error && <div className="bg-red-100 border border-red-300 text-red-800 p-3 rounded-lg mb-4 text-sm" role="alert"><strong>Error:</strong> {error}</div>}
                     <div className="relative bg-white border border-gray-200 rounded-2xl shadow-xl p-4">
                        <textarea value={creationPrompt} onChange={(e) => setCreationPrompt(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); if(creationPrompt.trim() && !isLoading) executeBuild(creationPrompt); } }} placeholder="e.g., a modern SaaS dashboard with charts and a data table for user management" className="w-full h-32 bg-transparent resize-none text-gray-900 text-lg placeholder-gray-500 focus:outline-none p-2"/>
                        <button onClick={() => executeBuild(creationPrompt)} disabled={!creationPrompt.trim() || isLoading} className="absolute bottom-4 right-4 bg-blue-600 text-white rounded-full p-2.5 flex items-center justify-center transition-all duration-300 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"><UpArrowIcon className="w-6 h-6" /></button>
                    </div>
                     <div className="relative flex flex-col items-center justify-center gap-2 mt-6 text-sm">
                        <div className="flex items-center gap-2 flex-wrap justify-center">
                            <span className="text-gray-500">or try an example:</span>
                            <button onClick={() => setCreationPrompt(prompts[0].prompt)} className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-full shadow-sm hover:bg-gray-100 transition-colors">Pomodoro Timer</button>
                            <button onClick={() => setCreationPrompt(prompts[2].prompt)} className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-full shadow-sm hover:bg-gray-100 transition-colors">Kanban Board</button>
                            <a href="#/dashboard/prompt-library" className="text-blue-600 hover:underline">More ideas...</a>
                        </div>
                        <button onClick={handleSkipToBuilder} className="relative text-sm text-gray-600 hover:text-black mt-4 hover:underline">or skip and start with a blank project</button>
                    </div>
                </div>
            </div>
        );
    }
  }

  // --- FULL BUILDER UI ---
  const promptInputLayout = preferences.layout?.promptInputLayout || 'floating';
  const isBusy = isLoading || isPushing || !!isRedeploying;
  return (
    <div className="h-screen w-screen bg-white text-gray-900 flex flex-col font-sans overflow-hidden">
      <Header 
        activeMode={appMode} setAppMode={setAppMode} project={currentProject}
        onAddSupabase={handleAddSupabase} onAddAuth={() => setIsAuthModalOpen(true)} onConnectGitHub={() => setIsSaveModalOpen(true)}
        onDownload={handleDownload} isGithubConnected={!!currentProject?.githubUrl}
        onOpenVersionHistory={() => setIsHistoryModalOpen(true)}
      />
      <main className={`flex-1 flex flex-col overflow-hidden relative ${promptInputLayout === 'floating' ? 'pb-24' : ''}`}>
        {isPushing && <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-50"><Spinner className="h-10 w-10" /><span className="ml-2">Pushing...</span></div>}
        {appMode === 'CHAT' && <ChatView messages={messages} multiFileCode={multiFileCode} previewFile={previewFile} viewMode={chatModeView} setViewMode={setChatModeView} isLoading={isLoading} error={error} generationPlan={generationPlan} generatedFilesProgress={generatedFilesProgress} generationSummary={generationSummary} isIdeaMode={isIdeaMode} onFileUpdate={handleFileUpdate} onFileDelete={handleFileDelete} onFileAdd={handleFileAdd} onToggleMacPreview={() => setIsMacPreviewVisible(true)} deployments={deployments} techStack={techStack} onCredentialSubmit={handleCredentialSubmit} promptInputLayout={promptInputLayout} onSend={executeBuild} isAppGenerated={true} onToggleIdeaMode={() => setIsIdeaMode(p => !p)} isReadyToPrompt={true} suggestions={suggestions} onSuggestionClick={handleSuggestionClick} isGeneratingSuggestions={isGeneratingSuggestions} />}
        {appMode === 'CODE' && <WorkspaceView files={multiFileCode} onFileUpdate={handleFileUpdate} onFileDelete={handleFileDelete} onFileAdd={handleFileAdd} />}
        {appMode === 'PREVIEW' && <PreviewView file={previewFile} onToggleMacPreview={() => setIsMacPreviewVisible(true)} deployments={deployments} techStack={techStack} />}
        {appMode === 'PUBLISH' && <PublishView project={currentProject} deployments={deployments} onCommitAndPush={handleCommitAndPush} onDeployNetlifyClick={() => setIsDeployModalOpen(true)} onDeployVercelClick={() => setIsVercelDeployModalOpen(true)} onConnectGitHub={() => setIsSaveModalOpen(true)} isPushing={isPushing} onRedeployNetlify={handleRedeployNetlify} onRedeployVercel={handleRedeployVercel} isRedeploying={isRedeploying} onPublishToCommunity={() => setIsCommunityPublishModalOpen(true)} isCommunityPublished={!!currentProject?.communityId} />}
        {appMode === 'WORKFLOW' && (workflow ? <WorkflowBuilderPage workflow={workflow} /> : <div className="flex items-center justify-center h-full text-gray-500">No workflow defined.</div>)}
      </main>
      {promptInputLayout === 'floating' && <PromptInput onSend={executeBuild} isLoading={isBusy} isAppGenerated={true} isIdeaMode={isIdeaMode} onToggleIdeaMode={() => setIsIdeaMode(p => !p)} isReadyToPrompt={true} layoutStyle="floating" />}
      {isMacPreviewVisible && previewFile && <MacPreview previewFile={previewFile} projectName={currentProject?.name || 'My App'} appIcon={currentProject?.appIcon || null} onClose={() => setIsMacPreviewVisible(false)} />}
      <ProjectMetadataModal isOpen={isSaveModalOpen} onClose={() => setIsSaveModalOpen(false)} onSave={handleSaveProject} initialName={currentProject?.name} initialIcon={currentProject?.appIcon} title="Save Project Details" isGithubLinked={!!currentProject?.githubUrl} teams={teams} initialTeamId={currentProject?.teamId} />
      <DeployModal isOpen={isDeployModalOpen} onClose={() => { setIsDeployModalOpen(false); setDeploymentError(null); }} onDeploy={handleDeploy} isDeploying={isDeploying} initialProjectName={currentProject?.name} initialToken={settings.netlifyPat} deploymentError={deploymentError} />
      <VercelDeployModal isOpen={isVercelDeployModalOpen} onClose={() => { setIsVercelDeployModalOpen(false); setVercelDeploymentError(null); }} onDeploy={handleVercelDeploy} isDeploying={isVercelDeploying} initialProjectName={currentProject?.name} initialToken={settings.vercelPat} deploymentError={vercelDeploymentError} />
      <AddAuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} onConfirm={handleAddAuth} />
      <VersionHistoryModal isOpen={isHistoryModalOpen} onClose={() => setIsHistoryModalOpen(false)} history={currentProject?.versionHistory || []} onRestore={handleRestoreVersion} />
      <PublishToCommunityModal isOpen={isCommunityPublishModalOpen} onClose={() => setIsCommunityPublishModalOpen(false)} onPublish={handlePublishToCommunity} isPublishing={isPublishingToCommunity} projectName={currentProject?.name || ''} previewContent={currentProject?.previewFile?.content || ''} publishError={communityPublishError} />
      <ShareUrlModal isOpen={!!shareUrl} onClose={() => setShareUrl(null)} url={shareUrl || ''} />
    </div>
  );
};
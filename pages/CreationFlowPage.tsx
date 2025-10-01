import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Project, Settings, TechStack, GeneratedFile, AppMode, ChatMessage, ViewMode, Deployment, Team, Table, WorkflowDefinition } from '../types';
import { generateAppStream } from '../services/geminiService';
import { createAndPushToRepo, pushToRepo } from '../services/githubService';
import { Spinner } from '../components/Spinner';
import { ReactIcon, HtmlIcon, SvelteIcon, MobileIcon, UpArrowIcon } from '../components/icons';
import { prompts } from '../data/prompts';

// Builder components
import { Header } from '../components/Header';
import { PromptInput } from '../components/PromptInput';
import { ChatView } from '../components/ChatView';
import { WorkspaceView } from '../components/WorkspaceView';
import { PreviewView } from '../components/PreviewView';
import { ProjectMetadataModal } from '../components/ProjectMetadataModal';
import { MacPreview } from '../components/MacPreview';
import { showLocalNotification, downloadProjectAsZip } from '../utils/projectUtils';
import { WorkflowBuilderPage } from './WorkflowBuilderPage';
import { DeployModal } from '../components/DeployModal';
import { PublishView } from '../components/PublishView';
import { InfinityView } from '../components/InfinityView';

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


const StackCard: React.FC<{ icon: React.ReactNode; title: string; onClick: () => void; }> = ({ icon, title, onClick }) => (
    <button onClick={onClick} className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:border-gray-400 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
        <div className="w-5 h-5 flex items-center justify-center [&_svg]:w-full [&_svg]:h-full">{icon}</div>
        <span>{title}</span>
    </button>
);


type Stage = 'stack' | 'prompt' | 'generating_app' | 'builder';
type Plan = { summary: string; thoughts: string; files: string[]; };

export const CreationFlowPage: React.FC = () => {
    // --- CREATION FLOW STATE ---
    const [stage, setStage] = useState<Stage>('stack');
    const [techStack, setTechStack] = useState<TechStack | null>(null);
    const [prompt, setPrompt] = useState('');
    const [plan, setPlan] = useState<Plan | null>(null);
    const [generationPlan, setGenerationPlan] = useState<string[]>([]);
    const [generatedFilesProgress, setGeneratedFilesProgress] = useState<string[]>([]);
    const [generationSummary, setGenerationSummary] = useState<string | null>(null);
    const [currentFile, setCurrentFile] = useState<string | null>(null);

    // --- BUILDER STATE ---
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
    const [preferences] = useLocalStorage<UserPreferences>('silo-build-preferences', initialPreferences);
    const [teams] = useLocalStorage<Team[]>('silo-build-teams', []);
    const [schema, setSchema] = useLocalStorage<Table[]>('silo-build-schema', []);
    
    const [currentProject, setCurrentProject] = useState<Project | null>(null);
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
    const [isIdeaMode, setIsIdeaMode] = useState(false);
    const [isMacPreviewVisible, setIsMacPreviewVisible] = useState(false);
    const [deployments, setDeployments] = useState<Deployment[]>([]);
    const [workflow, setWorkflow] = useState<WorkflowDefinition | null>(null);

    const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
    const [isDeploying, setIsDeploying] = useState(false);
    const [deploymentError, setDeploymentError] = useState<string | null>(null);
    const [promptForCredentials, setPromptForCredentials] = useState<string | null>(null);


    const executeBuild = useCallback(async (buildPrompt: string, imageData?: string | null, customCredentials?: Record<string, string>) => {
        if (!techStack) {
            setError("Tech stack is not defined.");
            return;
        }
        
        // This is a new message from the user
        if (stage === 'builder') {
             const userMessage: ChatMessage = { role: 'user', content: buildPrompt || "Updating app from image..." };
             setMessages(prev => [...prev, userMessage]);
        }

        setIsLoading(true);
        setError(null);
        setGenerationPlan([]);
        setGeneratedFilesProgress([]);
        setGenerationSummary(null);
        setCurrentFile(null);

        const filesForContext = stage === 'builder' ? multiFileCode : undefined;
        let wasCredentialRequestHandled = false;

        try {
            let tempFiles: GeneratedFile[] = [];
            let tempPreviewFile: GeneratedFile | null = null;
            let thoughts = '';

            await generateAppStream(buildPrompt, settings, (update) => {
              if (update.type === 'summary') setGenerationSummary(update.summary);
              if (update.type === 'thoughts') thoughts = update.thoughts;
              if (update.type === 'plan') setGenerationPlan(update.files);
              if (update.type === 'file') {
                tempFiles.push(update.file);
                setCurrentFile(update.file.path);
                setGeneratedFilesProgress(prev => [...prev, update.file.path]);
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
              if (update.type === 'credential_request') {
                const credentialMessage: ChatMessage = { role: 'model', content: `I need some info for ${update.request.toolName}.`, credentialRequest: update.request };
                setMessages(prev => [...prev, credentialMessage]);
                setPromptForCredentials(buildPrompt);
                wasCredentialRequestHandled = true;
                throw new Error('CREDENTIAL_REQUEST_PENDING');
              }
            }, techStack, filesForContext, currentProject?.name, currentProject?.appIcon, customCredentials, imageData);

            setMultiFileCode(tempFiles);
            setPreviewFile(tempPreviewFile);
            
            if (stage !== 'builder') {
                const now = new Date().toISOString();
                const newProject: Project = {
                    id: crypto.randomUUID(),
                    name: buildPrompt.substring(0, 50) || 'New Project',
                    createdAt: now,
                    updatedAt: now,
                    files: tempFiles,
                    previewFile: tempPreviewFile,
                    stack: techStack,
                    deployments: [],
                    thoughts: thoughts,
                    workflow: workflow || undefined,
                };
                setCurrentProject(newProject);
                setMessages([
                    { role: 'model', content: `I've generated the first version of your app: "${newProject.name}".\n\n${generationSummary || ''}` },
                    { role: 'model', content: "Check out the preview, or ask me to make any changes!", thoughts: thoughts }
                ]);
                setStage('builder');
            } else {
                 setMessages(prev => [...prev, { role: 'model', content: 'I have applied the changes to the application.', thoughts: thoughts }]);
            }

            setAppMode('CHAT');
            setChatModeView('PREVIEW');

        } catch (err) {
            if (err instanceof Error && err.message === 'CREDENTIAL_REQUEST_PENDING') {
                return; // Stop execution, wait for user input
            }
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
            setError(errorMessage);
            if (stage === 'builder') {
                setMessages(prev => [...prev, { role: 'model', content: `Sorry, I ran into an error: ${errorMessage}` }]);
            } else {
                setStage('prompt');
            }
        } finally {
             if (!wasCredentialRequestHandled) setIsLoading(false);
        }
    }, [techStack, stage, settings, currentProject, multiFileCode, setSchema]);
    
    // --- BUILDER HANDLERS ---
    const handleSaveProject = async (name: string, icon: string | null, createRepo: boolean, teamId: string | null) => {
        if (!name.trim() || !techStack || !currentProject) return;
        
        setIsSaveModalOpen(false);
        const lastThoughts = [...messages].reverse().find(m => m.thoughts)?.thoughts;
        const now = new Date().toISOString();
        
        const projectToSave: Project = {
            ...currentProject, name, appIcon: icon || undefined, updatedAt: now, files: multiFileCode,
            previewFile, stack: techStack, deployments, githubUrl: currentProject?.githubUrl,
            teamId: teamId || undefined, workflow: workflow || undefined, thoughts: lastThoughts || currentProject?.thoughts,
        };

        setProjects(prev => {
            const existing = prev.find(p => p.id === projectToSave.id);
            if (existing) return prev.map(p => p.id === projectToSave.id ? projectToSave : p);
            return [projectToSave, ...prev];
        });
        setCurrentProject(projectToSave);
        
        if (createRepo && !projectToSave.githubUrl) {
          if (!settings.githubPat) { alert("Please set your GitHub PAT in Settings."); return; }
          setIsPushing(true);
          try {
            const repoUrl = await createAndPushToRepo(settings.githubPat, name, multiFileCode);
            const updatedProject = { ...projectToSave, githubUrl: repoUrl };
            setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
            setCurrentProject(updatedProject);
            alert(`Successfully pushed to ${repoUrl}`);
          } catch (error) { alert(`GitHub repo creation failed: ${error}`); } 
          finally { setIsPushing(false); }
        } else {
           alert(`Project "${name}" saved!`);
           window.location.hash = `#/project/${projectToSave.id}`; // Redirect to permanent project URL
        }
    };
    
    // All other builder handlers copied from Builder.tsx
    const handleCredentialSubmit = (credentials: Record<string, string>) => {
      if (!promptForCredentials) return;
      setMessages(prev => [...prev, { role: 'user', content: "Okay, I've provided the credentials." }]);
      executeBuild(promptForCredentials, null, credentials);
      setPromptForCredentials(null);
    };
    const handleAddSupabase = () => {
      if (!settings.supabaseUrl || !settings.supabaseAnonKey) {
        setError("Supabase credentials are not configured in Settings.");
        return;
      }
      executeBuild("Please integrate Supabase into this project. Create a `src/supabaseClient.ts`, export a configured client, and demonstrate its usage by fetching a list of 'todos'.");
    };
    const handleCommitAndPush = async () => {
        if (!currentProject?.githubUrl || !settings.githubPat) { alert("GitHub not configured."); return; }
        const commitMessage = prompt("Enter commit message:", "Update from Silo Build");
        if (!commitMessage) return;
        setIsPushing(true);
        try {
            await pushToRepo(settings.githubPat, currentProject.githubUrl, multiFileCode, commitMessage);
            alert("Successfully pushed to GitHub!");
        } catch (error) { alert(`Failed to push: ${error}`); } 
        finally { setIsPushing(false); }
    };
    const handleFileUpdate = (path: string, content: string) => setMultiFileCode(prev => prev.map(f => f.path === path ? { ...f, content } : f));
    const handleFileDelete = (path: string) => setMultiFileCode(prev => prev.filter(f => f.path !== path));
    const handleFileAdd = (path: string): boolean => {
        if (multiFileCode.some(f => f.path === path)) { alert("File already exists."); return false; }
        setMultiFileCode(prev => [...prev, { path, content: '' }]);
        return true;
    };
    const handleNewDeployment = (deployment: Deployment) => setDeployments(prev => [deployment, ...prev.filter(d => d.url !== deployment.url)]);
    const handleDeploy = async (token: string, newSiteName: string) => {
        if (!token || !previewFile) { setDeploymentError("Netlify token or preview file missing."); return; }
        setIsDeploying(true); setDeploymentError(null);
        try {
            const JSZip = (await import('jszip')).default;
            const zip = new JSZip();
            zip.file('index.html', previewFile.content);
            const zipBlob = await zip.generateAsync({ type: 'blob' });

            let siteName = (newSiteName || currentProject?.name || 'silo-build-app').toLowerCase().replace(/[^a-z0-9-]/g, '-');
            let response = await fetch(`https://api.netlify.com/api/v1/sites?name=${siteName}`, { method: 'POST', headers: { 'Content-Type': 'application/zip', Authorization: `Bearer ${token}` }, body: zipBlob });

            if (response.status === 409) { // Name taken
                siteName = `${siteName}-${Math.random().toString(36).substring(2, 8)}`;
                response = await fetch(`https://api.netlify.com/api/v1/sites?name=${siteName}`, { method: 'POST', headers: { 'Content-Type': 'application/zip', Authorization: `Bearer ${token}` }, body: zipBlob });
            }
            if (!response.ok) { const err = await response.json(); throw new Error(err.message); }
            
            const siteData = await response.json();
            handleNewDeployment({ url: siteData.ssl_url || siteData.url, timestamp: new Date().toISOString() });
            setIsDeployModalOpen(false);
        } catch (error) { setDeploymentError(`Deployment failed: ${error}`); }
        finally { setIsDeploying(false); }
    };
    const handleDownload = () => {
        if (!currentProject) return;
        downloadProjectAsZip({ ...currentProject, files: multiFileCode, previewFile });
    };

    // --- INITIALIZATION ---
    useEffect(() => {
        const initialPrompt = sessionStorage.getItem('initialPrompt');
        if (initialPrompt) {
            setPrompt(initialPrompt);
            sessionStorage.removeItem('initialPrompt');
        }
        const urlParams = new URLSearchParams(window.location.search);
        const stackParam = urlParams.get('stack');
        if (stackParam && ['react', 'html', 'svelte', 'react-native', 'infinity'].includes(stackParam)) {
            handleStackSelect(stackParam as TechStack);
        }
    }, []);

    const handleStackSelect = (stack: TechStack) => {
        if (stack === 'infinity') {
             const now = new Date().toISOString();
             const newProject: Project = { id: crypto.randomUUID(), name: 'New Infinity App', createdAt: now, updatedAt: now, files: [], previewFile: null, stack: 'infinity', deployments: [] };
             setProjects(prev => [newProject, ...prev]);
             window.location.hash = `#/project/${newProject.id}`;
             return;
        }
        setTechStack(stack);
        setStage('prompt');
    }

    const promptInputLayout = preferences.layout?.promptInputLayout || 'floating';
    
    // --- RENDER LOGIC ---

    if (stage === 'builder') {
        const isBusy = isLoading || isPushing;
        return (
            <div className="h-screen w-screen bg-white text-gray-900 flex flex-col font-sans overflow-hidden">
                <Header 
                    activeMode={appMode} setAppMode={setAppMode} project={currentProject} onAddSupabase={handleAddSupabase}
                    onConnectGitHub={() => setIsSaveModalOpen(true)} onDownload={handleDownload} isGithubConnected={!!currentProject?.githubUrl}
                />
                <main className={`flex-1 flex flex-col overflow-hidden relative ${promptInputLayout === 'floating' ? 'pb-24' : ''}`}>
                    {isPushing && <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-50"><Spinner className="h-10 w-10" /></div>}
                    
                    {(() => {
                        switch (appMode) {
                            case 'CHAT':
                                return <ChatView messages={messages} multiFileCode={multiFileCode} previewFile={previewFile} viewMode={chatModeView} setViewMode={setChatModeView}
                                    isLoading={isLoading} error={error} generationPlan={generationPlan} generatedFilesProgress={generatedFilesProgress} generationSummary={generationSummary}
                                    isIdeaMode={isIdeaMode} onFileUpdate={handleFileUpdate} onFileDelete={handleFileDelete} onFileAdd={handleFileAdd}
                                    onToggleMacPreview={() => setIsMacPreviewVisible(true)} deployments={deployments} techStack={techStack} onCredentialSubmit={handleCredentialSubmit}
                                    promptInputLayout={promptInputLayout} onSend={(p, i) => executeBuild(p, i)} isAppGenerated={true} onToggleIdeaMode={() => setIsIdeaMode(p => !p)} isReadyToPrompt={true} />;
                            case 'CODE':
                                return <WorkspaceView files={multiFileCode} onFileUpdate={handleFileUpdate} onFileDelete={handleFileDelete} onFileAdd={handleFileAdd} />;
                            case 'PREVIEW':
                                return <PreviewView file={previewFile} onToggleMacPreview={() => setIsMacPreviewVisible(true)} deployments={deployments} techStack={techStack} />;
                            case 'PUBLISH':
                                return <PublishView project={currentProject} deployments={deployments} onCommitAndPush={handleCommitAndPush} onDeployClick={() => setIsDeployModalOpen(true)}
                                    onConnectGitHub={() => setIsSaveModalOpen(true)} isPushing={isPushing} />;
                            case 'WORKFLOW':
                                return workflow ? <WorkflowBuilderPage workflow={workflow} /> : <div className="flex items-center justify-center h-full">No workflow defined.</div>;
                            default: return null;
                        }
                    })()}

                </main>
                {promptInputLayout === 'floating' && (
                    <PromptInput onSend={(p, i) => executeBuild(p, i)} isLoading={isBusy} isAppGenerated={true} isIdeaMode={isIdeaMode}
                        onToggleIdeaMode={() => setIsIdeaMode(p => !p)} isReadyToPrompt={true} layoutStyle="floating" />
                )}
                {isMacPreviewVisible && previewFile && <MacPreview previewFile={previewFile} projectName={currentProject?.name || 'My App'} appIcon={currentProject?.appIcon || null} onClose={() => setIsMacPreviewVisible(false)} />}
                <ProjectMetadataModal isOpen={isSaveModalOpen} onClose={() => setIsSaveModalOpen(false)} onSave={handleSaveProject} initialName={currentProject?.name} initialIcon={currentProject?.appIcon}
                    title={"Save New Project"} isGithubLinked={!!currentProject?.githubUrl} teams={teams} initialTeamId={currentProject?.teamId} />
                <DeployModal isOpen={isDeployModalOpen} onClose={() => setIsDeployModalOpen(false)} onDeploy={handleDeploy} isDeploying={isDeploying}
                    initialProjectName={currentProject?.name} initialToken={settings.netlifyPat} deploymentError={deploymentError} />
            </div>
        );
    }
    
    // --- CREATION FLOW UI ---

    const renderCreationContent = () => {
        switch (stage) {
            case 'stack':
                return (
                    <div className="text-center transition-opacity duration-500">
                        <h2 className="text-3xl font-bold mb-4">Choose your technology</h2>
                        <p className="text-gray-600 mb-8">Select a stack to generate code, or try the Infinity App for a simulated experience.</p>
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <StackCard icon={<ReactIcon />} title="React + TS" onClick={() => handleStackSelect('react')} />
                            <StackCard icon={<MobileIcon />} title="React Native" onClick={() => handleStackSelect('react-native')} />
                            <StackCard icon={<SvelteIcon />} title="Svelte + TS" onClick={() => handleStackSelect('svelte')} />
                            <StackCard icon={<HtmlIcon />} title="HTML + JS" onClick={() => handleStackSelect('html')} />
                        </div>
                    </div>
                );
            case 'prompt':
                return (
                     <div className="w-full max-w-2xl text-center transition-opacity duration-500">
                        <h2 className="text-3xl font-bold mb-4">What should we build?</h2>
                        <p className="text-gray-600 mb-8">Describe the application you want to create. Be as specific as you can.</p>
                        <div className="w-full bg-stone-100/80 backdrop-blur-xl border border-stone-200 rounded-3xl shadow-2xl flex flex-col p-3 gap-2 transition-all duration-300 focus-within:border-stone-400">
                            <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); executeBuild(prompt); } }}
                                placeholder="e.g., A pomodoro timer with start, stop, and reset buttons"
                                className="w-full bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none resize-none overflow-y-auto text-base p-2 min-h-[8rem]" rows={4} />
                            <div className="flex items-center justify-between mt-1">
                                <button onClick={() => setStage('stack')} className="px-4 py-2 text-sm text-gray-600 hover:bg-stone-200 rounded-full transition-colors">Back</button>
                                <button onClick={() => executeBuild(prompt)} disabled={!prompt.trim()} className="bg-gray-800 text-white rounded-full p-2.5 flex items-center justify-center hover:bg-gray-900 disabled:bg-gray-400">
                                    <UpArrowIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        <div className="text-left mt-6">
                            <p className="text-xs text-gray-500 mb-2">Or try an example:</p>
                            <div className="flex flex-wrap gap-2">
                                {prompts.slice(0, 3).map(p => (<button key={p.title} onClick={() => setPrompt(p.prompt)} className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-300">{p.title}</button>))}
                            </div>
                        </div>
                    </div>
                );
            case 'generating_app':
                const progress = generationPlan.length ? Math.round((generatedFilesProgress.length / generationPlan.length) * 100) : 0;
                return (
                    <div className="w-full max-w-lg text-center transition-opacity duration-500">
                        <h2 className="text-3xl font-bold mb-4">Codepilot is building...</h2>
                        {generationSummary && <p className="text-gray-600 mb-2">{generationSummary.replace(/[\n-]/g, ' ')}</p>}
                        <div className="w-full bg-gray-200 rounded-full h-2.5 my-4">
                           <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.5s' }}></div>
                        </div>
                        {currentFile && <p className="text-sm text-gray-500 font-mono animate-pulse">{currentFile}</p>}
                        {error && <p className="text-red-500 mt-4">{error}</p>}
                    </div>
                );
        }
    };


    return (
        <div className="relative h-screen w-screen bg-gray-50 text-gray-900 flex flex-col justify-center items-center p-4 overflow-hidden">
            <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-200 rounded-full filter blur-3xl opacity-40" />
            <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-200 rounded-full filter blur-3xl opacity-40" />
            <a href="#/dashboard" className="absolute top-4 left-4 text-sm text-gray-600 hover:underline z-10">&larr; Back to Dashboard</a>
            <div className="relative z-10 w-full flex flex-col justify-center items-center">
                {renderCreationContent()}
            </div>
        </div>
    );
};

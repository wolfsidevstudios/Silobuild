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
        } else {
             setStage('generating_app');
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
                setIsLoading(false);
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
        } catch (error) { setDeploymentError(`Deployment failed: ${error instanceof Error ? error.message : 'Unknown error'}`); }
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
        
        // FIX: The URL parameter parsing was incorrect for hash-based routing and contained a typo.
        // It should parse the query string from the hash, not the full location.
        const hash = window.location.hash;
        const queryString = hash.split('?')[1] || '';
        const urlParams = new URLSearchParams(queryString);
        const stackParam = urlParams.get('stack');

        if (stackParam && ['react', 'html', 'svelte', 'react-native', 'infinity'].includes(stackParam)) {
            setTechStack(stackParam as TechStack);
            setStage('prompt');
        }
        
        // FIX: Removed buggy auto-execution of build. The `executeBuild` function call
        // within this `useEffect` would capture a stale `techStack` value (null)
        // causing a silent failure. The user can now reliably trigger the build manually after
        // the UI loads with the pre-filled data.

    }, []);

    if (techStack === 'infinity') {
        return <InfinityView settings={settings} />;
    }

    if (stage === 'builder') {
        const promptInputLayout = preferences.layout?.promptInputLayout || 'floating';
        const isBusy = isLoading || isPushing;

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
                    {isPushing && <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-50"><Spinner className="h-10 w-10" /><span className="ml-2">Pushing...</span></div>}
                    {appMode === 'CHAT' && (
                        <ChatView
                            messages={messages} multiFileCode={multiFileCode} previewFile={previewFile}
                            viewMode={chatModeView} setViewMode={setChatModeView} isLoading={isLoading} error={error}
                            generationPlan={generationPlan} generatedFilesProgress={generatedFilesProgress} generationSummary={generationSummary}
                            isIdeaMode={isIdeaMode} onFileUpdate={handleFileUpdate} onFileDelete={handleFileDelete} onFileAdd={handleFileAdd}
                            onToggleMacPreview={() => setIsMacPreviewVisible(true)} deployments={deployments} techStack={techStack}
                            onCredentialSubmit={handleCredentialSubmit} promptInputLayout={promptInputLayout} onSend={executeBuild}
                            isAppGenerated={true} onToggleIdeaMode={() => setIsIdeaMode(p => !p)} isReadyToPrompt={true}
                        />
                    )}
                    {appMode === 'CODE' && <WorkspaceView files={multiFileCode} onFileUpdate={handleFileUpdate} onFileDelete={handleFileDelete} onFileAdd={handleFileAdd} />}
                    {appMode === 'PREVIEW' && <PreviewView file={previewFile} onToggleMacPreview={() => setIsMacPreviewVisible(true)} deployments={deployments} techStack={techStack} />}
                    {appMode === 'PUBLISH' && <PublishView project={currentProject} deployments={deployments} onCommitAndPush={handleCommitAndPush} onDeployClick={() => setIsDeployModalOpen(true)} onConnectGitHub={() => setIsSaveModalOpen(true)} isPushing={isPushing} />}
                    {appMode === 'WORKFLOW' && (workflow ? <WorkflowBuilderPage workflow={workflow} /> : <div className="flex items-center justify-center h-full text-gray-500">No workflow defined.</div>)}
                </main>
                 {promptInputLayout === 'floating' && (
                    <PromptInput onSend={executeBuild} isLoading={isBusy} isAppGenerated={true} isIdeaMode={isIdeaMode} onToggleIdeaMode={() => setIsIdeaMode(p => !p)} isReadyToPrompt={true} layoutStyle="floating" />
                )}
                {isMacPreviewVisible && previewFile && <MacPreview previewFile={previewFile} projectName={currentProject?.name || 'My App'} appIcon={currentProject?.appIcon || null} onClose={() => setIsMacPreviewVisible(false)} />}
                <ProjectMetadataModal isOpen={isSaveModalOpen} onClose={() => setIsSaveModalOpen(false)} onSave={handleSaveProject} initialName={currentProject?.name} initialIcon={currentProject?.appIcon} title="Save New Project" isGithubLinked={!!currentProject?.githubUrl} teams={teams} initialTeamId={currentProject?.teamId} />
                <DeployModal isOpen={isDeployModalOpen} onClose={() => { setIsDeployModalOpen(false); setDeploymentError(null); }} onDeploy={handleDeploy} isDeploying={isDeploying} initialProjectName={currentProject?.name} initialToken={settings.netlifyPat} deploymentError={deploymentError} />
            </div>
        );
    }

    if (stage === 'generating_app') {
        return (
             <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-50 p-4 text-center">
                <Spinner className="w-12 h-12 mb-6" />
                <h2 className="text-2xl font-bold mb-2">Building your app...</h2>
                <p className="text-gray-600 mb-6 max-w-md">{generationSummary || "The AI is analyzing your prompt and creating a plan."}</p>
                {generationPlan.length > 0 && (
                    <div className="text-left w-full max-w-sm bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                        <h3 className="font-semibold text-sm mb-2">Generating files:</h3>
                        <ul className="space-y-1.5 text-sm">
                            {generationPlan.map(file => (
                                <li key={file} className={`flex items-center gap-2 ${generatedFilesProgress.includes(file) ? 'text-gray-400' : 'text-gray-700'}`}>
                                    {generatedFilesProgress.includes(file) ? <div className="w-4 h-4 text-green-500">✓</div> : <Spinner className="w-4 h-4"/>}
                                    <span className={generatedFilesProgress.includes(file) ? 'line-through' : ''}>{file}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
             </div>
        )
    }

    if (stage === 'prompt') {
        return (
            <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-50 p-4">
                <h2 className="text-3xl font-bold mb-2">What do you want to build?</h2>
                <p className="text-gray-600 mb-8 max-w-xl text-center">
                    Describe your application in detail. The more specific you are, the better the result. You can also start with an idea from our prompt library.
                </p>
                <div className="w-full max-w-2xl">
                    {error && (
                        <div className="bg-red-100 border border-red-300 text-red-800 p-3 rounded-lg mb-4 text-sm" role="alert">
                            <strong>Error:</strong> {error}
                        </div>
                    )}
                     <div className="relative bg-white border border-gray-200 rounded-2xl shadow-xl p-4">
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    executeBuild(prompt);
                                }
                            }}
                            placeholder="e.g., a modern SaaS dashboard with charts and a data table"
                            className="w-full h-32 bg-transparent resize-none text-gray-900 text-lg placeholder-gray-500 focus:outline-none p-2"
                        />
                        <button
                            onClick={() => executeBuild(prompt)}
                            disabled={!prompt.trim() || isLoading}
                            className="absolute bottom-4 right-4 bg-blue-600 text-white rounded-full p-2.5 flex items-center justify-center transition-all duration-300 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            <UpArrowIcon className="w-6 h-6" />
                        </button>
                    </div>
                     <div className="flex items-center justify-center gap-2 mt-6 text-sm flex-wrap">
                        <span className="text-gray-500">or try an example:</span>
                        <button onClick={() => setPrompt(prompts[0].prompt)} className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-full shadow-sm hover:bg-gray-100 transition-colors">Pomodoro Timer</button>
                        <button onClick={() => setPrompt(prompts[2].prompt)} className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-full shadow-sm hover:bg-gray-100 transition-colors">Kanban Board</button>
                        <a href="#/dashboard/prompt-library" className="text-blue-600 hover:underline">More ideas...</a>
                    </div>
                </div>
            </div>
        );
    }
    
    // Default stage: 'stack'
    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-50 p-4">
             <div className="text-center mb-8">
                <h2 className="text-3xl font-bold">Choose your tech stack</h2>
                <p className="text-gray-600">Select a technology to generate code for.</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
                <StackCard icon={<ReactIcon />} title="React + TS" onClick={() => { setTechStack('react'); setStage('prompt'); }} />
                <StackCard icon={<MobileIcon />} title="React Native" onClick={() => { setTechStack('react-native'); setStage('prompt'); }} />
                <StackCard icon={<SvelteIcon />} title="Svelte + TS" onClick={() => { setTechStack('svelte'); setStage('prompt'); }} />
                <StackCard icon={<HtmlIcon />} title="HTML + JS" onClick={() => { setTechStack('html'); setStage('prompt'); }} />
            </div>
             <div className="relative flex py-8 items-center w-full max-w-xs">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-gray-400 text-sm">OR</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>
             <div className="text-center">
                 <h2 className="text-2xl font-bold">Try the Infinity App</h2>
                <p className="text-gray-600 max-w-md mt-1 mb-4">A new experimental way to interact with AI. No code, just conversation.</p>
                <button onClick={() => setTechStack('infinity')} className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition-colors">
                    Launch Infinity App
                </button>
            </div>
        </div>
    );
};

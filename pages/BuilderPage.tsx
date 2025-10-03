import React, { useState, useEffect } from 'react';
import { StudioHeader } from '../components/StudioHeader';
import { ChatView } from '../components/ChatView';
import { PromptInput } from '../components/PromptInput';
import { WorkspaceView } from '../components/WorkspaceView';
import { DeployModal } from '../components/DeployModal';
import { GitHubSaveModal } from '../components/GitHubSaveModal';
import { generateInitialCode, modifyCode } from '../services/geminiService';
import { ChatMessage, CodeFile } from '../types';

const AUTOSAVE_KEY = 'silo_builder_current_project';

const initialMessages: ChatMessage[] = [
    { author: 'ai', message: "Your project is ready! Let me know what changes you'd like to make." },
];

export const BuilderPage: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [files, setFiles] = useState<CodeFile[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [projectName, setProjectName] = useState('Untitled Project');
    const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
    const [isGitHubModalOpen, setIsGitHubModalOpen] = useState(false);
    const [codeContext, setCodeContext] = useState<string | null>(null);
    
    // Deployment state
    const [vercelProjectId, setVercelProjectId] = useState<string | null>(null);
    const [vercelDeploymentUrl, setVercelDeploymentUrl] = useState<string | null>(null);
    const [githubRepoUrl, setGithubRepoUrl] = useState<string | null>(null);


    // Effect for loading project on initial mount
    useEffect(() => {
        // 1. Prioritize loading from creation flow (signifies a new project)
        const initialFilesJson = sessionStorage.getItem('initial_files');
        if (initialFilesJson) {
            try {
                const initialFiles = JSON.parse(initialFilesJson);
                setFiles(initialFiles);
                setMessages(initialMessages);
                setProjectName('Untitled Project');
                
                // This is a new project, so clear any old autosaved project
                localStorage.removeItem(AUTOSAVE_KEY);
                
                // Clear the sessionStorage item so it's not reused on refresh
                sessionStorage.removeItem('initial_files');
                
                return; // New project loaded, exit.
            } catch (e) {
                console.error("Failed to parse initial files from sessionStorage", e);
                sessionStorage.removeItem('initial_files');
            }
        }

        // 2. If not a new project, try to load from autosave
        const savedProjectJson = localStorage.getItem(AUTOSAVE_KEY);
        if (savedProjectJson) {
            try {
                const savedProject = JSON.parse(savedProjectJson);
                if (savedProject.files && savedProject.messages) {
                    setFiles(savedProject.files);
                    setMessages(savedProject.messages);
                    setProjectName(savedProject.projectName || 'Untitled Project');
                    setVercelProjectId(savedProject.vercelProjectId || null);
                    setVercelDeploymentUrl(savedProject.vercelDeploymentUrl || null);
                    setGithubRepoUrl(savedProject.githubRepoUrl || null);
                    return;
                }
            } catch (e) {
                console.error("Failed to parse autosaved project from localStorage", e);
                localStorage.removeItem(AUTOSAVE_KEY);
            }
        }
        
        // 3. Fallback for direct navigation or if all state is lost
        setMessages([{ author: 'ai', message: "Hello! Describe the component you want to build to get started." }]);
    }, []);

    // Effect for autosaving project on changes
    useEffect(() => {
        if (files.length > 0) {
            const projectToSave = {
                files,
                messages,
                projectName,
                vercelProjectId,
                vercelDeploymentUrl,
                githubRepoUrl,
                lastSaved: new Date().toISOString(),
            };
            localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(projectToSave));
        }
    }, [files, messages, projectName, vercelProjectId, vercelDeploymentUrl, githubRepoUrl]);

    const handleSendPrompt = async (prompt: string) => {
        setIsLoading(true);
        
        let fullPrompt = prompt;
        
        if (codeContext) {
            fullPrompt = `Here is some context code from my editor:\n\`\`\`\n${codeContext}\n\`\`\`\n\nBased on that context, please apply this change: ${prompt}`;
            // Remove the temporary context card from the messages
            setMessages(prev => prev.filter(m => !m.codeContext));
            setCodeContext(null);
        }
        
        const newUserMessage: ChatMessage = { author: 'user', message: prompt };
        setMessages(prev => [...prev, newUserMessage]);

        try {
            if (files.length > 0) {
                const result = await modifyCode(fullPrompt, files);
                const newPlanMessage: ChatMessage = { author: 'ai', plan: { plan: result.plan, todo: result.todo } };
                
                const nextMessages: ChatMessage[] = [newPlanMessage];
                if (result.requestsApiKey) {
                    nextMessages.push({ author: 'ai', apiKeyRequest: true });
                }
                setMessages(prev => [...prev, ...nextMessages]);
                setFiles(result.files);

                setTimeout(() => {
                    const newThoughtMessage: ChatMessage = { author: 'ai', message: result.thought };
                    setMessages(prev => [...prev, newThoughtMessage]);
                }, 3000 + result.todo.length * 500);

            } else {
                 const result = await generateInitialCode(fullPrompt);
                 const nextMessages: ChatMessage[] = [];
                 if (result.requestsApiKey) {
                    nextMessages.push({ author: 'ai', apiKeyRequest: true });
                 }
                 nextMessages.push({ author: 'ai', message: result.thought });
                 setMessages(prev => [...prev, ...nextMessages]);
                 setFiles(result.files);
            }

        } catch (error: any) {
            const errorMessage: ChatMessage = { author: 'ai', message: `Sorry, something went wrong: ${error.message}` };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleFileContentChange = (fileName: string, newContent: string) => {
        setFiles(prevFiles => 
            prevFiles.map(file => 
                file.name === fileName ? { ...file, content: newContent } : file
            )
        );
    };

    const handleFixCode = async (codeToFix: string) => {
        const prompt = `Please analyze the following code snippet for any errors and fix them. Make sure to return the complete, corrected code for all files.\n\nCode snippet to fix:\n\`\`\`\n${codeToFix}\n\`\`\``;
        await handleSendPrompt(prompt);
    };

    const handleAskAboutCode = (code: string) => {
        const newContextMessage: ChatMessage = { author: 'user', codeContext: code };
        setMessages(prev => [...prev, newContextMessage]);
        setCodeContext(code);
    };


    const handleDeploySuccess = ({ projectId, url }: { projectId: string; url: string }) => {
        setVercelProjectId(projectId);
        setVercelDeploymentUrl(url);
    };

    return (
        <div className="flex flex-col h-screen bg-gray-950 text-white overflow-hidden">
            <StudioHeader 
                projectName={projectName}
                onProjectNameChange={setProjectName}
                onDeployClick={() => setIsDeployModalOpen(true)}
                onSaveToGitHubClick={() => setIsGitHubModalOpen(true)}
            />
            <main className="flex-1 flex flex-row min-h-0">
                <div className="relative w-full md:w-1/3 lg:w-1/4 flex flex-col border-r border-gray-800 bg-gray-900">
                    <ChatView messages={messages} isLoading={isLoading} />
                    <PromptInput onSend={handleSendPrompt} isLoading={isLoading} />
                </div>
                <div className="flex-1 flex flex-col">
                    <WorkspaceView 
                        files={files} 
                        onFileContentChange={handleFileContentChange}
                        onFixCode={handleFixCode}
                        onAskAboutCode={handleAskAboutCode}
                    />
                </div>
            </main>
            <DeployModal
                isOpen={isDeployModalOpen}
                onClose={() => setIsDeployModalOpen(false)}
                files={files}
                projectName={projectName}
                projectId={vercelProjectId}
                onDeploySuccess={handleDeploySuccess}
            />
            <GitHubSaveModal
                isOpen={isGitHubModalOpen}
                onClose={() => setIsGitHubModalOpen(false)}
                files={files}
                onSaveSuccess={(url) => setGithubRepoUrl(url)}
                existingRepoUrl={githubRepoUrl}
            />
        </div>
    );
};
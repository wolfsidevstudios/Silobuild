import React, { useState, useEffect } from 'react';
import { StudioHeader } from '../components/StudioHeader';
import { ChatView } from '../components/ChatView';
import { PromptInput } from '../components/PromptInput';
// Fix: Import the WorkspaceView component, which was missing.
import { WorkspaceView } from '../components/WorkspaceView';
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

    // Effect for loading project on initial mount
    useEffect(() => {
        // 1. Prioritize loading from creation flow (signifies a new project)
        const initialFilesJson = sessionStorage.getItem('initial_files');
        if (initialFilesJson) {
            try {
                const initialFiles = JSON.parse(initialFilesJson);
                setFiles(initialFiles);
                setMessages(initialMessages);
                
                // This is a new project, so clear any old autosaved project
                localStorage.removeItem(AUTOSAVE_KEY);
                
                // Clear the sessionStorage item so it's not reused on refresh
                sessionStorage.removeItem('initial_files');
                
                return; // New project loaded, exit.
            } catch (e) {
                console.error("Failed to parse initial files from sessionStorage", e);
                // Clear potentially corrupted data
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
                    return; // Project loaded from autosave, exit
                }
            } catch (e) {
                console.error("Failed to parse autosaved project from localStorage", e);
                localStorage.removeItem(AUTOSAVE_KEY); // Clear corrupted data
            }
        }
        
        // 3. Fallback for direct navigation or if all state is lost
        setMessages([{ author: 'ai', message: "Hello! Describe the component you want to build to get started." }]);
    }, []);

    // Effect for autosaving project on changes
    useEffect(() => {
        // Don't save if there are no files yet, to avoid overwriting a valid project with an empty state on load.
        if (files.length > 0) {
            const projectToSave = {
                files,
                messages,
                lastSaved: new Date().toISOString(),
            };
            localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(projectToSave));
        }
    }, [files, messages]);

    const handleSendPrompt = async (prompt: string) => {
        setIsLoading(true);
        const newUserMessage: ChatMessage = { author: 'user', message: prompt };
        setMessages(prev => [...prev, newUserMessage]);

        try {
            if (files.length > 0) {
                const result = await modifyCode(prompt, files);
                const newPlanMessage: ChatMessage = { author: 'ai', plan: { plan: result.plan, todo: result.todo } };
                setMessages(prev => [...prev, newPlanMessage]);
                setFiles(result.files);

                // Add the follow-up "thought" message after a short delay
                setTimeout(() => {
                    const newThoughtMessage: ChatMessage = { author: 'ai', message: result.thought };
                    setMessages(prev => [...prev, newThoughtMessage]);
                }, 3000 + result.todo.length * 500); // Wait for plan animation to roughly finish

            } else {
                 const result = await generateInitialCode(prompt);
                 const newAiMessage: ChatMessage = { author: 'ai', message: result.thought };
                 setMessages(prev => [...prev, newAiMessage]);
                 setFiles(result.files);
            }

        } catch (error: any) {
            const errorMessage: ChatMessage = { author: 'ai', message: `Sorry, something went wrong: ${error.message}` };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-950 text-white overflow-hidden">
            <StudioHeader />
            <main className="flex-1 flex flex-row min-h-0">
                {/* Left Pane: Chat */}
                <div className="relative w-full md:w-1/3 lg:w-1/4 flex flex-col border-r border-gray-800 bg-gray-900">
                    <ChatView messages={messages} isLoading={isLoading} />
                    <PromptInput onSend={handleSendPrompt} isLoading={isLoading} />
                </div>

                {/* Right Pane: Workspace (Code + Preview) */}
                <div className="flex-1 flex flex-col">
                    <WorkspaceView files={files} />
                </div>
            </main>
        </div>
    );
};
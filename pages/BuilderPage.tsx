import React, { useState } from 'react';
import { StudioHeader } from '../components/StudioHeader';
import { ChatView } from '../components/ChatView';
import { PromptInput } from '../components/PromptInput';
import { WorkspaceView } from '../components/WorkspaceView';
import { generateCode } from '../services/geminiService';
import { ChatMessage, CodeFile } from '../types';

const initialMessages: ChatMessage[] = [
    { author: 'ai', message: "Hello! I'm here to help you build. What component should we create first?" },
];

export const BuilderPage: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
    const [files, setFiles] = useState<CodeFile[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSendPrompt = async (prompt: string) => {
        setIsLoading(true);
        const newUserMessage: ChatMessage = { author: 'user', message: prompt };
        setMessages(prev => [...prev, newUserMessage]);

        try {
            const result = await generateCode(prompt);
            const newAiMessage: ChatMessage = { author: 'ai', message: result.thought };
            setMessages(prev => [...prev, newAiMessage]);
            setFiles(result.files);
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
                <div className="w-full md:w-1/3 lg:w-1/4 flex flex-col border-r border-gray-800">
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

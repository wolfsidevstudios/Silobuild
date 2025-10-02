import React from 'react';
import { StudioHeader } from '../components/StudioHeader';
import { ChatView } from '../components/ChatView';
import { PromptInput } from '../components/PromptInput';
import { WorkspaceView } from '../components/WorkspaceView';

export const BuilderPage: React.FC = () => {
    return (
        <div className="flex flex-col h-screen bg-gray-950 text-white overflow-hidden">
            <StudioHeader />
            <main className="flex-1 flex flex-row min-h-0">
                {/* Left Pane: Chat */}
                <div className="w-full md:w-1/3 lg:w-1/4 flex flex-col border-r border-gray-800">
                    <ChatView />
                    <PromptInput />
                </div>

                {/* Right Pane: Workspace (Code + Preview) */}
                <div className="flex-1 flex flex-col">
                    <WorkspaceView />
                </div>
            </main>
        </div>
    );
};
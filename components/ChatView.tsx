import React from 'react';
import { BotIcon } from './icons';

const ChatMessage: React.FC<{ author: 'user' | 'ai', message: string }> = ({ author, message }) => {
    const isAI = author === 'ai';
    return (
        <div className={`flex items-start gap-3 my-4 ${!isAI ? '' : 'flex-row-reverse'}`}>
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isAI ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-700 text-gray-300'}`}>
                {isAI ? <BotIcon className="w-5 h-5"/> : 'D'}
            </div>
            <div className={`p-3 rounded-lg max-w-xs md:max-w-md ${isAI ? 'bg-gray-800 text-gray-200' : 'bg-blue-600 text-white'}`}>
                <p className="text-sm">{message}</p>
            </div>
        </div>
    );
};

export const ChatView: React.FC = () => {
    return (
        <div className="flex-1 overflow-y-auto p-4">
            <ChatMessage author="user" message="Create a modern landing page for a SaaS company." />
            <ChatMessage author="ai" message="Of course! What should be the primary call-to-action?" />
            <ChatMessage author="user" message="A 'Get Started for Free' button that links to the sign up page." />
            <ChatMessage author="ai" message="I've generated the initial version of the landing page with the CTA. You can see the code and a live preview on the right. Let me know what you'd like to add next!" />
        </div>
    );
};
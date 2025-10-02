import React, { useEffect, useRef } from 'react';
import { BotIcon } from './icons';
import { ChatMessage as ChatMessageType } from '../types';
import { Spinner } from './Spinner';

const ChatMessage: React.FC<{ author: 'user' | 'ai', message: string }> = ({ author, message }) => {
    const isUser = author === 'user';
    return (
        <div className={`flex items-start gap-3 my-4 ${isUser ? '' : 'flex-row'}`}>
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${!isUser ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-700 text-gray-300'}`}>
                {!isUser ? <BotIcon className="w-5 h-5"/> : 'D'}
            </div>
            <div className={`p-3 rounded-lg max-w-xs md:max-w-md ${!isUser ? 'bg-gray-800 text-gray-200' : 'bg-blue-600 text-white'}`}>
                <p className="text-sm whitespace-pre-wrap">{message}</p>
            </div>
        </div>
    );
};


interface ChatViewProps {
    messages: ChatMessageType[];
    isLoading: boolean;
}

export const ChatView: React.FC<ChatViewProps> = ({ messages, isLoading }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    return (
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4">
            {messages.map((msg, index) => (
                <ChatMessage key={index} author={msg.author} message={msg.message} />
            ))}
            {isLoading && (
                 <div className="flex items-start gap-3 my-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-blue-500/20 text-blue-400">
                         <BotIcon className="w-5 h-5"/>
                    </div>
                    <div className="p-3 rounded-lg max-w-xs md:max-w-md bg-gray-800 text-gray-200">
                        <Spinner className="w-5 h-5 text-blue-400" />
                    </div>
                </div>
            )}
        </div>
    );
};

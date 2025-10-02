import React, { useEffect, useRef, useState } from 'react';
import { BotIcon, CheckCircleIcon, LightbulbIcon } from './icons';
import { ChatMessage as ChatMessageType } from '../types';
import { Spinner } from './Spinner';

const PlanMessage: React.FC<{ plan: { plan: string, todo: string[] } }> = ({ plan }) => {
    const [completedTodos, setCompletedTodos] = useState<number[]>([]);
    const [thinking, setThinking] = useState(true);
    const [inProgressTodo, setInProgressTodo] = useState<number | null>(null);

    useEffect(() => {
        const totalDuration = 2000 + (plan.todo.length * 500); // Base duration + per item
        const stepDuration = totalDuration / (plan.todo.length + 2); // +2 for thinking and completion

        // 1. Show "Thinking..."
        const thinkingTimeout = setTimeout(() => {
            setThinking(false);
            setInProgressTodo(0);
        }, stepDuration);

        // 2. Animate through todos
        const todoTimeouts = plan.todo.map((_, index) => {
            return setTimeout(() => {
                setCompletedTodos(prev => [...prev, index]);
                if (index + 1 < plan.todo.length) {
                    setInProgressTodo(index + 1);
                } else {
                    setInProgressTodo(null);
                }
            }, stepDuration * (index + 2));
        });

        return () => {
            clearTimeout(thinkingTimeout);
            todoTimeouts.forEach(clearTimeout);
        };
    }, [plan.todo]);

    const getIcon = (index: number) => {
        if (completedTodos.includes(index)) {
            return <CheckCircleIcon className="w-5 h-5 text-green-400" />;
        }
        if (inProgressTodo === index) {
            return <Spinner className="w-5 h-5 text-blue-400" />;
        }
        return <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center"><div className="w-3 h-3 border-2 border-gray-500 rounded-full"></div></div>;
    };

    return (
        <div className="flex items-start gap-3 my-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-blue-500/20 text-blue-400">
                <BotIcon className="w-5 h-5"/>
            </div>
            <div className="p-4 rounded-lg max-w-xs md:max-w-md bg-gray-800 text-gray-200 w-full">
                <h3 className="font-bold text-md mb-3 flex items-center gap-2">
                     <span className="material-symbols-outlined text-lg">list_alt</span>
                    Plan
                </h3>
                <ul className="space-y-2 text-sm">
                    {thinking && (
                        <li className="flex items-center gap-3 text-gray-400">
                            <LightbulbIcon className="w-5 h-5 text-yellow-400" />
                            <span>Thinking...</span>
                        </li>
                    )}
                    {plan.todo.map((item, index) => (
                         <li key={index} className={`flex items-center gap-3 transition-colors ${completedTodos.includes(index) ? 'text-gray-400' : 'text-gray-200'}`}>
                            {getIcon(index)}
                            <span className={`${completedTodos.includes(index) ? 'line-through' : ''}`}>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};


const TextMessage: React.FC<{ author: 'user' | 'ai', message: string }> = ({ author, message }) => {
    const isUser = author === 'user';
    return (
        <div className={`flex items-start gap-3 my-4 ${isUser ? 'justify-end' : ''}`}>
             {!isUser && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-blue-500/20 text-blue-400">
                    <BotIcon className="w-5 h-5"/>
                </div>
            )}
            <div className={`p-3 rounded-lg max-w-xs md:max-w-md ${isUser ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-200'}`}>
                <p className="text-sm whitespace-pre-wrap">{message}</p>
            </div>
             {isUser && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-700 text-gray-300 font-bold">
                    D
                </div>
            )}
        </div>
    );
};

const ChatMessage: React.FC<{ message: ChatMessageType }> = ({ message }) => {
    if (message.plan) {
        return <PlanMessage plan={message.plan} />;
    }
    if (message.message) {
        return <TextMessage author={message.author} message={message.message} />;
    }
    return null;
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
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 pb-32">
            {messages.map((msg, index) => (
                <ChatMessage key={index} message={msg} />
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

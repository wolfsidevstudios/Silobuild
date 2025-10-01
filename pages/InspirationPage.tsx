import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Settings, Secret, Table } from '../types';
import { generateAgentChatResponse } from '../services/geminiService';
import { AgentIcon } from '../components/icons';
import { Spinner } from '../components/Spinner';
import { PromptInput } from '../components/PromptInput';
import { Type } from '@google/genai';

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

const SYSTEM_INSTRUCTION = `You are Silo Build Assist, an AI assistant integrated into the Silo Build application development environment. You can help users manage their projects, generate ideas, and even modify the application's configuration. You have access to a set of tools to perform these actions. When a user asks you to do something, think about which tool is appropriate and call it with the correct arguments. If the user is just chatting, respond naturally.

Available Tools:
- create_database_table: Call this function when the user wants to create a new database table. You should ask for the table name and columns if they are not provided.
- add_secret: Call this function when the user wants to add a new secret or API key to their application settings. You must ask for both the name and the value of the secret.
- generate_prompt_idea: Call this when the user is looking for inspiration or wants you to generate a detailed prompt for building an application.
`;

const tools = [
    {
        functionDeclarations: [
            {
                name: 'create_database_table',
                description: "Creates a new database table in the user's project.",
                parameters: {
                    type: Type.OBJECT,
                    properties: {
                        name: { type: Type.STRING, description: 'The name of the table, plural and in snake_case.' },
                        columns: {
                            type: Type.ARRAY,
                            description: 'The columns of the table.',
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    name: { type: Type.STRING, description: "The column name in snake_case." },
                                    dataType: { type: Type.STRING, description: "One of: 'uuid', 'text', 'varchar', 'int4', 'int8', 'float8', 'boolean', 'timestamp', 'timestamptz'."},
                                    defaultValue: { type: Type.STRING, description: 'Optional default value (e.g., now()).' },
                                    isPrimaryKey: { type: Type.BOOLEAN },
                                    isUnique: { type: Type.BOOLEAN },
                                    isNullable: { type: Type.BOOLEAN },
                                },
                                required: ['name', 'dataType', 'isPrimaryKey', 'isUnique', 'isNullable']
                            }
                        }
                    },
                    required: ['name', 'columns']
                },
            },
            {
                name: 'add_secret',
                description: "Adds a new secret (e.g., API key) to the user's application settings.",
                parameters: {
                    type: Type.OBJECT,
                    properties: {
                        name: { type: Type.STRING, description: 'The name of the secret, e.g., "OPENAI_API_KEY".' },
                        value: { type: Type.STRING, description: 'The value of the secret.' },
                    },
                    required: ['name', 'value'],
                },
            },
            {
                name: 'generate_prompt_idea',
                description: "Generates a detailed application idea and a prompt for Silo Build's code generation AI based on a user's topic.",
                parameters: {
                    type: Type.OBJECT,
                    properties: {
                        topic: { type: Type.STRING, description: 'The user\'s topic or initial idea, e.g., "a to-do list app".' },
                    },
                    required: ['topic'],
                },
            }
        ],
    },
];

export const InspirationPage: React.FC = () => {
    const [settings, setSettings] = useLocalStorage<Settings>('ai-app-builder-settings', initialSettings);
    const [, setTables] = useLocalStorage<Table[]>('silo-build-schema', []);
    
    const [hasStarted, setHasStarted] = useState(false);
    const [history, setHistory] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [history, isLoading]);


    const handleFunctionCall = useCallback(async (functionCall: any) => {
        let functionResponse;
        let uiMessage = '';

        switch (functionCall.name) {
            case 'create_database_table':
                const newTable: Table = {
                    id: crypto.randomUUID(),
                    name: functionCall.args.name,
                    columns: functionCall.args.columns.map((col: any) => ({ ...col, id: crypto.randomUUID() }))
                };
                setTables(prev => [...prev, newTable]);
                functionResponse = { result: `Successfully created table named '${newTable.name}'.` };
                uiMessage = `✅ I've created the database table **${newTable.name}**. You can view and edit it on the Database page.`;
                break;
            case 'add_secret':
                const newSecret: Secret = {
                    id: crypto.randomUUID(),
                    name: functionCall.args.name,
                    value: functionCall.args.value,
                };
                setSettings(prev => ({
                    ...prev,
                    secrets: [...(prev.secrets || []), newSecret]
                }));
                functionResponse = { result: `Successfully added secret named '${newSecret.name}'.` };
                uiMessage = `✅ I've added the secret **${newSecret.name}**. You can view it on the Integrations page.`;
                break;
            case 'generate_prompt_idea':
                functionResponse = { result: `Successfully generated prompt idea for topic: ${functionCall.args.topic}. The idea has been sent as a chat message.` };
                break;
            default:
                functionResponse = { error: `Unknown function call: ${functionCall.name}` };
                uiMessage = `⚠️ I tried to use a tool I don't recognize: \`${functionCall.name}\`.`;
        }

        if (uiMessage) {
            setHistory(prev => [...prev, { role: 'model', parts: [{ text: uiMessage }] }]);
        }
        
        return {
            role: 'function',
            parts: [{ functionResponse: { name: functionCall.name, response: functionResponse } }]
        };
    }, [setTables, setSettings]);


    const sendMessage = useCallback(async (newHistory: any[]) => {
        setIsLoading(true);
        setError(null);

        if (!settings.geminiApiKey) {
            setError("Please configure your Gemini API Key in the Integrations page to use the assistant.");
            setIsLoading(false);
            setHistory(prev => [...prev, { role: 'model', parts: [{ text: "I can't work without a Gemini API key. Please add one on the Integrations page." }] }]);
            return;
        }

        try {
            const agentConfig = { systemInstruction: SYSTEM_INSTRUCTION, tools };
            const response = await generateAgentChatResponse(newHistory, agentConfig, settings);
            const modelResponsePart = response.candidates?.[0]?.content;
            
            if (modelResponsePart) {
                const functionCalls = modelResponsePart.parts.filter((part: any) => part.functionCall);
                
                if (functionCalls.length > 0) {
                    setHistory(prev => [...prev, modelResponsePart]);
                    
                    const toolResponses = await Promise.all(functionCalls.map(handleFunctionCall));
                    const finalHistory = [...newHistory, modelResponsePart, ...toolResponses];

                    await sendMessage(finalHistory);
                } else {
                    setHistory(prev => [...prev, modelResponsePart]);
                }
            } else {
                throw new Error("Received an empty response from the AI.");
            }

        } catch (err) {
            const message = err instanceof Error ? err.message : "An unknown error occurred.";
            setError(message);
            setHistory(prev => [...prev, { role: 'model', parts: [{ text: `I encountered an error: ${message}` }] }]);
        } finally {
            setIsLoading(false);
        }
    }, [settings, handleFunctionCall]);

    const handleSend = (prompt: string) => {
        if (!prompt.trim()) return;
        if (!hasStarted) {
            setHasStarted(true);
        }
        const userMessage = { role: 'user', parts: [{ text: prompt }] };
        const newHistory = [...history, userMessage];
        setHistory(newHistory);
        sendMessage(newHistory);
    };
    
    return (
        <div className="h-full w-full flex flex-col bg-gray-50">
            <header className="p-4 border-b border-gray-200 bg-white">
                <h1 className="text-xl font-bold text-center">Silo Build Assist</h1>
            </header>
            <main className="flex-1 p-4 overflow-y-auto space-y-4">
                {!hasStarted && (
                    <div className="flex flex-col items-center text-center pt-16">
                        <AgentIcon className="w-16 h-16 text-blue-500 mb-4" />
                        <h1 className="text-4xl font-bold text-gray-900">Silo Build Assist</h1>
                        <p className="text-gray-600 mt-4 max-w-2xl">
                            I'm your AI assistant for Silo Build. Ask me to create a database table, add a new secret, or brainstorm a new app idea. How can I help you today?
                        </p>
                    </div>
                )}
                {history.map((msg, index) => {
                    const isUser = msg.role === 'user';
                    const textPart = msg.parts.find((p: any) => p.text);
                    return (
                        textPart && <div key={index} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                            <div className={`max-w-xl p-3 rounded-2xl shadow-sm ${isUser ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-black border border-gray-200 rounded-bl-none'}`}>
                                <p className="text-sm whitespace-pre-wrap">{textPart.text}</p>
                            </div>
                        </div>
                    );
                })}
                 {isLoading && <div className="flex items-start"><div className="p-3 bg-white rounded-lg shadow-sm"><Spinner /></div></div>}
                 {error && <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}
                <div ref={messagesEndRef} />
            </main>
            <footer className="p-2 border-t border-gray-200 bg-gray-50/80 backdrop-blur-lg">
                 <PromptInput
                    onSend={handleSend}
                    isLoading={isLoading}
                    isAppGenerated={true}
                    isIdeaMode={true}
                    onToggleIdeaMode={() => {}}
                    isReadyToPrompt={true}
                    layoutStyle="inline"
                    simple={true}
                    placeholder="Ask me anything..."
                />
            </footer>
        </div>
    );
};
import React, { useState, useEffect, useRef } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Project, AgentConfig, Settings, GeneratedFile } from '../types';
import { generateAgentChatResponse } from '../services/geminiService';
import { Spinner } from '../components/Spinner';
import { SaveIcon, SparklesIcon, HomeIcon, AgentIcon, TrashIcon, DownloadIcon } from '../components/icons';
import { Type } from '@google/genai';
import { downloadProjectAsZip } from '../utils/projectUtils';

// FIX: Add missing 'netlifyPat' property to satisfy the Settings type.
const initialSettings: Settings = {
  geminiApiKey: '',
  vercelApiKey: '',
  supabaseUrl: '',
  supabaseAnonKey: '',
  stripePublicKey: '',
  stripeSecretKey: '',
  githubPat: '',
  netlifyPat: '',
};

const defaultAgentConfig: AgentConfig = {
    systemInstruction: 'You are a helpful and friendly assistant.',
    tools: [],
};

const exampleTool = {
    functionDeclarations: [
      {
        name: 'human_help_form',
        description: 'Call this function when the user asks for human help or a customized offer to collect their contact information.',
        parameters: {
          type: Type.OBJECT,
          properties: {
            fullName: { type: Type.STRING, description: 'The user\'s full name.' },
            emailAddress: { type: Type.STRING, description: 'The user\'s email address.' },
            phoneNumber: { type: Type.STRING, description: 'The user\'s phone number.' },
          },
          required: ['fullName', 'emailAddress'],
        },
      },
    ],
};

// --- Agent Chat UI Components ---

const HumanHelpForm: React.FC<{ onSubmit: (data: any) => void }> = ({ onSubmit }) => {
    const [formData, setFormData] = useState({ fullName: '', emailAddress: '', phoneNumber: '' });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="mt-2 space-y-3">
             <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" required className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400" />
             <input type="email" name="emailAddress" value={formData.emailAddress} onChange={handleChange} placeholder="Email Address" required className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400" />
             <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400" />
             <div className="flex items-center justify-end">
                <button type="submit" className="px-5 py-2 text-sm font-semibold text-white bg-black rounded-lg hover:bg-gray-800">Send</button>
             </div>
        </form>
    );
};

const AgentChatView: React.FC<{
    history: any[];
    isLoading: boolean;
    error: string | null;
    onSendMessage: (text: string) => void;
    onToolResponse: (functionName: string, response: any) => void;
}> = ({ history, isLoading, error, onSendMessage, onToolResponse }) => {
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [history, isLoading]);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() && !isLoading) {
            onSendMessage(input);
            setInput('');
        }
    };

    return (
        <div className="h-full bg-gray-100 flex flex-col">
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {history.map((msg, index) => {
                    const isUser = msg.role === 'user';
                    const parts = msg.parts || [];
                    return (
                        <div key={index} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                            <div className={`max-w-md p-3 rounded-2xl ${ isUser ? 'bg-black text-white' : 'bg-white text-black border border-gray-200 shadow-sm' }`}>
                                {parts.map((part: any, partIndex: number) => {
                                    if (part.text) {
                                        return <p key={partIndex} className="text-sm whitespace-pre-wrap">{part.text}</p>;
                                    }
                                    if (part.functionCall) {
                                        if (part.functionCall.name === 'human_help_form') {
                                            return (
                                                <div key={partIndex}>
                                                    <h4 className="font-bold">Human Help</h4>
                                                    <p className="text-sm">Please provide your details, one of our specialists will contact you soon:</p>
                                                    <HumanHelpForm onSubmit={(data) => onToolResponse(part.functionCall.name, data)} />
                                                </div>
                                            );
                                        }
                                        return <p key={partIndex} className="text-xs text-red-500 italic">[Unsupported tool: {part.functionCall.name}]</p>;
                                    }
                                    return null;
                                })}
                            </div>
                            <p className="text-xs text-gray-400 mt-1 px-1">{new Date().toLocaleString()}</p>
                        </div>
                    );
                })}

                {isLoading && (
                    <div className="flex items-start">
                        <div className="p-3 bg-white text-black border border-gray-200 rounded-2xl shadow-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-0"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></div>
                            </div>
                        </div>
                    </div>
                )}
                 {error && (
                    <div className="p-3 bg-red-100 text-red-800 border border-red-200 rounded-2xl">
                        <p className="text-sm font-semibold">Error</p>
                        <p className="text-sm">{error}</p>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-3 bg-white border-t border-gray-200">
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Ask me anything..."
                        disabled={isLoading}
                        className="w-full bg-gray-100 border border-gray-200 rounded-full py-2.5 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                    />
                    <button type="submit" disabled={isLoading || !input.trim()} className="w-9 h-9 flex-shrink-0 bg-black text-white rounded-full flex items-center justify-center disabled:bg-gray-300">
                        <svg className="w-5 h-5 transform -rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                    </button>
                </form>
            </div>
        </div>
    );
};

// --- Main Agent Builder Page ---

export const AgentBuilderPage: React.FC<{ projectId?: string }> = ({ projectId }) => {
    const [projects, setProjects] = useLocalStorage<Project[]>('ai-app-builder-projects', []);
    const [settings] = useLocalStorage<Settings>('ai-app-builder-settings', initialSettings);

    const [project, setProject] = useState<Project | null>(null);
    const [config, setConfig] = useState<AgentConfig>(defaultAgentConfig);
    const [toolsJson, setToolsJson] = useState('');
    const [name, setName] = useState('New AI Agent');

    const [history, setHistory] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (projectId) {
            const foundProject = projects.find(p => p.id === projectId);
            if (foundProject && foundProject.stack === 'agent') {
                setProject(foundProject);
                setName(foundProject.name);
                const agentConfig = foundProject.agentConfig || defaultAgentConfig;
                setConfig(agentConfig);
                setToolsJson(JSON.stringify(agentConfig.tools, null, 2));
            } else if (foundProject) {
                // Navigated to a non-agent project
                window.location.hash = `#/project/${projectId}`;
            }
        } else {
            // New agent
            setProject(null);
            setName('New AI Agent');
            setConfig(defaultAgentConfig);
            setToolsJson('');
        }
        setHistory([]);
    }, [projectId, projects]);

    const handleConfigChange = (field: keyof AgentConfig, value: any) => {
        setConfig(prev => ({ ...prev, [field]: value }));
    };
    
    const handleToolsChange = (jsonString: string) => {
        setToolsJson(jsonString);
        try {
            const parsedTools = JSON.parse(jsonString);
            handleConfigChange('tools', parsedTools);
            setError(null);
        } catch (e) {
            setError('Invalid JSON format for tools.');
        }
    };
    
    const handleSave = () => {
        if (!name.trim()) {
            alert("Please provide a name for the agent.");
            return;
        }

        const now = new Date().toISOString();
        let savedProject: Project;

        if (project) { // Update existing project
            savedProject = { ...project, name, agentConfig: config, updatedAt: now };
            setProjects(p => p.map(p => p.id === projectId ? savedProject : p));
        } else { // Create new project
            savedProject = {
                id: crypto.randomUUID(),
                name,
                createdAt: now,
                updatedAt: now,
                stack: 'agent',
                agentConfig: config,
                files: [],
                previewFile: null,
                deployments: [],
            };
            setProjects(p => [savedProject, ...p]);
        }
        setProject(savedProject);
        window.location.hash = `#/agent-builder/${savedProject.id}`;
        alert("Agent saved!");
    };
    
    const sendMessage = async (newHistory: any[]) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await generateAgentChatResponse(newHistory, config, settings);
            const modelResponsePart = response.candidates?.[0]?.content;
            if (modelResponsePart) {
                setHistory(prev => [...prev, modelResponsePart]);
            } else {
                throw new Error("Received an empty response from the AI.");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleUserMessage = (text: string) => {
        const userMessage = { role: 'user', parts: [{ text }] };
        const newHistory = [...history, userMessage];
        setHistory(newHistory);
        sendMessage(newHistory);
    };

    const handleToolResponse = (functionName: string, response: any) => {
        const toolResponse = {
            role: 'tool',
            parts: [{ functionResponse: { name: functionName, response } }]
        };
        const newHistory = [...history, toolResponse];
        setHistory(newHistory);
        sendMessage(newHistory);
    };
    
    const handleDownloadAgent = () => {
        if (!project) {
            alert("Please save the agent before downloading.");
            return;
        }

        const sanitizedName = name.toLowerCase().replace(/[^a-z0-9-]/g, '-');

        const packageJsonContent = {
          name: sanitizedName,
          version: "1.0.0",
          description: `AI Agent "${name}" created with Silo Build`,
          main: "index.js",
          type: "module",
          scripts: {
            start: "node index.js"
          },
          dependencies: {
            "@google/genai": "^1.21.0",
            "dotenv": "^16.4.5",
            "readline": "^1.3.0"
          }
        };

        const readmeContent = `# AI Agent - ${name}

This agent was configured using Silo Build.

## Setup

1.  Install dependencies:
    \`\`\`bash
    npm install
    \`\`\`

2.  Create a \`.env\` file in the root of this project and add your Gemini API key:
    \`\`\`
    API_KEY=your_gemini_api_key_here
    \`\`\`
    If you configured an agent-specific key, use that one. Otherwise, use your global Gemini key.

## Run

Start the agent chat in your terminal:

\`\`\`bash
npm start
\`\`\`
`;

        const indexJsContent = `import { GoogleGenAI } from '@google/genai';
import * as fs from 'fs';
import * as readline from 'readline';
import 'dotenv/config';

// Load agent configuration
const agentConfig = JSON.parse(fs.readFileSync('./agent.config.json', 'utf-8'));

// --- IMPORTANT: API Key ---
// The API key MUST be in a .env file in the root of the project.
// Create a file named .env and add the following line:
// API_KEY=your_gemini_api_key_here
// --------------------------
if (!process.env.API_KEY && !agentConfig.geminiApiKey) {
    console.error('Error: API_KEY not found. Please create a .env file and add your Gemini API key.');
    process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: agentConfig.geminiApiKey || process.env.API_KEY });
const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
        systemInstruction: agentConfig.systemInstruction,
        tools: agentConfig.tools && agentConfig.tools.length > 0 ? agentConfig.tools : undefined,
    },
});

console.log('Agent is ready. Type your message and press Enter. Type "exit" to quit.');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'You: '
});

rl.prompt();

rl.on('line', async (line) => {
    if (line.toLowerCase() === 'exit') {
        rl.close();
        return;
    }

    try {
        const response = await chat.sendMessage({ message: line });
        // NOTE: Function calling is not handled in this basic runner.
        // You will need to implement logic to handle functionCall responses from the model if your agent uses tools.
        console.log(\`\\nAgent: \${response.text}\\n\`);
    } catch (error) {
        console.error(\`\\nError: \${error.message}\\n\`);
    }
    rl.prompt();
}).on('close', () => {
    console.log('Goodbye!');
    process.exit(0);
});
`;

        const agentConfigFile: GeneratedFile = {
            path: 'agent.config.json',
            content: JSON.stringify(config, null, 2)
        };

        const packageJsonFile: GeneratedFile = {
            path: 'package.json',
            content: JSON.stringify(packageJsonContent, null, 2)
        };
        
        const readmeFile: GeneratedFile = {
            path: 'README.md',
            content: readmeContent
        };

        const indexJsFile: GeneratedFile = {
            path: 'index.js',
            content: indexJsContent
        };

        const projectToDownload = {
            ...project,
            files: [agentConfigFile, packageJsonFile, readmeFile, indexJsFile]
        };

        downloadProjectAsZip(projectToDownload);
    };

    return (
        <div className="h-screen w-screen bg-gray-50 flex flex-col font-sans">
             <header className="flex-shrink-0 flex justify-between items-center p-2 border-b border-gray-200 bg-white">
                <div className="flex items-center gap-2">
                    <a href="#/dashboard" className="p-2 rounded-md hover:bg-gray-100"><HomeIcon/></a>
                    <span className="text-gray-300">/</span>
                    <a href="#/dashboard/agents" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 text-sm font-medium"><AgentIcon /> Agents</a>
                    <span className="text-gray-300">/</span>
                    <input value={name} onChange={e => setName(e.target.value)} className="text-sm font-semibold p-1 rounded-md hover:bg-gray-100 focus:bg-gray-100 focus:ring-1 focus:ring-gray-300" />
                </div>
                <div className="flex items-center gap-2">
                     <button
                        onClick={handleDownloadAgent}
                        disabled={!project}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-colors border border-gray-300 disabled:opacity-50"
                     >
                        <DownloadIcon />
                        Download
                    </button>
                     <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                    >
                        <SaveIcon /> Save
                    </button>
                </div>
            </header>
            <main className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-hidden">
                <div className="col-span-1 lg:col-span-1 p-4 border-r border-gray-200 overflow-y-auto">
                    <h2 className="text-lg font-bold mb-4">Agent Configuration</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium">System Instruction</label>
                            <textarea
                                value={config.systemInstruction}
                                onChange={e => handleConfigChange('systemInstruction', e.target.value)}
                                rows={8}
                                className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm"
                                placeholder="e.g., You are a helpful assistant..."
                            />
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label className="text-sm font-medium">Tools (Function Calling)</label>
                                <button onClick={() => setToolsJson(JSON.stringify(exampleTool, null, 2))} className="text-xs text-blue-600 hover:underline">Load Example</button>
                            </div>
                            <textarea
                                value={toolsJson}
                                onChange={e => handleToolsChange(e.target.value)}
                                rows={15}
                                className="w-full p-2 border border-gray-300 rounded-md text-sm font-mono"
                                placeholder='[ { "functionDeclarations": [ ... ] } ]'
                            />
                        </div>
                         <div>
                            <label className="text-sm font-medium">Agent-specific Gemini API Key (Optional)</label>
                            <input
                                type="password"
                                value={config.geminiApiKey || ''}
                                onChange={e => handleConfigChange('geminiApiKey', e.target.value)}
                                className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm"
                                placeholder="Overrides global settings key"
                            />
                        </div>
                    </div>
                </div>
                <div className="col-span-1 lg:col-span-2 h-full overflow-hidden">
                    <AgentChatView 
                        history={history}
                        isLoading={isLoading}
                        error={error}
                        onSendMessage={handleUserMessage}
                        onToolResponse={handleToolResponse}
                    />
                </div>
            </main>
        </div>
    );
};

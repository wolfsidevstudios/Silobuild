export interface ChatMessage {
    author: 'user' | 'ai';
    message?: string;
    plan?: {
        plan: string;
        todo: string[];
    };
    apiKeyRequest?: boolean;
    codeContext?: string;
}

export interface CodeFile {
    name: string;
    content: string;
}
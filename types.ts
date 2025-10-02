export interface ChatMessage {
    author: 'user' | 'ai';
    message?: string;
    plan?: {
        plan: string;
        todo: string[];
    };
}

export interface CodeFile {
    name: string;
    content: string;
}

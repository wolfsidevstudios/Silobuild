export interface ChatMessage {
    author: 'user' | 'ai';
    message: string;
}

export interface CodeFile {
    name: string;
    content: string;
}


export type AppMode = 'CHAT' | 'CODE' | 'PREVIEW';
export type ViewMode = 'CODE' | 'PREVIEW';

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface GeneratedFile {
  path: string;
  content: string;
}

export interface GeminiResponse {
  multiFileCode: GeneratedFile[];
  previewFile: GeneratedFile;
}

export interface Settings {
  vercelApiKey: string;
  supabaseUrl: string;
  supabaseAnonKey: string;
  stripePublicKey: string;
  stripeSecretKey: string;
}

export interface Project {
  id: string;
  name: string;
  createdAt: string;
  files: GeneratedFile[];
  previewFile: GeneratedFile | null;
}
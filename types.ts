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

export interface Project {
  id: string;
  name: string;
  createdAt: string;
  files: GeneratedFile[];
  previewFile: GeneratedFile | null;
}

export interface Settings {
  // Note: geminiApiKey is removed as per guidelines to use process.env.API_KEY
  vercelApiKey: string;
  supabaseUrl: string;
  supabaseAnonKey: string;
  stripePublicKey: string;
  stripeSecretKey: string;
}

export interface DecodedCredential {
  name: string;
  email: string;
  picture: string;
  sub: string;
}

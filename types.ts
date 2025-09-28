// FIX: Replaced incorrect component code with proper type definitions for the entire application.
// This file should only contain type exports, not React components.
// This resolves numerous compilation errors across the project caused by missing or incorrect types.

export type AppMode = 'CHAT' | 'CODE' | 'PREVIEW';

export type ViewMode = 'CODE' | 'PREVIEW';

export type TechStack = 'react' | 'html';

export interface GeneratedFile {
  path: string;
  content: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface Settings {
  geminiApiKey: string;
  vercelApiKey: string;
  supabaseUrl: string;
  supabaseAnonKey: string;
  stripePublicKey: string;
  stripeSecretKey: string;
}

export interface Deployment {
  url: string;
  timestamp: string;
}

export interface Project {
  id: string;
  name: string;
  createdAt: string;
  files: GeneratedFile[];
  previewFile: GeneratedFile | null;
  appIcon?: string | null;
  stack: TechStack;
  deployments: Deployment[];
}

export interface DecodedCredential {
    name: string;
    picture: string;
    email: string;
    email_verified: boolean;
    sub: string;
}

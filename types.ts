// FIX: Replaced incorrect component code with proper type definitions for the entire application.
// This file should only contain type exports, not React components.
// This resolves numerous compilation errors across the project caused by missing or incorrect types.

export type AppMode = 'CHAT' | 'CODE' | 'PREVIEW';

export type ViewMode = 'CODE' | 'PREVIEW';

export type TechStack = 'react' | 'html' | 'agent';

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
  githubPat: string;
}

export interface Deployment {
  url: string;
  timestamp: string;
}

// New types for Agent Builder
export interface AgentTool {
  functionDeclarations: any[]; // For user-provided JSON schema
}

export interface AgentConfig {
  systemInstruction: string;
  tools: AgentTool[];
  geminiApiKey?: string;
}


export interface Project {
  id: string;
  name:string;
  createdAt: string;
  updatedAt?: string;
  files: GeneratedFile[];
  previewFile: GeneratedFile | null;
  appIcon?: string | null;
  stack: TechStack;
  deployments: Deployment[];
  githubUrl?: string;
  teamId?: string;
  agentConfig?: AgentConfig;
}

export interface DecodedCredential {
    name: string;
    picture: string;
    email: string;
    email_verified: boolean;
    sub: string;
}

// Types for Schema Builder
export type DataType = 'uuid' | 'text' | 'varchar' | 'int4' | 'int8' | 'float8' | 'boolean' | 'timestamp' | 'timestamptz';

export interface Column {
  id: string;
  name: string;
  dataType: DataType;
  defaultValue?: string;
  isPrimaryKey: boolean;
  isUnique: boolean;
  isNullable: boolean;
}

export interface Table {
  id: string;
  name: string;
  columns: Column[];
}

export interface AiGeneratedTable {
  name: string;
  columns: Omit<Column, 'id'>[];
}

// Types for Collaboration
export interface TeamMember extends DecodedCredential {
  role: 'owner' | 'member';
}

export interface Team {
  id: string;
  name: string;
  members: TeamMember[];
  createdAt: string;
}
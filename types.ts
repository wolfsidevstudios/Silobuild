import React from 'react';

// FIX: Replaced incorrect component code with proper type definitions for the entire application.
// This file should only contain type exports, not React components.
// This resolves numerous compilation errors across the project caused by missing or incorrect types.

export type AppMode = 'CHAT' | 'CODE' | 'PREVIEW' | 'WORKFLOW' | 'PUBLISH';

export type ViewMode = 'CODE' | 'PREVIEW';

export type TechStack = 'react' | 'html' | 'agent' | 'vue' | 'svelte' | 'nodejs' | 'react-native' | 'infinity';

export type GeminiModel = 'gemini-2.5-flash' | 'gemini-2.5-pro';

export interface GeneratedFile {
  path: string;
  content: string;
}

export interface CredentialField {
  key: string; // e.g., 'apiKey', 'apiSecret'
  label: string; // e.g., 'OpenWeather API Key'
  description: string; // e.g., 'Your API key from OpenWeatherMap'
}

export interface CredentialRequest {
  toolName: string; // e.g., 'OpenWeatherMap'
  fields: CredentialField[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  schema?: AiGeneratedTable;
  credentialRequest?: CredentialRequest;
  thoughts?: string;
}

export interface Secret {
  id: string;
  name: string;
  value: string;
}

export interface Settings {
  geminiApiKey: string;
  supabaseUrl: string;
  supabaseAnonKey: string;
  stripePublicKey: string;
  stripeSecretKey: string;
  githubPat: string;
  netlifyPat: string;
  vercelPat?: string;
  googleClientId?: string;
  model?: GeminiModel;
  secrets?: Secret[];
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
  workflow?: WorkflowDefinition;
  thoughts?: string;
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

// Types for Workflow Builder
export interface WorkflowNode {
  id: string;
  type: string; // e.g., 'Webhook', 'HTTPRequest', 'SendEmail', 'Condition'
  position: { x: number; y: number };
  data: {
    label: string;
    [key: string]: any; // parameters for the node
  };
}

export interface WorkflowConnection {
  id: string;
  source: string; // source node id
  target: string; // target node id
}

export interface WorkflowDefinition {
  nodes: WorkflowNode[];
  connections: WorkflowConnection[];
}

// Types for Infinity App
export interface InfinityAction {
    id: string;
    label: string;
    prompt: string;
}

export interface InfinityUI {
    title: string;
    streamedText: string;
    actions: InfinityAction[];
}
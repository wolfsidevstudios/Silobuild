import React from 'react';

// FIX: Replaced incorrect component code with proper type definitions for the entire application.
// This file should only contain type exports, not React components.
// This resolves numerous compilation errors across the project caused by missing or incorrect types.

export type AppMode = 'CHAT' | 'CODE' | 'PREVIEW' | 'WORKFLOW' | 'PUBLISH';

export type ViewMode = 'CODE' | 'PREVIEW';

export type TechStack = 'react' | 'html' | 'agent' | 'vue' | 'svelte' | 'nodejs' | 'react-native' | 'infinity';

export type AiModel = 'gemini-2.5-flash' | 'gemini-2.5-pro' | 'gpt-4o' | 'claude-3-sonnet-20240229';

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
  openaiApiKey?: string;
  anthropicApiKey?: string;
  supabaseUrl: string;
  supabaseAnonKey: string;
  stripePublicKey: string;
  stripeSecretKey: string;
  githubPat: string;
  netlifyPat: string;
  vercelPat?: string;
  googleClientId?: string;
  model?: AiModel;
  secrets?: Secret[];
}

export interface Deployment {
  url: string;
  timestamp: string;
  siteId?: string;
  provider?: 'netlify' | 'vercel';
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

export interface Version {
  id: string;
  timestamp: string;
  message: string;
  files: GeneratedFile[];
  previewFile: GeneratedFile | null;
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
  versionHistory?: Version[];
  communityId?: string;
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

// Types for Authentication Page
export interface AuthProviderConfig {
  enabled: boolean;
  clientId: string;
  clientSecret?: string;
}

export interface AuthConfig {
  appName: string;
  appLogo: string | null;
  providers: {
    google: AuthProviderConfig;
    github: AuthProviderConfig;
    x: AuthProviderConfig;
  };
}

export interface CommunityProject {
  id: string;
  created_at: string;
  name: string;
  description: string;
  prompt: string;
  preview_image_url: string;
  author_name: string;
  author_image_url?: string;
  project_id: string;
  preview_content?: string;
  is_paid?: boolean;
  contact_info?: string;
}

// New types for Profile Page
export interface UserProfileData {
  userId: string;
  username?: string;
  displayName: string;
  profilePictureUrl?: string;
  bannerImageUrl?: string;
}

export interface UserPost {
  id: string;
  authorId: string;
  authorName: string;
  authorImageUrl?: string;
  content: string;
  projectId?: string;
  projectName?: string;
  projectIcon?: string | null;
  createdAt: string;
}
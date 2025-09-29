import React from 'react';
import { IntegrationsIcon, GeminiLogo, VercelIcon, SupabaseLogo, StripeLogo, GithubIcon, LaunchpadIcon, KeyIcon } from '../components/icons';

const IntegrationCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    description: string;
}> = ({ icon, title, description }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col items-start hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center gap-4 mb-3">
            {icon}
            <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className="text-gray-600 text-sm flex-grow mb-4">{description}</p>
        <a href="#/dashboard/settings" className="mt-auto flex items-center gap-2 px-4 py-2 text-sm font-medium bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-800 rounded-lg transition-colors">
            <KeyIcon className="w-4 h-4" />
            Configure
        </a>
    </div>
);


export const IntegrationsPage: React.FC = () => {
  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-6">
        <IntegrationsIcon className="w-8 h-8 text-blue-500" />
        <h1 className="text-3xl font-bold">Integrations</h1>
      </div>
      <p className="text-gray-600 mb-8 max-w-3xl">
        Connect your favorite tools and services. Provide API keys in the <a href="#/dashboard/settings" className="text-blue-600 hover:underline">Settings</a> page to enable the AI to build full-stack applications.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <IntegrationCard 
            icon={<GeminiLogo className="h-8"/>}
            title="Google Gemini"
            description="The core AI model that powers code generation, chat, and other intelligent features in Silo Build."
        />
        <IntegrationCard 
            icon={<VercelIcon className="h-7 text-black"/>}
            title="Vercel"
            description="Deploy your generated web applications to Vercel's global edge network with a single click."
        />
        <IntegrationCard 
            icon={<GithubIcon className="w-7 h-7 text-black"/>}
            title="GitHub"
            description="Enable the AI to create new repositories and push your generated code directly to GitHub."
        />
        <IntegrationCard 
            icon={<SupabaseLogo className="h-8"/>}
            title="Supabase"
            description="The AI can automatically scaffold projects with Supabase for database, authentication, and storage."
        />
        <IntegrationCard 
            icon={<StripeLogo className="h-8"/>}
            title="Stripe"
            description="Generate applications with payment processing capabilities, including checkout flows and subscriptions."
        />
         <IntegrationCard 
            icon={<LaunchpadIcon className="w-7 h-7 text-cyan-500"/>}
            title="Netlify"
            description="Connect your Netlify account to enable one-click deployments for your static sites and frontend apps."
        />
      </div>
    </div>
  );
};
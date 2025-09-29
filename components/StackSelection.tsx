import React from 'react';
import { TechStack } from '../types';
import { ReactIcon, HtmlIcon, VueIcon, SvelteIcon, NodejsIcon } from './icons';

interface StackSelectionProps {
  onSelect: (stack: TechStack) => void;
}

const StackCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    description: string;
    onClick: () => void;
}> = ({ icon, title, description, onClick }) => (
    <button
        onClick={onClick}
        className="bg-white p-6 rounded-lg border border-gray-200 text-left w-full transition-all duration-300 hover:border-blue-500 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
    >
        <div className="flex items-center gap-4">
            {icon}
            <div>
                <h4 className="text-lg font-bold text-gray-900">{title}</h4>
                <p className="text-gray-600 text-sm">{description}</p>
            </div>
        </div>
    </button>
);

export const StackSelection: React.FC<StackSelectionProps> = ({ onSelect }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold">Choose your stack</h3>
        <p className="text-gray-600">Select the technology for your new application.</p>
      </div>
      <div className="w-full max-w-md space-y-4">
        <StackCard
          icon={<ReactIcon />}
          title="React + TypeScript"
          description="A modern, multi-file PWA with a robust structure."
          onClick={() => onSelect('react')}
        />
        <StackCard
          icon={<VueIcon />}
          title="Vue + TypeScript"
          description="Generate a complete Vue 3 application using the Composition API."
          onClick={() => onSelect('vue')}
        />
         <StackCard
          icon={<SvelteIcon />}
          title="Svelte + TypeScript"
          description="Create a Svelte 5 project with a focus on performance."
          onClick={() => onSelect('svelte')}
        />
        <StackCard
          icon={<NodejsIcon />}
          title="Node.js + Express"
          description="A simple REST API backend with a basic server setup."
          onClick={() => onSelect('nodejs')}
        />
        <StackCard
          icon={<HtmlIcon />}
          title="HTML + Tailwind + JS"
          description="A simple, single-file application for quick prototypes."
          onClick={() => onSelect('html')}
        />
      </div>
    </div>
  );
};
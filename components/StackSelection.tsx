import React from 'react';
import { TechStack } from '../types';
import { ReactIcon, HtmlIcon, SvelteIcon, MobileIcon } from './icons';

interface StackSelectionProps {
  onSelect: (stack: TechStack) => void;
}

const StackCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    onClick: () => void;
}> = ({ icon, title, onClick }) => (
    <button
        onClick={onClick}
        className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:border-gray-400 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
        <div className="w-5 h-5 flex items-center justify-center [&_svg]:w-full [&_svg]:h-full">
            {icon}
        </div>
        <span>{title}</span>
    </button>
);

export const StackSelection: React.FC<StackSelectionProps> = ({ onSelect }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold">Choose your stack</h3>
        <p className="text-gray-600">Select the technology for your new application.</p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <StackCard
          icon={<ReactIcon />}
          title="React + TS"
          onClick={() => onSelect('react')}
        />
        <StackCard
          icon={<MobileIcon />}
          title="Mobile (React)"
          onClick={() => onSelect('mobile')}
        />
         <StackCard
          icon={<SvelteIcon />}
          title="Svelte + TS"
          onClick={() => onSelect('svelte')}
        />
        <StackCard
          icon={<HtmlIcon />}
          title="HTML + JS"
          onClick={() => onSelect('html')}
        />
      </div>
    </div>
  );
};
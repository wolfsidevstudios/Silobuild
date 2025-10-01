import React from 'react';
import { TechStack } from '../types';
import { ReactIcon, HtmlIcon, SvelteIcon, MobileIcon } from './icons';

interface StackSelectionProps {
  onSelect: (stack: TechStack) => void;
}

const InfinityIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-purple-600">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.172 16.172a4 4 0 01-5.656 0l-3.364-3.364a4 4 0 115.656-5.656l.354.354a4 4 0 005.656 5.656l3.364 3.364a4 4 0 01-5.656 0l-.354-.354z" />
    </svg>
);


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
        <h3 className="text-2xl font-bold">Choose your experience</h3>
        <p className="text-gray-600">Select a technology to generate code, or try the Infinity App.</p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <StackCard
          icon={<ReactIcon />}
          title="React + TS"
          onClick={() => onSelect('react')}
        />
        <StackCard
          icon={<MobileIcon />}
          title="React Native"
          onClick={() => onSelect('react-native')}
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
        <StackCard
          icon={<InfinityIcon />}
          title="Infinity App"
          onClick={() => onSelect('infinity')}
        />
      </div>
    </div>
  );
};

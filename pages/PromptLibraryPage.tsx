import React, { useMemo } from 'react';
import { prompts, Prompt } from '../data/prompts';
import { SparklesIcon } from '../components/icons';

interface PromptCardProps {
  prompt: Prompt;
  onUse: (promptText: string) => void;
}

const PromptCard: React.FC<PromptCardProps> = ({ prompt, onUse }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col justify-between hover:border-blue-400 hover:shadow-md transition-all duration-300">
      <div>
        <h3 className="font-bold text-gray-900 truncate">{prompt.title}</h3>
        <p className="text-sm text-gray-600 mt-1 h-10 line-clamp-2">{prompt.description}</p>
      </div>
      <button
        onClick={() => onUse(prompt.prompt)}
        className="mt-4 w-full bg-gray-100 text-gray-800 px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-blue-600 hover:text-white transition-colors"
      >
        Use this prompt
      </button>
    </div>
  );
};

export const PromptLibraryPage: React.FC = () => {
  const groupedPrompts = useMemo(() => {
    return prompts.reduce((acc, prompt) => {
      (acc[prompt.category] = acc[prompt.category] || []).push(prompt);
      return acc;
    }, {} as Record<string, Prompt[]>);
  }, []);

  const handleUsePrompt = (promptText: string) => {
    sessionStorage.setItem('initialPrompt', promptText);
    window.location.hash = '#/builder';
  };

  const categoryOrder = [
    "Productivity & Business",
    "Utilities & Tools",
    "Games & Entertainment",
    "UI Components & Landing Pages",
    "Data & APIs",
  ];

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-6">
        <SparklesIcon className="w-8 h-8 text-blue-500" />
        <h1 className="text-3xl font-bold">Prompt Library</h1>
      </div>
      <p className="text-gray-600 mb-8 max-w-3xl">
        Kickstart your next project with one of our curated prompts. Just choose an idea, select your tech stack, and watch the AI build it for you.
      </p>

      <div className="space-y-10">
        {categoryOrder.map(category => (
          <div key={category}>
            <h2 className="text-xl font-semibold mb-4 border-b border-gray-200 pb-2">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {groupedPrompts[category].map(prompt => (
                <PromptCard key={prompt.title} prompt={prompt} onUse={handleUsePrompt} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
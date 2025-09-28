

import React, { useState } from 'react';
import { SendIcon } from './icons';

interface PromptInputProps {
  onSend: (prompt: string) => void;
  isLoading: boolean;
  isAppGenerated: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ onSend, isLoading, isAppGenerated }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onSend(prompt);
      setPrompt('');
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 flex justify-center z-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl flex items-center pr-2 transition-all duration-300 focus-within:border-white/30"
      >
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={isAppGenerated ? "Describe a change to your app..." : "Describe the app you want to build..."}
          disabled={isLoading}
          className="w-full bg-transparent p-4 pl-6 text-white placeholder-gray-400 focus:outline-none disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="bg-blue-500 text-white rounded-full p-2.5 flex items-center justify-center transition-all duration-300 hover:bg-blue-600 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          <SendIcon />
        </button>
      </form>
    </div>
  );
};
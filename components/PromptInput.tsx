import React, { useState, useRef, useEffect } from 'react';
import { PlusIcon, LightbulbIcon, UpArrowIcon } from './icons';

interface PromptInputProps {
  onSend: (prompt: string) => void;
  isLoading: boolean;
  isAppGenerated: boolean;
  isIdeaMode: boolean;
  onToggleIdeaMode: () => void;
  isReadyToPrompt: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ onSend, isLoading, isAppGenerated, isIdeaMode, onToggleIdeaMode, isReadyToPrompt }) => {
  const [prompt, setPrompt] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      // Only increase height, don't shrink on delete for better UX
      if (scrollHeight > textarea.clientHeight) {
          textarea.style.height = `${scrollHeight}px`;
      }
    }
  }, [prompt]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading && isReadyToPrompt) {
      onSend(prompt);
      setPrompt('');
    }
  };

  const placeholderText = () => {
    if (!isReadyToPrompt && !isAppGenerated) {
      return "Select a technology stack to begin...";
    }
    if (isIdeaMode) {
      return "Brainstorm app ideas with the AI...";
    }
    if (isAppGenerated) {
      return "Describe a change to your app...";
    }
    return "Ask Silo...";
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 flex justify-center z-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-stone-100/80 backdrop-blur-xl border border-stone-200 rounded-3xl shadow-2xl flex flex-col p-3 gap-2 transition-all duration-300 focus-within:border-stone-400"
      >
        <textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    handleSubmit(e as any);
                }
            }}
            placeholder={placeholderText()}
            disabled={isLoading || (!isReadyToPrompt && !isAppGenerated)}
            className="w-full bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none disabled:opacity-50 resize-none overflow-y-auto text-base p-2 max-h-48"
            rows={1}
        />
        <div className="flex justify-between items-center mt-1">
          <div className="flex items-center gap-1">
            <button type="button" className="p-2 rounded-full hover:bg-stone-200 transition-colors text-gray-600">
                <PlusIcon />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleIdeaMode}
              className={`rounded-full px-3 py-1.5 flex items-center gap-2 text-sm font-semibold transition-colors ${
                isIdeaMode
                  ? 'bg-stone-800 text-white'
                  : 'bg-stone-200 text-gray-900 hover:bg-stone-300'
              }`}
            >
              <LightbulbIcon className="w-4 h-4" />
              <span>Chat</span>
            </button>
            <button
              type="submit"
              disabled={isLoading || !prompt.trim() || (!isReadyToPrompt && !isAppGenerated)}
              className="bg-gray-800 text-white rounded-full p-2.5 flex items-center justify-center transition-all duration-300 hover:bg-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed flex-shrink-0"
            >
              <UpArrowIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
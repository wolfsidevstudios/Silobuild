import React, { useState, useRef, useEffect } from 'react';
import { PlusIcon, LightbulbIcon, UpArrowIcon, DotsHorizontalIcon, BugIcon, UploadIcon, CloseIcon } from './icons';

interface PromptInputProps {
  onSend: (prompt: string, imageData?: string | null) => void;
  isLoading: boolean;
  isAppGenerated: boolean;
  isIdeaMode: boolean;
  onToggleIdeaMode: () => void;
  isReadyToPrompt: boolean;
  layoutStyle?: 'floating' | 'inline';
}

const PowerToolButton: React.FC<{ icon: React.ReactNode; label: string; onClick: () => void }> = ({ icon, label, onClick }) => (
    <button onClick={onClick} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-left text-gray-800 hover:bg-gray-200 rounded-md transition-colors">
        {icon}
        <span>{label}</span>
    </button>
);

export const PromptInput: React.FC<PromptInputProps> = ({ onSend, isLoading, isAppGenerated, isIdeaMode, onToggleIdeaMode, isReadyToPrompt, layoutStyle = 'floating' }) => {
  const [prompt, setPrompt] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isToolsMenuOpen, setIsToolsMenuOpen] = useState(false);
  const [isCloneModalOpen, setIsCloneModalOpen] = useState(false);
  const [cloneUrl, setCloneUrl] = useState('');
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toolsMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      if (scrollHeight > textarea.clientHeight) {
          textarea.style.height = `${scrollHeight}px`;
      }
    }
  }, [prompt]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (toolsMenuRef.current && !toolsMenuRef.current.contains(event.target as Node)) {
            setIsToolsMenuOpen(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((prompt.trim() || imagePreview) && !isLoading && isReadyToPrompt) {
      onSend(prompt, imagePreview);
      setPrompt('');
      clearImage();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  const handleCloneSubmit = () => {
    if (cloneUrl.trim()) {
      onSend(`Please clone the design and functionality of the website at this URL: ${cloneUrl}`);
      setCloneUrl('');
      setIsCloneModalOpen(false);
    }
  };

  const handleFixerSubmit = () => {
    onSend('Find and fix any bugs in the current application code. Refactor and improve the code quality and performance where possible.');
    setIsToolsMenuOpen(false);
  };

  const placeholderText = () => {
    if (!isReadyToPrompt && !isAppGenerated) {
      return "Select a technology stack to begin...";
    }
    if (isIdeaMode) {
      return "Brainstorm app ideas with the AI...";
    }
    if (isAppGenerated) {
      return "Describe a change or upload a new mockup...";
    }
    return "Ask Codepilot, or upload an image...";
  };
  
  const containerClass = layoutStyle === 'floating'
    ? "fixed bottom-0 left-0 right-0 p-4 flex justify-center z-10"
    : "flex-shrink-0 p-2 w-full flex justify-center";

  return (
    <>
    <div className={containerClass}>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-stone-100/80 backdrop-blur-xl border border-stone-200 rounded-3xl shadow-2xl flex flex-col p-3 gap-2 transition-all duration-300 focus-within:border-stone-400"
      >
        {imagePreview && (
            <div className="relative w-20 h-20 ml-2 rounded-lg overflow-hidden">
                <img src={imagePreview} alt="Image preview" className="w-full h-full object-cover" />
                <button type="button" onClick={clearImage} className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5">
                    <CloseIcon className="w-3 h-3" />
                </button>
            </div>
        )}
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
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
            <button type="button" onClick={() => fileInputRef.current?.click()} className="p-2 rounded-full hover:bg-stone-200 transition-colors text-gray-600" aria-label="Upload image">
                <PlusIcon />
            </button>
            <div className="relative" ref={toolsMenuRef}>
                 <button type="button" onClick={() => setIsToolsMenuOpen(p => !p)} className="p-2 rounded-full hover:bg-stone-200 transition-colors text-gray-600" aria-label="Open tools menu">
                    <DotsHorizontalIcon />
                </button>
                {isToolsMenuOpen && (
                    <div className="absolute bottom-full left-0 mb-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-20">
                        <p className="text-xs font-semibold text-gray-500 px-3 py-1">Power Tools</p>
                        <PowerToolButton icon={<UploadIcon />} label="Clone App" onClick={() => { setIsCloneModalOpen(true); setIsToolsMenuOpen(false); }}/>
                        <PowerToolButton icon={<BugIcon />} label="AI Code Fixer" onClick={handleFixerSubmit}/>
                    </div>
                )}
            </div>
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
              disabled={isLoading || (!prompt.trim() && !imagePreview) || (!isReadyToPrompt && !isAppGenerated)}
              className="bg-gray-800 text-white rounded-full p-2.5 flex items-center justify-center transition-all duration-300 hover:bg-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed flex-shrink-0"
              aria-label="Send prompt"
            >
              <UpArrowIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </form>
    </div>
    {isCloneModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setIsCloneModalOpen(false)}>
            <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-200 w-full max-w-md" onClick={e => e.stopPropagation()}>
                <h3 className="text-lg font-bold flex items-center gap-2"><UploadIcon /> Clone App</h3>
                <p className="text-sm text-gray-600 mt-2 mb-4">Enter the URL of a website you want to clone. The AI will try to replicate its design and functionality.</p>
                <div className="flex gap-2">
                    <input
                        type="url"
                        value={cloneUrl}
                        onChange={e => setCloneUrl(e.target.value)}
                        placeholder="https://example.com"
                        className="w-full bg-gray-50 border border-gray-300 rounded-md p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button onClick={handleCloneSubmit} disabled={!cloneUrl.trim()} className="px-4 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400">
                        Clone
                    </button>
                </div>
            </div>
        </div>
    )}
    </>
  );
};
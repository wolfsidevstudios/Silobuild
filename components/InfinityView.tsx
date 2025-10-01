import React, { useState, useEffect, useRef } from 'react';
import { generateAppStream } from '../services/geminiService';
import { InfinityUI, Settings, TechStack, InfinityAction } from '../types';
import { Spinner } from './Spinner';

interface InfinityViewProps {
  settings: Settings;
}

const emptyUi: InfinityUI = {
  title: 'Infinity App',
  streamedText: '',
  actions: [],
};

export const InfinityView: React.FC<InfinityViewProps> = ({ settings }) => {
  const [currentUi, setCurrentUi] = useState<InfinityUI>(emptyUi);
  const [streamedText, setStreamedText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const executeInfinityAction = async (prompt: string) => {
    setIsLoading(true);
    setError(null);
    setStreamedText('');
    setCurrentUi(prev => ({ ...prev, actions: [] })); // Clear old actions immediately

    try {
        await generateAppStream(prompt, settings, (update) => {
            if (update.type === 'infinity_text_chunk' && update.chunk) {
                setStreamedText(prev => prev + update.chunk);
            } else if (update.type === 'infinity_ui_update' && update.ui) {
                setCurrentUi(update.ui);
            }
        }, 'infinity');
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
        setError(`Failed to generate UI: ${errorMessage}`);
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial load
    executeInfinityAction(JSON.stringify({ action: "app_start" }));
  }, []);
  
  useEffect(() => {
      // Scroll to bottom as content streams
      if (contentRef.current) {
          contentRef.current.scrollTop = contentRef.current.scrollHeight;
      }
  }, [streamedText]);


  const handleActionClick = (action: InfinityAction) => {
      const prompt = JSON.stringify({ action: "button_click", buttonId: action.id, buttonPrompt: action.prompt });
      executeInfinityAction(prompt);
  };
  
  return (
    <div className="h-full w-full flex items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-sm h-[80vh] max-h-[700px] bg-white rounded-3xl shadow-2xl border-4 border-black flex flex-col overflow-hidden">
            {/* Header */}
            <header className="flex-shrink-0 bg-gray-50 border-b border-gray-200 p-3">
                <h1 className="text-center font-bold text-lg">{currentUi.title}</h1>
            </header>

            {/* Content */}
            <main ref={contentRef} className="flex-1 p-4 overflow-y-auto">
                 {isLoading && streamedText === '' ? (
                    <div className="flex items-center justify-center h-full">
                        <Spinner />
                    </div>
                ) : (
                    <p className="text-gray-800 whitespace-pre-wrap">{streamedText}</p>
                )}
            </main>

            {/* Actions */}
            {!isLoading && currentUi.actions.length > 0 && (
                 <footer className="flex-shrink-0 p-4 border-t border-gray-200 bg-gray-50">
                    <div className="grid grid-cols-2 gap-3">
                        {currentUi.actions.map(action => (
                            <button
                                key={action.id}
                                onClick={() => handleActionClick(action)}
                                className="bg-blue-600 text-white px-4 py-3 text-sm rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {action.label}
                            </button>
                        ))}
                    </div>
                </footer>
            )}

            {error && (
                <div className="flex-shrink-0 p-2 bg-red-100 text-red-700 text-xs text-center">
                    {error}
                </div>
            )}
        </div>
    </div>
  );
};

import React from 'react';
import { CloseIcon, SparklesIcon } from './icons';

interface ThoughtsModalProps {
  thoughts: string;
  onClose: () => void;
}

export const ThoughtsModal: React.FC<ThoughtsModalProps> = ({ thoughts, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white border border-gray-200 rounded-xl p-6 w-full max-w-2xl max-h-[80vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <div className="flex items-center gap-3">
              <SparklesIcon className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-bold">AI's Implementation Plan</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100"><CloseIcon /></button>
        </div>
        <div className="overflow-y-auto pr-2 bg-gray-50 p-4 rounded-md">
           <pre className="text-sm text-gray-800 whitespace-pre-wrap font-sans">{thoughts}</pre>
        </div>
      </div>
    </div>
  );
};
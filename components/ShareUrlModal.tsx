import React, { useState } from 'react';
import { CloseIcon } from './icons';

interface ShareUrlModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

export const ShareUrlModal: React.FC<ShareUrlModalProps> = ({ isOpen, onClose, url }) => {
  const [copied, setCopied] = useState(false);
  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Published Successfully!</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100"><CloseIcon /></button>
        </div>
        <p className="text-sm text-gray-600 mb-4">Your project is now live on the community showcase. Share it with this link:</p>
        <div className="flex items-center gap-2">
          <input type="text" readOnly value={url} className="w-full bg-gray-100 border border-gray-300 rounded-full px-3 py-2 text-sm" />
          <button onClick={handleCopy} className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-full hover:bg-blue-700">{copied ? 'Copied!' : 'Copy'}</button>
        </div>
      </div>
    </div>
  );
};
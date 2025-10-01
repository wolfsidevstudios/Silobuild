import React from 'react';
import { KeyIcon } from './icons';

interface AddAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const AddAuthModal: React.FC<AddAuthModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white border border-gray-200 rounded-xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 mb-4">
            <KeyIcon className="w-6 h-6 text-yellow-600" />
            <h2 className="text-xl font-bold">Add Authentication</h2>
        </div>
        <p className="text-sm text-gray-600 mb-6">
            The AI will generate a complete authentication flow based on your configuration in the "Auth" dashboard page. This will include login/signup pages, social provider logic, and user state management.
        </p>
        <p className="text-sm text-gray-600 mb-6">
            This will replace any existing authentication code in your project.
        </p>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm rounded-md font-semibold hover:bg-gray-100 border border-gray-300 transition-colors">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-blue-600 text-white px-4 py-2 text-sm rounded-md font-semibold hover:bg-blue-700 transition-colors"
          >
            Generate Auth Code
          </button>
        </div>
      </div>
    </div>
  );
};
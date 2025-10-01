import React from 'react';
import { Version } from '../types';
import { TemplateIcon, CloseIcon } from './icons';
import { timeAgo } from '../utils/projectUtils';

interface VersionHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: Version[];
  onRestore: (version: Version) => void;
}

export const VersionHistoryModal: React.FC<VersionHistoryModalProps> = ({ isOpen, onClose, history, onRestore }) => {
  if (!isOpen) return null;

  const sortedHistory = [...history].reverse();

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white border border-gray-200 rounded-xl p-6 w-full max-w-2xl max-h-[80vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <TemplateIcon className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-bold">Version History</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100"><CloseIcon /></button>
        </div>
        
        <div className="overflow-y-auto flex-1">
          {sortedHistory.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <p>No versions saved yet.</p>
              <p className="text-sm">A version is saved automatically before you make a change.</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {sortedHistory.map((version) => (
                <li key={version.id} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800 truncate" title={version.message}>
                      Change initiated by: "{version.message}"
                    </p>
                    <p className="text-xs text-gray-500">
                      Saved {timeAgo(version.timestamp)}
                    </p>
                  </div>
                  <button
                    onClick={() => onRestore(version)}
                    className="px-3 py-1.5 text-xs font-semibold bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-800 rounded-full transition-colors"
                  >
                    Restore
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
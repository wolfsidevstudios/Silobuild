import React, { useState, useEffect, useRef } from 'react';
import { GithubIcon } from './icons';

interface ProjectMetadataModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, icon: string | null, createRepo: boolean) => void;
  initialName?: string;
  initialIcon?: string | null;
  title: string;
  isGithubLinked?: boolean;
}

export const ProjectMetadataModal: React.FC<ProjectMetadataModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialName = '',
  initialIcon = null,
  title,
  isGithubLinked = false,
}) => {
  const [name, setName] = useState(initialName);
  const [icon, setIcon] = useState<string | null>(initialIcon);
  const [preview, setPreview] = useState<string | null>(initialIcon);
  const [createRepo, setCreateRepo] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
        setName(initialName || '');
        setIcon(initialIcon || null);
        setPreview(initialIcon || null);
        setCreateRepo(false);
    }
  }, [initialName, initialIcon, isOpen]);

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setIcon(result);
        setPreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (name.trim()) {
      onSave(name.trim(), icon, createRepo);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-gray-800 border border-white/10 rounded-xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="projectName" className="block text-sm font-medium text-gray-300 mb-1">
              Project Name
            </label>
            <input
              type="text"
              id="projectName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-md p-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              App Icon (Optional)
            </label>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-black/20 rounded-lg flex items-center justify-center border border-white/10">
                {preview ? (
                  <img src={preview} alt="App icon preview" className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <span className="text-gray-400 text-xs text-center">No Icon</span>
                )}
              </div>
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleIconChange}
                ref={fileInputRef}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                type="button"
                className="bg-white/10 px-4 py-2 text-sm rounded-md font-semibold hover:bg-white/20 transition-colors"
              >
                Upload Icon
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">Recommended: 192x192 or 512x512 PNG file.</p>
          </div>
          {!isGithubLinked && (
            <div className="border-t border-white/10 pt-4">
               <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={createRepo}
                    onChange={(e) => setCreateRepo(e.target.checked)}
                    className="h-4 w-4 rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <GithubIcon className="w-4 h-4" />
                    <span>Create GitHub Repository</span>
                  </div>
                </label>
                 <p className="text-xs text-gray-500 mt-2 pl-7">A new public repository will be created and your project files will be pushed.</p>
            </div>
          )}
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 text-sm rounded-md font-semibold hover:bg-white/10 transition-colors">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!name.trim()}
            className="bg-blue-600 text-white px-4 py-2 text-sm rounded-md font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
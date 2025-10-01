import React, { useState, useEffect } from 'react';
import { Spinner } from './Spinner';
import { NetlifyIcon } from './icons';

interface DeployModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeploy: (token: string, projectName: string) => void;
  isDeploying: boolean;
  deploymentError: string | null;
  initialProjectName?: string;
  initialToken?: string;
}

export const DeployModal: React.FC<DeployModalProps> = ({
  isOpen,
  onClose,
  onDeploy,
  isDeploying,
  deploymentError,
  initialProjectName = '',
  initialToken = '',
}) => {
  const [projectName, setProjectName] = useState(initialProjectName);
  const [token, setToken] = useState(initialToken);

  useEffect(() => {
    if (isOpen) {
      setProjectName(initialProjectName);
      setToken(initialToken);
    }
  }, [isOpen, initialProjectName, initialToken]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onDeploy(token, projectName);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 mb-4">
            <NetlifyIcon className="h-6" />
            <h2 className="text-xl font-bold">Deploy to Netlify</h2>
        </div>
        <p className="text-sm text-gray-600 mb-6">
            Enter your Netlify Access Token to create a new deployment. This will create a new site and deploy it.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-1">
              Site Name
            </label>
            <input
              type="text"
              id="projectName"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-full px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
           <div>
            <label htmlFor="netlifyToken" className="block text-sm font-medium text-gray-700 mb-1">
              Netlify Personal Access Token
            </label>
            <input
              type="password"
              id="netlifyToken"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Netlify Access Token"
              className="w-full bg-gray-50 border border-gray-300 rounded-full px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {deploymentError && (
            <p className="text-red-500 text-sm">{deploymentError}</p>
          )}
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm rounded-full font-semibold hover:bg-gray-100 border border-gray-300 transition-colors" disabled={isDeploying}>
              Cancel
            </button>
            <button
              type="submit"
              disabled={!token.trim() || !projectName.trim() || isDeploying}
              className="bg-teal-500 text-white px-4 py-2 text-sm rounded-full font-semibold hover:bg-teal-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px]"
            >
              {isDeploying ? <Spinner className="w-5 h-5 text-white" /> : 'Deploy'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
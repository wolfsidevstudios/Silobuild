import React, { useState, useEffect } from 'react';
import { Spinner } from './Spinner';
import { VercelIcon, NetlifyIcon } from './icons';

interface DeployModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeploy: (provider: 'vercel' | 'netlify', token: string, projectName: string) => void;
  isDeploying: boolean;
  deploymentError: string | null;
  initialProjectName?: string;
  initialToken?: string;
  initialNetlifyToken?: string;
}

export const DeployModal: React.FC<DeployModalProps> = ({
  isOpen,
  onClose,
  onDeploy,
  isDeploying,
  deploymentError,
  initialProjectName = '',
  initialToken = '',
  initialNetlifyToken = '',
}) => {
  const [projectName, setProjectName] = useState(initialProjectName);
  const [token, setToken] = useState(initialToken);
  const [provider, setProvider] = useState<'vercel' | 'netlify'>('vercel');

  useEffect(() => {
    if (isOpen) {
      setProjectName(initialProjectName);
      setProvider('vercel');
    }
  }, [isOpen, initialProjectName]);

  useEffect(() => {
    if (provider === 'vercel') {
      setToken(initialToken);
    } else {
      setToken(initialNetlifyToken);
    }
  }, [provider, initialToken, initialNetlifyToken, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onDeploy(provider, token, projectName);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 mb-2">
            {provider === 'vercel' ? <VercelIcon className="h-6" /> : <NetlifyIcon className="h-6" />}
            <h2 className="text-xl font-bold">Deploy to {provider === 'vercel' ? 'Vercel' : 'Netlify'}</h2>
        </div>
        <div className="mb-4 border-b border-gray-200">
            <nav className="-mb-px flex space-x-4" aria-label="Tabs">
                <button
                    onClick={() => setProvider('vercel')}
                    className={`whitespace-nowrap border-b-2 py-2 px-1 text-sm font-medium ${provider === 'vercel' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
                >
                    Vercel
                </button>
                <button
                    onClick={() => setProvider('netlify')}
                    className={`whitespace-nowrap border-b-2 py-2 px-1 text-sm font-medium ${provider === 'netlify' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
                >
                    Netlify
                </button>
            </nav>
        </div>
        <p className="text-sm text-gray-600 mb-6">
            Enter your {provider === 'vercel' ? 'Vercel' : 'Netlify'} Access Token to create a new deployment. This will be a production deployment.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-1">
              Project Name
            </label>
            <input
              type="text"
              id="projectName"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-md p-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
           <div>
            <label htmlFor="token" className="block text-sm font-medium text-gray-700 mb-1">
              {provider === 'vercel' ? 'Vercel' : 'Netlify'} Access Token
            </label>
            <input
              type="password"
              id="token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder={provider === 'vercel' ? 'Vercel Access Token' : 'Netlify Personal Access Token'}
              className="w-full bg-gray-50 border border-gray-300 rounded-md p-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {deploymentError && (
            <p className="text-red-500 text-sm">{deploymentError}</p>
          )}
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm rounded-md font-semibold hover:bg-gray-100 border border-gray-300 transition-colors" disabled={isDeploying}>
              Cancel
            </button>
            <button
              type="submit"
              disabled={!token.trim() || !projectName.trim() || isDeploying}
              className={`px-4 py-2 text-sm rounded-md font-semibold transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px] ${provider === 'vercel' ? 'bg-black text-white hover:bg-gray-800' : 'bg-[#00C7B7] text-white hover:bg-[#00A395]'}`}
            >
              {isDeploying ? <Spinner className="w-5 h-5 text-white" /> : 'Deploy'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
import React, { useState, useEffect } from 'react';
import { GeneratedFile } from '../types';
import { PublishForm } from './PublishForm';
import { Spinner } from './Spinner';
import { DesktopIcon } from './icons';

interface Deployment {
  url: string;
  timestamp: Date;
}

interface PreviewViewProps {
  file: GeneratedFile | null;
  vercelToken: string;
  multiFileCode: GeneratedFile[];
  projectName?: string;
  onToggleMacPreview: () => void;
}

const timeAgo = (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  if (seconds < 10) return "just now";
  return Math.floor(seconds) + " seconds ago";
};

export const PreviewView: React.FC<PreviewViewProps> = ({ file, vercelToken, multiFileCode, projectName, onToggleMacPreview }) => {
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentError, setDeploymentError] = useState<string | null>(null);

  useEffect(() => {
    // When the underlying code changes, it's a new "version", so clear old deployments.
    setDeployments([]);
  }, [multiFileCode]);

  const handleDeploy = async (token: string) => {
    if (!token || multiFileCode.length === 0) {
      setDeploymentError("Vercel token is missing or there are no files to deploy.");
      return;
    }

    setIsDeploying(true);
    setDeploymentError(null);

    try {
      const filesForApi = multiFileCode.map(({ path, content }) => ({
        file: path,
        data: content,
      }));

      const sanitizedProjectName = (projectName || 'ai-builder-app').toLowerCase().replace(/[^a-z0-9-]/g, '-').substring(0, 50);

      filesForApi.push({
        file: 'package.json',
        data: JSON.stringify({
          name: sanitizedProjectName,
          version: '0.1.0',
          private: true,
        }),
      });

      const response = await fetch('https://api.vercel.com/v13/deployments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: sanitizedProjectName,
          files: filesForApi,
          projectSettings: {
            framework: null, // Let Vercel auto-detect
          },
          target: 'production',
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error?.message || 'Failed to deploy to Vercel.');
      }

      const newDeployment: Deployment = {
        url: `https://${result.url}`,
        timestamp: new Date(),
      };
      setDeployments(prev => [newDeployment, ...prev]);

    } catch (error) {
      console.error("Vercel deployment failed:", error);
      const message = error instanceof Error ? error.message : "An unknown error occurred during deployment.";
      setDeploymentError(`Deployment failed: ${message}`);
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="w-full h-full bg-gray-900 flex flex-col p-4 gap-4">
      <div className="flex-1 flex flex-col min-h-0 border border-white/10 rounded-lg overflow-hidden">
        <div className="p-2 bg-gray-950/50 border-b border-white/10 flex items-center justify-between flex-shrink-0">
          <h3 className="text-sm font-semibold text-gray-200">Live Preview</h3>
          <button 
            onClick={onToggleMacPreview} 
            disabled={!file}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full transition-all duration-300 bg-white/10 text-gray-300 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed">
            <DesktopIcon className="w-4 h-4" />
            Mac OS Preview
          </button>
        </div>
        {file ? (
          <iframe
            key={file.content} // Re-mount iframe on content change
            srcDoc={file.content}
            title="Live App Preview"
            className="w-full h-full border-0 bg-white"
            sandbox="allow-scripts allow-same-origin"
          />
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 bg-gray-900 p-4 text-center">
            <p>No preview available yet. Generate an app first.</p>
          </div>
        )}
      </div>

      <div className="h-1/2 flex flex-col min-h-0 border border-white/10 rounded-lg overflow-hidden">
        <div className="flex-1 flex flex-col overflow-y-auto">
          <PublishForm onPublish={handleDeploy} initialToken={vercelToken} isDeploying={isDeploying} />
          {deploymentError && <p className="text-red-400 text-center text-sm px-4 pb-4 -mt-4">{deploymentError}</p>}
          
          {deployments.length > 0 && (
            <div className="flex-1 px-8 pb-8 pt-0 overflow-y-auto">
              <div className="border-t border-white/20 pt-6">
                <h4 className="text-base font-semibold mb-4 text-center text-gray-200">Deployments for this version</h4>
                <ul className="space-y-3 max-w-lg mx-auto">
                  {deployments.map((dep) => (
                    <li key={dep.url} className="bg-white/5 border border-white/10 rounded-md p-3 flex justify-between items-center text-sm">
                      <div>
                        <a href={dep.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline font-mono truncate">
                          {dep.url}
                        </a>
                        <p className="text-xs text-gray-400 mt-1">
                          {timeAgo(dep.timestamp)}
                        </p>
                      </div>
                      <a
                        href={dep.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/10 text-white px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-white/20 transition-colors"
                      >
                        Open
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
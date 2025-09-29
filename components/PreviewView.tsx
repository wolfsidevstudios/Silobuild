import React, { useState } from 'react';
import { GeneratedFile, Deployment } from '../types';
import { PublishForm } from './PublishForm';
import { DesktopIcon } from './icons';
import { timeAgo } from '../utils/projectUtils';

interface PreviewViewProps {
  file: GeneratedFile | null;
  vercelToken: string;
  multiFileCode: GeneratedFile[];
  projectName?: string;
  onToggleMacPreview: () => void;
  deployments: Deployment[];
  onNewDeployment: (deployment: Deployment) => void;
}

export const PreviewView: React.FC<PreviewViewProps> = ({ 
  file, 
  vercelToken, 
  multiFileCode, 
  projectName, 
  onToggleMacPreview,
  deployments,
  onNewDeployment
}) => {
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentError, setDeploymentError] = useState<string | null>(null);

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

      const sanitizedProjectName = (projectName || 'silo-build-app').toLowerCase().replace(/[^a-z0-9-]/g, '-').substring(0, 50);

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
        timestamp: new Date().toISOString(),
      };
      onNewDeployment(newDeployment);

    } catch (error) {
      console.error("Vercel deployment failed:", error);
      const message = error instanceof Error ? error.message : "An unknown error occurred during deployment.";
      setDeploymentError(`Deployment failed: ${message}`);
    } finally {
      setIsDeploying(false);
    }
  };

  const latestDeployment = deployments.length > 0 ? deployments[0] : null;

  return (
    <div className="w-full h-full flex flex-col overflow-y-auto p-4 gap-4">
      {/* PREVIEW FRAME */}
      <div className="flex-shrink-0 h-[55vh] min-h-[400px] flex flex-col border border-gray-200 bg-white shadow-md rounded-lg overflow-hidden relative">
        <div className="p-2 bg-gray-50 border-b border-gray-200 flex items-center justify-between flex-shrink-0 gap-2">
            <div className="flex-1 min-w-0">
                 {latestDeployment ? (
                    <div className="bg-gray-200 rounded-full px-3 py-1 flex items-center gap-2">
                        <span className="text-green-600 text-xs font-bold flex-shrink-0">LIVE AT</span>
                        <a href={latestDeployment.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-mono text-xs truncate">
                            {latestDeployment.url}
                        </a>
                    </div>
                 ) : (
                    <h3 className="text-sm font-semibold text-gray-800">Live Preview</h3>
                 )}
            </div>
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
          <div className="flex-1 flex items-center justify-center text-gray-500 bg-gray-50 p-4 text-center">
            <p>No preview available yet. Generate an app first.</p>
          </div>
        )}
        {file && (
          <button
            onClick={onToggleMacPreview}
            disabled={!file}
            className="absolute bottom-4 right-4 group flex items-center justify-center w-12 h-12 bg-white rounded-full border border-gray-200 text-gray-600 hover:bg-blue-600 hover:border-blue-500 hover:text-white transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Live Mac OS Preview"
          >
            <DesktopIcon className="w-6 h-6" />
            <span className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded">
                Live Mac OS Preview
            </span>
          </button>
        )}
      </div>

      {/* DEPLOYMENT AREA */}
      <div className="flex-shrink-0 flex flex-col border border-gray-200 bg-white shadow-md rounded-lg overflow-hidden">
          <PublishForm onPublish={handleDeploy} initialToken={vercelToken} isDeploying={isDeploying} />
          {deploymentError && <p className="text-red-500 text-center text-sm px-4 pb-4 -mt-4">{deploymentError}</p>}
          
          {deployments.length > 0 && (
            <div className="flex-1 px-8 pb-8 pt-0 overflow-y-auto">
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-base font-semibold mb-4 text-center text-gray-700">Deployment History</h4>
                <ul className="space-y-3 max-w-lg mx-auto">
                  {deployments.map((dep) => (
                    <li key={dep.url} className="bg-gray-50 border border-gray-200 rounded-md p-3 flex justify-between items-center text-sm">
                      <div>
                        <a href={dep.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-mono truncate">
                          {dep.url}
                        </a>
                        <p className="text-xs text-gray-500 mt-1">
                          {timeAgo(dep.timestamp)}
                        </p>
                      </div>
                      <a
                        href={dep.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-200 text-gray-800 px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-gray-300 transition-colors"
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
  );
};
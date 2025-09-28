import React, { useState, useEffect } from 'react';
import { GeneratedFile } from '../types';
import { PublishForm } from './PublishForm';
import { EyeIcon } from './icons';

interface Deployment {
  url: string;
  timestamp: Date;
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

export const PreviewView: React.FC<{ file: GeneratedFile | null, vercelToken: string }> = ({ file, vercelToken }) => {
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [activePreviewUrl, setActivePreviewUrl] = useState<string | null>(null);
  const [iframeKey, setIframeKey] = useState(0);

  useEffect(() => {
    setDeployments([]);
    setActivePreviewUrl(null);
    setIframeKey(prev => prev + 1);
  }, [file]);

  const handlePublish = (token: string) => {
    if (token) {
      const randomName = Math.random().toString(36).substring(2, 10);
      const newDeployment: Deployment = {
        url: `https://${randomName}.vercel.app`,
        timestamp: new Date(),
      };
      setDeployments(prev => [newDeployment, ...prev]);
      setActivePreviewUrl(newDeployment.url);
    }
  };

  if (!file) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500 bg-gray-900">
        <p>No preview available yet. Generate an app first.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full h-full aspect-[16/9] max-h-full bg-black border border-white/10 rounded-lg shadow-lg overflow-hidden flex flex-col">
        {activePreviewUrl ? (
          <>
            <div className="flex items-center justify-between py-2 px-4 bg-gray-900 border-b border-white/10 text-sm flex-shrink-0">
              <a href={activePreviewUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline truncate font-mono">
                {activePreviewUrl}
              </a>
              <button
                onClick={() => setActivePreviewUrl(null)}
                className="text-gray-300 hover:text-white font-semibold text-xs py-1 px-3 rounded-full hover:bg-white/10 transition-colors"
              >
                Close Preview
              </button>
            </div>
            <iframe
              key={iframeKey}
              srcDoc={file.content}
              title="App Preview"
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-same-origin"
            />
          </>
        ) : (
          <div className="w-full h-full flex flex-col overflow-hidden">
            <PublishForm onPublish={handlePublish} initialToken={vercelToken} />
            {deployments.length > 0 && (
              <div className="flex-1 p-8 pt-0 overflow-y-auto">
                <div className="border-t border-white/20 pt-6">
                  <h4 className="text-lg font-semibold mb-4 text-center text-gray-200">Deployments for this version</h4>
                  <ul className="space-y-3 max-w-lg mx-auto">
                    {deployments.map((dep) => (
                      <li key={dep.url} className="bg-white/5 border border-white/10 rounded-md p-3 flex justify-between items-center text-sm">
                        <div>
                          <a href={dep.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline font-mono">
                            {dep.url.replace('https://', '')}
                          </a>
                          <p className="text-xs text-gray-400 mt-1">
                            {timeAgo(dep.timestamp)}
                          </p>
                        </div>
                        <button
                          onClick={() => setActivePreviewUrl(dep.url)}
                          className="bg-blue-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-blue-600 flex items-center gap-1.5 transition-colors"
                        >
                          <EyeIcon className="w-4 h-4" />
                          Preview
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
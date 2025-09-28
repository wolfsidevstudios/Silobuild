import React, { useState, useEffect } from 'react';
import { GeneratedFile } from '../types';
import { PublishForm } from './PublishForm';

export const PreviewView: React.FC<{ file: GeneratedFile | null, vercelToken: string }> = ({ file, vercelToken }) => {
  const [isPublished, setIsPublished] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState('');
  const [iframeKey, setIframeKey] = useState(0);

  useEffect(() => {
    setIsPublished(false);
    setShowPreview(false);
    setPublishedUrl('');
    setIframeKey(prev => prev + 1);
  }, [file]);

  const handlePublish = (token: string) => {
    if (token) {
      const randomName = Math.random().toString(36).substring(2, 10);
      setPublishedUrl(`https://${randomName}.vercel.app`);
      setIsPublished(true);
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
        {!isPublished && <PublishForm onPublish={handlePublish} initialToken={vercelToken} />}
        {isPublished && !showPreview && (
          <div className="flex-1 flex flex-col items-center justify-center p-4">
            <p className="text-green-400 mb-2">Successfully Published!</p>
            <div className="bg-gray-800 border border-white/10 rounded-md px-4 py-2 mb-4 text-center">
              <a href={publishedUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                {publishedUrl}
              </a>
            </div>
            <button
              onClick={() => setShowPreview(true)}
              className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600 transition-colors"
            >
              Start Preview
            </button>
          </div>
        )}
        {isPublished && showPreview && (
          <iframe
            key={iframeKey}
            srcDoc={file.content}
            title="App Preview"
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-same-origin"
          />
        )}
      </div>
    </div>
  );
};

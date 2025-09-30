import React from 'react';
import { GeneratedFile, Deployment, TechStack } from '../types';
import { DesktopIcon } from './icons';
import { timeAgo } from '../utils/projectUtils';
import { PowerfulPreview } from './PowerfulPreview';

interface PreviewViewProps {
  file: GeneratedFile | null;
  multiFileCode: GeneratedFile[];
  onToggleMacPreview: () => void;
  deployments: Deployment[];
  techStack: TechStack | null;
}

export const PreviewView: React.FC<PreviewViewProps> = ({ 
  file, 
  multiFileCode, 
  onToggleMacPreview,
  deployments,
  techStack,
}) => {

  const latestDeployment = deployments.length > 0 ? deployments[0] : null;
  
  const renderPreviewContent = () => {
    if (techStack === 'react' || techStack === 'mobile') {
        if (multiFileCode.length > 0) {
            return <PowerfulPreview files={multiFileCode} />;
        }
        return (
            <div className="flex-1 flex items-center justify-center text-gray-500 bg-gray-50 p-4 text-center">
                <p>Generate a React app to see the live preview.</p>
            </div>
        );
    }
    
    if (file) {
      return (
        <iframe
          key={file.content} // Re-mount iframe on content change
          srcDoc={file.content}
          title="Live App Preview"
          className="w-full h-full border-0 bg-white"
          sandbox="allow-scripts allow-same-origin"
        />
      );
    }
    
    return (
       <div className="flex-1 flex items-center justify-center text-gray-500 bg-gray-50 p-4 text-center">
            <p>No preview available yet. Generate an app first.</p>
        </div>
    );
  };


  return (
    <div className="w-full h-full flex flex-col p-4 gap-4">
      {/* PREVIEW FRAME */}
      <div className="flex-grow flex flex-col bg-white shadow-md rounded-lg overflow-hidden relative">
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
        <div className="flex-1 relative">
            {renderPreviewContent()}
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
      </div>
    </div>
  );
};
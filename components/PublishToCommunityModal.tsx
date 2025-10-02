import React, { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { Spinner } from './Spinner';
import { UsersIcon } from './icons';

interface PublishToCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (name: string, description: string, imageDataUrl: string) => void;
  isPublishing: boolean;
  projectName: string;
  previewContent: string;
  publishError: string | null;
}

export const PublishToCommunityModal: React.FC<PublishToCommunityModalProps> = ({
  isOpen,
  onClose,
  onPublish,
  isPublishing,
  projectName,
  previewContent,
  publishError,
}) => {
  const [name, setName] = useState(projectName);
  const [description, setDescription] = useState('');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setName(projectName);
      setDescription('');
    }
  }, [isOpen, projectName]);

  const handlePublish = async () => {
    if (!name.trim() || !description.trim() || !iframeRef.current || !iframeRef.current.contentWindow) return;
    setIsCapturing(true);
    try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const canvas = await html2canvas(iframeRef.current.contentWindow.document.body, {
            useCORS: true,
            allowTaint: true,
            logging: false,
            scale: 0.5,
        });
        const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
        onPublish(name, description, imageDataUrl);
    } catch (error) {
        console.error("Error capturing screenshot:", error);
        alert("Failed to capture screenshot. Please try again.");
    } finally {
        setIsCapturing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl p-6 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 mb-4">
          <UsersIcon className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold">Publish to Community</h2>
        </div>
        <p className="text-sm text-gray-600 mb-6">Share your creation with the Silo Build community. A screenshot of your app will be taken automatically.</p>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="appName" className="block text-sm font-medium text-gray-700 mb-1">App Name</label>
              <input type="text" id="appName" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-gray-50 border border-gray-300 rounded-full px-3 py-2 text-sm" />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
              <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail Preview</label>
            <div className="aspect-[16/10] bg-gray-100 rounded-lg overflow-hidden border border-gray-200 relative">
              <iframe
                ref={iframeRef}
                srcDoc={previewContent}
                title="Thumbnail Preview"
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-same-origin"
                scrolling="no"
              />
               {(isPublishing || isCapturing) && <div className="absolute inset-0 bg-white/50 flex items-center justify-center"><Spinner /></div>}
            </div>
          </div>
        </div>
        {publishError && <p className="text-red-500 text-sm mt-4">{publishError}</p>}
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} disabled={isPublishing} className="px-4 py-2 text-sm rounded-full font-semibold hover:bg-gray-100 border border-gray-300 transition-colors">Cancel</button>
          <button onClick={handlePublish} disabled={isPublishing || isCapturing || !name.trim() || !description.trim()} className="flex items-center justify-center gap-2 min-w-[100px] bg-blue-600 text-white px-4 py-2 text-sm rounded-full font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400">
            {isPublishing || isCapturing ? <Spinner /> : 'Publish'}
          </button>
        </div>
      </div>
    </div>
  );
};
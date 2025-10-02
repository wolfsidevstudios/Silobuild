import React, { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { Spinner } from './Spinner';
import { UsersIcon, UploadIcon } from './icons';

interface PublishToCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (name: string, description: string, imageDataUrl: string, prompt: string, isPaid: boolean, contactInfo: string) => void;
  isPublishing: boolean;
  projectName: string;
  previewContent: string;
  publishError: string | null;
  initialPrompt: string;
}

export const PublishToCommunityModal: React.FC<PublishToCommunityModalProps> = ({
  isOpen,
  onClose,
  onPublish,
  isPublishing,
  projectName,
  previewContent,
  publishError,
  initialPrompt,
}) => {
  const [name, setName] = useState(projectName);
  const [description, setDescription] = useState('');
  const [prompt, setPrompt] = useState(initialPrompt);
  const [listingType, setListingType] = useState<'free' | 'paid'>('free');
  const [contactInfo, setContactInfo] = useState('');
  const [thumbnailSource, setThumbnailSource] = useState<'auto' | 'upload'>('auto');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setName(projectName);
      setDescription('');
      setPrompt(initialPrompt);
      setListingType('free');
      setContactInfo('');
      setThumbnailSource('auto');
      setUploadedImage(null);
    }
  }, [isOpen, projectName, initialPrompt]);

  const handlePublish = async () => {
    if (!name.trim() || !description.trim() || !prompt.trim()) return;
    if (listingType === 'paid' && !contactInfo.trim()) {
        alert("Please provide contact information for a paid listing.");
        return;
    }

    let imageDataUrl = '';

    if (thumbnailSource === 'upload' && uploadedImage) {
        imageDataUrl = uploadedImage;
    } else {
        if (!iframeRef.current || !iframeRef.current.contentWindow) return;
        setIsCapturing(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            const canvas = await html2canvas(iframeRef.current.contentWindow.document.body, { useCORS: true, allowTaint: true, logging: false, scale: 0.5 });
            imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
        } catch (error) {
            console.error("Error capturing screenshot:", error);
            alert("Failed to capture screenshot. Please try again.");
            setIsCapturing(false);
            return;
        } finally {
            setIsCapturing(false);
        }
    }
    
    if (imageDataUrl) {
        onPublish(name, description, imageDataUrl, prompt, listingType === 'paid', contactInfo);
    }
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 mb-4 flex-shrink-0">
          <UsersIcon className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold">Publish to Community</h2>
        </div>
        <p className="text-sm text-gray-600 mb-6 flex-shrink-0">Share your creation with the Silo Build community. Add your prompt to let others remix it!</p>
        
        <div className="flex-1 overflow-y-auto pr-2 -mr-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">App Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-gray-50 border border-gray-300 rounded-full px-3 py-2 text-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Prompt</label>
                        <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={5} className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono" placeholder="Paste the prompt you used here..." />
                    </div>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail</label>
                    <div className="flex items-center gap-4 mb-2">
                        <label className="flex items-center gap-2 text-sm"><input type="radio" name="thumbnail" value="auto" checked={thumbnailSource === 'auto'} onChange={() => setThumbnailSource('auto')} className="h-4 w-4" /> Auto-generate</label>
                        <label className="flex items-center gap-2 text-sm"><input type="radio" name="thumbnail" value="upload" checked={thumbnailSource === 'upload'} onChange={() => setThumbnailSource('upload')} className="h-4 w-4" /> Upload Image</label>
                    </div>
                    <div className="aspect-[16/9] bg-gray-100 rounded-lg overflow-hidden border border-gray-200 relative">
                        {thumbnailSource === 'auto' ? (
                            <iframe ref={iframeRef} srcDoc={previewContent} title="Thumbnail Preview" className="w-full h-full border-0" sandbox="allow-scripts allow-same-origin" scrolling="no" />
                        ) : (
                            uploadedImage ? <img src={uploadedImage} alt="Uploaded thumbnail" className="w-full h-full object-cover"/> : <div className="w-full h-full flex flex-col items-center justify-center text-gray-500"><UploadIcon/><p className="text-xs mt-1">No image selected</p></div>
                        )}
                        {(isPublishing || isCapturing) && <div className="absolute inset-0 bg-white/50 flex items-center justify-center"><Spinner /></div>}
                    </div>
                     {thumbnailSource === 'upload' && (
                        <div className="mt-2">
                            <input type="file" accept="image/png, image/jpeg, image/webp" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
                            <button onClick={() => fileInputRef.current?.click()} className="text-xs bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 px-3 py-1.5 rounded-full">Choose file...</button>
                        </div>
                    )}
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Listing Type</label>
                    <div className="grid grid-cols-2 gap-4">
                        <button type="button" onClick={() => setListingType('free')} className={`p-4 rounded-lg border-2 text-left transition-colors ${listingType === 'free' ? 'border-blue-600 bg-blue-50' : 'border-gray-300 bg-white hover:bg-gray-50'}`}>
                            <span className="text-xl">🎁</span>
                            <h4 className="font-bold mt-1">Free & Remixable</h4>
                            <p className="text-xs text-gray-600 mt-1">Share your prompt freely with the community.</p>
                        </button>
                        <button type="button" onClick={() => setListingType('paid')} className={`p-4 rounded-lg border-2 text-left transition-colors ${listingType === 'paid' ? 'border-blue-600 bg-blue-50' : 'border-gray-300 bg-white hover:bg-gray-50'}`}>
                            <span className="text-xl">💰</span>
                            <h4 className="font-bold mt-1">Prompt for Sale</h4>
                            <p className="text-xs text-gray-600 mt-1">Users will see your contact info to purchase.</p>
                        </button>
                    </div>
                    {listingType === 'paid' && (
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Info</label>
                            <input type="text" value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} placeholder="Your email, Twitter, etc." className="w-full bg-gray-50 border border-gray-300 rounded-full px-3 py-2 text-sm" />
                            <p className="text-xs text-gray-500 mt-1">Provide a way for interested buyers to contact you.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>

        <div className="flex-shrink-0">
            {publishError && <p className="text-red-500 text-sm mt-4">{publishError}</p>}
            <div className="flex justify-end gap-3 mt-6">
            <button onClick={onClose} disabled={isPublishing} className="px-4 py-2 text-sm rounded-full font-semibold hover:bg-gray-100 border border-gray-300 transition-colors">Cancel</button>
            <button onClick={handlePublish} disabled={isPublishing || isCapturing || !name.trim() || !description.trim()} className="flex items-center justify-center gap-2 min-w-[100px] bg-blue-600 text-white px-4 py-2 text-sm rounded-full font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400">
                {isPublishing || isCapturing ? <Spinner /> : 'Publish'}
            </button>
            </div>
        </div>
      </div>
    </div>
  );
};
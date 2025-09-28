import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GeneratedFile } from '../types';
import { FileIcon, FinderIcon, LaunchpadIcon, NotesIcon, MailIcon, SettingsIcon } from './icons';

interface MacPreviewProps {
  previewFile: GeneratedFile;
  projectName: string;
  appIcon: string | null;
  onClose: () => void;
}

const DockIcon: React.FC<{
  icon: React.ReactNode;
  name: string;
  isApp?: boolean;
}> = ({ icon, name, isApp }) => (
  <div className="relative group flex flex-col items-center">
    <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-900/80 text-white text-xs px-2 py-1 rounded">
      {name}
    </div>
    <div className={`w-14 h-14 transition-transform duration-200 ease-in-out group-hover:scale-125 group-hover:-translate-y-2`}>
        {icon}
    </div>
    {isApp && <div className="w-1 h-1 bg-white/50 rounded-full mt-1"></div>}
  </div>
);

export const MacPreview: React.FC<MacPreviewProps> = ({
  previewFile,
  projectName,
  appIcon,
  onClose,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (windowRef.current) {
        const { offsetWidth, offsetHeight } = windowRef.current;
        setPosition({
            x: window.innerWidth / 2 - offsetWidth / 2,
            y: window.innerHeight / 2 - offsetHeight / 1.5,
        });
    }
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (windowRef.current) {
      setIsDragging(true);
      const rect = windowRef.current.getBoundingClientRect();
      dragOffset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y,
      });
    }
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div className="fixed inset-0 bg-gray-900 z-[100] font-sans overflow-hidden select-none">
      {/* Wallpaper */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'radial-gradient(at 80% 20%, hsla(232,85%,65%,1) 0px, transparent 50%), radial-gradient(at 20% 80%, hsla(289,75%,55%,1) 0px, transparent 50%), radial-gradient(at 50% 50%, hsla(332,95%,45%,1) 0px, transparent 50%)' }}
      ></div>

      {/* Menu Bar */}
      <header className="absolute top-0 left-0 right-0 h-6 bg-white/10 backdrop-blur-md flex items-center justify-between px-4 text-white text-xs">
        <div className="flex items-center gap-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="white" viewBox="0 0 24 24"><path d="M12 2.5a.7.7 0 01.7.7v5.52a.2.2 0 00.2.2h5.52a.7.7 0 01.7.7c0 4.2-3.8 9.38-9.88 9.38s-9.88-5.18-9.88-9.38a.7.7 0 01.7-.7h5.52a.2.2 0 00.2-.2V3.2a.7.7 0 01.7-.7zm1.42 1.34c-1.35-1.37-3.48-1.37-4.84 0-.7.7-.93 1.8-.6 2.8a.2.2 0 00.2.14h4.7a.2.2 0 00.2-.13c.32-1.01.08-2.1-.6-2.8z"/></svg>
          <span className="font-bold">{projectName}</span>
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Go</span>
          <span>Window</span>
          <span>Help</span>
        </div>
        <div className="flex items-center gap-4">
            <button 
                onClick={onClose} 
                className="px-2 py-0.5 bg-white/10 hover:bg-white/20 rounded text-xs transition-colors"
            >
                Return to App
            </button>
            <div>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        </div>
      </header>

      {/* App Window */}
      <div
        ref={windowRef}
        className="absolute w-[800px] h-[600px] bg-gray-800 rounded-lg shadow-2xl border border-white/10 flex flex-col"
        style={{ left: position.x, top: position.y, transform: isDragging ? 'scale(1.02)' : 'scale(1)', transition: isDragging ? 'none' : 'transform 0.1s ease-in-out' }}
      >
        <div 
          className="h-8 bg-gray-700 rounded-t-lg flex items-center px-3 flex-shrink-0 cursor-grab"
          onMouseDown={handleMouseDown}
        >
          <div className="flex gap-2">
            <button onClick={onClose} className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600"></button>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex-1 text-center text-xs text-gray-300 -ml-12">{projectName}</div>
        </div>
        <div className="flex-1 bg-white overflow-hidden">
          <iframe
            srcDoc={previewFile.content}
            title={projectName}
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </div>

      {/* Dock */}
      <footer className="absolute bottom-2 left-1/2 -translate-x-1/2">
        <div className="flex items-end gap-2 bg-white/10 backdrop-blur-xl p-2 rounded-2xl border border-white/20">
            <DockIcon icon={<FinderIcon />} name="Finder" />
            <DockIcon icon={<LaunchpadIcon />} name="Launchpad" />
            <DockIcon icon={<NotesIcon />} name="Notes" />
            <DockIcon icon={<MailIcon />} name="Mail" />
            <DockIcon icon={<SettingsIcon className="w-14 h-14" />} name="Settings" />
            <div className="w-px h-12 bg-white/20 mx-1"></div>
            <DockIcon 
                icon={appIcon ? <img src={appIcon} alt={projectName} className="w-full h-full object-cover rounded-lg"/> : <div className="w-full h-full bg-gray-600 rounded-lg flex items-center justify-center"><FileIcon className="text-white w-8 h-8"/></div>} 
                name={projectName} 
                isApp 
            />
        </div>
      </footer>
    </div>
  );
};
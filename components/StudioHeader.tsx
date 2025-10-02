import React from 'react';

export const StudioHeader: React.FC = () => {
  return (
    <header className="flex-shrink-0 bg-gray-950/80 backdrop-blur-sm border-b border-gray-800 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <a href="#/projects" className="flex items-center gap-2">
              <img src="https://i.ibb.co/svVCNWvV/Google-AI-Studio-2025-09-29-T00-23-01-230-Z-modified.png" alt="Silo Build Logo" className="h-8 w-auto" />
            </a>
            <div className="h-6 w-px bg-gray-700"></div>
            <input 
              type="text"
              defaultValue="Untitled Project"
              className="bg-transparent text-white font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500 rounded px-2 py-1"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition-colors text-sm">
                Deploy
            </button>
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold">
                D
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
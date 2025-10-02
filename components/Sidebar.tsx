import React from 'react';

export const LandingFooter: React.FC = () => {
  return (
    <footer className="bg-gray-950 border-t border-gray-800">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="https://i.ibb.co/svVCNWvV/Google-AI-Studio-2025-09-29-T00-23-01-230-Z-modified.png" alt="Silo Build Logo" className="h-7 w-auto" />
            <span className="font-semibold text-lg text-white">Silo Build</span>
          </div>
          <p className="text-gray-400 text-sm mt-4 md:mt-0">
            &copy; {new Date().getFullYear()} Silo Build. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

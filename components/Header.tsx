import React from 'react';

export const LandingHeader: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-lg">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#/" className="flex items-center gap-2">
          <img src="https://i.ibb.co/svVCNWvV/Google-AI-Studio-2025-09-29-T00-23-01-230-Z-modified.png" alt="Silo Build Logo" className="h-8 w-auto" />
          <span className="font-bold text-xl text-white">Silo Build</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
          <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
        </div>
        <a
          href="#/auth"
          className="bg-white text-black px-5 py-2 rounded-full font-semibold hover:bg-gray-200 transition-colors"
        >
          Get Started
        </a>
      </nav>
    </header>
  );
};

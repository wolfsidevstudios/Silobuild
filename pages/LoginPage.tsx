import React from 'react';
import { LandingHeader } from '../components/Header';
import { LandingFooter } from '../components/Sidebar';

export const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />
      <main className="flex-grow container mx-auto px-6 py-24 pt-32 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
            Build Web Apps with AI
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Silo Build is an AI-powered platform that helps you design, build, and deploy web applications faster than ever before.
          </p>
          <a
            href="#/auth"
            className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition-colors text-lg"
          >
            Start Building for Free
          </a>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
};

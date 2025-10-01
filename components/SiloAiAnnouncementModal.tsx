import React from 'react';
import { CloseIcon, GeminiLogo, CloudUploadIcon } from './icons';

interface SiloAiAnnouncementModalProps {
  onClose: () => void;
}

export const SiloAiAnnouncementModal: React.FC<SiloAiAnnouncementModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl border border-gray-200" onClick={e => e.stopPropagation()}>
        <header className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-900">Announcing Silo AI Tools</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-500">
            <CloseIcon />
          </button>
        </header>
        <main className="flex-1 overflow-y-auto p-6 space-y-4 text-gray-700 leading-relaxed">
          <p>Our platform, Silo Build, has always been about empowering creators with a simple and intuitive way to bring their ideas to life. But we recognized a key challenge: integrating advanced AI features was often a technical hurdle, requiring users to navigate complex APIs and backend services.</p>
          <p className="font-bold text-gray-800">That's why we're thrilled to announce the next evolution of our platform: Silo AI Tools, powered by Gemini AI.</p>
          <div className="flex justify-center my-4">
            <GeminiLogo className="h-10" />
          </div>
          <p>Silo AI Tools is not a separate product—it's a game-changing set of built-in capabilities that seamlessly integrates the power of Google's Gemini AI directly into your Silo Build experience. This powerful synergy allows you to go from a simple idea to a fully functional, AI-powered app in seconds, without ever needing to touch a complex backend like Supabase.</p>
          <p>With a single click, you can now add the most advanced large language models to your application. Want to build a chatbot? A content generator? A tool that can analyze and summarize text? Silo AI Tools handles all the heavy lifting for you, so you can focus on the user experience and the core functionality of your app.</p>
          <h3 className="text-lg font-semibold text-gray-900 pt-4">Coming Soon: Silo Cloud</h3>
          <div className="flex justify-center my-4">
            <CloudUploadIcon className="w-12 h-12 text-blue-500" />
          </div>
          <p>But we're just getting started. In the coming months, we will be rolling out Silo Cloud. This revolutionary feature will use AI to automatically add backend functionality to your apps, create and manage databases, and handle all the complexities of deployment. This means you will soon be able to deploy your AI-powered apps directly to the Apple App Store, the Google Play Store, our own upcoming Silo Labs Marketplace, and even to Google Cloud, all with the simplicity and speed you've come to expect from Silo Build.</p>
          <p className="mt-6">We believe that the power of AI should be accessible to everyone. Silo Build, with its new Silo AI Tools and upcoming Silo Cloud features, is built for innovators, entrepreneurs, and creators who want to build the future without the technical roadblocks of the past.</p>
        </main>
        <footer className="p-4 border-t border-gray-200 flex-shrink-0 flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-6 py-2 text-sm rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Get Started
          </button>
        </footer>
      </div>
    </div>
  );
};
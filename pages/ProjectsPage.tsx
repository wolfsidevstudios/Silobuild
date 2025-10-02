import React, { useState } from 'react';
import { GoogleIcon, GithubIcon } from '../components/icons';

const AuthForm: React.FC<{ isSignUp: boolean }> = ({ isSignUp }) => (
  <div className="w-full max-w-sm">
    <h2 className="text-3xl font-bold text-gray-900">
      {isSignUp ? 'Create Account' : 'Welcome Back'}
    </h2>
    <p className="mt-2 text-gray-500">
      {isSignUp ? 'Join us to start building with AI.' : 'Sign in to continue.'}
    </p>

    <div className="mt-8 space-y-4">
      {isSignUp && (
        <input type="text" placeholder="Full Name" className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition" />
      )}
      <input type="email" placeholder="Email Address" className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition" />
      <input type="password" placeholder="Password" className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition" />
      <button className="w-full py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition">
        {isSignUp ? 'Create Account' : 'Sign In'}
      </button>
    </div>

    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="bg-white px-2 text-gray-500">OR</span>
      </div>
    </div>

    <div className="space-y-3">
        <button className="w-full flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition"><GoogleIcon/> Continue with Google</button>
        <button className="w-full flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition"><GithubIcon/> Continue with GitHub</button>
    </div>
  </div>
);

export const AuthPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="min-h-screen flex text-gray-800">
      {/* Left decorative panel */}
      <div className="hidden lg:flex flex-1 bg-gray-900 p-12 flex-col justify-between">
          <a href="#/" className="flex items-center gap-2">
            <img src="https://i.ibb.co/svVCNWvV/Google-AI-Studio-2025-09-29-T00-23-01-230-Z-modified.png" alt="Silo Build Logo" className="h-8 w-auto" />
            <span className="font-bold text-xl text-white">Silo Build</span>
          </a>
          <div>
            <p className="text-3xl font-bold text-white leading-tight">"The future is not something we enter. The future is something we create."</p>
            <p className="text-gray-400 mt-4">- Leonard I. Sweet</p>
          </div>
          <div></div>
      </div>

      {/* Right form panel */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-sm">
          <div className="flex justify-end mb-8">
            <p className="text-sm">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <button onClick={() => setIsSignUp(!isSignUp)} className="font-semibold text-blue-600 hover:underline ml-1">
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>
          <AuthForm isSignUp={isSignUp} />
        </div>
      </div>
    </div>
  );
};

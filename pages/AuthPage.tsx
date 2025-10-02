import React, { useState } from 'react';
import { GoogleIcon, GitHubIcon } from '../components/icons';

export const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);

    const handleAuthAction = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you'd handle login/signup logic here.
        // For now, we'll just redirect to the projects page.
        window.location.hash = '#/projects';
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Left Pane */}
            <div className="md:w-1/2 bg-gray-900 text-white flex flex-col justify-between p-8 md:p-12">
                <div>
                    <a href="#/" className="flex items-center gap-2 mb-12">
                        <img src="https://i.ibb.co/svVCNWvV/Google-AI-Studio-2025-09-29-T00-23-01-230-Z-modified.png" alt="Silo Build Logo" className="h-8 w-auto" />
                        <span className="font-bold text-xl text-white">Silo Build</span>
                    </a>
                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                        Build at the speed of thought.
                    </h1>
                    <p className="mt-4 text-lg text-gray-400">
                        From idea to deployment, Silo Build empowers you to create stunning web applications with the power of generative AI.
                    </p>
                </div>
                <div className="hidden md:block">
                    <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-300">
                        "Silo Build changed the way I develop. I went from prompt to production in minutes."
                        <cite className="block not-italic mt-2 text-gray-500">- Satisfied Developer</cite>
                    </blockquote>
                </div>
            </div>

            {/* Right Pane */}
            <div className="w-full md:w-1/2 bg-gray-950 flex items-center justify-center p-8">
                <div className="max-w-md w-full">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">
                            {isLogin ? 'Welcome Back' : 'Create an Account'}
                        </h2>
                        <p className="text-gray-400 mb-8">
                            {isLogin ? 'Sign in to continue to your projects.' : 'Get started by creating your account.'}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <button onClick={handleAuthAction} className="w-full flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                            <GoogleIcon className="h-5 w-5" />
                            Sign in with Google
                        </button>
                        <button onClick={handleAuthAction} className="w-full flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                            <GitHubIcon className="h-5 w-5" />
                            Sign in with GitHub
                        </button>
                    </div>

                    <div className="my-8 flex items-center">
                        <div className="flex-grow border-t border-gray-700"></div>
                        <span className="flex-shrink mx-4 text-gray-500 text-sm">OR</span>
                        <div className="flex-grow border-t border-gray-700"></div>
                    </div>

                    <form onSubmit={handleAuthAction} className="space-y-6">
                        {!isLogin && (
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                                    Full Name
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        required
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>
                        )}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete={isLogin ? "current-password" : "new-password"}
                                    required
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {isLogin && (
                             <div className="flex items-center justify-end">
                                <div className="text-sm">
                                    <a href="#" className="font-medium text-blue-500 hover:text-blue-400">
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 focus:ring-white transition-colors"
                            >
                                {isLogin ? 'Sign In' : 'Create Account'}
                            </button>
                        </div>
                    </form>
                    
                    <p className="mt-8 text-center text-sm text-gray-400">
                        {isLogin ? "Don't have an account?" : 'Already have an account?'}
                        <button onClick={() => setIsLogin(!isLogin)} className="font-medium text-blue-500 hover:text-blue-400 ml-1 focus:outline-none">
                            {isLogin ? 'Sign Up' : 'Sign In'}
                        </button>
                    </p>

                    <p className="mt-6 text-center text-xs text-gray-500">
                        By continuing, you agree to our <a href="#/terms" className="underline hover:text-gray-400">Terms of Service</a> and <a href="#/privacy" className="underline hover:text-gray-400">Privacy Policy</a>.
                    </p>
                </div>
            </div>
        </div>
    );
};

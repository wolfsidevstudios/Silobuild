import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { GithubIcon, DiscordIcon, SparklesIcon } from '../components/icons';
import { Spinner } from '../components/Spinner';

const AuthButton: React.FC<{ provider: 'google' | 'github' | 'discord'; onClick: () => void; children: React.ReactNode }> = ({ provider, onClick, children }) => {
    const icons = {
        google: <svg className="w-5 h-5" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path><path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.222 0-9.582-3.344-11.303-7.962l-6.571 4.819A20.004 20.004 0 0 0 24 44z"></path><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C43.021 36.243 46 30.655 46 24c0-1.341-.138-2.65-.389-3.917z"></path></svg>,
        github: <GithubIcon />,
        discord: <DiscordIcon />
    };
    return (
        <button
            onClick={onClick}
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-800 hover:bg-gray-100 transition-colors"
        >
            {icons[provider]}
            {children}
        </button>
    );
};

export const LoginPage: React.FC = () => {
    const { user, signInWithOAuth, signInWithPassword, signUpWithPassword, sendPasswordResetEmail } = useAuth();
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            window.location.hash = '#/dashboard/projects';
        }
    }, [user]);

    const handleAuthAction = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);
        try {
            const action = isSignUp ? signUpWithPassword : signInWithPassword;
            const { error } = await action(email, password);
            if (error) throw error;
            if (isSignUp) {
                setMessage("Success! Please check your email to confirm your account.");
                setIsSignUp(false); // Switch to sign-in view
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred.');
        } finally {
            setLoading(false);
        }
    };
    
    const handlePasswordReset = async () => {
        if (!email) {
            setError("Please enter your email address to reset your password.");
            return;
        }
        setLoading(true);
        setError(null);
        setMessage(null);
        try {
            await sendPasswordResetEmail(email);
            setMessage("Password reset email sent. Please check your inbox.");
        } catch(err: any) {
             setError(err.message || 'An error occurred.');
        } finally {
            setLoading(false);
        }
    }

    const handleOAuthSignIn = async (provider: 'google' | 'github' | 'discord') => {
        setLoading(true);
        setError(null);
        try {
            await signInWithOAuth(provider);
        } catch (err: any) {
            setError(err.message || 'An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
             <div className="text-center mb-6">
                <a href="#/" className="flex items-center gap-2 justify-center">
                    <img src="https://i.ibb.co/svVCNWvV/Google-AI-Studio-2025-09-29-T00-23-01-230-Z-modified.png" alt="Silo Build Logo" className="h-10 w-auto" />
                    <span className="text-2xl font-bold">Silo Build</span>
                </a>
             </div>
            <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-center mb-1">{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
                <p className="text-gray-600 text-center text-sm mb-6">{isSignUp ? 'Get started with your new account.' : 'Sign in to continue.'}</p>
                
                {message && <div className="bg-green-100 text-green-800 p-3 rounded-lg text-sm mb-4">{message}</div>}
                {error && <div className="bg-red-100 text-red-800 p-3 rounded-lg text-sm mb-4">{error}</div>}

                <form onSubmit={handleAuthAction} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    </div>
                     <div>
                        <label className="text-sm font-medium text-gray-700">Password</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    </div>
                    {!isSignUp && (
                        <div className="text-right">
                             <button type="button" onClick={handlePasswordReset} className="text-xs text-blue-600 hover:underline">Forgot Password?</button>
                        </div>
                    )}
                    <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-400 flex items-center justify-center">
                        {loading ? <Spinner className="text-white" /> : (isSignUp ? 'Sign Up' : 'Sign In')}
                    </button>
                </form>

                <div className="relative flex py-5 items-center">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="flex-shrink mx-4 text-gray-400 text-sm">OR</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <div className="space-y-3">
                    <AuthButton provider="google" onClick={() => handleOAuthSignIn('google')}>Continue with Google</AuthButton>
                    <AuthButton provider="github" onClick={() => handleOAuthSignIn('github')}>Continue with GitHub</AuthButton>
                    <AuthButton provider="discord" onClick={() => handleOAuthSignIn('discord')}>Continue with Discord</AuthButton>
                </div>

                <p className="text-center text-sm text-gray-600 mt-6">
                    {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                    <button onClick={() => { setIsSignUp(!isSignUp); setError(null); setMessage(null); }} className="font-semibold text-blue-600 hover:underline ml-1">
                        {isSignUp ? 'Sign In' : 'Sign Up'}
                    </button>
                </p>
            </div>
             <footer className="text-center mt-8 text-gray-500 text-sm">
                <a href="#/terms" className="hover:underline">Terms of Service</a> &bull; <a href="#/privacy" className="hover:underline">Privacy Policy</a>
            </footer>
        </div>
    );
};
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Spinner } from './Spinner';

export const SupabaseAuth: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const { signInWithPassword, signUpWithPassword } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);
        try {
            if (isSignUp) {
                const data = await signUpWithPassword(email, password);
                if (data.user?.identities?.length === 0) {
                     setError("User with this email already exists. Try signing in.");
                } else {
                     setMessage('Check your email for the confirmation link!');
                }
            } else {
                await signInWithPassword(email, password);
                // on success, AuthContext will handle redirect
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full p-3 bg-gray-50 border border-gray-300 rounded-full text-sm" />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full p-3 bg-gray-50 border border-gray-300 rounded-full text-sm" />
                <button type="submit" disabled={loading} className="w-full p-3 bg-gray-800 text-white rounded-full font-semibold flex items-center justify-center disabled:bg-gray-400 h-[46px]">
                    {loading ? <Spinner className="w-5 h-5" /> : (isSignUp ? 'Sign Up' : 'Sign In')}
                </button>
            </form>
            {error && <p className="text-red-500 text-xs mt-2 text-center">{error}</p>}
            {message && <p className="text-green-600 text-xs mt-2 text-center">{message}</p>}
            <p className="text-xs text-center text-gray-500 mt-4">
                {isSignUp ? "Already have an account?" : "Don't have an account?"}
                <button onClick={() => { setIsSignUp(!isSignUp); setError(null); setMessage(null); }} className="font-semibold text-blue-600 hover:underline ml-1">
                    {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
            </p>
        </div>
    );
};

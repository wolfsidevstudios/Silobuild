import React, { useState, useEffect } from 'react';
import { CloseIcon, GitHubIcon, ExternalLinkIcon } from './icons';
import { Spinner } from './Spinner';
import { CodeFile } from '../types';
import { saveToGitHub } from '../services/githubService';

interface GitHubSaveModalProps {
    isOpen: boolean;
    onClose: () => void;
    files: CodeFile[];
    onSaveSuccess: (url: string) => void;
    existingRepoUrl: string | null;
}

const GITHUB_USERNAME_KEY = 'github_username';
const GITHUB_TOKEN_KEY = 'github_pat';

export const GitHubSaveModal: React.FC<GitHubSaveModalProps> = ({ isOpen, onClose, files, onSaveSuccess, existingRepoUrl }) => {
    const [username, setUsername] = useState('');
    const [token, setToken] = useState('');
    const [repoName, setRepoName] = useState('');
    const [isPrivate, setIsPrivate] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successUrl, setSuccessUrl] = useState<string | null>(null);
    
    useEffect(() => {
        if (isOpen) {
            setUsername(localStorage.getItem(GITHUB_USERNAME_KEY) || '');
            setToken(localStorage.getItem(GITHUB_TOKEN_KEY) || '');
            setError(null);
            setSuccessUrl(null);
            setIsLoading(false);

            if (existingRepoUrl) {
                try {
                    const url = new URL(existingRepoUrl);
                    const pathParts = url.pathname.split('/').filter(Boolean);
                    if (pathParts.length >= 2) {
                        setUsername(pathParts[0]);
                        setRepoName(pathParts[1]);
                    }
                } catch(e) { console.error("Invalid repo URL", e); }
            }
        }
    }, [isOpen, existingRepoUrl]);

    const handleSave = async () => {
        setIsLoading(true);
        setError(null);
        try {
            localStorage.setItem(GITHUB_USERNAME_KEY, username);
            localStorage.setItem(GITHUB_TOKEN_KEY, token);
            
            const url = await saveToGitHub({
                token,
                files,
                repoInfo: { owner: username, repo: repoName },
                isPrivate
            });

            setSuccessUrl(url);
            onSaveSuccess(url);
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };
    
    if (!isOpen) return null;

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="text-center p-8">
                    <Spinner className="w-10 h-10 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold">Saving to GitHub...</h3>
                    <p className="text-gray-400 text-sm mt-1">Committing files and pushing to repository.</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="p-6">
                    <h3 className="text-lg font-semibold text-red-400">Save Failed</h3>
                    <p className="text-sm text-red-300 bg-red-900/50 p-3 rounded-md mt-2">{error}</p>
                    <div className="mt-4 flex justify-end">
                        <button
                            onClick={() => { setError(null); setSuccessUrl(null); }}
                            className="bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-200 text-sm"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            );
        }

        if (successUrl) {
            return (
                 <div className="p-6">
                    <h3 className="text-lg font-semibold text-green-400">Project Saved!</h3>
                    <p className="text-sm text-gray-400 mt-1">Your code has been successfully pushed to GitHub.</p>
                    <div className="mt-4 flex justify-end gap-2">
                        <a href={successUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-200 text-sm">
                            View on GitHub
                            <ExternalLinkIcon className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            )
        }
        
        return (
             <div className="p-6">
                <h2 className="text-xl font-bold">Save to GitHub</h2>
                <p className="text-gray-400 mt-2 text-sm">
                     Commit and push your project to a GitHub repository. You'll need a <a href="https://github.com/settings/tokens/new?scopes=repo" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">Personal Access Token</a> with repo access.
                </p>
                <div className="mt-6 space-y-4">
                    <div>
                        <label htmlFor="github-username" className="block text-sm font-medium text-gray-300 mb-1">GitHub Username</label>
                        <input id="github-username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="e.g., octocat" />
                    </div>
                     <div>
                        <label htmlFor="github-token" className="block text-sm font-medium text-gray-300 mb-1">Personal Access Token (PAT)</label>
                        <input id="github-token" type="password" value={token} onChange={(e) => setToken(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="ghp_..." />
                    </div>
                    <div>
                        <label htmlFor="github-repo" className="block text-sm font-medium text-gray-300 mb-1">Repository Name</label>
                        <input id="github-repo" type="text" value={repoName} onChange={(e) => setRepoName(e.target.value)} disabled={!!existingRepoUrl} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-700 disabled:opacity-60" placeholder="e.g., my-awesome-project" />
                    </div>
                    <div className="flex items-center">
                        <input id="private-repo" type="checkbox" checked={isPrivate} onChange={(e) => setIsPrivate(e.target.checked)} disabled={!!existingRepoUrl} className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 disabled:opacity-60"/>
                        <label htmlFor="private-repo" className="ml-2 block text-sm text-gray-300">Create as a private repository</label>
                    </div>

                    <div className="flex items-center justify-end gap-4 pt-2">
                        <button onClick={onClose} className="bg-gray-700 text-gray-200 px-5 py-2 rounded-full font-semibold hover:bg-gray-600 transition-colors text-sm">Cancel</button>
                        <button
                            onClick={handleSave}
                            disabled={!username.trim() || !token.trim() || !repoName.trim()}
                            className="bg-white text-black px-5 py-2 rounded-full font-semibold hover:bg-gray-200 transition-colors text-sm disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                           <GitHubIcon className="w-4 h-4" />
                           {existingRepoUrl ? 'Update Repository' : 'Save to Repository'}
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity" onClick={onClose}></div>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div 
                    className="relative bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-lg m-4 transform transition-all text-white"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button 
                        onClick={onClose} 
                        className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                        aria-label="Close"
                    >
                       <CloseIcon />
                    </button>
                    {renderContent()}
                </div>
            </div>
        </>
    );
};

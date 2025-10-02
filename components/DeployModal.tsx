import React, { useState, useEffect } from 'react';
import { CloseIcon, ExternalLinkIcon, CopyIcon } from './icons';
import { Spinner } from './Spinner';
import { CodeFile } from '../types';

const VERCEL_API_URL = 'https://api.vercel.com/v13/deployments';

interface VercelFile {
    file: string;
    data: string;
}

const deployToVercel = async (accessToken: string, files: CodeFile[], projectName: string): Promise<string> => {
    if (!accessToken) {
        throw new Error("Vercel Access Token is required.");
    }

    const vercelFiles: VercelFile[] = files.map(f => ({
        file: f.name,
        data: f.content
    }));

    if (!vercelFiles.find(f => f.file === 'vercel.json')) {
        vercelFiles.push({ file: 'vercel.json', data: JSON.stringify({ framework: null }) });
    }

    const body = {
        name: projectName.toLowerCase().replace(/[^a-z0-9-]/g, '-').slice(0, 50) || 'silo-build-project',
        files: vercelFiles,
        projectSettings: {
            framework: null
        }
    };

    const response = await fetch(VERCEL_API_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    const data = await response.json();

    if (!response.ok) {
        console.error("Vercel API Error:", data.error);
        throw new Error(data.error?.message || 'Failed to create deployment on Vercel.');
    }

    return `https://${data.url}`;
};


interface DeployModalProps {
    isOpen: boolean;
    onClose: () => void;
    files: CodeFile[];
    projectName: string;
}

const VERCEL_TOKEN_KEY = 'vercel_access_token';

export const DeployModal: React.FC<DeployModalProps> = ({ isOpen, onClose, files, projectName }) => {
    const [accessToken, setAccessToken] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [deploymentUrl, setDeploymentUrl] = useState<string | null>(null);
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        if (isOpen) {
            const storedToken = localStorage.getItem(VERCEL_TOKEN_KEY);
            if (storedToken) {
                setAccessToken(storedToken);
            }
            setError(null);
            setDeploymentUrl(null);
            setIsLoading(false);
            setIsCopied(false);
        }
    }, [isOpen]);

    const handleDeploy = async () => {
        setIsLoading(true);
        setError(null);
        try {
            localStorage.setItem(VERCEL_TOKEN_KEY, accessToken);
            const url = await deployToVercel(accessToken, files, projectName);
            setDeploymentUrl(url);
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleCopy = () => {
        if (deploymentUrl) {
            navigator.clipboard.writeText(deploymentUrl);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }
    };

    if (!isOpen) return null;

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="text-center p-8">
                    <Spinner className="w-10 h-10 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold">Deploying to Vercel...</h3>
                    <p className="text-gray-400 text-sm mt-1">This may take a moment.</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="p-6">
                    <h3 className="text-lg font-semibold text-red-400">Deployment Failed</h3>
                    <p className="text-sm text-red-300 bg-red-900/50 p-3 rounded-md mt-2">{error}</p>
                    <div className="mt-4 flex justify-end">
                        <button
                            onClick={() => { setError(null); setDeploymentUrl(null); }}
                            className="bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-200 text-sm"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            );
        }

        if (deploymentUrl) {
            return (
                 <div className="p-6">
                    <h3 className="text-lg font-semibold text-green-400">Deployment Successful!</h3>
                    <p className="text-sm text-gray-400 mt-1">Your project is live.</p>
                    <div className="mt-4 flex items-center bg-gray-800 border border-gray-700 rounded-lg p-2">
                        <input
                            type="text"
                            readOnly
                            value={deploymentUrl}
                            className="bg-transparent w-full text-green-400 focus:outline-none text-sm"
                        />
                        <button onClick={handleCopy} className="text-gray-300 hover:text-white px-3 py-1 text-sm rounded-md bg-gray-700/50 hover:bg-gray-600 flex items-center gap-1">
                           <CopyIcon className="w-4 h-4" />
                           {isCopied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                        <a href={deploymentUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-200 text-sm">
                            Visit Site
                            <ExternalLinkIcon className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            )
        }
        
        return (
             <div className="p-6">
                <h2 className="text-xl font-bold">Deploy to Vercel</h2>
                <p className="text-gray-400 mt-2 text-sm">
                    Enter your Vercel Access Token to deploy your project. You can create a token <a href="https://vercel.com/account/tokens" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">here</a>.
                </p>
                <div className="mt-6 space-y-4">
                    <div>
                        <label htmlFor="vercel-token" className="block text-sm font-medium text-gray-300 mb-1">
                            Vercel Access Token
                        </label>
                        <input
                            type="password"
                            id="vercel-token"
                            value={accessToken}
                            onChange={(e) => setAccessToken(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="ex: AbC123DeF456GhI..."
                        />
                    </div>
                    <div className="flex items-center justify-end gap-4 pt-2">
                        <button
                            onClick={onClose}
                            className="bg-gray-700 text-gray-200 px-5 py-2 rounded-full font-semibold hover:bg-gray-600 transition-colors text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDeploy}
                            disabled={!accessToken.trim()}
                            className="bg-white text-black px-5 py-2 rounded-full font-semibold hover:bg-gray-200 transition-colors text-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            Deploy Project
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

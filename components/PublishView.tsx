import React from 'react';
import { Project, Deployment } from '../types';
import { GithubIcon, CloudUploadIcon, NetlifyIcon, VercelIcon } from './icons';
import { Spinner } from './Spinner';
import { timeAgo } from '../utils/projectUtils';

interface PublishViewProps {
  project: Project | null;
  deployments: Deployment[];
  onCommitAndPush: () => void;
  onDeployNetlifyClick: () => void;
  onDeployVercelClick: () => void;
  onConnectGitHub: () => void;
  isPushing: boolean;
  onRedeployNetlify: () => void;
  onRedeployVercel: () => void;
  isRedeploying: ('netlify' | 'vercel') | null;
}

const DeploymentHistory: React.FC<{ deployments: Deployment[] }> = ({ deployments }) => {
    if (deployments.length === 0) {
        return <p className="text-sm text-gray-500 italic mt-4 text-center">No deployment history for this project.</p>;
    }
    return (
         <ul className="space-y-3">
            {deployments.map((dep, i) => (
              <li key={`${dep.url}-${i}`} className="bg-gray-50 border border-gray-200 rounded-md p-3 flex justify-between items-center text-sm">
                <div>
                  <a href={dep.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-mono truncate">
                    {dep.url}
                  </a>
                  <p className="text-xs text-gray-500 mt-1 capitalize">
                    {dep.provider} &middot; {timeAgo(dep.timestamp)}
                  </p>
                </div>
                <a
                  href={dep.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-200 text-gray-800 px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-gray-300 transition-colors"
                >
                  Open
                </a>
              </li>
            ))}
          </ul>
    );
};

export const PublishView: React.FC<PublishViewProps> = ({ project, deployments, onCommitAndPush, onDeployNetlifyClick, onDeployVercelClick, onConnectGitHub, isPushing, onRedeployNetlify, onRedeployVercel, isRedeploying }) => {
    const isGithubConnected = !!project?.githubUrl;
    const latestNetlifyDeployment = deployments.find(d => d.provider === 'netlify');
    const latestVercelDeployment = deployments.find(d => d.provider === 'vercel');

    if (!project) {
        return (
            <div className="p-8 h-full flex items-center justify-center text-center text-gray-600">
                <div>
                    <h2 className="text-xl font-semibold">Save your project to publish</h2>
                    <p className="mt-2">Once your project is saved, you can connect to GitHub and manage deployments here.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="p-8 h-full overflow-y-auto bg-gray-50">
            <div className="max-w-4xl mx-auto space-y-10">
                {/* GitHub Section */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <GithubIcon className="w-6 h-6"/>
                        <h2 className="text-xl font-bold">GitHub Repository</h2>
                    </div>
                    {isGithubConnected ? (
                        <div>
                            <p className="text-sm text-gray-600 mb-2">This project is connected to:</p>
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-blue-600 hover:underline break-all">{project.githubUrl}</a>
                            <div className="mt-4 border-t pt-4">
                                <h3 className="font-semibold mb-2">Commit & Push Changes</h3>
                                <p className="text-sm text-gray-600 mb-4">Commit the latest changes from the editor to your main branch.</p>
                                <button onClick={onCommitAndPush} disabled={isPushing} className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors disabled:bg-gray-400">
                                    {isPushing ? <Spinner className="w-5 h-5" /> : <GithubIcon />}
                                    <span>{isPushing ? 'Pushing...' : 'Commit & Push to Main'}</span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <p className="text-sm text-gray-600 mb-4">Connect this project to a GitHub repository to manage versions and collaborate.</p>
                            <button onClick={onConnectGitHub} className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors">
                                <GithubIcon />
                                <span>Connect to GitHub</span>
                            </button>
                        </div>
                    )}
                </div>

                {/* Deployments Section */}
                 <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <CloudUploadIcon className="w-6 h-6"/>
                        <h2 className="text-xl font-bold">Deployments</h2>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Netlify */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col">
                            <div className="flex items-center gap-2 mb-4"><NetlifyIcon /> <h3 className="font-semibold">Netlify</h3></div>
                            {latestNetlifyDeployment ? (
                                <>
                                    <div className="flex-1">
                                        <p className="text-xs text-gray-500">Latest deployment:</p>
                                        <a href={latestNetlifyDeployment.url} target="_blank" rel="noopener noreferrer" className="text-sm font-mono text-blue-600 hover:underline break-all">{latestNetlifyDeployment.url}</a>
                                        <p className="text-xs text-gray-500 mt-1">{timeAgo(latestNetlifyDeployment.timestamp)}</p>
                                    </div>
                                    <button onClick={onRedeployNetlify} disabled={isRedeploying === 'netlify'} className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors disabled:bg-gray-400">
                                        {isRedeploying === 'netlify' ? <Spinner /> : <CloudUploadIcon />} {isRedeploying === 'netlify' ? 'Deploying...' : 'Redeploy'}
                                    </button>
                                </>
                            ) : (
                                <>
                                <p className="text-sm text-gray-500 flex-1">No Netlify deployments yet for this project.</p>
                                <button onClick={onDeployNetlifyClick} className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors">
                                    <NetlifyIcon /> Deploy to Netlify
                                </button>
                                </>
                            )}
                        </div>
                        {/* Vercel */}
                         <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col">
                            <div className="flex items-center gap-2 mb-4"><VercelIcon className="h-4 text-black"/> <h3 className="font-semibold">Vercel</h3></div>
                            {latestVercelDeployment ? (
                                <>
                                    <div className="flex-1">
                                        <p className="text-xs text-gray-500">Latest deployment:</p>
                                        <a href={latestVercelDeployment.url} target="_blank" rel="noopener noreferrer" className="text-sm font-mono text-blue-600 hover:underline break-all">{latestVercelDeployment.url}</a>
                                        <p className="text-xs text-gray-500 mt-1">{timeAgo(latestVercelDeployment.timestamp)}</p>
                                    </div>
                                    <button onClick={onRedeployVercel} disabled={isRedeploying === 'vercel'} className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium bg-black hover:bg-gray-800 text-white rounded-lg transition-colors disabled:bg-gray-400">
                                        {isRedeploying === 'vercel' ? <Spinner /> : <CloudUploadIcon />} {isRedeploying === 'vercel' ? 'Deploying...' : 'Redeploy'}
                                    </button>
                                </>
                            ) : (
                                <>
                                <p className="text-sm text-gray-500 flex-1">No Vercel deployments yet for this project.</p>
                                <button onClick={onDeployVercelClick} className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium bg-black hover:bg-gray-800 text-white rounded-lg transition-colors">
                                    <VercelIcon className="h-4" /> Deploy to Vercel
                                </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                     <h3 className="font-semibold mb-3">Deployment History</h3>
                     <DeploymentHistory deployments={deployments} />
                </div>
            </div>
        </div>
    );
};
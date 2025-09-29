import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Project } from '../types';
import { timeAgo } from '../utils/projectUtils';
import { CloudUploadIcon, FileIcon } from '../components/icons';

interface DeploymentItem {
    url: string;
    timestamp: string;
    projectName: string;
    projectIcon: string | null | undefined;
    projectId: string;
}

export const DeploymentsPage: React.FC = () => {
    const [projects] = useLocalStorage<Project[]>('ai-app-builder-projects', []);

    const allDeployments: DeploymentItem[] = projects
        .flatMap(project => 
            (project.deployments || []).map(deployment => ({
                ...deployment,
                projectName: project.name,
                projectIcon: project.appIcon,
                projectId: project.id,
            }))
        )
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return (
        <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
                <CloudUploadIcon className="w-8 h-8 text-blue-500" />
                <h1 className="text-3xl font-bold">Deployments</h1>
            </div>
            <p className="text-gray-600 mb-8 max-w-3xl">
                This page shows a history of all your deployments across all projects.
            </p>

            {allDeployments.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 bg-white/50 rounded-lg p-8 mt-10">
                    <CloudUploadIcon className="w-16 h-16 mb-4 text-gray-400"/>
                    <h2 className="text-xl font-semibold mb-2 text-gray-800">No deployments yet</h2>
                    <p>Deploy a project from the "Preview" tab in the builder to see it here.</p>
                </div>
            ) : (
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                    <ul className="divide-y divide-gray-200">
                        {allDeployments.map((dep, index) => (
                            <li key={index} className="p-4 flex items-center justify-between hover:bg-gray-50">
                                <div className="flex items-center gap-4 min-w-0">
                                     <a href={`#/project/${dep.projectId}`} className="w-10 h-10 rounded-md bg-gray-100 flex-shrink-0 flex items-center justify-center border border-gray-200 hover:border-blue-300 transition-colors">
                                        {dep.projectIcon ? <img src={dep.projectIcon} alt={`${dep.projectName} icon`} className="w-full h-full object-cover rounded-sm"/> : <FileIcon className="w-6 h-6 text-gray-400" />}
                                    </a>
                                    <div className="min-w-0">
                                        <a href={dep.url} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-blue-600 hover:underline truncate block">
                                            {dep.url}
                                        </a>
                                        <p className="text-sm text-gray-500">
                                            Project: <a href={`#/project/${dep.projectId}`} className="hover:underline font-medium">{dep.projectName}</a>
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right flex-shrink-0 ml-4">
                                     <p className="text-sm text-gray-500">
                                        {timeAgo(dep.timestamp)}
                                    </p>
                                     <a
                                        href={dep.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-1 inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold hover:bg-gray-200 transition-colors"
                                    >
                                        Open
                                    </a>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

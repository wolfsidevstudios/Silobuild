import React, { useState, useEffect, useRef } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Project } from '../types';
import { timeAgo } from '../utils/projectUtils';
import { FileIcon, CloseIcon, SparklesIcon } from '../components/icons';
import { useAuth } from '../context/AuthContext';

const GOOGLE_CLIENT_ID = '208835173647-6e2is6g6j3338hj4dq2reebcluk694jm.apps.googleusercontent.com';

declare global {
  interface Window {
    google: typeof import('google-one-tap');
  }
}

const MobileLoginPage: React.FC = () => {
    const { login } = useAuth();
    const googleButtonContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (window.google) {
            window.google.accounts.id.initialize({
                client_id: GOOGLE_CLIENT_ID,
                callback: (response) => {
                    if (response.credential) {
                        login(response.credential);
                    }
                },
            });

            if (googleButtonContainerRef.current) {
                googleButtonContainerRef.current.innerHTML = '';
                window.google.accounts.id.renderButton(
                    googleButtonContainerRef.current,
                    { theme: 'outline', size: 'large', type: 'standard', text: 'continue_with', shape: 'pill' }
                );
            }
            window.google.accounts.id.prompt();
        }
    }, [login]);

    return (
        <div className="h-screen w-screen bg-gray-50 flex flex-col justify-center items-center p-4">
            <div className="text-center">
                <img src="https://i.ibb.co/svVCNWvV/Google-AI-Studio-2025-09-29-T00-23-01-230-Z-modified.png" alt="Silo Build Logo" className="h-12 w-auto mx-auto" />
                <h1 className="text-3xl font-bold mt-4">Silo Build Go</h1>
                <p className="text-gray-600 mt-2">Sign in to view your projects.</p>
            </div>
            <div className="mt-8" ref={googleButtonContainerRef}></div>
        </div>
    )
}

const FullscreenPreview: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
    if (!project.previewFile) return null;

    return (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
            <header className="flex-shrink-0 h-14 bg-gray-900 flex items-center justify-between px-4 border-b border-gray-700">
                <div className="flex items-center gap-3 overflow-hidden">
                    {project.appIcon ? 
                        <img src={project.appIcon} alt="" className="w-8 h-8 rounded-md" /> : 
                        <FileIcon className="w-7 h-7 text-white"/>
                    }
                    <h1 className="text-white font-semibold truncate">{project.name}</h1>
                </div>
                <button onClick={onClose} className="p-2 rounded-full text-white hover:bg-gray-700 transition-colors">
                    <CloseIcon />
                </button>
            </header>
            <main className="flex-1 bg-white">
                <iframe
                    srcDoc={project.previewFile.content}
                    title={project.name}
                    className="w-full h-full border-0"
                    sandbox="allow-scripts allow-same-origin"
                />
            </main>
        </div>
    );
};


const ProjectCard: React.FC<{ project: Project; onClick: () => void }> = ({ project, onClick }) => (
    <button 
        className="w-full bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4 text-left active:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={onClick}
    >
        <div className="w-14 h-14 rounded-lg bg-gray-100 flex-shrink-0 flex items-center justify-center border border-gray-200">
            {project.appIcon ? <img src={project.appIcon} alt={`${project.name} icon`} className="w-full h-full object-cover rounded-lg"/> : <FileIcon className="w-8 h-8 text-gray-400" />}
        </div>
        <div className="min-w-0">
            <p className="font-semibold text-gray-800 truncate">{project.name}</p>
            <p className="text-sm text-gray-500">
                Updated {timeAgo(project.updatedAt || project.createdAt)}
            </p>
        </div>
    </button>
);


export const MobileApp: React.FC = () => {
    const { user } = useAuth();
    const [projects] = useLocalStorage<Project[]>('ai-app-builder-projects', []);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const visualProjects = projects
        .filter(p => ['react', 'html', 'vue', 'svelte', 'react-native'].includes(p.stack) && p.previewFile)
        .sort((a, b) => new Date(b.updatedAt || b.createdAt).getTime() - new Date(a.updatedAt || a.createdAt).getTime());

    if (!user) {
        return <MobileLoginPage />;
    }

    return (
        <div className="h-screen w-screen bg-gray-50 text-gray-900 font-sans overflow-y-auto">
            {selectedProject && (
                <FullscreenPreview project={selectedProject} onClose={() => setSelectedProject(null)} />
            )}
            
            <div className={`${selectedProject ? 'hidden' : 'block'}`}>
                <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 p-4 sticky top-0 z-10">
                    <div className="flex items-center justify-center gap-2">
                        <img src="https://i.ibb.co/svVCNWvV/Google-AI-Studio-2025-09-29-T00-23-01-230-Z-modified.png" alt="Silo Build Logo" className="h-7 w-auto" />
                        <h1 className="text-xl font-bold text-center">Silo Build Go</h1>
                    </div>
                </header>
                <main className="p-4 space-y-3">
                    {visualProjects.length === 0 ? (
                            <div className="text-center text-gray-500 pt-20 px-4">
                            <SparklesIcon className="w-16 h-16 mx-auto text-gray-300" />
                            <h2 className="mt-4 text-lg font-semibold text-gray-700">No Apps Found</h2>
                            <p className="mt-1 text-sm">
                                Welcome to Silo Build Go! Create an app on your desktop to see it here and preview it on the go.
                            </p>
                            </div>
                    ) : (
                        visualProjects.map(project => (
                            <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
                        ))
                    )}
                </main>
            </div>
        </div>
    );
};
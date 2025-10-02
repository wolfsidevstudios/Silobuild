import React, { useState, useEffect } from 'react';
import { UsersIcon } from '../components/icons';
import { supabase } from '../services/supabaseClient';
import { CommunityProject } from '../types';
import { Spinner } from '../components/Spinner';
import { timeAgo } from '../utils/projectUtils';

const CommunityAppPreviewModal: React.FC<{ project: CommunityProject; onClose: () => void }> = ({ project, onClose }) => {
    const [copied, setCopied] = useState(false);
    const shareUrl = `${window.location.origin}${window.location.pathname}#/community/app/${project.id}`;
    
    const handleCopy = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleRemix = () => {
        if (project.prompt) {
            sessionStorage.setItem('initialPrompt', project.prompt);
            window.location.href = window.location.origin + window.location.pathname + '#/builder';
        } else {
            alert("This project doesn't have a prompt to remix.");
        }
    };

    const handleContact = () => {
        if (project.contact_info) {
            alert(`Contact the seller to purchase this prompt:\n\n${project.contact_info}`);
        } else {
            alert("The seller has not provided contact information.");
        }
    };

    if (!project.preview_content) {
        return (
             <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
                <div className="w-full h-full max-w-lg max-h-[20vh] bg-white rounded-2xl shadow-2xl flex flex-col justify-center items-center p-6" onClick={e => e.stopPropagation()}>
                    <h3 className="font-bold text-lg text-gray-900">Preview Not Available</h3>
                    <p className="text-sm text-gray-600 mt-2">This community project does not have preview content.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="w-full h-full max-w-7xl max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="flex-1 bg-gray-100">
                    <iframe
                        srcDoc={project.preview_content}
                        title={project.name}
                        className="w-full h-full border-0"
                        sandbox="allow-scripts allow-same-origin"
                    />
                </div>
                <div className="flex-shrink-0 p-4 border-t border-gray-200 bg-white grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                    <div className="col-span-1 md:col-span-2">
                         <div className="flex items-center gap-3">
                             <h3 className="font-bold text-lg text-gray-900 truncate">{project.name}</h3>
                             {project.is_paid && (
                                <span className="flex-shrink-0 text-[10px] font-bold bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full">PROMPT FOR SALE</span>
                             )}
                         </div>
                         <p className="text-sm text-gray-600 mt-1 line-clamp-1">{project.description}</p>
                         <div className="flex items-center gap-2 mt-2">
                            <img src={project.author_image_url || 'https://www.gravatar.com/avatar/?d=mp'} alt={project.author_name} className="w-6 h-6 rounded-full" />
                            <span className="text-xs text-gray-500">by {project.author_name} &middot; {timeAgo(project.created_at)}</span>
                         </div>
                    </div>
                    <div className="flex items-center justify-start md:justify-end gap-2">
                        <input type="text" readOnly value={shareUrl} className="sr-only" />
                        <button onClick={handleCopy} className="px-4 py-2 text-sm font-semibold bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
                            {copied ? 'Copied!' : 'Copy Link'}
                        </button>
                        {project.is_paid ? (
                            <button onClick={handleContact} className="px-4 py-2 text-sm font-semibold bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors">
                                Contact Seller
                            </button>
                        ) : (
                            <button onClick={handleRemix} className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                                Remix App
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};


const CommunityProjectCard: React.FC<{ project: CommunityProject; onOpen: () => void; }> = ({ project, onOpen }) => {
    return (
        <div className="group cursor-pointer" onClick={onOpen}>
            <div className="relative aspect-[16/9] bg-gray-100 rounded-xl overflow-hidden border border-gray-200 transition-all duration-300 group-hover:shadow-xl group-hover:border-blue-300">
                <img src={project.preview_image_url} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                {project.is_paid && (
                    <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">
                        PROMPT FOR SALE
                    </div>
                )}
            </div>
            <div className="mt-3 px-1">
                 <h3 className="font-bold text-gray-900 truncate">{project.name}</h3>
                 <div className="flex items-center gap-2 mt-1">
                    <img src={project.author_image_url || 'https://www.gravatar.com/avatar/?d=mp'} alt={project.author_name} className="w-5 h-5 rounded-full" />
                    <span className="text-xs text-gray-500">by {project.author_name}</span>
                 </div>
            </div>
        </div>
    );
};


export const CommunityPage: React.FC = () => {
    const [projects, setProjects] = useState<CommunityProject[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedProject, setSelectedProject] = useState<CommunityProject | null>(null);


    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('community_projects')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                setError(error.message);
                console.error("Error fetching community projects:", error);
            } else {
                setProjects(data);
            }
            setLoading(false);
        };
        fetchProjects();
    }, []);

    return (
        <div className="p-8">
            <div className="w-full bg-gradient-to-r from-blue-600 to-purple-700 rounded-3xl p-8 md:p-12 text-white mb-8">
                <h1 className="text-4xl md:text-5xl font-bold">Silo Community</h1>
                <p className="mt-2 text-lg text-blue-100 max-w-2xl">
                    Explore, discover, and remix amazing projects built by developers just like you.
                </p>
            </div>

            <div className="flex items-center gap-3 mb-6">
                <UsersIcon className="w-8 h-8 text-blue-500" />
                <h1 className="text-3xl font-bold">Community Showcase</h1>
            </div>
            <p className="text-gray-600 mb-8 max-w-3xl">
                Explore and get inspired by apps built by the Silo Build community. See something you like? Remix it to make it your own!
            </p>
            
            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <Spinner className="w-10 h-10" />
                </div>
            ) : error ? (
                 <div className="text-center py-20 bg-red-50 text-red-700 rounded-lg">
                    <h3 className="font-bold">Error loading projects</h3>
                    <p className="text-sm">{error}</p>
                </div>
            ) : projects.length === 0 ? (
                 <div className="text-center py-20 text-gray-500">
                    <h3 className="font-bold text-xl">The showcase is empty</h3>
                    <p className="text-sm mt-2">Be the first to publish a project to the community!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                    {projects.map(project => (
                        <CommunityProjectCard key={project.id} project={project} onOpen={() => setSelectedProject(project)} />
                    ))}
                </div>
            )}
            {selectedProject && <CommunityAppPreviewModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
        </div>
    );
}
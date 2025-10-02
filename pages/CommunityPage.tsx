import React, { useState, useEffect } from 'react';
import { UsersIcon } from '../components/icons';
import { supabase } from '../services/supabaseClient';
import { CommunityProject } from '../types';
import { Spinner } from '../components/Spinner';
import { timeAgo } from '../utils/projectUtils';

const CommunityProjectCard: React.FC<{ project: CommunityProject }> = ({ project }) => {
    const handleRemix = () => {
        if (project.prompt) {
            sessionStorage.setItem('initialPrompt', project.prompt);
            window.location.hash = '#/builder';
        } else {
            alert("This project doesn't have a prompt to remix.");
        }
    };

    return (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="aspect-w-16 aspect-h-9 bg-gray-100 overflow-hidden">
                <img src={project.preview_image_url} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-4">
                <h3 className="font-bold text-gray-900 truncate">{project.name}</h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{project.description}</p>
                 <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                    <img src={project.author_image_url || 'https://www.gravatar.com/avatar/?d=mp'} alt={project.author_name} className="w-6 h-6 rounded-full" />
                    <span className="text-xs text-gray-500">by {project.author_name} &middot; {timeAgo(project.created_at)}</span>
                 </div>
            </div>
             <div className="p-4 pt-0">
                <button
                    onClick={handleRemix}
                    className="w-full bg-blue-600 text-white px-3 py-1.5 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors"
                >
                    Remix This App
                </button>
            </div>
        </div>
    );
};


export const CommunityPage: React.FC = () => {
    const [projects, setProjects] = useState<CommunityProject[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map(project => (
                        <CommunityProjectCard key={project.id} project={project} />
                    ))}
                </div>
            )}
        </div>
    );
}
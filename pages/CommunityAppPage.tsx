import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import { CommunityProject } from '../types';
import { Spinner } from '../components/Spinner';
import { timeAgo } from '../utils/projectUtils';

interface CommunityAppPageProps {
  communityProjectId: string;
}

export const CommunityAppPage: React.FC<CommunityAppPageProps> = ({ communityProjectId }) => {
    const [project, setProject] = useState<CommunityProject | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    
    useEffect(() => {
        const fetchProject = async () => {
            if (!communityProjectId) {
                setError("No project ID provided.");
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);
            
            const { data, error } = await supabase
                .from('community_projects')
                .select('*')
                .eq('id', communityProjectId)
                .single();

            if (error) {
                setError(error.message);
            } else if (!data) {
                setError("Project not found.");
            } else {
                setProject(data);
            }
            setLoading(false);
        };

        fetchProject();
    }, [communityProjectId]);
    
    const handleRemix = () => {
        if (project?.prompt) {
            sessionStorage.setItem('initialPrompt', project.prompt);
            window.location.href = window.location.origin + window.location.pathname + '#/builder';
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleContact = () => {
        if (project?.contact_info) {
            alert(`Contact the seller to purchase this prompt:\n\n${project.contact_info}`);
        } else {
            alert("The seller has not provided contact information.");
        }
    };
    
    if (loading) return <div className="h-screen w-screen flex items-center justify-center bg-gray-100"><Spinner className="w-10 h-10" /></div>;
    if (error) return <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-100 text-red-600 p-4"><p className="font-bold">Error</p><p>{error}</p></div>;
    if (!project || !project.preview_content) return <div className="h-screen w-screen flex items-center justify-center bg-gray-100 text-gray-600 p-4">This project does not have any content to display.</div>;

    return (
        <div className="h-screen w-screen flex flex-col bg-gray-100">
             <div className="w-full h-full max-w-none bg-white flex flex-col overflow-hidden">
                <div className="flex-1 bg-gray-100">
                    <iframe
                        srcDoc={project.preview_content}
                        title={project.name}
                        className="w-full h-full border-0"
                        sandbox="allow-scripts allow-same-origin"
                    />
                </div>
                <div className="flex-shrink-0 p-4 border-t border-gray-200 bg-white grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                    <div className="col-span-1 sm:col-span-2">
                        <div className="flex items-center gap-3">
                            <h3 className="font-bold text-lg text-gray-900 truncate">{project.name}</h3>
                            {project.is_paid && (
                                <span className="flex-shrink-0 text-[10px] font-bold bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full">PROMPT FOR SALE</span>
                            )}
                        </div>
                         <p className="text-sm text-gray-600 mt-1 line-clamp-1">{project.description}</p>
                         <div className="flex items-center gap-2 mt-2">
                            <img src={project.author_image_url || 'https://www.gravatar.com/avatar/?d=mp'} alt={project.author_name} className="w-6 h-6 rounded-full" />
                            <a href="#/dashboard/community" className="text-xs text-gray-500 hover:underline">by {project.author_name} &middot; {timeAgo(project.created_at)}</a>
                         </div>
                    </div>
                    <div className="flex items-center justify-start sm:justify-end gap-2">
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
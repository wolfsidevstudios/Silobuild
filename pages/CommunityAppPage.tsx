import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import { CommunityProject } from '../types';
import { Spinner } from '../components/Spinner';

interface CommunityAppPageProps {
  communityProjectId: string;
}

export const CommunityAppPage: React.FC<CommunityAppPageProps> = ({ communityProjectId }) => {
    const [project, setProject] = useState<CommunityProject | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
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
            // Redirect to the main page which will then route to the builder
            window.location.href = window.location.origin + window.location.pathname;
        }
    };
    
    if (loading) return <div className="h-screen w-screen flex items-center justify-center bg-gray-100"><Spinner className="w-10 h-10" /></div>;
    if (error) return <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-100 text-red-600 p-4"><p className="font-bold">Error</p><p>{error}</p></div>;
    if (!project || !project.preview_content) return <div className="h-screen w-screen flex items-center justify-center bg-gray-100 text-gray-600 p-4">This project does not have any content to display.</div>;

    return (
        <div className="h-screen w-screen flex flex-col bg-gray-800">
            <main className="flex-1">
                <iframe
                    srcDoc={project.preview_content}
                    title={project.name}
                    className="w-full h-full border-0"
                    sandbox="allow-scripts allow-same-origin"
                />
            </main>
            <footer className="flex-shrink-0 bg-white/10 backdrop-blur-md p-3 flex items-center justify-between border-t border-white/20">
                <a href={window.location.origin + window.location.pathname} className="flex items-center gap-2" title="Made with Silo Build">
                    <img src="https://i.ibb.co/svVCNWvV/Google-AI-Studio-2025-09-29-T00-23-01-230-Z-modified.png" alt="Silo Build Logo" className="h-6 w-auto" />
                    <span className="text-white text-sm font-semibold hidden sm:inline">Made with Silo Build</span>
                </a>
                <button
                    onClick={handleRemix}
                    className="bg-blue-600 text-white px-4 py-2 text-sm rounded-full font-semibold hover:bg-blue-700 transition-colors"
                >
                    Remix This App
                </button>
            </footer>
        </div>
    );
};
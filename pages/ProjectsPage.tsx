import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Project } from '../types';
import { DownloadIcon, TrashIcon } from '../components/icons';

export const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useLocalStorage<Project[]>('ai-app-builder-projects', []);

  const deleteProject = (projectId: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(prev => prev.filter(p => p.id !== projectId));
    }
  };

  return (
    <div className="p-8 h-full overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6">My Projects</h1>
      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 bg-white/5 rounded-lg p-8">
            <h2 className="text-xl font-semibold mb-2 text-white">No projects yet</h2>
            <p>Go to the builder to create your first application!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <div key={project.id} className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col justify-between hover:border-white/20 transition-colors">
              <div>
                <h2 className="text-lg font-semibold truncate mb-1">{project.name}</h2>
                <p className="text-sm text-gray-400 mb-4">
                  Created on {new Date(project.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center justify-between mt-4">
                 <a href={`#/project/${project.id}`} className="bg-white text-black px-4 py-2 text-sm rounded-full font-semibold hover:bg-gray-200 transition-colors">
                    Open in Builder
                 </a>
                 <div className="flex items-center gap-2">
                    <button 
                        onClick={() => alert('Download feature not implemented.')} 
                        className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full"
                        aria-label="Download Project"
                    >
                        <DownloadIcon />
                    </button>
                    <button 
                        onClick={() => deleteProject(project.id)} 
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-white/10 rounded-full"
                        aria-label="Delete Project"
                    >
                        <TrashIcon />
                    </button>
                 </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
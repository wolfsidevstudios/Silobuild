import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Project } from '../types';
import { DownloadIcon, TrashIcon, EditIcon, FileIcon } from '../components/icons';
import JSZip from 'jszip';
import { ProjectMetadataModal } from '../components/ProjectMetadataModal';

export const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useLocalStorage<Project[]>('ai-app-builder-projects', []);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const deleteProject = (projectId: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(prev => prev.filter(p => p.id !== projectId));
    }
  };

  const downloadProject = async (project: Project) => {
    const zip = new JSZip();
    
    project.files.forEach(file => {
      zip.file(file.path, file.content);
    });

    if (project.previewFile) {
        zip.file(project.previewFile.path, project.previewFile.content);
    }

    if (project.appIcon) {
        const base64Data = project.appIcon.split(';base64,').pop();
        if (base64Data) {
            // These paths must match what the AI is told to use in manifest.json
            zip.file('icon-192x192.png', base64Data, { base64: true });
            zip.file('icon-512x512.png', base64Data, { base64: true });
        }
    }

    try {
      const content = await zip.generateAsync({ type: 'blob' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      const sanitizedName = project.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      link.download = `${sanitizedName}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (error) {
        console.error("Failed to generate zip file", error);
        alert("Sorry, there was an error downloading the project.");
    }
  };
  
  const handleUpdateProject = (name: string, icon: string | null) => {
    if (editingProject) {
        setProjects(prev => prev.map(p => p.id === editingProject.id ? {...p, name, appIcon: icon || undefined } : p));
        setEditingProject(null);
    }
  }


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
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-lg bg-black/20 flex-shrink-0 flex items-center justify-center border border-white/10">
                       {project.appIcon ? <img src={project.appIcon} alt={`${project.name} icon`} className="w-full h-full object-cover rounded-md"/> : <FileIcon className="w-6 h-6 text-gray-500" />}
                     </div>
                     <div className="min-w-0">
                        <h2 className="text-lg font-semibold truncate">{project.name}</h2>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
                            {project.stack === 'html' ? 'HTML' : 'React'}
                        </span>
                     </div>
                  </div>
                   <button 
                      onClick={() => setEditingProject(project)} 
                      className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full flex-shrink-0"
                      aria-label="Edit Details"
                  >
                      <EditIcon className="w-4 h-4" />
                  </button>
                </div>
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
                        onClick={() => downloadProject(project)} 
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
       <ProjectMetadataModal
        isOpen={!!editingProject}
        onClose={() => setEditingProject(null)}
        onSave={handleUpdateProject}
        initialName={editingProject?.name}
        initialIcon={editingProject?.appIcon}
        title="Edit Project Details"
      />
    </div>
  );
};

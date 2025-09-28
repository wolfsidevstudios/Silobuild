import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Project } from '../types';
import { DownloadIcon, EyeIcon, FileIcon, TrashIcon } from '../components/icons';
// A simple in-browser zip library would be needed for download. For now, we'll mock it.
// import JSZip from 'jszip'; 

export const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useLocalStorage<Project[]>('ai-app-builder-projects', []);

  const handleDownload = (project: Project) => {
    alert(`Downloading project "${project.name}"... (simulation)`);
    // Example with JSZip (if installed)
    /*
    const zip = new JSZip();
    project.files.forEach(file => {
      zip.file(file.path, file.content);
    });
    if (project.previewFile) {
      zip.file(project.previewFile.path, project.previewFile.content);
    }
    zip.generateAsync({ type: 'blob' }).then(content => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = `${project.name}.zip`;
      link.click();
      URL.revokeObjectURL(link.href);
    });
    */
  };

  const handleDelete = (projectId: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.id !== projectId));
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Projects</h1>
        <a
          href="#/"
          className="bg-blue-500 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-600 transition-colors text-sm"
        >
          + New Project
        </a>
      </div>
      
      {projects.length === 0 ? (
        <div className="text-center py-20">
            <div className="inline-block bg-white/5 p-4 rounded-full mb-4">
                <FileIcon />
            </div>
          <p className="text-gray-400">You haven't saved any projects yet.</p>
          <p className="text-gray-500 text-sm">Create a new project to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <div key={project.id} className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col justify-between transition-transform hover:scale-[1.02] hover:border-white/20">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{project.name}</h3>
                <p className="text-xs text-gray-400 mb-4">
                  Created on {new Date(project.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-300 line-clamp-2">
                    {project.files.length} files, including {project.files.find(f => f.path.includes('App'))?.path || 'a main component'}.
                </p>
              </div>
              <div className="flex items-center justify-end gap-2 mt-6">
                 <button onClick={() => handleDelete(project.id)} className="p-2 text-gray-400 hover:text-red-400 transition-colors"><TrashIcon /></button>
                 <button onClick={() => handleDownload(project)} className="p-2 text-gray-400 hover:text-white transition-colors"><DownloadIcon /></button>
                 <a href={`#/project/${project.id}`} className="bg-blue-500/80 text-white px-4 py-1.5 rounded-md font-semibold hover:bg-blue-500 transition-colors text-sm flex items-center gap-2">
                    <EyeIcon /> Open
                 </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

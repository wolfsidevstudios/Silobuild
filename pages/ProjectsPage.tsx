import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Project, GeneratedFile } from '../types';
// FIX: Import DownloadIcon to resolve reference error.
import { TrashIcon, EditIcon, FileIcon, SparklesIcon, CodeIcon, DownloadIcon } from '../components/icons';
import { ProjectMetadataModal } from '../components/ProjectMetadataModal';
import { downloadProjectAsZip } from '../utils/projectUtils';

const studioBoilerplatePreview: GeneratedFile = {
    path: 'preview.html',
    content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Silo Build Studio Project</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
        body { font-family: sans-serif; background-color: #f0f2f5; }
    </style>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel">
        const App = () => {
            return (
                <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">Welcome to Silo Build Studio!</h1>
                        <p className="text-gray-400">Edit this file ("preview.html") to get started.</p>
                    </div>
                </div>
            );
        };

        const container = document.getElementById('root');
        const root = ReactDOM.createRoot(container);
        root.render(<App />);
    </script>
</body>
</html>`
};

const studioBoilerplateReadme: GeneratedFile = {
    path: 'README.md',
    content: `# Silo Build Studio Project

Welcome to your new project in Silo Build Studio!

## How it works:

- **Live Preview**: The \`preview.html\` file is rendered live in the preview pane. This file is a self-contained HTML file that uses Babel Standalone to compile React JSX in the browser.
- **Editing**: To see changes, you must edit \`preview.html\`. You can write all your React components inside the \`<script type="text/babel">\` tag.
- **Multi-file Projects**: You can create additional files (\`.tsx\`, \`.css\`, etc.) using the file explorer. However, to see them in the preview, you will need to manually copy their contents into the \`preview.html\` file.
- **Deployment**: When you are ready, you can use the download or deploy features. These features will use all the files in your file explorer, not just the preview.`
};


export const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useLocalStorage<Project[]>('ai-app-builder-projects', []);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const deleteProject = (projectId: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(prev => prev.filter(p => p.id !== projectId));
    }
  };
  
  const handleUpdateProject = (name: string, icon: string | null) => {
    if (editingProject) {
        setProjects(prev => prev.map(p => p.id === editingProject.id ? {...p, name, appIcon: icon || undefined } : p));
        setEditingProject(null);
    }
  };

  const handleNewStudioProject = () => {
    const name = prompt("Enter a name for your new studio project:", "My Studio App");
    if (name) {
        const newProject: Project = {
            id: Date.now().toString(),
            name,
            createdAt: new Date().toISOString(),
            files: [studioBoilerplateReadme],
            previewFile: studioBoilerplatePreview,
            stack: 'react', // Default to react for studio
            deployments: [],
        };
        setProjects(prev => [newProject, ...prev]);
        window.location.hash = `#/studio/${newProject.id}`;
    }
  };


  return (
    <div className="p-8 h-full overflow-y-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold">My Projects</h1>
        <div className="flex items-center gap-3">
            <a href="#/builder" className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300">
                <SparklesIcon />
                New AI Project
            </a>
             <button onClick={handleNewStudioProject} className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors duration-300">
                <CodeIcon />
                New Studio Project
            </button>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 bg-white/5 rounded-lg p-8">
            <h2 className="text-xl font-semibold mb-2 text-white">No projects yet</h2>
            <p>Create a new project using the AI builder or the code studio.</p>
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
                 <div className="flex items-center gap-2 text-sm">
                    <a href={`#/project/${project.id}`} className="px-3 py-1.5 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                        Builder
                    </a>
                     <a href={`#/studio/${project.id}`} className="px-3 py-1.5 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                        Studio
                    </a>
                 </div>
                 <div className="flex items-center gap-2">
                    <button 
                        onClick={() => downloadProjectAsZip(project)} 
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
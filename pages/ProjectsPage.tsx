import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Project, GeneratedFile, Team } from '../types';
import { TrashIcon, EditIcon, FileIcon, SparklesIcon, CodeIcon, DownloadIcon, GithubIcon, UsersIcon, DotsHorizontalIcon } from '../components/icons';
import { ProjectMetadataModal } from '../components/ProjectMetadataModal';
import { downloadProjectAsZip, timeAgo } from '../utils/projectUtils';

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

const ProjectCardActions: React.FC<{ project: Project; onEdit: () => void; onDelete: () => void; }> = ({ project, onEdit, onDelete }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-500 hover:text-gray-800 rounded-full hover:bg-gray-100">
                <DotsHorizontalIcon />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    <div className="py-1">
                        <a href={`#/project/${project.id}`} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                            <SparklesIcon className="w-4 h-4" /> Builder
                        </a>
                        <a href={`#/studio/${project.id}`} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                            <CodeIcon className="w-4 h-4" /> Studio
                        </a>
                        <button onClick={onEdit} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                            <EditIcon className="w-4 h-4" /> Edit
                        </button>
                        {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                <GithubIcon className="w-4 h-4" /> View on GitHub
                            </a>
                        )}
                        <button onClick={() => downloadProjectAsZip(project)} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                            <DownloadIcon className="w-4 h-4" /> Download
                        </button>
                        <div className="border-t border-gray-200 my-1"></div>
                        <button onClick={onDelete} className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left">
                            <TrashIcon className="w-4 h-4" /> Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};


const ProjectCard: React.FC<{ project: Project; onEdit: (project: Project) => void; onDelete: (id: string) => void }> = ({ project, onEdit, onDelete }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col justify-between hover:border-gray-300 transition-all duration-300 group hover:shadow-xl hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
            <a href={`#/project/${project.id}`} className="w-12 h-12 rounded-lg bg-gray-100 flex-shrink-0 flex items-center justify-center border border-gray-200 group-hover:border-blue-300 transition-colors">
            {project.appIcon ? <img src={project.appIcon} alt={`${project.name} icon`} className="w-full h-full object-cover rounded-md"/> : <FileIcon className="w-7 h-7 text-gray-400" />}
            </a>
            <div className="min-w-0">
                <a href={`#/project/${project.id}`} className="text-lg font-semibold truncate hover:text-blue-600 transition-colors">{project.name}</a>
                <p className="text-sm text-gray-500">
                    Updated {timeAgo(project.updatedAt || project.createdAt)}
                </p>
            </div>
        </div>
        <ProjectCardActions project={project} onEdit={() => onEdit(project)} onDelete={() => onDelete(project.id)} />
      </div>
      
      <div className="flex items-center justify-between mt-2">
         <div className="flex items-center gap-2 text-sm">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-700 capitalize">
                {project.stack}
            </span>
            {/* FIX: The GithubIcon component does not accept a `title` prop. Wrapped it in a span to provide the tooltip. */}
            {project.githubUrl && <span title="Linked to GitHub"><GithubIcon className="w-4 h-4 text-gray-500"/></span>}
         </div>
         <div className="flex items-center gap-2 text-sm">
            <a href={`#/project/${project.id}`} className="px-3 py-1.5 bg-gray-100 border border-gray-200 text-gray-700 rounded-full hover:bg-gray-200 transition-colors text-xs font-semibold">
                Open Builder
            </a>
         </div>
      </div>
    </div>
);

export const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useLocalStorage<Project[]>('ai-app-builder-projects', []);
  const [teams] = useLocalStorage<Team[]>('silo-build-teams', []);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const deleteProject = (projectId: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(prev => prev.filter(p => p.id !== projectId));
    }
  };
  
  const handleUpdateProject = (name: string, icon: string | null, createRepo: boolean, teamId: string | null) => {
    if (editingProject) {
        setProjects(prev => prev.map(p => p.id === editingProject.id ? {...p, name, appIcon: icon || undefined, teamId: teamId || undefined, updatedAt: new Date().toISOString() } : p));
        setEditingProject(null);
    }
  };

  const handleNewStudioProject = () => {
    const name = prompt("Enter a name for your new studio project:", "My Studio App");
    if (name) {
        const now = new Date().toISOString();
        const newProject: Project = {
            id: Date.now().toString(),
            name,
            createdAt: now,
            updatedAt: now,
            files: [studioBoilerplateReadme],
            previewFile: studioBoilerplatePreview,
            stack: 'react', // Default to react for studio
            deployments: [],
        };
        setProjects(prev => [newProject, ...prev]);
        window.location.hash = `#/studio/${newProject.id}`;
    }
  };
  
  const filteredProjects = useMemo(() => {
    return projects.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [projects, searchTerm]);

  const { personalProjects, teamProjects } = useMemo(() => {
    const personal = filteredProjects.filter(p => !p.teamId);
    const teamBased = teams.map(team => ({
        ...team,
        projects: filteredProjects.filter(p => p.teamId === team.id)
    })).filter(team => team.projects.length > 0);
    return { personalProjects: personal, teamProjects: teamBased };
  }, [filteredProjects, teams]);


  return (
    <div className="p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold">My Projects</h1>
        <div className="flex items-center gap-3">
            <a href="#/builder" className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300">
                <SparklesIcon />
                New AI Project
            </a>
             <button onClick={handleNewStudioProject} className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white hover:bg-gray-100 border border-gray-300 text-gray-800 rounded-lg transition-colors duration-300">
                <CodeIcon />
                New Studio Project
            </button>
        </div>
      </div>
      
       <div className="mb-8">
            <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full max-w-sm bg-white border border-gray-300 rounded-lg p-2.5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 bg-white/50 rounded-lg p-8">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">No projects yet</h2>
            <p>Create a new project using the AI builder or the code studio.</p>
        </div>
      ) : (
        <div className="space-y-10">
            {personalProjects.length > 0 && (
                <div>
                    <h2 className="text-2xl font-bold mb-4">Personal Projects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {personalProjects.map(project => (
                            <ProjectCard key={project.id} project={project} onEdit={setEditingProject} onDelete={deleteProject} />
                        ))}
                    </div>
                </div>
            )}

            {teamProjects.map(team => (
                 <div key={team.id}>
                    <div className="flex items-center gap-3 mb-4">
                        <UsersIcon />
                        <h2 className="text-2xl font-bold">{team.name} Projects</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {team.projects.map(project => (
                            <ProjectCard key={project.id} project={project} onEdit={setEditingProject} onDelete={deleteProject} />
                        ))}
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
        teams={teams}
        initialTeamId={editingProject?.teamId}
      />
    </div>
  );
};
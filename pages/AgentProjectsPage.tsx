import React, { useState, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Project } from '../types';
import { TrashIcon, EditIcon, SparklesIcon, AgentIcon, PlusIcon } from '../components/icons';
import { timeAgo } from '../utils/projectUtils';

const AgentCard: React.FC<{ project: Project; onDelete: (id: string) => void }> = ({ project, onDelete }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col justify-between hover:border-indigo-300 transition-all duration-300 group hover:shadow-xl hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
            <a href={`#/agent-builder/${project.id}`} className="w-12 h-12 rounded-lg bg-indigo-100 flex-shrink-0 flex items-center justify-center border border-indigo-200 group-hover:border-indigo-300 transition-colors">
                <AgentIcon className="w-7 h-7 text-indigo-500" />
            </a>
            <div className="min-w-0">
                <a href={`#/agent-builder/${project.id}`} className="text-lg font-semibold truncate hover:text-indigo-600 transition-colors">{project.name}</a>
                <p className="text-sm text-gray-500">
                    Updated {timeAgo(project.updatedAt || project.createdAt)}
                </p>
            </div>
        </div>
        <div className="flex items-center gap-1">
            <a href={`#/agent-builder/${project.id}`} className="p-2 text-gray-500 hover:text-gray-800 rounded-full hover:bg-gray-100">
                <EditIcon />
            </a>
            <button onClick={() => onDelete(project.id)} className="p-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-red-50">
                <TrashIcon />
            </button>
        </div>
      </div>
      
      <div className="mt-2 text-xs text-gray-500 line-clamp-2">
        {project.agentConfig?.systemInstruction || "No system instruction provided."}
      </div>
    </div>
);

export const AgentProjectsPage: React.FC = () => {
  const [projects, setProjects] = useLocalStorage<Project[]>('ai-app-builder-projects', []);
  const [searchTerm, setSearchTerm] = useState('');

  const deleteProject = (projectId: string) => {
    if (window.confirm('Are you sure you want to delete this agent?')) {
      setProjects(prev => prev.filter(p => p.id !== projectId));
    }
  };
  
  const agentProjects = useMemo(() => {
    return projects
        .filter(p => p.stack === 'agent')
        .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [projects, searchTerm]);

  return (
    <div className="p-8 h-full overflow-y-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
            <AgentIcon className="w-8 h-8 text-indigo-500" />
            <h1 className="text-3xl font-bold">AI Agents</h1>
        </div>
        <a href="#/agent-builder" className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-300">
            <PlusIcon />
            New Agent
        </a>
      </div>
      
       <div className="mb-8">
            <input
                type="text"
                placeholder="Search agents..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full max-w-sm bg-white border border-gray-300 rounded-lg p-2.5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </div>

      {agentProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 bg-white/50 rounded-lg p-8">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">No agents yet</h2>
            <p>Create a new agent to build a custom conversational AI.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agentProjects.map(project => (
                <AgentCard key={project.id} project={project} onDelete={deleteProject} />
            ))}
        </div>
      )}
    </div>
  );
};
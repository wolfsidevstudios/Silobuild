import React, { useState, useEffect, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Project, GeneratedFile, Settings } from '../types';
import { Spinner } from '../components/Spinner';
import { WorkspaceView } from '../components/WorkspaceView';
import { PreviewView } from '../components/PreviewView';
import { StudioHeader } from '../components/StudioHeader';
import { downloadProjectAsZip } from '../utils/projectUtils';
import { ComponentLibrary } from '../components/ComponentLibrary';

// FIX: Add missing 'netlifyPat' property to satisfy the Settings type.
const initialSettings: Settings = {
  geminiApiKey: '',
  supabaseUrl: '',
  supabaseAnonKey: '',
  stripePublicKey: '',
  stripeSecretKey: '',
  githubPat: '',
  netlifyPat: '',
};


export const StudioPage: React.FC<{ projectId: string }> = ({ projectId }) => {
  const [projects, setProjects] = useLocalStorage<Project[]>('ai-app-builder-projects', []);
  const [settings] = useLocalStorage<Settings>('ai-app-builder-settings', initialSettings);
  
  const [projectData, setProjectData] = useState<Project | null>(null);
  const [files, setFiles] = useState<GeneratedFile[]>([]);
  const [previewFile, setPreviewFile] = useState<GeneratedFile | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [isMacPreviewVisible, setIsMacPreviewVisible] = useState(false);

  useEffect(() => {
    const foundProject = projects.find(p => p.id === projectId);
    if (foundProject) {
      setProjectData(foundProject);
      setFiles(foundProject.files);
      setPreviewFile(foundProject.previewFile);
      setHasChanges(false);
    }
  }, [projectId, projects]);

  const handleFileUpdate = (path: string, content: string) => {
    setFiles(prev => prev.map(f => f.path === path ? { ...f, content } : f));
    if (previewFile?.path === path) {
        setPreviewFile({ path, content });
    }
    setHasChanges(true);
  };
  
  const handleFileDelete = (path: string) => {
    if (previewFile?.path === path) {
        alert("You cannot delete the main preview file. You can edit it instead.");
        return;
    }
    setFiles(prev => prev.filter(f => f.path !== path));
    setHasChanges(true);
  };

  const handleFileAdd = (path: string): boolean => {
    if (files.some(f => f.path === path)) {
        alert(`File "${path}" already exists.`);
        return false;
    }
    setFiles(prev => [...prev, { path, content: '// New file' }]);
    setHasChanges(true);
    return true;
  };
  
  const handleSave = () => {
    if (projectData) {
        const updatedProject: Project = { ...projectData, files, previewFile };
        setProjects(prev => prev.map(p => p.id === projectId ? updatedProject : p));
        setHasChanges(false);
    }
  };

  const handleDownload = () => {
    if (projectData) {
        const projectToDownload: Project = { ...projectData, files, previewFile };
        downloadProjectAsZip(projectToDownload);
    }
  };
  
  const livePreviewFile = useMemo(() => {
    return files.find(f => f.path === 'preview.html') || previewFile;
  }, [files, previewFile]);


  if (!projectData) {
    return (
      <div className="h-screen w-screen bg-transparent flex items-center justify-center">
        <Spinner className="w-10 h-10" />
        <p className="ml-4">Loading project...</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-transparent text-gray-900 flex flex-col font-sans overflow-hidden">
      <StudioHeader 
        projectName={projectData.name}
        onSave={handleSave}
        onDownload={handleDownload}
        isSaveEnabled={hasChanges}
      />
      <main className="flex-1 grid grid-cols-12 overflow-hidden">
        {/* Component Library */}
        <div className="col-span-3 h-full overflow-hidden border-r border-gray-200">
            <ComponentLibrary />
        </div>
        {/* Workspace */}
        <div className="col-span-5 h-full overflow-hidden border-r border-gray-200">
            <WorkspaceView 
                files={[...(previewFile ? [previewFile] : []), ...files.filter(f => f.path !== previewFile?.path)]}
                onFileUpdate={handleFileUpdate}
                onFileDelete={handleFileDelete}
                onFileAdd={handleFileAdd}
            />
        </div>
        {/* Preview */}
        <div className="col-span-4 h-full overflow-hidden">
            <PreviewView 
                file={livePreviewFile}
                onToggleMacPreview={() => setIsMacPreviewVisible(true)}
                deployments={projectData.deployments}
                techStack={projectData.stack}
            />
        </div>
      </main>
    </div>
  );
};
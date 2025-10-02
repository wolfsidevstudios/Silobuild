import React, { useState, useEffect } from 'react';
import { PreviewView } from './PreviewView';
import { CodeBracketIcon, EyeIcon } from './icons';
import { CodeFile } from '../types';

interface CodeEditorViewProps {
    files: CodeFile[];
}

const CodeEditorView: React.FC<CodeEditorViewProps> = ({ files }) => {
    const [activeFile, setActiveFile] = useState<string | null>(null);

    useEffect(() => {
        if (files.length > 0 && (!activeFile || !files.find(f => f.name === activeFile))) {
            setActiveFile(files[0].name);
        } else if (files.length === 0) {
            setActiveFile(null);
        }
    }, [files, activeFile]);

    const currentFile = files.find(file => file.name === activeFile);

    if (files.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center text-gray-500">
                <p>Generate some code to see the files here.</p>
            </div>
        );
    }
    
    return (
        <div className="flex-1 flex min-h-0 bg-gray-900">
            {/* File Tree */}
            <div className="w-48 bg-gray-950 border-r border-gray-800 p-2 overflow-y-auto">
                <h3 className="text-xs font-bold uppercase text-gray-500 mb-2 px-2">Files</h3>
                <ul>
                    {files.map(file => (
                        <li key={file.name}>
                            <button 
                                onClick={() => setActiveFile(file.name)}
                                className={`w-full text-left text-sm px-2 py-1 rounded ${activeFile === file.name ? 'bg-blue-500/20 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
                            >
                                {file.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            {/* Code Editor */}
            <div className="flex-1 p-4 overflow-y-auto">
                <pre className="text-sm h-full">
                    <code className="language-tsx h-full block whitespace-pre-wrap">
                        {currentFile?.content || 'Select a file to view its content.'}
                    </code>
                </pre>
            </div>
        </div>
    );
};

interface WorkspaceViewProps {
    files: CodeFile[];
}

export const WorkspaceView: React.FC<WorkspaceViewProps> = ({ files }) => {
    const [activeTab, setActiveTab] = useState<'code' | 'preview'>('preview');

    return (
        <div className="flex-1 flex flex-col bg-gray-900 min-h-0">
            <div className="flex-shrink-0 border-b border-gray-800 px-4">
                <div className="flex items-center gap-4">
                    <TabButton 
                        icon={<CodeBracketIcon className="w-5 h-5"/>} 
                        label="Code"
                        isActive={activeTab === 'code'}
                        onClick={() => setActiveTab('code')}
                    />
                    <TabButton 
                        icon={<EyeIcon className="w-5 h-5"/>} 
                        label="Preview"
                        isActive={activeTab === 'preview'}
                        onClick={() => setActiveTab('preview')}
                    />
                </div>
            </div>
            
            {activeTab === 'code' && <CodeEditorView files={files} />}
            {activeTab === 'preview' && <PreviewView files={files} />}
        </div>
    );
};

const TabButton: React.FC<{icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void}> = ({ icon, label, isActive, onClick }) => (
    <button 
        onClick={onClick}
        className={`flex items-center gap-2 py-3 px-2 border-b-2 text-sm font-medium transition-colors ${isActive ? 'border-blue-500 text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
    >
        {icon}
        {label}
    </button>
);

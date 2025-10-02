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
            <div className="flex-shrink-0 border-b border-gray-800 flex justify-end p-2 pr-4">
                <div className="relative flex items-center bg-black/20 backdrop-blur-sm p-1 rounded-full border border-white/10">
                    {/* The sliding white pill */}
                    <div 
                        className={`absolute top-1 left-1 h-[calc(100%-8px)] w-10 bg-white rounded-full shadow-lg transform transition-transform duration-300 ease-in-out ${activeTab === 'preview' ? 'translate-x-full' : 'translate-x-0'}`}
                    ></div>
                    <TabButton 
                        icon={<CodeBracketIcon className="w-5 h-5"/>} 
                        isActive={activeTab === 'code'}
                        onClick={() => setActiveTab('code')}
                    />
                    <TabButton 
                        icon={<EyeIcon className="w-5 h-5"/>} 
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

const TabButton: React.FC<{icon: React.ReactNode, isActive: boolean, onClick: () => void}> = ({ icon, isActive, onClick }) => (
    <button 
        onClick={onClick}
        className={`relative z-10 flex w-10 h-10 justify-center items-center rounded-full text-sm font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-opacity-75 ${isActive ? 'text-black' : 'text-gray-300 hover:text-white'}`}
    >
        {icon}
    </button>
);
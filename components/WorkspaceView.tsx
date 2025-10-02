import React, { useState } from 'react';
import { PreviewView } from './PreviewView';
import { CodeBracketIcon, EyeIcon } from './icons';

const CodeEditorView: React.FC = () => {
    const [activeFile, setActiveFile] = useState('index.tsx');
    const files = ['index.tsx', 'App.tsx', 'styles.css'];
    
    const codeContent = `
import React from 'react';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
    `.trim();

    return (
        <div className="flex-1 flex min-h-0 bg-gray-900">
            {/* File Tree */}
            <div className="w-48 bg-gray-950 border-r border-gray-800 p-2 overflow-y-auto">
                <h3 className="text-xs font-bold uppercase text-gray-500 mb-2">Files</h3>
                <ul>
                    {files.map(file => (
                        <li key={file}>
                            <button 
                                onClick={() => setActiveFile(file)}
                                className={`w-full text-left text-sm px-2 py-1 rounded ${activeFile === file ? 'bg-blue-500/20 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
                            >
                                {file}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            {/* Code Editor */}
            <div className="flex-1 p-4 overflow-y-auto">
                <pre className="text-sm">
                    <code className="language-tsx">
                        {codeContent}
                    </code>
                </pre>
            </div>
        </div>
    );
};

export const WorkspaceView: React.FC = () => {
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
            
            {activeTab === 'code' && <CodeEditorView />}
            {activeTab === 'preview' && <PreviewView />}
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
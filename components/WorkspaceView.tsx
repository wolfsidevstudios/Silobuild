import React, { useState, useEffect, useRef } from 'react';
import { PreviewView } from './PreviewView';
import { CodeBracketIcon, EyeIcon, WandIcon, ChatBubbleIcon } from './icons';
import { CodeFile } from '../types';

interface CodeActionToolbarProps {
    top: number;
    left: number;
    onFix: () => void;
    onAsk: () => void;
}

const CodeActionToolbar: React.FC<CodeActionToolbarProps> = ({ top, left, onFix, onAsk }) => {
    return (
        <div
            className="absolute z-20 flex items-center gap-1 bg-gray-950/80 backdrop-blur-md border border-white/20 rounded-full shadow-lg p-1"
            style={{ top: `${top}px`, left: `${left}px`, transform: 'translateX(-50%)' }}
        >
            <button onClick={onFix} className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full text-white hover:bg-white/20 transition-colors" title="Fix Errors">
                <WandIcon className="w-4 h-4"/>
                Fix Errors
            </button>
            <div className="h-4 w-px bg-white/20"></div>
            <button onClick={onAsk} className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full text-white hover:bg-white/20 transition-colors" title="Ask/Edit with AI">
                <ChatBubbleIcon className="w-4 h-4"/>
                Ask/Edit AI
            </button>
        </div>
    );
};

interface CodeEditorViewProps {
    files: CodeFile[];
    onFileContentChange: (fileName: string, newContent: string) => void;
    onFixCode: (code: string) => void;
    onAskAboutCode: (code: string) => void;
}

const CodeEditorView: React.FC<CodeEditorViewProps> = ({ files, onFileContentChange, onFixCode, onAskAboutCode }) => {
    const [activeFile, setActiveFile] = useState<string | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [toolbar, setToolbar] = useState<{ top: number; left: number; text: string } | null>(null);

    useEffect(() => {
        if (files.length > 0 && (!activeFile || !files.find(f => f.name === activeFile))) {
            setActiveFile(files[0].name);
        } else if (files.length === 0) {
            setActiveFile(null);
        }
    }, [files, activeFile]);

    const handleSelect = () => {
        const textarea = textareaRef.current;
        const selection = window.getSelection();
        if (textarea && selection && selection.toString().trim().length > 5) {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            const textareaRect = textarea.getBoundingClientRect();

            setToolbar({
                top: rect.top - textareaRect.top + textarea.scrollTop - 50, // 50px offset above selection
                left: rect.left - textareaRect.left + textarea.scrollLeft + rect.width / 2,
                text: selection.toString()
            });
        } else {
            setToolbar(null);
        }
    };
    
    // Hide toolbar when clicking outside or resizing
    useEffect(() => {
        const handleClickOrResize = () => setToolbar(null);
        window.addEventListener('mousedown', handleClickOrResize);
        window.addEventListener('resize', handleClickOrResize);
        return () => {
            window.removeEventListener('mousedown', handleClickOrResize);
            window.removeEventListener('resize', handleClickOrResize);
        };
    }, []);

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
            <div className="flex-1 p-4 overflow-y-auto relative" onClick={(e) => { if (e.target === e.currentTarget) setToolbar(null);}}>
                 <textarea
                    ref={textareaRef}
                    value={currentFile?.content || ''}
                    onChange={(e) => activeFile && onFileContentChange(activeFile, e.target.value)}
                    onSelect={handleSelect}
                    onScroll={() => setToolbar(null)}
                    className="w-full h-full bg-transparent text-gray-300 font-mono text-sm resize-none focus:outline-none"
                    spellCheck="false"
                 />
                 {toolbar && (
                    <CodeActionToolbar
                        top={toolbar.top}
                        left={toolbar.left}
                        onFix={() => { onFixCode(toolbar.text); setToolbar(null); }}
                        onAsk={() => { onAskAboutCode(toolbar.text); setToolbar(null); }}
                    />
                 )}
            </div>
        </div>
    );
};

interface WorkspaceViewProps {
    files: CodeFile[];
    onFileContentChange: (fileName: string, newContent: string) => void;
    onFixCode: (code: string) => void;
    onAskAboutCode: (code: string) => void;
}

export const WorkspaceView: React.FC<WorkspaceViewProps> = (props) => {
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
            
            {activeTab === 'code' && <CodeEditorView {...props} />}
            {activeTab === 'preview' && <PreviewView files={props.files} />}
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
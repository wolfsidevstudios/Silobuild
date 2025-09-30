import React, { useEffect, useRef } from 'react';
// @ts-ignore
import sdk from '@stackblitz/sdk';
import { GeneratedFile } from '../types';
import { Spinner } from './Spinner';

interface StackBlitzPreviewProps {
  files: GeneratedFile[];
  projectName: string;
}

export const StackBlitzPreview: React.FC<StackBlitzPreviewProps> = ({ files, projectName }) => {
    const embedRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (embedRef.current && files.length > 0) {
            embedRef.current.innerHTML = ''; // Clear previous embed before creating a new one

            const projectFiles = files.reduce((acc, file) => {
                acc[file.path] = file.content;
                return acc;
            }, {} as { [key: string]: string });
            
            if (!projectFiles['package.json']) {
                embedRef.current.innerHTML = '<div class="w-full h-full flex items-center justify-center text-red-500 p-4">Error: package.json not found in project files. The AI must generate this file for StackBlitz to work.</div>';
                return;
            }

            sdk.embedProject(
                embedRef.current,
                {
                    title: projectName,
                    description: 'A Silo Build project',
                    template: 'node', // Use node template for full control over package.json dependencies
                    files: projectFiles,
                },
                {
                    openFile: 'src/App.tsx',
                    view: 'preview',
                    height: '100%',
                    showSidebar: false,
                    theme: 'dark',
                    clickToLoad: true, // FIX: Use clickToLoad to avoid cross-origin isolation issues.
                }
            );
        }
    }, [files, projectName]);

    return (
        <div className="w-full h-full bg-gray-800 text-white flex items-center justify-center">
            <div ref={embedRef} className="w-full h-full">
                <div className="flex flex-col items-center justify-center h-full gap-2">
                    <Spinner className="w-8 h-8"/>
                    <p>Preparing StackBlitz preview...</p>
                </div>
            </div>
        </div>
    );
};
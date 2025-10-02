import React, { useState, useEffect, useRef } from 'react';
import { CodeFile } from '../types';

interface PreviewViewProps {
    files: CodeFile[];
}

const PreviewError: React.FC<{ error: string }> = ({ error }) => (
    <div className="p-4 bg-red-900/50 text-red-300 rounded-md">
        <h4 className="font-bold mb-2">Preview Error</h4>
        <pre className="text-xs whitespace-pre-wrap">{error}</pre>
    </div>
)

export const PreviewView: React.FC<PreviewViewProps> = ({ files }) => {
    const [previewContent, setPreviewContent] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        setError(null);

        const htmlFile = files.find(f => f.name === 'index.html');
        if (!htmlFile) {
            setPreviewContent('');
            if (files.length > 0) {
                setError("Entry file 'index.html' not found.");
            }
            return;
        }

        let htmlContent = htmlFile.content;

        const cssFile = files.find(f => f.name === 'style.css');
        if (cssFile) {
            // Replace stylesheet link with inline style tag
            const styleTag = `<style>${cssFile.content}</style>`;
            const linkRegex = /<link\s+.*?href="style\.css".*?>/i;
            if (linkRegex.test(htmlContent)) {
                 htmlContent = htmlContent.replace(linkRegex, styleTag);
            } else {
                // If not found, inject into head
                htmlContent = htmlContent.replace('</head>', `${styleTag}</head>`);
            }
        }

        const jsFile = files.find(f => f.name === 'script.js');
        if (jsFile) {
            // Replace script link with inline script tag
            const scriptTag = `<script>${jsFile.content}</script>`;
            const scriptRegex = /<script\s+.*?src="script\.js".*?>\s*<\/script>/i;
             if (scriptRegex.test(htmlContent)) {
                htmlContent = htmlContent.replace(scriptRegex, scriptTag);
            } else {
                // If not found, inject before closing body
                htmlContent = htmlContent.replace('</body>', `${scriptTag}</body>`);
            }
        }

        setPreviewContent(htmlContent);

    }, [files]);
    

    return (
        <div className="flex-1 flex items-center justify-center p-4 md:p-8 bg-gray-900">
            <div className="w-full h-full bg-gray-950 rounded-lg border border-gray-800 shadow-2xl flex flex-col">
                {/* Browser Chrome */}
                <div className="flex-shrink-0 flex items-center h-10 px-4 border-b border-gray-800">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex-1 text-center">
                        <div className="bg-gray-800 text-gray-400 text-sm rounded-full py-1 px-4 max-w-xs mx-auto">
                            localhost:3000
                        </div>
                    </div>
                    <div className="w-16"></div>
                </div>
                {/* Content */}
                <div className="flex-1 bg-white text-gray-800 overflow-auto">
                    {error && <div className="p-4"><PreviewError error={error} /></div>}
                    {!error && previewContent ? (
                         <iframe
                            ref={iframeRef}
                            srcDoc={previewContent}
                            title="Preview"
                            sandbox="allow-scripts allow-same-origin"
                            className="w-full h-full border-0"
                         />
                    ) : (
                         <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                            <h1 className="text-2xl font-bold text-gray-900">Live Preview</h1>
                            <p className="mt-2 text-gray-600">Your generated website will appear here.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
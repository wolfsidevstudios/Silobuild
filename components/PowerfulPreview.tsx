import React, { useState, useEffect, useRef } from 'react';
import { GeneratedFile } from '../types';
import { Spinner } from './Spinner';

// Make sure Babel is loaded in the main index.html
declare global {
    interface Window { Babel: any; }
}

const transpile = (code: string, path: string): string => {
    try {
        const result = window.Babel.transform(code, {
            presets: ['react', 'typescript'],
            filename: path, // For better error messages
        });
        return result.code || '';
    } catch (e) {
        console.error(`Babel compilation failed for ${path}:`, e);
        // Return code that displays the error in the preview iframe
        const errorMessage = e.message.replace(/"/g, "'").replace(/\n/g, '\\n');
        return `
            document.body.innerHTML = '<div style="font-family:monospace;color:red;padding:1rem;"><h3>Babel Error in ${path}</h3><pre>${errorMessage}</pre></div>';
            throw new Error("Babel compilation failed");
        `;
    }
};

export const PowerfulPreview: React.FC<{ files: GeneratedFile[] }> = ({ files }) => {
    const [iframeSrc, setIframeSrc] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState(true);
    const objectUrls = useRef<string[]>([]);

    useEffect(() => {
        // Cleanup function to revoke object URLs on component unmount
        return () => {
            objectUrls.current.forEach(url => URL.revokeObjectURL(url));
            objectUrls.current = [];
        };
    }, []);

    useEffect(() => {
        const buildPreview = async () => {
            if (files.length === 0 || !window.Babel) return;

            setIsLoading(true);

            // 1. Revoke any previous object URLs to prevent memory leaks
            objectUrls.current.forEach(url => URL.revokeObjectURL(url));
            objectUrls.current = [];

            // 2. Find base HTML, CSS, and script files
            let baseHtml = files.find(f => f.path === 'index.html')?.content;
            if (!baseHtml) {
                // Create a fallback if AI fails to provide one
                baseHtml = `<!DOCTYPE html><html><head><meta charset="UTF-8" /></head><body><div id="root"></div><script type="module" src="/src/index.tsx"></script></body></html>`;
            }

            const cssFiles = files.filter(f => f.path.endsWith('.css'));
            const scriptFiles = files.filter(f => /\.(js|ts|jsx|tsx)$/.test(f.path));
            
            // 3. Transpile script files and create blob URLs
            const importMap: { [key: string]: string } = {};
            
            for (const file of scriptFiles) {
                const transpiledCode = transpile(file.content, file.path);
                const blob = new Blob([transpiledCode], { type: 'text/javascript' });
                const url = URL.createObjectURL(blob);
                objectUrls.current.push(url);

                // Create mappings for absolute paths (e.g., /src/App.tsx)
                const absolutePath = `/${file.path}`;
                importMap[absolutePath] = url;
            }
            
            // 4. Combine all CSS into a single style tag
            const allCss = cssFiles.map(f => f.content).join('\n');
            const styleTag = `<style>${allCss}</style>`;

            // 5. Construct the final HTML for the iframe
            let finalHtml = baseHtml;
            
            // Inject styles and the import map into the head
            const importMapScript = `<script type="importmap">
            {
                "imports": {
                    "react": "https://esm.sh/react@19.0.0-rc.0",
                    "react-dom/client": "https://esm.sh/react-dom@19.0.0-rc.0/client",
                    ${Object.entries(importMap).map(([path, url]) => `"${path}": "${url}"`).join(',\n')}
                }
            }
            </script>`;
            finalHtml = finalHtml.replace('</head>', `${styleTag}${importMapScript}</head>`);
            
            // The entry script in index.html (e.g., <script type="module" src="/src/index.tsx">)
            // will now be resolved by our dynamic import map.

            const htmlBlob = new Blob([finalHtml], { type: 'text/html' });
            const htmlUrl = URL.createObjectURL(htmlBlob);
            objectUrls.current.push(htmlUrl);

            setIframeSrc(htmlUrl);
            setIsLoading(false);
        };

        buildPreview();

    }, [files]);

    return (
        <div className="w-full h-full bg-white relative">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                    <Spinner />
                    <p className="ml-2">Building preview...</p>
                </div>
            )}
            {iframeSrc && !isLoading && (
                <iframe
                    key={iframeSrc} // Re-mount iframe when src changes to ensure execution
                    src={iframeSrc}
                    title="Powerful Preview"
                    className="w-full h-full border-0"
                    sandbox="allow-scripts allow-same-origin"
                />
            )}
        </div>
    );
};

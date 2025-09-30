import React, { useState, useEffect, useRef } from 'react';
import { GeneratedFile } from '../types';
import { Spinner } from './Spinner';

declare global {
    interface Window { Babel: any; }
}

// Plugin to remove CSS imports, as they are handled separately
const createRemoveCssImportsPlugin = () => ({ types: t }: { types: any }) => ({
    visitor: {
        ImportDeclaration(path: any) {
            if (path.node.source.value.endsWith('.css')) {
                path.remove();
            }
        },
    },
});

// Plugin to resolve relative module paths to absolute paths for the import map
const createResolverPlugin = (allFiles: GeneratedFile[], currentFilePath: string) => {
    const filePaths = new Set(allFiles.map(f => f.path));

    const resolveExtension = (path: string): string | null => {
        const extensions = ['.js', '.ts', '.jsx', '.tsx'];
        if (filePaths.has(path)) return path;
        for (const ext of extensions) {
            if (filePaths.has(`${path}${ext}`)) return `${path}${ext}`;
        }
        return null;
    };

    return ({ types: t }: { types: any }) => ({
        visitor: {
            'ImportDeclaration|ExportNamedDeclaration|ExportAllDeclaration'(path: any) {
                if (!path.node.source) return;

                const source = path.node.source.value;
                if (source.startsWith('.')) {
                    const currentDir = currentFilePath.substring(0, currentFilePath.lastIndexOf('/'));
                    
                    let resolvedPath = new URL(source, `http://dummy.com/${currentDir}/`).pathname;
                    if (resolvedPath.startsWith('/')) {
                        resolvedPath = resolvedPath.substring(1);
                    }
                    
                    let resolvedFile = resolveExtension(resolvedPath);
                    if (!resolvedFile) {
                        const indexPath = resolvedPath.endsWith('/') ? `${resolvedPath}index` : `${resolvedPath}/index`;
                        resolvedFile = resolveExtension(indexPath);
                    }

                    if (resolvedFile) {
                        path.node.source.value = `/${resolvedFile}`;
                    } else {
                        console.warn(`Could not resolve relative import '${source}' in '${currentFilePath}'`);
                    }
                }
            },
        },
    });
};


const transpile = (code: string, path: string, allFiles: GeneratedFile[]): string => {
    try {
        const resolverPlugin = createResolverPlugin(allFiles, path);
        window.Babel.registerPlugin('module-resolver', resolverPlugin);

        const removeCssPlugin = createRemoveCssImportsPlugin();
        window.Babel.registerPlugin('remove-css-imports', removeCssPlugin);

        const result = window.Babel.transform(code, {
            presets: ['react', 'typescript'],
            filename: path,
            plugins: ['module-resolver', 'remove-css-imports'],
        });
        return result.code || '';
    } catch (e) {
        console.error(`Babel compilation failed for ${path}:`, e);
        const errorMessage = (e.message || 'Unknown error').replace(/"/g, "'").replace(/\n/g, '\\n');
        return `
            document.body.innerHTML = '<div style="font-family:monospace;color:red;padding:1rem;background: #fff;"><h3>Babel Error in ${path}</h3><pre>${errorMessage}</pre></div>';
            throw new Error("Babel compilation failed");
        `;
    }
};

export const PowerfulPreview: React.FC<{ files: GeneratedFile[] }> = ({ files }) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let objectUrls: string[] = [];

        const buildPreview = async () => {
            if (files.length === 0 || !window.Babel) {
                setIsLoading(false);
                return;
            }

            setIsLoading(true);

            let baseHtml = files.find(f => f.path === 'index.html')?.content;
            if (!baseHtml) {
                baseHtml = `<!DOCTYPE html><html><head><meta charset="UTF-8" /><title>Preview</title></head><body><div id="root"></div><script type="module" src="/src/index.tsx"></script></body></html>`;
            }

            const cssFiles = files.filter(f => f.path.endsWith('.css'));
            const scriptFiles = files.filter(f => /\.(js|ts|jsx|tsx)$/.test(f.path));
            
            const importMap: { [key: string]: string } = {};
            
            for (const file of scriptFiles) {
                const transpiledCode = transpile(file.content, file.path, scriptFiles);
                const blob = new Blob([transpiledCode], { type: 'text/javascript' });
                const url = URL.createObjectURL(blob);
                objectUrls.push(url);
                importMap[`/${file.path}`] = url;
            }
            
            const allCss = cssFiles.map(f => f.content).join('\n');
            const styleTag = `<style>${allCss}</style>`;

            const importMapScript = `<script type="importmap">
            {
                "imports": {
                    "react": "https://esm.sh/react@18.2.0",
                    "react-dom/client": "https://esm.sh/react-dom@18.2.0/client",
                    ${Object.entries(importMap).map(([path, url]) => `"${path}": "${url}"`).join(',\n')}
                }
            }
            </script>`;
            
            const finalHtml = baseHtml.replace('</head>', `${styleTag}${importMapScript}</head>`);
            
            if (iframeRef.current) {
                iframeRef.current.srcdoc = finalHtml;
            }
        };

        buildPreview();

        return () => {
            objectUrls.forEach(url => URL.revokeObjectURL(url));
        };

    }, [files]);

    return (
        <div className="w-full h-full bg-white relative">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                    <Spinner />
                    <p className="ml-2">Building preview...</p>
                </div>
            )}
            <iframe
                ref={iframeRef}
                title="Powerful Preview"
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-same-origin"
                onLoad={() => setIsLoading(false)}
            />
        </div>
    );
};
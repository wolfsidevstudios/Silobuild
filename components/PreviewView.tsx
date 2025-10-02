import React, { useState, useEffect, useRef } from 'react';
import { CodeFile } from '../types';

declare global {
    var svelte: any;
}

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
    const [error, setError] = useState<string | null>(null);
    const shadowHostRef = useRef<HTMLDivElement>(null);
    const componentInstanceRef = useRef<any | null>(null);

    useEffect(() => {
        const hostElement = shadowHostRef.current;
        if (!hostElement) return;

        let shadowRoot = hostElement.shadowRoot;
        if (!shadowRoot) {
            shadowRoot = hostElement.attachShadow({ mode: 'open' });
        }

        if (componentInstanceRef.current) {
            try {
                componentInstanceRef.current.$destroy();
            } catch (e) {
                console.warn("Error destroying Svelte component:", e);
            }
            componentInstanceRef.current = null;
        }
        shadowRoot.innerHTML = '';
        setError(null);

        const appSvelte = files.find(f => f.name === 'App.svelte');
        if (!appSvelte || !appSvelte.content) {
            return;
        }

        const compileAndRun = async () => {
            try {
                if (typeof window.svelte === 'undefined' || typeof window.svelte.compile !== 'function') {
                    throw new Error("Svelte compiler (window.svelte.compile) is not available. Check index.html for the compiler script tag.");
                }

                const { js, css } = window.svelte.compile(appSvelte.content, {
                    generate: 'dom',
                });

                if (css.code) {
                    const styleEl = document.createElement('style');
                    styleEl.textContent = css.code;
                    shadowRoot.appendChild(styleEl);
                }

                const mountPoint = document.createElement('div');
                shadowRoot.appendChild(mountPoint);
                
                const url = `data:text/javascript;base64,${btoa(js.code)}`;
                const module = await import(/* @vite-ignore */ url);
                
                if (!module.default) {
                    throw new Error("Compiled Svelte module is missing a default export.");
                }
                const SvelteComponent = module.default;

                componentInstanceRef.current = new SvelteComponent({
                    target: mountPoint,
                });

            } catch (e: any) {
                console.error("Svelte Preview Error:", e);
                setError(e.message);
            }
        };

        compileAndRun();

        return () => {
            if (componentInstanceRef.current) {
                try {
                    componentInstanceRef.current.$destroy();
                } catch (e) {
                     console.warn("Error destroying Svelte component on cleanup:", e);
                }
                componentInstanceRef.current = null;
            }
        };

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
                    <div ref={shadowHostRef} className="w-full h-full"></div>
                    {!error && (!files.find(f => f.name.endsWith('.svelte'))) && (
                         <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                            <h1 className="text-2xl font-bold text-gray-900">Live Preview</h1>
                            <p className="mt-2 text-gray-600">Your generated Svelte component will appear here.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
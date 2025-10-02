import React, { useState, useEffect } from 'react';
import { CodeFile } from '../types';

declare global {
    var Babel: any;
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
    const [Component, setComponent] = useState<React.FC | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const indexTsx = files.find(f => f.name === 'index.tsx');

        if (!indexTsx || !indexTsx.content) {
            setComponent(null);
            setError(null);
            return;
        }

        try {
            const transformedCode = window.Babel.transform(indexTsx.content, {
                presets: ['react'],
                plugins: [],
            }).code;

            const exports: { default?: React.FC } = {};
            const require = (name: string) => {
                if (name === 'react') return React;
                throw new Error(`Cannot find module '${name}'`);
            };

            const func = new Function('require', 'exports', transformedCode);
            func(require, exports);

            if (exports.default && typeof exports.default === 'function') {
                setComponent(() => exports.default!);
                setError(null);
            } else {
                 throw new Error("No default export found in index.tsx. The AI must export a default React component.");
            }
        } catch (e: any) {
            console.error("Transpilation/Render Error:", e);
            setError(e.message);
            setComponent(null);
        }
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
                    {!error && Component && <Component />}
                    {!error && !Component && (
                         <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                            <h1 className="text-2xl font-bold text-gray-900">Live Preview</h1>
                            <p className="mt-2 text-gray-600">Your generated component will appear here.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

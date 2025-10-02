import React from 'react';

export const PreviewView: React.FC = () => {
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
                <div className="flex-1 bg-white text-gray-800">
                    {/* This would typically be an iframe pointing to the dev server */}
                     <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                        <h1 className="text-3xl font-bold text-gray-900">SaaS Landing Page</h1>
                        <p className="mt-2 text-gray-600">Your live preview will appear here.</p>
                        <button className="mt-6 bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700">
                            Get Started for Free
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
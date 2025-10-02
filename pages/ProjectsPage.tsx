import React from 'react';
import { PlusIcon } from '../components/icons';

const ProjectCard: React.FC<{ name: string; description: string }> = ({ name, description }) => (
    <a href="#/builder" className="bg-gray-900 border border-gray-800 rounded-lg p-5 hover:border-blue-500 transition-colors cursor-pointer block h-full flex flex-col">
        <h3 className="font-bold text-lg text-white">{name}</h3>
        <p className="text-gray-400 text-sm mt-1 flex-grow">{description}</p>
        <div className="mt-4 text-xs text-gray-500">Last updated: 3 hours ago</div>
    </a>
);


export const ProjectsPage: React.FC = () => {
    return (
        <>
            <header className="bg-gray-950/80 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-10">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-white">Projects</h1>
                    <a href="#/builder" className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition-colors text-sm">
                        <PlusIcon className="h-4 w-4" />
                        New Project
                    </a>
                </div>
            </header>
            <main className="container mx-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <a href="#/builder" className="border-2 border-dashed border-gray-700 rounded-lg flex flex-col items-center justify-center p-5 text-gray-500 hover:text-white hover:border-white transition-colors h-full min-h-[150px]">
                        <PlusIcon className="h-8 w-8 mb-2" />
                        <span className="font-semibold">Create New Project</span>
                    </a>
                    <ProjectCard name="E-commerce Dashboard" description="Analytics platform for online sales." />
                    <ProjectCard name="SaaS Landing Page" description="Marketing site for a new software tool." />
                    <ProjectCard name="Mobile App Backend" description="API and database for a fitness app." />
                </div>
            </main>
        </>
    );
};
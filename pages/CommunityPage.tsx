import React from 'react';
import { UsersIcon } from '../components/icons';

// Star icon for ratings
const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
    <svg className={`w-4 h-4 ${filled ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);


// Mock data for community projects
const communityProjects = [
    {
        id: 1,
        name: "Pomodoro Focus Timer",
        author: "Alex J.",
        previewImage: "https://i.imgur.com/3ZgqjYq.png",
        rating: 5,
        prompt: "Create a Pomodoro timer application. It should have a main timer display that defaults to 25:00. Include 'Start', 'Pause', and 'Reset' buttons. The UI should be clean, minimalist, and centered with a red background for work sessions.",
    },
    {
        id: 2,
        name: "Kanban Task Board",
        author: "Brenda K.",
        previewImage: "https://i.imgur.com/s6aV3bV.png",
        rating: 4,
        prompt: "Build a Kanban board application with three columns: 'To Do', 'In Progress', and 'Done'. Users should be able to add new task cards to the 'To Do' column. The task cards should be draggable between the columns. Use a modern, dark theme.",
    },
    {
        id: 3,
        name: "Weather Dashboard",
        author: "Carlos D.",
        previewImage: "https://i.imgur.com/J3Nqg8S.png",
        rating: 4,
        prompt: "Create a weather app. It should have an input field for a city name. When the user submits, use a free weather API to fetch and display the current temperature, weather conditions (e.g., 'Cloudy'), humidity, and a 5-day forecast. The UI should be modern with nice icons.",
    },
    {
        id: 4,
        name: "SaaS Landing Page",
        author: "Diana F.",
        previewImage: "https://i.imgur.com/9O0Zz1k.png",
        rating: 5,
        prompt: "Create a modern landing page for a fictional SaaS product called 'CodeFlow'. It needs a hero section with a headline and call-to-action button, a features section with icons, a pricing section, and a simple footer. Use a purple and dark gray color scheme.",
    },
    {
        id: 5,
        name: "Recipe Finder",
        author: "Eric G.",
        previewImage: "https://i.imgur.com/p5A8J6o.png",
        rating: 4,
        prompt: "Build a recipe finder app. The user should be able to enter an ingredient (e.g., 'chicken'). Use a free recipe API (like TheMealDB) to fetch and display a grid of recipes that include that ingredient. Show a picture and the name for each recipe.",
    },
    {
        id: 6,
        name: "Note Taking App",
        author: "Fiona H.",
        previewImage: "https://i.imgur.com/qW8gD7L.png",
        rating: 5,
        prompt: "Build a simple note-taking application. It should have a sidebar to list note titles and a main content area to edit the selected note. Use local storage to save the notes. Add basic markdown support for the note content and a dark mode toggle.",
    },
];

const CommunityProjectCard: React.FC<{ project: typeof communityProjects[0] }> = ({ project }) => {
    const handleRemix = () => {
        sessionStorage.setItem('initialPrompt', project.prompt);
        window.location.hash = '#/builder';
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="aspect-w-16 aspect-h-9 bg-gray-100 overflow-hidden">
                <img src={project.previewImage} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-4">
                <h3 className="font-bold text-gray-900 truncate">{project.name}</h3>
                <p className="text-sm text-gray-500">by {project.author}</p>
                <div className="flex items-center mt-2">
                    {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} filled={i < project.rating} />
                    ))}
                    <span className="text-xs text-gray-400 ml-2">({Math.floor(Math.random() * 200) + 10} reviews)</span>
                </div>
                <button
                    onClick={handleRemix}
                    className="mt-4 w-full bg-blue-600 text-white px-3 py-1.5 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors"
                >
                    Remix This App
                </button>
            </div>
        </div>
    );
};


export const CommunityPage: React.FC = () => {
    return (
        <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
                <UsersIcon className="w-8 h-8 text-blue-500" />
                <h1 className="text-3xl font-bold">Community Showcase</h1>
            </div>
            <p className="text-gray-600 mb-8 max-w-3xl">
                Explore and get inspired by apps built by the Silo Build community. See something you like? Remix it to make it your own!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {communityProjects.map(project => (
                    <CommunityProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
}
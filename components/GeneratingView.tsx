import React, { useState, useEffect } from 'react';

const messages = [
    "Compiling components...",
    "Brewing fresh code...",
    "Assembling the pixels...",
    "Reticulating splines...",
    "Polishing the user interface...",
    "Finalizing the build..."
];

export const GeneratingView: React.FC = () => {
    const [message, setMessage] = useState(messages[0]);
    const [isCompleting, setIsCompleting] = useState(false);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setMessage(prev => {
                const currentIndex = messages.indexOf(prev);
                return messages[(currentIndex + 1) % messages.length];
            });
        }, 2000);
        
        // Trigger completion animation after a delay
        setTimeout(() => setIsCompleting(true), 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden">
            <div 
                className={`blob absolute w-96 h-96 transition-transform duration-1000 ease-in-out ${isCompleting ? 'scale-[15]' : ''}`}
            ></div>
            <div className={`relative z-10 text-center text-white transition-opacity duration-500 ${isCompleting ? 'opacity-0' : 'opacity-100'}`}>
                <h1 className="text-4xl font-bold mb-4">Building Your App</h1>
                <p className="text-lg text-gray-300 animate-pulse">{message}</p>
            </div>
        </div>
    );
};
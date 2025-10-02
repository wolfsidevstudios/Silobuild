import React from 'react';
// Fix: Corrected import path
import { CloseIcon } from './icons';

interface ImprovementModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ImprovementModal: React.FC<ImprovementModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity" onClick={onClose}></div>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div 
                    className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-md m-4 transform transition-all text-white"
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                >
                    <div className="p-6 relative">
                         <button 
                            onClick={onClose} 
                            className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                            aria-label="Close notification"
                        >
                           <CloseIcon />
                        </button>
                        <div className="bg-blue-500/10 text-blue-400 w-12 h-12 rounded-lg flex items-center justify-center border border-blue-500/20 text-2xl mb-4">
                            <span className="material-symbols-outlined">build</span>
                        </div>
                        <h2 className="text-xl font-bold">Under Improvement</h2>
                        <p className="text-gray-400 mt-2">
                            This application is currently undergoing improvements and maintenance. Some features may not be fully functional. Thank you for your understanding.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

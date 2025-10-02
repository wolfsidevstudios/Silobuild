import React from 'react';
import { Spinner } from './Spinner';

export interface Plan {
    plan: string;
    todo: string[];
}

interface PlanReviewViewProps {
    plan: Plan | null;
    onApprove: () => void;
    onDecline: () => void;
}

export const PlanReviewView: React.FC<PlanReviewViewProps> = ({ plan, onApprove, onDecline }) => {

    if (!plan) {
        return (
            <div className="flex flex-col items-center text-center text-white animate-pulse">
                <Spinner className="w-10 h-10 mb-4" />
                <h2 className="text-xl font-semibold">The AI is thinking...</h2>
                <p className="text-gray-400">Crafting a plan for your application.</p>
            </div>
        );
    }
    
    return (
        <div className="w-full max-w-3xl bg-gray-900/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-8 text-white animate-fade-in">
            <h1 className="text-3xl font-bold mb-6 text-center">Here's the Plan</h1>

            <div className="space-y-6">
                <div>
                    <h2 className="text-lg font-semibold text-blue-400 border-b border-blue-400/20 pb-2 mb-3">
                        High-Level Plan
                    </h2>
                    <p className="text-gray-300">{plan.plan}</p>
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-blue-400 border-b border-blue-400/20 pb-2 mb-3">
                        To-Do List
                    </h2>
                    <ul className="space-y-2">
                        {plan.todo.map((item, index) => (
                             <li key={index} className="flex items-start gap-3">
                                <span className="text-blue-400 mt-1">&#10003;</span>
                                <span className="text-gray-300">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-700 flex justify-center gap-4">
                <button
                    onClick={onDecline}
                    className="bg-gray-700 text-gray-200 px-8 py-3 rounded-full font-semibold hover:bg-gray-600 transition-colors"
                >
                    Decline
                </button>
                <button
                    onClick={onApprove}
                    className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition-colors"
                >
                    Approve & Build
                </button>
            </div>
        </div>
    );
};
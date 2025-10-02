import React, { useState } from 'react';
import { InitialPromptView } from '../components/InitialPromptView';
import { PlanReviewView, Plan } from '../components/PlanReviewView';
import { GeneratingView } from '../components/GeneratingView';
import { generatePlan, generateInitialCode } from '../services/geminiService';
import { CodeFile } from '../types';

type CreationStep = 'prompt' | 'review' | 'generating' | 'error';

export const CreationFlowPage: React.FC = () => {
    const [step, setStep] = useState<CreationStep>('prompt');
    const [prompt, setPrompt] = useState('');
    const [plan, setPlan] = useState<Plan | null>(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [generatedFiles, setGeneratedFiles] = useState<CodeFile[]>([]);

    const handlePromptSubmit = async (submittedPrompt: string) => {
        setPrompt(submittedPrompt);
        setStep('review'); // Show loading state on review page
        setPlan(null);
        try {
            const generatedPlan = await generatePlan(submittedPrompt);
            setPlan(generatedPlan);
        } catch (error: any) {
            setErrorMessage(error.message || 'Failed to generate a plan.');
            setStep('error');
        }
    };

    const handlePlanApprove = async () => {
        setStep('generating');
        try {
            const result = await generateInitialCode(prompt);
            setGeneratedFiles(result.files);
            // Simulate build time before redirect
            setTimeout(() => {
                // Store files in sessionStorage for the builder page to pick up
                sessionStorage.setItem('initial_files', JSON.stringify(result.files));
                window.location.hash = '#/builder';
            }, 2000); // Wait for explosion animation
        } catch (error: any) {
             setErrorMessage(error.message || 'Failed to generate the application code.');
             setStep('error');
        }
    };

    const handlePlanDecline = () => {
        setStep('prompt');
        setPrompt('');
        setPlan(null);
    };

    const handleRetry = () => {
        setStep('prompt');
        setErrorMessage('');
    };

    const renderContent = () => {
        switch(step) {
            case 'prompt':
                return <InitialPromptView onSubmit={handlePromptSubmit} />;
            case 'review':
                return <PlanReviewView plan={plan} onApprove={handlePlanApprove} onDecline={handlePlanDecline} />;
            case 'generating':
                return <GeneratingView files={generatedFiles} />;
            case 'error':
                 return (
                    <div className="text-center text-white">
                        <h2 className="text-2xl font-bold mb-4">An Error Occurred</h2>
                        <p className="text-red-400 mb-6">{errorMessage}</p>
                        <button onClick={handleRetry} className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200">
                            Try Again
                        </button>
                    </div>
                );
        }
    };

    const backgroundStyle = step === 'prompt' ? {
        backgroundImage: 'url(https://i.ibb.co/yYc7P5T/image.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    } : {};

    return (
        <div
            className={`flex flex-col items-center justify-center min-h-screen transition-colors duration-300 ${step !== 'prompt' ? 'bg-gray-950 p-4' : 'bg-black'}`}
            style={backgroundStyle}
        >
            {renderContent()}
        </div>
    );
};
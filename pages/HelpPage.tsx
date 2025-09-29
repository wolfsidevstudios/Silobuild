import React, { useState } from 'react';
import { HelpCircleIcon, ChevronDownIcon } from '../components/icons';

const FaqItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-gray-200">
            <button
                className="w-full flex justify-between items-center text-left py-4"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-semibold text-gray-900">{question}</span>
                <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="pb-4 text-gray-700">
                    <p>{answer}</p>
                </div>
            )}
        </div>
    );
};

export const HelpPage: React.FC = () => {
    return (
        <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
                <HelpCircleIcon className="w-8 h-8 text-blue-500" />
                <h1 className="text-3xl font-bold">Help & Support</h1>
            </div>
             <p className="text-gray-600 mb-8 max-w-3xl">
                Find answers to common questions about Silo Build.
            </p>

            <div className="max-w-3xl bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">
                    <FaqItem
                        question="Where do I get a Google Gemini API key?"
                        answer="You can get a Gemini API key from Google AI Studio. Visit the Google AI for Developers website, sign in with your Google account, and create a new API key in the dashboard."
                    />
                    <FaqItem
                        question="Are my API keys and project data secure?"
                        answer="Yes. All your data, including API keys and project files, is stored exclusively in your browser's local storage. It is never sent to our servers, ensuring your information remains private and under your control."
                    />
                     <FaqItem
                        question="How are my projects saved?"
                        answer="Projects are saved directly in your browser's local storage. This means they are tied to the browser you are using. If you clear your browser data or switch to a different browser or device, your projects will not be available."
                    />
                    <FaqItem
                        question="What technology stacks can the AI generate?"
                        answer="Silo Build supports generating applications using React, Vue, Svelte, and Node.js (with Express), all using TypeScript. It can also generate simple, single-file vanilla HTML, CSS, and JavaScript applications with Tailwind CSS."
                    />
                    <FaqItem
                        question="Can I use the generated code for commercial projects?"
                        answer="Absolutely. You own the code that's generated. You are free to use it for any purpose, personal or commercial, without any restrictions from us."
                    />
                </div>
            </div>
        </div>
    );
};

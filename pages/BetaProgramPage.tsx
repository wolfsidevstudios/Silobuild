import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { FlaskIcon, CheckIcon, BugIcon, PaintBrushIcon } from '../components/icons';

const BetaFeature: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-200">
        <div className="text-blue-500 mt-1">{icon}</div>
        <div>
            <h4 className="font-semibold text-gray-900">{title}</h4>
            <p className="text-sm text-gray-600">{description}</p>
        </div>
    </div>
);

export const BetaProgramPage: React.FC = () => {
    const [isBetaMember, setIsBetaMember] = useLocalStorage('isBetaMember', false);

    return (
        <div className="p-8 h-full overflow-y-auto">
            <div className="flex items-center gap-3 mb-4">
                <FlaskIcon className="w-8 h-8 text-yellow-500" />
                <h1 className="text-3xl font-bold">Beta Program</h1>
            </div>

            {isBetaMember ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-3xl">
                    <div className="flex items-center gap-3 mb-3">
                        <CheckIcon className="w-6 h-6 text-green-600" />
                        <h2 className="text-2xl font-semibold text-green-800">You're in the Beta Program!</h2>
                    </div>
                    <p className="text-green-700/80 mb-6">
                        You have early access to our newest features. You'll see new tools appear in your sidebar.
                    </p>

                    <div className="space-y-4 mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">Unlocked Features:</h3>
                        <BetaFeature 
                            icon={<BugIcon />}
                            title="AI Debugger"
                            description="A conceptual tool to help find and fix errors in your code using AI analysis. (Coming Soon)"
                        />
                        <BetaFeature 
                            icon={<PaintBrushIcon />}
                            title="Theme Editor"
                            description="A visual editor to customize the look and feel of your application with AI suggestions. (Coming Soon)"
                        />
                    </div>

                    <button
                        onClick={() => setIsBetaMember(false)}
                        className="bg-red-100 text-red-700 px-4 py-2 text-sm rounded-lg font-semibold hover:bg-red-200 transition-colors"
                    >
                        Leave Beta Program
                    </button>
                </div>
            ) : (
                <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-3xl shadow-sm">
                    <h2 className="text-2xl font-semibold mb-3">Get Early Access to New Features</h2>
                    <p className="text-gray-600 mb-6">
                        Join the Silo Build Beta Program to try out new tools and features before they're released to everyone.
                        Help us shape the future of AI-powered development!
                    </p>
                    <button
                        onClick={() => setIsBetaMember(true)}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                        Join Beta Program
                    </button>
                </div>
            )}
        </div>
    );
};
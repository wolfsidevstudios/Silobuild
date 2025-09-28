import React from 'react';

export const BetaProgramPage: React.FC = () => {
    return (
        <div className="p-8 h-full overflow-y-auto">
            <h1 className="text-3xl font-bold mb-6">Beta Program</h1>

            <div className="bg-white/5 border border-white/10 rounded-lg p-6 max-w-2xl space-y-6 text-gray-300">
                <div>
                    <h2 className="text-2xl font-semibold text-white mb-2">Join Our Beta!</h2>
                    <p>
                        Welcome to the Silo Build Beta Program! We're thrilled to have you here. As a beta tester, you get early access to our latest features and have a direct impact on the development of the tool.
                    </p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-white mb-2">What to Expect</h3>
                    <ul className="list-disc list-inside space-y-2 pl-2 text-gray-400">
                        <li>Access to experimental features not yet available to the public.</li>
                        <li>Occasional bugs or rough edges – your feedback helps us smooth them out!</li>
                        <li>Direct communication channels with the development team.</li>
                        <li>A chance to shape the future of AI-powered development.</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-white mb-2">How to Provide Feedback</h3>
                    <p>
                        Your feedback is invaluable. If you encounter a bug, have a feature request, or just want to share your thoughts, please reach out to us via our dedicated feedback channel.
                    </p>
                    <a href="mailto:feedback@example.com" className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600 transition-colors">
                        Send Feedback
                    </a>
                </div>

                <div>
                    <p className="text-sm text-gray-500">
                        Thank you for helping us build a better tool for developers!
                    </p>
                </div>
            </div>
        </div>
    );
};

import React from 'react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen font-sans">
      <header className="bg-black/30 backdrop-blur-lg z-20 border-b border-white/10 sticky top-0">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          <a href="#/" className="text-xl font-bold">Silo Build</a>
          <a href="#/" className="bg-blue-600 text-white px-4 py-2 text-sm rounded-full font-semibold hover:bg-blue-700 transition-colors">
            Back to Home
          </a>
        </nav>
      </header>
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <div className="prose prose-invert prose-lg text-gray-300 space-y-4">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p>This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Silo Build Service and the choices you have associated with that data.</p>
            
            <h2 className="text-2xl font-semibold text-white pt-4">1. Information Collection and Use</h2>
            <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
            <h3>Personal Data</h3>
            <p>While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:</p>
            <ul>
                <li>Email address (via Google Sign-In)</li>
                <li>Name (via Google Sign-In)</li>
                <li>Profile Picture (via Google Sign-In)</li>
            </ul>

            <h3>Usage Data</h3>
            <p>Prompts and generated code are processed by the Google Gemini API. We do not store your prompts or the generated code on our servers. Your projects are saved in your browser's local storage.</p>
            
            <h2 className="text-2xl font-semibold text-white pt-4">2. Use of Data</h2>
            <p>We use the collected data for various purposes:</p>
            <ul>
                <li>To provide and maintain the Service</li>
                <li>To manage your account</li>
                <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
            </ul>

            <h2 className="text-2xl font-semibold text-white pt-4">3. Data Storage</h2>
            <p>Your user profile information and created projects are stored exclusively in your web browser's local storage. We do not have access to this data. If you clear your browser's data, this information will be permanently deleted.</p>

            <h2 className="text-2xl font-semibold text-white pt-4">4. Service Providers</h2>
            <p>We may employ third-party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, or to assist us in analyzing how our Service is used.</p>
            <ul>
                <li><strong>Google Identity Services:</strong> Used for user authentication. Please see Google's Privacy Policy for more information.</li>
                <li><strong>Google Gemini API:</strong> Used to process your prompts and generate code. Please see Google's API policies for more information.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-white pt-4">5. Security of Data</h2>
            <p>The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>
            
            <h2 className="text-2xl font-semibold text-white pt-4">6. Changes to This Privacy Policy</h2>
            <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
            
            <h2 className="text-2xl font-semibold text-white pt-4">Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us.</p>
            <p className="pt-6 font-bold text-red-400">Disclaimer: This is a template Privacy Policy. You should consult with a legal professional to ensure it meets your specific needs.</p>
        </div>
      </main>
    </div>
  );
};
import React, { useState, useEffect } from 'react';
import { Spinner } from './Spinner';

interface PublishFormProps {
  onPublish: (token: string) => void;
  initialToken?: string;
  isDeploying: boolean;
}

export const PublishForm: React.FC<PublishFormProps> = ({ onPublish, initialToken = '', isDeploying }) => {
  const [token, setToken] = useState(initialToken);

  useEffect(() => {
    setToken(initialToken);
  }, [initialToken]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPublish(token);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <h3 className="text-2xl font-bold text-gray-900">Deploy to Vercel</h3>
      <p className="text-gray-600 mb-6 max-w-sm">
        Enter your Vercel Access Token to create a new deployment.
      </p>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <input
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Vercel Access Token"
          className="w-full bg-gray-50 border border-gray-300 rounded-md p-3 mb-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={!token.trim() || isDeploying}
          className="w-full bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isDeploying ? <Spinner className="w-5 h-5 text-white" /> : 'Deploy to Vercel'}
        </button>
      </form>
    </div>
  );
};
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
      <h3 className="text-2xl font-bold mb-2">Deploy to Vercel</h3>
      <p className="text-gray-400 mb-6 max-w-sm">
        Enter your Vercel Access Token to create a new deployment.
      </p>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <input
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Vercel Access Token"
          className="w-full bg-white/5 border border-white/10 rounded-md p-3 mb-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={!token.trim() || isDeploying}
          className="w-full bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isDeploying ? <Spinner className="w-5 h-5 text-black" /> : 'Deploy to Vercel'}
        </button>
      </form>
    </div>
  );
};

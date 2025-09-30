import React, { useState } from 'react';
import { CredentialRequest } from '../types';
import { KeyIcon } from './icons';

interface CredentialRequestFormProps {
  request: CredentialRequest;
  onSubmit: (credentials: Record<string, string>) => void;
}

export const CredentialRequestForm: React.FC<CredentialRequestFormProps> = ({ request, onSubmit }) => {
  const [credentials, setCredentials] = useState<Record<string, string>>(() => {
    const initialState: Record<string, string> = {};
    request.fields.forEach(field => {
      initialState[field.key] = '';
    });
    return initialState;
  });

  const handleChange = (key: string, value: string) => {
    setCredentials(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(credentials);
  };

  const isFormValid = request.fields.every(field => credentials[field.key]?.trim() !== '');

  return (
    <form onSubmit={handleSubmit} className="mt-3 border-t border-gray-200 pt-3 space-y-4">
      <h4 className="text-xs font-semibold text-gray-500 mb-2">
        Action Required: Please provide credentials for {request.toolName}
      </h4>
      {request.fields.map(field => (
        <div key={field.key}>
          <label htmlFor={field.key} className="block text-sm font-medium text-gray-800">
            {field.label}
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <KeyIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              id={field.key}
              value={credentials[field.key]}
              onChange={(e) => handleChange(field.key, e.target.value)}
              className="block w-full rounded-md border-gray-300 bg-gray-50 pl-10 pr-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
           <p className="mt-1 text-xs text-gray-500">{field.description}</p>
        </div>
      ))}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!isFormValid}
          className="bg-blue-600 text-white px-4 py-2 text-sm rounded-md font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Provide Credentials & Continue
        </button>
      </div>
    </form>
  );
};
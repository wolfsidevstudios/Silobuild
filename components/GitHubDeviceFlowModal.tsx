import React, { useState, useEffect, useRef } from 'react';
import { Spinner } from './Spinner';
import { CloseIcon, UploadIcon } from './icons';

const GITHUB_CLIENT_ID = 'Iv23livw8759ImCaJKoM';

interface GitHubDeviceFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (token: string) => void;
}

interface DeviceCodeResponse {
  device_code: string;
  user_code: string;
  verification_uri: string;
  expires_in: number;
  interval: number;
}

export const GitHubDeviceFlowModal: React.FC<GitHubDeviceFlowModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [deviceCodeData, setDeviceCodeData] = useState<DeviceCodeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'requestingCode' | 'awaitingUser' | 'success' | 'error'>('idle');
  const pollIntervalRef = useRef<number | null>(null);

  const cleanup = () => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
  };

  useEffect(() => {
    if (!isOpen) {
      cleanup();
      setStatus('idle');
      setDeviceCodeData(null);
      setError(null);
      return;
    }

    const startDeviceFlow = async () => {
      setStatus('requestingCode');
      setError(null);
      try {
        const response = await fetch('https://github.com/login/device/code', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ client_id: GITHUB_CLIENT_ID }),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error_description || 'Failed to start device flow.');
        }
        const data: DeviceCodeResponse = await response.json();
        setDeviceCodeData(data);
        setStatus('awaitingUser');
        window.open(`https://${data.verification_uri}`, '_blank', 'noopener,noreferrer');
        startPolling(data.device_code, data.interval);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        setStatus('error');
      }
    };

    const startPolling = (deviceCode: string, intervalSeconds: number) => {
      pollIntervalRef.current = window.setInterval(async () => {
        try {
          const response = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              client_id: GITHUB_CLIENT_ID,
              device_code: deviceCode,
              grant_type: 'urn:ietf:params:oauth:grant-type:device_code',
            }),
          });
          
          const tokenData = await response.json();
          
          if (response.ok && tokenData.access_token) {
            cleanup();
            setStatus('success');
            onSuccess(tokenData.access_token);
            onClose();
            return;
          }

          if (tokenData.error) {
             if (tokenData.error === 'authorization_pending') {
               // This is expected, continue polling
               return;
             }
             if (tokenData.error === 'slow_down') {
                // Not implemented, but in a real app we'd increase interval
                console.warn('GitHub API requested to slow down polling.');
                return;
             }
             if (tokenData.error === 'expired_token') {
                setError('The authorization code has expired. Please try again.');
             } else if (tokenData.error === 'access_denied') {
                setError('Authorization was denied. You can close this window.');
             } else {
                setError(tokenData.error_description || 'An error occurred while polling.');
             }
             setStatus('error');
             cleanup();
          }

        } catch (err) {
          setError(err instanceof Error ? err.message : 'Polling failed.');
          setStatus('error');
          cleanup();
        }
      }, (intervalSeconds || 5) * 1000);
    };

    startDeviceFlow();

    return () => cleanup();
  }, [isOpen, onSuccess, onClose]);
  
  const handleCopyCode = () => {
    if (deviceCodeData?.user_code) {
      navigator.clipboard.writeText(deviceCodeData.user_code).then(() => {
        // maybe show a "copied!" message
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-4">
            <h2 className="text-xl font-bold">Connect to GitHub</h2>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100"><CloseIcon/></button>
        </div>

        {status === 'requestingCode' && <div className="flex justify-center p-8"><Spinner className="w-8 h-8"/></div>}
        
        {status === 'error' && (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg">
                <p className="font-bold">Error</p>
                <p className="text-sm">{error}</p>
            </div>
        )}

        {status === 'awaitingUser' && deviceCodeData && (
            <div className="text-center">
                <p className="text-gray-600 mb-4">We've opened a new tab for you to authorize. If it didn't open, use the button below and enter the one-time code.</p>

                <div className="my-6 p-4 bg-gray-100 rounded-lg border border-gray-300">
                    <p className="text-sm text-gray-500 mb-2">Your one-time code:</p>
                    <div className="flex items-center justify-center gap-4">
                         <p className="text-3xl font-mono tracking-widest font-bold">{deviceCodeData.user_code}</p>
                         <button onClick={handleCopyCode} className="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-md">Copy</button>
                    </div>
                </div>

                <button 
                    onClick={() => window.open(`https://${deviceCodeData.verification_uri}`, '_blank', 'noopener,noreferrer')}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors"
                >
                    <UploadIcon className="w-4 h-4" />
                    Open GitHub Authorization Page
                </button>

                <div className="mt-6 flex items-center justify-center gap-3 text-gray-500">
                    <Spinner className="w-5 h-5"/>
                    <p>Waiting for authorization...</p>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};
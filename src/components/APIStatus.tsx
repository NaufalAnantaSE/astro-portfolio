import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../lib/api';

export const APIStatus = () => {
    const [apiStatus, setApiStatus] = useState<'checking' | 'connected' | 'disconnected' | 'unauthorized'>('checking');
    const [errorDetails, setErrorDetails] = useState<string>('');

    useEffect(() => {
        const checkApiStatus = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/projects`, { cache: 'no-store' });

                if (response.status === 401) {
                    setApiStatus('unauthorized');
                    setErrorDetails('');
                } else if (response.ok) {
                    setApiStatus('connected');
                    setErrorDetails('');
                } else {
                    setApiStatus('disconnected');
                    setErrorDetails(`HTTP ${response.status}: ${response.statusText}`);
                }
            } catch (error) {
                setApiStatus('disconnected');
                setErrorDetails(error instanceof Error ? error.message : 'Network error');
            }
        };

        checkApiStatus();
        // Check every 30 seconds
        const interval = setInterval(checkApiStatus, 30000);

        return () => clearInterval(interval);
    }, []);

    const getStatusColor = () => {
        switch (apiStatus) {
            case 'connected': return 'bg-green-500';
            case 'unauthorized': return 'bg-yellow-500';
            case 'disconnected': return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };

    const getStatusText = () => {
        switch (apiStatus) {
            case 'connected': return 'API Connected';
            case 'unauthorized': return 'API Requires Auth';
            case 'disconnected': return 'API Disconnected';
            default: return 'Checking API...';
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <div className="flex items-center gap-2 bg-black/80 text-white px-3 py-2 rounded-lg backdrop-blur-md">
                <div className={`w-2 h-2 rounded-full ${getStatusColor()}`}></div>
                <span className="text-sm">{getStatusText()}</span>
                {apiStatus === 'disconnected' && errorDetails && (
                    <span className="text-xs text-red-200 ml-2" title={errorDetails}>
                        ({errorDetails.length > 20 ? errorDetails.substring(0, 20) + '...' : errorDetails})
                    </span>
                )}
            </div>
        </div>
    );
};

export default APIStatus;

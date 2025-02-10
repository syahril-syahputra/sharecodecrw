'use client';

import { useEffect } from 'react';

export default function GlobalErrorHandler(): null {
    useEffect(() => {
        const handleError = (
            eventOrMessage: string | Event,
            source?: string,
            lineno?: number,
            colno?: number,
            error?: Error
        ): void => {
            if (typeof eventOrMessage === 'string') {
                logClientError({
                    message: eventOrMessage,
                    source,
                    lineno,
                    colno,
                    stack: error?.stack || null,
                });
            } else {
                logClientError({
                    message: 'An error occurred (Event Object)',
                    event: eventOrMessage as Event,
                });
            }
        };

        const handleRejection = (event: PromiseRejectionEvent): void => {
            logClientError({
                message: event.reason?.message || 'Unhandled Promise Rejection',
                stack: event.reason?.stack || null,
            });
        };

        window.onerror = handleError as OnErrorEventHandler;
        window.addEventListener('unhandledrejection', handleRejection);

        return () => {
            window.onerror = null;
            window.removeEventListener('unhandledrejection', handleRejection);
        };
    }, []);

    return null; // No UI rendering
}

async function logClientError(errorDetails: {
    message: string;
    source?: string;
    lineno?: number;
    colno?: number;
    stack?: string | null;
    event?: Event;
}): Promise<void> {
    try {
        await fetch('/api/log-client-error', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(errorDetails),
        });
    } catch (err) {
        console.error('Failed to log client error:', err);
    }
}

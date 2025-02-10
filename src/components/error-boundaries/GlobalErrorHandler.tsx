'use client';

import { useEffect } from 'react';

export default function GlobalErrorHandler() {
  useEffect(() => {
    const handleError = (
      eventOrMessage: string | Event,
      source?: string,
      lineno?: number,
      colno?: number,
      error?: Error
    ) => {
      // Check if the first argument is an Event or a string
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
          event: eventOrMessage,
        });
      }
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
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

  return null;
}

async function logClientError(errorDetails: Record<string, any>) {
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

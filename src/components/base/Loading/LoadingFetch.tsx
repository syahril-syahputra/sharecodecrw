import Spinner from '@/components/ui/spinner';
import React from 'react';

export default function LoadingFetch() {
    return (
        <div className="flex items-center justify-center space-x-2 text-center">
            <Spinner />
            <span className="font-bold italic text-primary">Loading...</span>
        </div>
    );
}

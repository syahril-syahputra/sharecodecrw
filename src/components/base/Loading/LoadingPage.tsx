import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export default function LoadingPage() {
    return (
        <div className="flex-1 items-center justify-center space-y-2 text-center">
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
        </div>
    );
}

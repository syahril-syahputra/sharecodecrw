import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export default function SkeletonQuestion() {
    return (
        <div className="border-Input space-y-4 border-b px-4 py-4">
            <div className="flex items-center space-x-2 ">
                <span className="inline-flex items-center space-x-2 font-bold">
                    <Skeleton className="aspect-square h-14 rounded-full" />
                    <span className="flex space-x-4">
                        <Skeleton className="h-6 w-48 " />{' '}
                        <Skeleton className="h-6 w-48" />
                    </span>
                </span>
            </div>
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <div className="flex space-x-4 py-4">
                <Skeleton className=" h-4 w-48" />
                <Skeleton className=" h-4 w-48 " />
            </div>
        </div>
    );
}

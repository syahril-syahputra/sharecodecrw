import React from 'react';
import { cn } from '@/lib/utils';

export default function CardDarkNeonGlow({
    className,
    children,
    variant = 'default'
}: {
    children: React.ReactNode;
    className?: string;
    variant?: 'silver' | 'gold' | 'default'
}) {

    if(variant == 'default') {
        return (
            <div
                className={cn(
                    'relative overflow-hidden rounded-xl bg-gray-900 p-6 text-white shadow-lg',
                    className
                )}
            >
                <div className="absolute -top-72 left-1/2 h-96 w-96 -translate-x-1/2 transform rounded-full bg-blue-800 opacity-40 blur-2xl"></div>
                <div className="relative text-white">{children}</div>
            </div>
        );
    }

    if(variant == 'silver') {
        return (
            <div
                className={cn(
                    'relative overflow-hidden rounded-xl bg-gray-900 p-6 text-white shadow-lg',
                    className
                )}
            >
                <div className="absolute -top-72 left-1/2 h-96 w-96 -translate-x-1/2 transform rounded-full bg-slate-500 opacity-40 blur-2xl"></div>
                <div className="relative text-white">{children}</div>
            </div>
        );
    }

    if(variant == 'gold') {
        return (
            <div
                className={cn(
                    'relative overflow-hidden rounded-xl bg-gray-900 p-6 text-white shadow-lg',
                    className
                )}
            >
                <div className="absolute -top-72 left-1/2 h-96 w-96 -translate-x-1/2 transform rounded-full bg-orange-400 opacity-40 blur-2xl"></div>
                <div className="relative text-white">{children}</div>
            </div>
        );
    }
    
}

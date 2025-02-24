import React from 'react';
import { cn } from '@/lib/utils';
import clsx from 'clsx';

export default function CardDarkNeonGlow({
    className,
    children,
    isFull,
    variant = 'default',
}: {
    children: React.ReactNode;
    className?: string;
    isFull?: boolean;
    variant?: 'silver' | 'gold' | 'default';
}) {
    if (variant == 'default') {
        return (
            <div
                className={cn(
                    'relative overflow-hidden rounded-xl bg-gray-900 p-6 text-white shadow-lg',
                    className
                )}
            >
                {/* <div className="absolute -top-72 left-1/2 h-96 w-96 -translate-x-1/2 transform rounded-full bg-blue-800 opacity-40 blur-2xl"></div> */}
                <div className="absolute -right-80 -top-64 h-96 w-full -translate-x-1/2 transform rounded-full bg-primary opacity-30 blur-3xl"></div>
                <div
                    className={clsx('relative text-white', isFull && 'h-full')}
                >
                    {children}
                </div>
            </div>
        );
    }

    if (variant == 'silver') {
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

    if (variant == 'gold') {
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

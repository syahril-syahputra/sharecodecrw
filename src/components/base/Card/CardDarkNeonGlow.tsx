import React from 'react';
import { cn } from '@/lib/utils';

export default function CardDarkNeonGlow({ className, children }: { children: React.ReactNode; className?: string }){
    return (
        <div className={cn('overflow-hidden relative my-8 p-6 bg-gray-900 rounded-xl shadow-lg text-white', className)}>
            <div className="absolute -top-72 left-1/2 h-96 w-96 -translate-x-1/2 transform rounded-full bg-blue-800 opacity-40 blur-2xl"></div>
            <div className="relative text-white text-center space-y-8">
                {children}
            </div>
        </div>
    )
}
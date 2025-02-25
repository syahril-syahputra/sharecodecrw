'use client';
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NavigationBottom() {
    const navigate = useRouter();
    return (
        <div className="fixed bottom-0 left-0 right-0 flex items-center justify-center space-x-4 p-4">
            <div className="flex w-min space-x-6 overflow-x-hidden rounded-full bg-white/40 p-4 shadow-xl backdrop-blur-md">
                <button
                    className="text-black  hover:text-primary"
                    onClick={() => navigate.back()}
                >
                    <ArrowLeft size={24} />
                </button>
            </div>
        </div>
    );
}

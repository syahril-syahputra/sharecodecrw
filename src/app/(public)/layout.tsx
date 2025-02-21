import Navbar from '@/components/base/Navbar';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Crowner - Simplest to Use',
};

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col ">
            <Navbar />
            <div className="flex-1 bg-white">{children}</div>
        </div>
    );
}

import Navbar from '@/components/base/Navbar';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Member | Crowner - Services One Click Away!',
};

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Navbar />
            <div className="container  py-4">{children}</div>
        </div>
    );
}

import Navbar from '@/components/base/Navbar';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Member | Crowner - Simplest to Use',
};

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col ">
            <Navbar />

            <div className="container mt-24 py-4 ">{children}</div>
        </div>
    );
}

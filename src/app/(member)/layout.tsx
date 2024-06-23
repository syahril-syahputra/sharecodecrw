import Navbar from '@/components/base/Navbar';
import React from 'react';
import { Toaster } from '@/components/ui/toaster';

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col ">
            <Navbar />

            <Toaster />
            <div className="container mt-24 py-4 ">{children}</div>
        </div>
    );
}

import Navbar from '@/components/base/Navbar';
import React from 'react';

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col ">
            <Navbar />
            <div className="container mt-20 py-4 ">{children}</div>
        </div>
    );
}

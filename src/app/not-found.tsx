import Navbar from '@/components/base/Navbar';
import Link from 'next/link';
import React from 'react';

export default function NotFoundPage() {
    return (
        <div>
            <Navbar />
            <div className="flex h-full min-h-screen w-full flex-col items-center justify-center space-y-6 ">
                <div className="font-urbanist text-8xl font-bold text-red-400">
                    404
                </div>
                <div className="font-urbanist text-4xl font-bold">
                    Page Not Found
                </div>
                <Link href={'/'}>
                    <div className="text-xl">Back To Home</div>
                </Link>
            </div>
        </div>
    );
}

import NavbarAuth from '@/components/base/NavbarAuth';
import { Metadata } from 'next';
import React from 'react';

/* eslint-disable @typescript-eslint/no-unused-vars */
const metadata: Metadata = {
    title: 'Crowner - Simplest to Use',
};
/* eslint-disable @typescript-eslint/no-unused-vars */

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="">
            <NavbarAuth />
            <div className="container mx-auto py-8">{children}</div>
        </div>
    );
}

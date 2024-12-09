'use client';
import NavbarAuth from '@/components/base/NavbarAuth';
import { Metadata } from 'next';
import React from 'react';

const metadata: Metadata = {
    title: 'Crowner - Simplest to Use',
};

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="">
            <NavbarAuth />
            <div className="container mx-auto py-8 ">{children}</div>
        </div>
    );
}

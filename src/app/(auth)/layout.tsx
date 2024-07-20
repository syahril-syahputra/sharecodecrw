'use client';
import NavbarAuth from '@/components/base/NavbarAuth';
import React from 'react';

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="">
            <NavbarAuth />
            <div className="container mx-auto py-8 ">{children}</div>
        </div>
    );
}

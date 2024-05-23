'use client';
import NavbarAuth from '@/components/base/NavbarAuth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

export default function layout({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient();
    return (
        <div className="">
            <NavbarAuth />
            <QueryClientProvider client={queryClient}>
                <div className="container mx-auto py-8 ">{children}</div>
            </QueryClientProvider>
        </div>
    );
}

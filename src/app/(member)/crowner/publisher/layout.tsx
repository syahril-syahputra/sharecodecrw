import SideMenuClient from '@/components/base/SideMenu/SideMenuClient';
import React from 'react';

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex divide-x divide-border">
            <section className=" w-64 p-4">
                <SideMenuClient />
            </section>
            {children}
        </div>
    );
}

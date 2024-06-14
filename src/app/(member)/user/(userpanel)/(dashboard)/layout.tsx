import SideMenuClient from '@/components/base/SideMenu/SideMenuClient';
// import SideMenuUser from '@/components/base/SideMenu/SideMenuUser';
import React from 'react';

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex divide-x divide-border">
            <section className=" w-64 p-4">
                {/* <SideMenuUser /> */}
                <SideMenuClient />
            </section>

            {children}
        </div>
    );
}

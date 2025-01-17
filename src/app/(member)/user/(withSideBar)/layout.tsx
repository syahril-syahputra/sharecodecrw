import CardDarkNeonGlow from '@/components/base/Card/CardDarkNeonGlow';
import SideMenuClient from '@/components/base/SideMenu/SideMenuClient';
import React from 'react';

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex">
            <section className="w-64">
                <CardDarkNeonGlow>
                    <SideMenuClient />
                </CardDarkNeonGlow>
            </section>

            {children}
        </div>
    );
}

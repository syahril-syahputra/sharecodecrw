// import fetchServer from '@/lib/fetchServer';
// import { IDataLanding } from '@/types/landing';
import HomeHero from '@/components/base/Homepage/HomeHero';
import HomeServices from '@/components/base/Homepage/HomeServices';
import { Bell, Bot, Home, Search } from 'lucide-react';
import React from 'react';

// async function getData() {
//     try {
//         const res = await fetchServer({
//             url: `/landing`,
//         });
//         return res.data.data as IDataLanding;
//     } catch {
//         new Error('can not request landing page data');
//     }
// }

export default async function page() {
    // const data = await getData();
    return (
        <div className="z-20 mt-20">
            <HomeHero />
            <HomeServices />
            <div className="fixed bottom-0 left-0 right-0 flex items-center justify-center space-x-4 p-4">
                <div className="flex w-min space-x-4 rounded-2xl bg-white p-4 shadow-xl">
                    <Home />
                    <Search />
                    <Bell />
                </div>
                <div className="w-min space-x-4 rounded-2xl bg-white p-4 shadow-xl">
                    <Bot />
                </div>
            </div>
        </div>
    );
}

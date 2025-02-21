// import fetchServer from '@/lib/fetchServer';
// import { IDataLanding } from '@/types/landing';
import HomeHero from '@/components/base/Homepage/HomeHero';
import HomeServices from '@/components/base/Homepage/HomeServices';
import { getCurrentUser } from '@/lib/session';
import { Bot, Home, Search } from 'lucide-react';
import Link from 'next/link';
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
    const user = await getCurrentUser();
    // const data = await getData();
    return (
        <div className="z-20 mt-20">
            <HomeHero />
            <HomeServices />
            <div className="fixed bottom-0 left-0 right-0 flex items-center justify-center space-x-4 p-4">
                <div className="flex w-min space-x-4 rounded-full bg-white/40 backdrop-blur-md p-4 shadow-xl">
                    {user && (
                        <Link href={'/user'}>
                            <Home />
                        </Link>
                    )}
                    <Link href={'/'}>
                        <Search />
                    </Link>
                </div>
                <div className="hidden w-min space-x-4 rounded-full bg-white/40 backdrop-blur-md p-4 shadow-xl">
                    <Bot />
                </div>
            </div>
        </div>
    );
}

// import fetchServer from '@/lib/fetchServer';
// import { IDataLanding } from '@/types/landing';
import HomeHero from '@/components/base/Homepage/HomeHero';
import HomeServices from '@/components/base/Homepage/HomeServices';
import ButtonNotification from '@/components/base/Navbar/ButtonNotification';
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
    const handleClick = () => {
        // This will throw a ReferenceError
        console.log((undefined as any).foo);
      };
    return (
        <div className="z-20 mt-20">
            <button onClick={handleClick}>Trigger Error</button>
            <HomeHero />
            <HomeServices />
            <div className="fixed bottom-0 left-0 right-0 flex items-center justify-center space-x-4 p-4">
                <div className="flex w-min space-x-4 rounded-full bg-white p-4 shadow-xl">
                    {user && (
                        <Link href={'/user'}>
                            <Home />
                        </Link>
                    )}
                    <Link href={'/'}>
                        <Search />
                    </Link>
                    {user && <ButtonNotification />}
                </div>
                <div className="hidden w-min space-x-4 rounded-full bg-white p-4 shadow-xl">
                    <Bot />
                </div>
            </div>
        </div>
    );
}

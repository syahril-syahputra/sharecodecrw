// import fetchServer from '@/lib/fetchServer';
// import { IDataLanding } from '@/types/landing';
import HomeBottomNavbar from '@/components/base/Homepage/HomeBottomNavbar';
import HomeHero from '@/components/base/Homepage/HomeHero';
import HomeServices from '@/components/base/Homepage/HomeServices';
// import { getCurrentUser } from '@/lib/session';

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
    // const user = await getCurrentUser();
    // const data = await getData();
    return (
        <div className="z-20 min-h-[1000px]">
            <HomeHero />
            <HomeServices />
            <HomeBottomNavbar />
        </div>
    );
}

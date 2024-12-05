import FooterPublic from '@/components/base/Footer/FooterPublic';
import HomeBlog from '@/components/base/Homepage/HomeBlog';
import HomeCommercials from '@/components/base/Homepage/HomeCommercials';
import HomeData from '@/components/base/Homepage/HomeData';
import HomeFeature from '@/components/base/Homepage/HomeFeature';
import HomeJoinUs from '@/components/base/Homepage/HomeJoinUs';
import HomeTop from '@/components/base/Homepage/HomeTop';
import fetchServer from '@/lib/fetchServer';
import { IDataLanding } from '@/types/landing';
import React from 'react';

async function getData() {
    try {
        const res = await fetchServer({
            url: `/landing`,
        });
        return res.data.data as IDataLanding;
    } catch {
        new Error('my error message');
    }
}
export default async function page() {
    const data = await getData();
    return (
        <div className="mt-20 bg-[#EEEEEE]">
            <HomeTop />
            <HomeCommercials />
            <HomeFeature />
            <HomeData data={data} />
            <HomeBlog />
            <HomeJoinUs />
            <FooterPublic />
        </div>
    );
}

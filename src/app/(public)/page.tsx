import FooterPublic from '@/components/base/Footer/FooterPublic';
import HomeBlog from '@/components/base/Homepage/HomeBlog';
import HomeCommercials from '@/components/base/Homepage/HomeCommercials';
import HomeData from '@/components/base/Homepage/HomeData';
import HomeFeature from '@/components/base/Homepage/HomeFeature';
import HomeJoinUs from '@/components/base/Homepage/HomeJoinUs';
import HomeTop from '@/components/base/Homepage/HomeTop';
import React from 'react';

export default function page() {
    return (
        <div className="mt-20 bg-[#EEEEEE] ">
            <HomeTop />
            <HomeFeature />
            <HomeData />
            <HomeBlog />
            <HomeCommercials />
            <HomeJoinUs />

            <FooterPublic />
        </div>
    );
}

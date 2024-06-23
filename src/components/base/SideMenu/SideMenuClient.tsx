'use client';

import React from 'react';
import Menu from '../Menu/Menu';
import MenuItem from '../Menu/MenuItem';
import MenuGroup from '../Menu/MenuGroup';
import CardMember from '../Card/CardMember';
import Link from 'next/link';
import MenuGroupChild from '../Menu/MenuGroupChild';

export default function SideMenuClient() {
    return (
        <div className="divide-y-2">
            <CardMember />
            <Menu>
                <MenuGroupChild title="Crowner Management">
                    <Link href={'/user/events'}>
                        <MenuItem url={'events'}>Events</MenuItem>
                    </Link>
                    <MenuItem url={''}>Communities</MenuItem>
                    <MenuItem url={''}> Community Tutors</MenuItem>
                </MenuGroupChild>

                <MenuGroupChild title="Owner Management">
                    <MenuItem url={''}>Cars</MenuItem>
                    <MenuItem url={''}>Home & Garden</MenuItem>
                    <MenuItem url={''}>Electricity</MenuItem>
                </MenuGroupChild>
                <MenuGroup>
                    <MenuItem url={''}>Interest & Favorites</MenuItem>
                    <MenuItem url={''}>Event Reservation</MenuItem>
                </MenuGroup>
                <MenuGroup>
                    <MenuItem url={''}>Badges</MenuItem>
                    <MenuItem url={''}>Plans & Payments</MenuItem>
                </MenuGroup>
                <MenuGroup>
                    <MenuItem url={''}>About Us</MenuItem>
                    <MenuItem url={''}>Cookies</MenuItem>
                    <MenuItem url={''}>Terms and Conditions</MenuItem>
                </MenuGroup>
                <MenuGroup>
                    <Link href={'/user/setting'}>
                        <MenuItem url={'setting'}>Settings</MenuItem>
                    </Link>
                </MenuGroup>
            </Menu>
        </div>
    );
}

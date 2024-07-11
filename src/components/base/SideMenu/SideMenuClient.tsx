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
                <MenuGroupChild href="/user/crowner" title="Crowner Management">
                    <Link href={'/user/crowner/events'}>
                        <MenuItem url={'events'}>Events</MenuItem>
                    </Link>
                    <Link href={'/user/crowner/communities'}>
                        <MenuItem url={'communities'}>Communities</MenuItem>
                    </Link>
                    <Link href={'/user/crowner/community-tutors'}>
                        <MenuItem url={'community-tutors'}>
                            Community Tutors
                        </MenuItem>
                    </Link>
                </MenuGroupChild>

                <MenuGroupChild href="/user/owner" title="Owner Management">
                    <MenuItem url={''}>Cars</MenuItem>
                    <MenuItem url={''}>Home & Garden</MenuItem>
                    <MenuItem url={''}>Electricity</MenuItem>
                </MenuGroupChild>
                <MenuGroup>
                    <Link href={'/user/interests-favorites'}>
                        <MenuItem url={'interests-favorites'}>
                            Interest & Favorites
                        </MenuItem>
                    </Link>
                    <Link href={'/user/event-reservation'}>
                        <MenuItem url={'event-reservation'}>
                            Event Reservation
                        </MenuItem>
                    </Link>
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

'use client';

import React from 'react';
import Menu from '../Menu/Menu';
import MenuItem from '../Menu/MenuItem';
import MenuGroup from '../Menu/MenuGroup';
import CardMember from '../Card/CardMember';
import Link from 'next/link';

export default function SideMenuUser() {
    return (
        <div className="divide-y-2">
            <CardMember />
            <Menu>
                <MenuGroup>
                    <MenuItem url={''}>Community & Events</MenuItem>
                    <MenuItem url={''}>Manage My Community</MenuItem>
                </MenuGroup>
                <MenuGroup>
                    <MenuItem url={''}>Crowner Listings</MenuItem>
                    <MenuItem url={''}>Owner Listings</MenuItem>
                </MenuGroup>
                <MenuGroup>
                    <MenuItem url={''}>Badges</MenuItem>
                    <MenuItem url={''}>Plans & Pyments</MenuItem>
                </MenuGroup>
                <MenuGroup>
                    <MenuItem url={''}>About Us </MenuItem>
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

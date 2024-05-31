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
                    <MenuItem>Community & Events</MenuItem>
                    <MenuItem>Manage My Community</MenuItem>
                </MenuGroup>
                <MenuGroup>
                    <MenuItem>Crowner Listings</MenuItem>
                    <MenuItem>Owner Listings</MenuItem>
                </MenuGroup>
                <MenuGroup>
                    <MenuItem>Badges</MenuItem>
                    <MenuItem>Plans & Pyments</MenuItem>
                </MenuGroup>
                <MenuGroup>
                    <MenuItem>About Us </MenuItem>
                    <MenuItem>Cookies</MenuItem>
                    <MenuItem>Terms and Conditions</MenuItem>
                </MenuGroup>
                <MenuGroup>
                    <Link href={'/user/setting'}>
                        <MenuItem>Settings</MenuItem>
                    </Link>
                </MenuGroup>
            </Menu>
        </div>
    );
}

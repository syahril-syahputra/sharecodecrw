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
                    <Link href={'/user/crowner/services'}>
                        <MenuItem url={'community-tutors'}>
                            Services
                        </MenuItem>
                    </Link>
                </MenuGroupChild>

                <MenuGroup>
                    <Link href={'/user/interests-favorites'}>
                        <MenuItem url={'interests-favorites'}>
                            Interest & Favorites
                        </MenuItem>
                    </Link>
                </MenuGroup>
                <MenuGroup>
                    <MenuItem url={''}>Plans & Payments</MenuItem>
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

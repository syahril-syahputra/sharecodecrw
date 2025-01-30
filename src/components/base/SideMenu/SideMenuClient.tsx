'use client';

import React from 'react';
import Menu from '../Menu/Menu';
import MenuItem from '../Menu/MenuItem';
import MenuGroup from '../Menu/MenuGroup';
import CardMember from '../Card/CardMember';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export default function SideMenuClient() {
    return (
        <div className="">
            <CardMember />
            <Separator className="my-4 bg-blue-400 opacity-20" />
            <Menu>
                <MenuGroup>
                    <Link href={'/user/listing'}>
                        <MenuItem url={'/user/listing'}>Services</MenuItem>
                    </Link>
                </MenuGroup>
                <MenuGroup>
                    <Link href={'/user/direct-chats'}>
                        <MenuItem url={'direct-chats'}>Chats</MenuItem>
                    </Link>
                </MenuGroup>
                <MenuGroup>
                    <Link href={'/user/plans'}>
                        <MenuItem url={'plans'}>Plans & Pricing</MenuItem>
                    </Link>
                    {/* <MenuItem url={''}>Plans</MenuItem> */}
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

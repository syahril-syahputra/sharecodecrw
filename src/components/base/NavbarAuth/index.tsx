import React from 'react';
import Logo from '../Logo';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/session';
import MenuUser from './MenuUser';

export default async function NavbarAuth() {
    const user = await getCurrentUser();
    return (
        <div className="mx-auto flex max-w-5xl justify-evenly">
            <div className="flex w-full items-center justify-between space-x-4 p-4 lg:w-6/12 xl:w-4/12">
                <Link href={'/'}>
                    <Logo />
                </Link>
            </div>
            {user && (
                <MenuUser
                    session={user}
                    image={user.profile_picture_url || ''}
                />
            )}
        </div>
    );
}

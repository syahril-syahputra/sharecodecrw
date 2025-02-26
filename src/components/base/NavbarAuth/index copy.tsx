import React from 'react';
import Logo from '../Logo';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/session';
import MenuUser from './MenuUser';
import fetchServer from '@/lib/fetchServer';
async function getDataUser() {
    const session = await getCurrentUser();
    try {
        if (session) {
            const response = await fetchServer({ url: '/user/me' });

            return response.data.data.email_verified_at;
        } else {
            return true;
        }
    } catch (error) {
        // console.log(error);
        return true;
    }
}
export default async function NavbarAuth() {
    const user = await getCurrentUser();
    if (!user) {
        await getDataUser();
    }
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

import React from 'react';
import { Button } from '@/components/ui/button';
import Logo from '../Logo';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/session';
import MenuUser from './MenuUser';
import fetchServer from '@/lib/fetchServer';
import ResendVerificationEmail from './ResendVerificationEmail';
import LocationNavbar from './LocationNavbar';
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
export default async function Navbar() {
    const user = await getCurrentUser();
    let verified = true;
    if (user && !user?.email_verified_at) {
        const res = await getDataUser();
        if (!res) {
            verified = false;
        }
    }
    return (
        <div className="fixed left-0 right-0 top-0 z-50 bg-background">
            {!verified && <ResendVerificationEmail />}
            <div className=" container sticky flex max-w-xl items-center justify-between space-x-4 p-4">
                <div className="flex items-center space-x-4 pt-2 ">
                    <Link href={'/'}>
                        <Logo />
                    </Link>
                </div>
                <LocationNavbar />

                {user ? (
                    <MenuUser
                        session={user}
                        image={user.profile_picture_url || ''}
                    />
                ) : (
                    <div className="flex space-x-2">
                        <Link href={'/auth/login'}>
                            <Button block variant={'default'}>Sign In</Button>
                        </Link>
                        <Link href={'/auth/register'}>
                            <Button block variant={'secondary'} className="">
                                Sign Up
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

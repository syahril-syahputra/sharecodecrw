import React from 'react';
import { Button } from '@/components/ui/button';
import Logo from '../Logo';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/session';
import MenuUser from './MenuUser';
import fetchServer from '@/lib/fetchServer';
import ResendVerificationEmail from './ResendVerificationEmail';
import LocationNavbar from './LocationNavbar';
import SearchBar from './SearchBar';
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
            <div className=" sticky flex items-center space-x-4 p-4">
                <div className="flex items-center space-x-4 pt-2 ">
                    <Link href={'/'}>
                        <Logo />
                    </Link>
                </div>
                <div className="flex flex-1 items-center">
                    <SearchBar />
                    <LocationNavbar />
                </div>
                <Link href={'/post-a-listing'}>
                    <span className="px-2 font-semibold text-primary">
                        Post a Listing
                    </span>
                </Link>
                <Link href={'/blog'}>
                    <span className="px-2  font-semibold text-primary">
                        BLOG
                    </span>
                </Link>
                {user ? (
                    <MenuUser session={user} />
                ) : (
                    <div className="flex space-x-2">
                        <Link href={'/auth/login'}>
                            <Button block>Sign In</Button>
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

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import React from 'react';
import Logo from '../Logo';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/session';
import MenuUser from './MenuUser';
import fetchServer from '@/lib/fetchServer';
import ResendVerificationEmail from './ResendVerificationEmail';
import LocationNavbar from './LocationNavbar';
import { Search } from 'lucide-react';
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
        <div className="fixed left-0 right-0 top-0 z-50  bg-background">
            {!verified && <ResendVerificationEmail />}
            <div className=" sticky flex items-center space-x-4 p-4">
                <div className="flex items-center space-x-4 pt-2 ">
                    <Link href={'/'}>
                        <Logo />
                    </Link>
                </div>
                <div className="flex flex-1 items-center">
                    <div className="flex flex-1  items-center divide-x divide-border rounded-lg border border-border px-4 py-2 shadow-md">
                        <Input
                            placeholder="Search"
                            className="h-min border-0  focus:ring-0 focus-visible:ring-0"
                        />

                        <div className="flex items-center space-x-2 text-primary">
                            <Search size={36} className=" px-2 " />
                            <span>Search</span>
                        </div>
                    </div>
                    <LocationNavbar />
                </div>
                <span className="px-2 font-semibold text-primary">
                    Post a Listing
                </span>
                <span className="px-2  font-semibold text-primary">BLOG</span>

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

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Search } from 'lucide-react';

import React from 'react';
import Logo from '../Logo';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/session';
import MenuUser from './MenuUser';
import fetchServer from '@/lib/fetchServer';
import ResendVerificationEmail from './ResendVerificationEmail';
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
        <div className="fixed left-0 right-0 top-0 z-50 border-b bg-background">
            {!verified && <ResendVerificationEmail />}
            <div className=" sticky flex items-start space-x-4 p-4">
                <div className="flex items-center space-x-4 pt-2 ">
                    <Link href={'/'}>
                        <Logo />
                    </Link>
                    <Button>Owner</Button>
                </div>
                <div className="flex-1">
                    <div className="flex flex-1  items-center divide-x divide-border rounded-full border border-border px-4 py-2 shadow-md">
                        <Input
                            placeholder="Search"
                            className="h-min border-0  focus:ring-0 focus-visible:ring-0"
                        />

                        <div>
                            <Search
                                size={36}
                                className="rounded-full bg-primary px-2 text-white"
                            />
                        </div>
                    </div>
                    <div className="flex items-center space-x-1 pl-4 pt-2 text-sm">
                        <MapPin size={18} />
                        <span>Location</span> :{' '}
                        <span className="font-semibold">
                            Jakarta, Indonesia
                        </span>
                    </div>
                </div>
                <span className="px-2 py-4 font-semibold text-primary">
                    BLOG
                </span>

                {user ? (
                    <MenuUser session={user} />
                ) : (
                    <div className="flex space-x-2 py-2">
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

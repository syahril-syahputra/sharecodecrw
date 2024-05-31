import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell, Heart, MapPin, MessageSquare, Search, User } from 'lucide-react';

import React from 'react';
import Logo from '../Logo';
import Link from 'next/link';

export default function Navbar() {
    const isLogin = false;
    return (
        <div className="flex items-start space-x-4 p-4">
            <div className="flex items-center space-x-4 pt-2 ">
                <Logo />
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
                    <span className="font-semibold">Jakarta, Indonesia</span>
                </div>
            </div>
            <span className="px-2 py-4 font-semibold text-primary">BLOG</span>

            {isLogin ? (
                <div className="flex items-center space-x-4 py-4">
                    <span className="px-2">Post a Listing</span>
                    <User />
                    <Heart />
                    <Bell />
                    <MessageSquare />
                </div>
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
    );
}

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Bell, Heart, MessageSquare, Search, User } from 'lucide-react';

import React from 'react';
import Logo from '../Logo';
import Link from 'next/link';

export default function Navbar() {
    const isLogin = false;
    return (
        <div className="flex items-center space-x-4 p-4">
            <Logo />
            <Button>Owner</Button>
            <div className="flex flex-1 items-center divide-x divide-border rounded-full border border-border px-4 py-2 shadow-lg">
                <Input
                    placeholder="Search"
                    className="border-0 focus:ring-0 focus-visible:ring-0"
                />
                <Select>
                    <SelectTrigger className="w-64 border-0 focus:ring-0 focus-visible:ring-0">
                        <SelectValue placeholder="Province" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className="w-64 border-0 focus:ring-0 focus-visible:ring-0">
                        <SelectValue placeholder="City" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>
                <div>
                    <Search
                        size={36}
                        className="rounded-full bg-primary px-2 text-white"
                    />
                </div>
            </div>
            <div className=" flex items-center divide-x divide-neutral-900 font-semibold">
                <span className="px-2 text-primary">BLOG</span>
                {isLogin && <span className="px-2">Post a Listing</span>}
            </div>

            {isLogin ? (
                <div className="flex space-x-4">
                    <User />
                    <Heart />
                    <Bell />
                    <MessageSquare />
                </div>
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
    );
}

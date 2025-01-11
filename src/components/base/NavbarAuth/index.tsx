import React from 'react';
import Logo from '../Logo';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function NavbarAuth() {
    return (
        <div className='flex justify-center'>
            <div className="flex items-center justify-between space-x-4 p-4 w-4/12">
                <Link href={'/'}>
                    <Logo />
                </Link>
                {/* <Link href={'/'}>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </Link> */}
            </div>
        </div>
    );
}

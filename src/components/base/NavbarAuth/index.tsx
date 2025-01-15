import React from 'react';
import Logo from '../Logo';
import Link from 'next/link';

export default function NavbarAuth() {
    return (
        <div className="flex justify-evenly">
            <div className="flex w-full items-center justify-between space-x-4 p-4 lg:w-6/12 xl:w-4/12">
                <Link href={'/'}>
                    <Logo />
                </Link>
            </div>
        </div>
    );
}

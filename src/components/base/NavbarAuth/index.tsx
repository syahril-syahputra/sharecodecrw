import React from 'react';
import Logo from '../Logo';
import Link from 'next/link';

export default function NavbarAuth() {
    return (
        <div className="flex justify-center">
            <div className="flex w-4/12 items-center justify-between space-x-4 p-4">
                <Link href={'/'}>
                    <Logo />
                </Link>
            </div>
        </div>
    );
}

import React from 'react';
import Logo from '../Logo';
import Link from 'next/link';

export default function NavbarAuth() {
    return (
        <div className="flex items-center space-x-4 p-4">
            <Link href={'/'}>
                <Logo />
            </Link>
        </div>
    );
}

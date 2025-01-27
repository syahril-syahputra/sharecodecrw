import { KeyRound, Phone, UserCog } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function page() {
    return (
        <div className="flex flex-col space-y-8 p-4">
            {/* <Link href={'/user/setting/profile'}>
                <div className="flex items-center space-x-2 hover:text-primary">
                    <UserCog />
                    <span>Update Profile</span>
                </div>
            </Link> */}
            <Link href={'/user/setting/password'}>
                <div className="flex items-center space-x-2 hover:text-primary">
                    <KeyRound />
                    <span>Update Password</span>
                </div>
            </Link>
            {/* <Link href={'/user/setting/phone'}>
                <div className="flex items-center space-x-2 hover:text-primary">
                    <Phone />
                    <span>Update Phone Number</span>
                </div>
            </Link> */}
        </div>
    );
}

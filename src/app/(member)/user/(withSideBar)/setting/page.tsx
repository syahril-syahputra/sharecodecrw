import CardDarkNeonGlow from '@/components/base/Card/CardDarkNeonGlow';
import { Cog, KeyRound } from 'lucide-react';
import Link from 'next/link';
import React, { Fragment } from 'react';

export default function page() {
    return (
        // <div className="flex flex-col space-y-8 p-4">
        //     <Link href={'/user/setting/profile'}>
        //         <div className="flex items-center space-x-2 hover:text-primary">
        //             <UserCog />
        //             <span>Update Profile</span>
        //         </div>
        //     </Link>
        //     <Link href={'/user/setting/password'}>
        //         <div className="flex items-center space-x-2 hover:text-primary">
        //             <KeyRound />
        //             <span>Update Password</span>
        //         </div>
        //     </Link>
        //     <Link href={'/user/setting/phone'}>
        //         <div className="flex items-center space-x-2 hover:text-primary">
        //             <Phone />
        //             <span>Update Phone Number</span>
        //         </div>
        //     </Link>
        // </div>
        <div className="flex-1 px-6">
            <Fragment>
                <div className="flex flex-col space-y-5">
                    <CardDarkNeonGlow>
                        <div className="mb-5 flex justify-between">
                            <h1 className="flex space-x-2 text-4xl">
                                <Cog size={35} />
                                <p>Settings</p>
                            </h1>
                        </div>
                    </CardDarkNeonGlow>
                    <CardDarkNeonGlow>
                        <Link href={'/user/setting/password'}>
                            <div className="flex items-center space-x-2 hover:text-primary">
                                <KeyRound />
                                <span>Update Password</span>
                            </div>
                        </Link>
                    </CardDarkNeonGlow>
                </div>
            </Fragment>
        </div>
    );
}

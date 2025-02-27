'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import Logo from '@/components/base/Logo';
import MenuUser from '@/components/base/NavbarAuth/MenuUser';
import { useSession } from 'next-auth/react';
import { IProfile } from '@/types/user';
import fetchClient from '@/lib/FetchClient';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const { data } = useSession();
    const router = useRouter();
    useEffect(() => {
        const getData = async () => {
            const response = await fetchClient({
                url: '/user/me',
            });

            const res = response.data.data as IProfile;
            if (res.email_verified_at) {
                router.push('/user');
            }
        };
        getData();
    }, []);

    return (
        <div className="mx-auto flex max-w-xl justify-evenly">
            <div className="flex w-full items-center justify-between space-x-4  p-4 ">
                <Link href={'/'}>
                    <Logo />
                </Link>
            </div>
            {data?.user ? (
                <MenuUser
                    session={data?.user}
                    image={data?.user.profile_picture_url || ''}
                />
            ) : (
                <div></div>
            )}
        </div>
    );
}

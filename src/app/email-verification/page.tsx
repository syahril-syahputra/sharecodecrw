'use client';
import TitleAuth from '@/components/base/Title/TitleAuth';
import { Button } from '@/components/ui/button';
import fetchClient from '@/lib/FetchClient';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { redirect } from 'next/navigation';
import CardDarkNeonGlow from '@/components/base/Card/CardDarkNeonGlow';
import Link from 'next/link';
import Logo from '@/components/base/Logo';
import MenuUser from '@/components/base/NavbarAuth/MenuUser';

export default function Page() {
    const { data } = useSession();
    if (data?.user.email_verified_at) {
        redirect('/user');
    }

    const [isLoading, setisLoading] = useState(false);
    const [isSend, setisSend] = useState(false);
    async function resend() {
        setisLoading(true);
        try {
            await fetchClient({
                url: '/auth/resend-verification',
                method: 'POST',
                byPassVerification: true,
            });
            setisSend(true);
        } catch (error) {
            console.log(error);
        } finally {
            setisLoading(false);
        }
    }

    return (
        <div>
            <div className="mx-auto flex max-w-5xl justify-evenly">
                <div className="flex w-full items-center justify-between space-x-4  p-4 lg:w-6/12 xl:w-4/12">
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
            <div className="mx-auto max-w-xl text-center">
                <CardDarkNeonGlow>
                    {!isSend ? (
                        <TitleAuth>Verify your email to continue</TitleAuth>
                    ) : (
                        <TitleAuth>Email has been sent</TitleAuth>
                    )}
                    {!isSend && (
                        <Button
                            className="text-blue-500"
                            loading={isLoading}
                            onClick={resend}
                            variant={'ghost'}
                        >
                            Resend
                        </Button>
                    )}
                </CardDarkNeonGlow>
            </div>
        </div>
    );
}

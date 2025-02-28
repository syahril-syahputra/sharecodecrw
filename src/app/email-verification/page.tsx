'use client';
import TitleAuth from '@/components/base/Title/TitleAuth';
import { Button } from '@/components/ui/button';
import fetchClient from '@/lib/FetchClient';
import { signOut, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import CardDarkNeonGlow from '@/components/base/Card/CardDarkNeonGlow';
import Navbar from './Navbar';
import { IProfile } from '@/types/user';

export default function Page() {
    const { data } = useSession();

    if (data?.user.email_verified_at) {
        redirect('/user');
    }

    const [isEmailVerified, setIsEmailVerified] = useState<string | null>(null);
    useEffect(() => {
        const getData = async () => {
            const response = await fetchClient({
                url: '/user/me',
            });

            const res = response.data.data as IProfile;
            if (res.email_verified_at) {
                setIsEmailVerified(res.email_verified_at);
            }
        };
        getData();
    }, []);

    const handleUpdateSession = async () => {
        // try {
        //     await update({
        //         email_verified_at: isEmailVerified,
        //     });
        //     router.push('/user');
        //     router.refresh();
        // } catch (error) {
        //     console.error("Error updating session:", error);
        // }

        signOut();
    };

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
            <Navbar />
            <div className="mx-auto h-screen max-w-xl text-center">
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
                {isEmailVerified && (
                    <div className="pt-10 italic">
                        Is your email already verified?{' '}
                        <span
                            onClick={handleUpdateSession}
                            className="cursor-pointer text-primary underline"
                        >
                            please logout and create new session
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}

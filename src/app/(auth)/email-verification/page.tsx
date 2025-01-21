'use client';
import TitleAuth from '@/components/base/Title/TitleAuth';
import { Button } from '@/components/ui/button';
import fetchClient from '@/lib/FetchClient';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { redirect } from 'next/navigation';
import CardDarkNeonGlow from '@/components/base/Card/CardDarkNeonGlow';

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
            });
            setisSend(true);
        } catch (error) {
            console.log(error);
        } finally {
            setisLoading(false);
        }
    }

    return (
        <div className="mx-auto max-w-xl text-center">
            <CardDarkNeonGlow>
                <TitleAuth>Verify your email to continue</TitleAuth>
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
    );
}

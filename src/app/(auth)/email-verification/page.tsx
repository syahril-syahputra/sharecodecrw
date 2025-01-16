'use client';
import TitleAuth from '@/components/base/Title/TitleAuth';
import { Button } from '@/components/ui/button';
import fetchClient from '@/lib/FetchClient';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { redirect } from 'next/navigation';

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
        <div className="mx-auto flex max-w-xl flex-col items-center space-y-8 py-8">
            <TitleAuth>Verify your email to continue</TitleAuth>
            {!isSend && (
                <Button
                    className="text-primary"
                    loading={isLoading}
                    onClick={resend}
                    variant={'ghost'}
                >
                    Resend
                </Button>
            )}
        </div>
    );
}

'use client';
import TitleAuth from '@/components/base/Title/TitleAuth';
import { Button } from '@/components/ui/button';
import fetchClient from '@/lib/FetchClient';
import React, { useState } from 'react';

export default function Page() {
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

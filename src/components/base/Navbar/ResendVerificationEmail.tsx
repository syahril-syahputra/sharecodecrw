'use client';
import fetchClient from '@/lib/FetchClient';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function ResendVerificationEmail() {
    const pathname = usePathname();
    const [loading, setloading] = useState(false);
    async function resend() {
        try {
            setloading(true);
            await fetchClient({
                url: 'auth/resend-verification',
                method: 'POST',
            });
        } catch (error) {
            console.log(error);
        } finally {
            setloading(false);
        }
    }
    if (pathname === '/auth/email-verification') {
        return null;
    }
    return (
        <div className="bg-red-600 text-white dark:bg-red-600 dark:text-white">
            {loading && (
                <div className="container py-2 text-center font-bold">
                    Sending email verification...
                </div>
            )}
            {!loading && (
                <div className="container py-2 text-center font-bold">
                    Please verify your email,{' '}
                    <label
                        onClick={resend}
                        className="cursor-pointer underline hover:opacity-70"
                    >
                        click here to resend email verification
                    </label>
                </div>
            )}
        </div>
    );
}

'use client';
import Spinner from '@/components/ui/spinner';
import fetchClient from '@/lib/FetchClient';
import { useSession } from 'next-auth/react';
import { redirect, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Page() {
    const { data, update } = useSession();
    if (data?.user.email_verified_at) {
        redirect('/user');
    }

    const searchParams = useSearchParams();
    const [isTokenResend, setisTokenResend] = useState(false);
    const [timer, settimer] = useState(5);
    const router = useRouter();
    const key = searchParams.get('key');
    const confirmation_key = searchParams.get('confirmation_key');

    const [isVerified, setisVerified] = useState(false);
    const [isFailed, setisFailed] = useState(false);

    async function resend() {
        try {
            await fetchClient({
                url: '/auth/resend-verification',
                method: 'POST',
            });
            setisTokenResend(true);
        } catch (error) {
            console.log(error);
        }

        // router.push('/');
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchClient({
                    url: '/auth/email-verification',
                    method: 'POST',
                    body: {
                        token:
                            'key=' +
                            key +
                            '&confirmation_key=' +
                            confirmation_key,
                    },
                });
                setisVerified(true);
            } catch (error) {
                console.log(error);
                setisFailed(true);
            }
        };
        fetchData();
    }, []);
    const verifingSession = async () => {
        await update({
            email_verified_at: 'verified',
        });
    };
    useEffect(() => {
        if (isVerified) {
            if (timer === 1) {
                verifingSession();
            }
            if (timer === 0) {
                router.refresh();
                redirect('/user');
            }

            // exit early when we reach 0
            if (!timer) return;

            const intervalId = setInterval(() => {
                settimer(timer - 1);
            }, 1000);
            return () => clearInterval(intervalId);
        }
    }, [timer, isVerified]);

    return (
        <div className="container">
            {!isVerified && !isFailed && (
                <div className="mx-auto w-full lg:w-6/12">
                    <div className="relative my-8 overflow-hidden rounded-xl bg-gray-900 p-6 text-white shadow-lg">
                        <div className="absolute -top-72 left-1/2 h-96 w-96 -translate-x-1/2 transform rounded-full bg-blue-800 opacity-40 blur-2xl"></div>
                        <div className="relative space-y-8 text-center text-white">
                            <div className="text-lg font-bold text-white">
                                Verifying email, please wait...{' '}
                            </div>
                            <div className="flex justify-center">
                                <Spinner />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {isVerified && (
                <div className="mx-auto w-full lg:w-6/12">
                    <div className="relative my-8 overflow-hidden rounded-xl bg-gray-900 p-6 text-white shadow-lg">
                        <div className="absolute -top-72 left-1/2 h-96 w-96 -translate-x-1/2 transform rounded-full bg-blue-800 opacity-40 blur-2xl"></div>
                        <div className="relative space-y-8 text-center text-white">
                            <div className="text-lg font-bold text-white">
                                Your email has been verified successfully
                            </div>
                            <div>
                                You will be redirect to homepage in {timer}{' '}
                                second
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {isFailed && !isVerified && (
                <div className="mx-auto w-full lg:w-6/12">
                    <div className="relative my-8 overflow-hidden rounded-xl bg-gray-900 p-6 text-white shadow-lg">
                        <div className="absolute -top-72 left-1/2 h-96 w-96 -translate-x-1/2 transform rounded-full bg-blue-800 opacity-40 blur-2xl"></div>
                        <div className="relative space-y-8 text-center text-white">
                            <div className="text-lg font-bold text-white">
                                Your token is invalid or expired, please request
                                new email verification token
                            </div>
                            <div>
                                {isTokenResend ? (
                                    <div>
                                        Your token has been sent, verify your
                                        email to continue
                                    </div>
                                ) : (
                                    <label
                                        onClick={resend}
                                        className="cursor-pointer text-blue-500 underline hover:opacity-70"
                                    >
                                        Resend
                                    </label>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

'use client';
import TitleAuth from '@/components/base/Title/TitleAuth';
import Spinner from '@/components/ui/spinner';
import fetchClient from '@/utils/FetchClient';
import { Loader, Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { redirect, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Page() {
    // const searchParams = useSearchParams();
    const [timer, settimer] = useState(5);
    // const router = useRouter();
    // const key = searchParams.get('key');
    // const confirmation_key = searchParams.get('confirmation_key');

    const [isVerified, setisVerified] = useState(false);
    const [isFailed, setisFailed] = useState(false);
    // const { update } = useSession();
    async function resend() {
        // await fetchClient({
        //     url: 'auth/resend-verification',
        //     method: 'POST',
        // });
        // router.push('/');
    }
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             await fetchClient({
    //                 url: '/auth/email-verification',
    //                 method: 'POST',
    //                 body: {
    //                     token:
    //                         'key=' +
    //                         key +
    //                         '&confirmation_key=' +
    //                         confirmation_key,
    //                 },
    //             });
    //             setisVerified(true);
    //         } catch (error) {
    //             console.log(error);
    //             setisFailed(true);
    //         }
    //     };
    //     fetchData();
    // }, []);
    // const verifingSession = async () => {
    //     await update({
    //         email_verified_at: 'verified',
    //     });
    // };
    // useEffect(() => {
    //     if (isVerified) {
    //         if (timer === 1) {
    //             verifingSession();
    //         }
    //         if (timer === 0) {
    //             router.refresh();
    //             redirect('/');
    //         }

    //         // exit early when we reach 0
    //         if (!timer) return;

    //         const intervalId = setInterval(() => {
    //             settimer(timer - 1);
    //         }, 1000);
    //         return () => clearInterval(intervalId);
    //     }
    // }, [timer, isVerified]);

    return (
        <div className="container">
            {!isVerified && !isFailed && (
                <div className="mx-auto my-8 flex max-w-xl flex-col  items-center space-y-8 rounded-lg  p-8 text-center">
                    <TitleAuth className="text-lg font-bold">
                        Please Wait, verifying your email{' '}
                        {/* {`key=${key}&confirmation_key=${confirmation_key}`} */}
                    </TitleAuth>
                    <Spinner />
                </div>
            )}
            {isVerified && (
                <div className="mx-auto my-8 max-w-xl space-y-8 rounded-lg  p-8 text-center">
                    <div className="text-lg font-bold text-primary">
                        Your email has been verified successfully
                    </div>
                    <div>
                        You will be redirect to homepage in {timer} second
                    </div>
                </div>
            )}
            {isFailed && (
                <div className="mx-auto my-8 max-w-xl space-y-8 rounded-lg  p-8 text-center">
                    <div className="text-lg font-bold text-primary">
                        Your token is invalid or expired, please request new
                        email verification token
                    </div>
                    <div>
                        Please click{' '}
                        <label
                            onClick={resend}
                            className="cursor-pointer underline hover:opacity-70"
                        >
                            HERE
                        </label>{' '}
                        resend your email verification
                    </div>
                </div>
            )}
        </div>
    );
}

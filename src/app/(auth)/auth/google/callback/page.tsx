'use client';

import CardDarkNeonGlow from '@/components/base/Card/CardDarkNeonGlow';
import TitleAuth from '@/components/base/Title/TitleAuth';
import Spinner from '@/components/ui/spinner';
// import fetchClient from '@/lib/FetchClient';
// import { messaging } from '@/lib/firebase-config';
// import { getToken } from 'firebase/messaging';
import { signIn } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
    const searchParams = useSearchParams();
    const id = decodeURI(searchParams.get('code') || '');
    const router = useRouter();
    useEffect(() => {
        const fetchData = async () => {
            const request = await signIn('google-login', {
                code: id,
                redirect: false,
            });
            if (request?.error) {
                router.push('/auth/login');
            } else {
                console.log('masuk bosku')
                // const fcmToken = await getToken(messaging(), {
                //     vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
                // });
                // await fetchClient({
                //     method: 'POST',
                //     url: '/notifications/fcm-tokens',
                //     body: {
                //         token: fcmToken,
                //     },
                // });
                router.refresh();
                router.push('/user');
            }
        };
        fetchData();
    }, []);

    return (
        <div className="mx-auto my-8 max-w-xl items-center space-y-8 rounded-lg p-8 text-center">
            <CardDarkNeonGlow className="flex justify-center px-10">
                <TitleAuth className="mb-2 text-lg font-bold">
                    please wait...{' '}
                    {/* {`key=${key}&confirmation_key=${confirmation_key}`} */}
                </TitleAuth>
                <div className="flex justify-center">
                    <Spinner />
                </div>
            </CardDarkNeonGlow>
        </div>
    );
}

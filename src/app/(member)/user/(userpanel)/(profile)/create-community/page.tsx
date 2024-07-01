'use client';
import Step from '@/components/base/Step/Step';
import TitlePage from '@/components/base/Title/TitlePage';
import { ArrowLeft, X } from 'lucide-react';
import React, { useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useCreateCommunity } from '@/feature/community/useCreateCommunity';
import { BodyCreateCommunity } from '@/types/community';
import Spinner from '@/components/ui/spinner';

const Step1 = dynamic(() => import('./Step1'), { ssr: false });
const Step2 = dynamic(() => import('./Step2'), { ssr: false });
const Step3 = dynamic(() => import('./Step3'), { ssr: false });
const Step4 = dynamic(() => import('./Step4'), { ssr: false });
const Step5 = dynamic(() => import('./Step5'), { ssr: false });

export default function Page() {
    const [index, setindex] = useState(1);
    const [data, setdata] = useState({});
    const {
        mutate,
        isPending: isLoadingCreate,
        isSuccess,
    } = useCreateCommunity({
        onSuccess: () => {
            // router.push('/user/crowner/events');
        },
        onError: (error) => {
            console.log(error);
        },
    });
    return (
        <div className="mx-auto max-w-xl space-y-8">
            {index !== 5 && (
                <>
                    <div className="flex items-center justify-between">
                        <button
                            className={index === 1 ? 'invisible' : 'visible'}
                            onClick={() => setindex(index - 1)}
                        >
                            <ArrowLeft />
                        </button>
                        <Link href={'/user/crowner/communities'}>
                            <button>
                                <X />
                            </button>
                        </Link>
                    </div>
                    <section className="space-y-4 text-center">
                        <TitlePage>START A COMMUNITY</TitlePage>
                    </section>
                    <section className="space-y-2">
                        <Step count={5} index={index} />
                    </section>
                </>
            )}

            <section>
                <div
                    className={clsx(
                        index === 1 ? 'block' : 'hidden',
                        'p-8 shadow-lg'
                    )}
                >
                    <Step1
                        onFinish={(res) => {
                            setdata({
                                ...data,
                                city_id: res.city,
                                latitude: res.latitude,
                                longitude: res.longitude,
                                address: res.address,
                            });
                            setindex(2);
                        }}
                    />
                </div>
                <div
                    className={clsx(
                        index === 2 ? 'block' : 'hidden',
                        'p-8 shadow-lg'
                    )}
                >
                    <Step2
                        onFinish={(res) => {
                            setdata({
                                ...data,
                                title: res.title,
                                about: res.about,
                            });
                            setindex(3);
                        }}
                    />
                </div>
                <div
                    className={clsx(
                        index === 3 ? 'block' : 'hidden',
                        'p-8 shadow-lg'
                    )}
                >
                    <Step3
                        onFinish={(res) => {
                            setdata({
                                ...data,
                                tags: res,
                            });
                            setindex(4);
                        }}
                    />
                </div>

                <div
                    className={clsx(
                        index === 4 ? 'block' : 'hidden',
                        'p-8 shadow-lg'
                    )}
                >
                    <Step4
                        onFinish={(res) => {
                            setindex(5);
                            mutate({
                                ...data,
                                img: res.img,
                            } as BodyCreateCommunity);
                        }}
                    />
                </div>

                <div
                    className={clsx(index === 5 ? 'block' : 'hidden', 'mt-16')}
                >
                    {isLoadingCreate && (
                        <div className="flex items-center justify-center space-x-2 text-center font-semibold">
                            <Spinner /> <span>Creating Community</span>
                        </div>
                    )}
                    {isSuccess && <Step5 />}
                </div>
            </section>
        </div>
    );
}

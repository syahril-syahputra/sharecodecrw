import React from 'react';
import CardCommercials from '../Card/CardCommercials';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ICommercialLanding } from '@/types/landing';

export default async function HomeCommercials(props: {
    data?: ICommercialLanding[];
}) {
    return (
        <div className="scroll-mt-20 bg-white" id="commercials">
            <div className="bg-[#E9F2FF]">
                <div className="container pb-48 pt-8">
                    <h2 className="pb-2 pt-8 text-center font-koulen text-6xl">
                        COMMERCIALS
                    </h2>
                    <div className="">
                        <div className="grid grid-cols-3 gap-8 py-5">
                            {props.data?.map((item) => (
                                <CardCommercials
                                    data={{
                                        id: item.id,
                                        title: item.title,
                                        slug: item.slug,
                                        image_url:
                                            'https://picsum.photos/300/200',
                                        city: item.city,
                                        province: item.province,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                    {props.data?.length == 0 && (
                        <div className="mb-16 text-center">
                            <span className="italic">
                                No commercial to appears
                            </span>
                        </div>
                    )}
                    <div className="mx-auto max-w-xl py-4 text-center text-xl">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry&apos;s standard dummy text ever since the
                        1500s.
                    </div>
                    <div className="mt-4 flex justify-center">
                        <Link className="block" href={'/commercial/listings'}>
                            <Button
                                variant={'default'}
                                className="rounded-full"
                            >
                                <span className="text-md">
                                    Explore more commercial
                                </span>
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

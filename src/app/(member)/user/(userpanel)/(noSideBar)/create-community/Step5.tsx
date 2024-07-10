'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Step5() {
    return (
        <div className="relative flex flex-col items-center justify-between ">
            <div className="text-center">
                <h1 className="font-semibold">Congratulations!</h1> You
                completed all the steps to create a community. Let us view your
                community request before publishing it.
            </div>
            <Image
                className="-mt-24 w-full"
                alt="created"
                src={'/image/created.svg'}
                width={600}
                height={600}
            />

            <Link href={'/user/crowner/communities'}>
                <Button
                    variant={'ghost'}
                    className=" text-center text-xl underline"
                >
                    Manage your community
                </Button>
            </Link>
        </div>
    );
}

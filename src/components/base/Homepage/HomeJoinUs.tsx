import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

export default function HomeJoinUs() {
    return (
        <div className="bg-white">
            <div className="h-[24px] w-0 border-b-[0vw] border-l-[100vw] border-t-[5vw] border-l-[#D9D9D9] border-t-transparent "></div>

            <div className="  bg-[#D9D9D9] ">
                <div className="container flex-col space-y-4  py-16 text-2xl">
                    <div className="font-koulen text-4xl font-bold">
                        JOIN US
                    </div>
                    <div className="max-w-2xl">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                    </div>
                    <Link className="block" href={'/post-a-listing'}>
                        <Button variant={'outline'} className="rounded-full">
                            Post a listing now!
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

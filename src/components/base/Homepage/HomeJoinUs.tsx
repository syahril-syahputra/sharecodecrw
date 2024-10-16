import { Button } from '@/components/ui/button';
import React from 'react';

export default function HomeJoinUs() {
    return (
        <div className="bg-[#D9D9D9]">
            <div className="container flex-col space-y-4  py-16 text-2xl">
                <div className="font-koulen text-4xl font-bold">JOIN US</div>
                <div className="max-w-2xl">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                </div>
                <Button variant={'outline'} className="rounded-full">
                    Post a listing now!
                </Button>
            </div>
        </div>
    );
}

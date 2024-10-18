import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

function Block(props: { title: string; href: string; buttonTitle: string }) {
    return (
        <div className="flex flex-col items-center justify-center space-y-4 rounded-md border bg-white p-16 shadow-md">
            <div className="font-koulen text-2xl font-bold">{props.title}</div>
            <Link href={props.href}>
                <Button className="rounded-full" variant={'secondary'}>
                    {props.buttonTitle}
                </Button>
            </Link>
        </div>
    );
}
export default function HomeFeature() {
    return (
        <div className="container -mt-24  flex justify-center space-x-8">
            <Block
                title="EVENTS"
                href="/crowner/events"
                buttonTitle="explore our events"
            />
            <Block
                title="COMMUNITIES"
                href="/crowner/communities"
                buttonTitle="explore our communities"
            />
            <Block
                title="Community tutors"
                href="/crowner/community-tutors"
                buttonTitle="explore our tutors"
            />
        </div>
    );
}

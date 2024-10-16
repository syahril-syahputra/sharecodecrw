import { Button } from '@/components/ui/button';
import React from 'react';

function Block(props: { title: string; href: string; buttonTitle: string }) {
    return (
        <div className="flex flex-col items-center justify-center space-y-4 rounded-md border bg-white p-16 shadow-md">
            <div className="font-koulen text-2xl font-bold">{props.title}</div>
            <Button variant={'secondary'}>{props.buttonTitle}</Button>
        </div>
    );
}
export default function HomeFeature() {
    return (
        <div className="container  -mt-24 flex justify-evenly">
            <Block title="EVENTS" href="/" buttonTitle="explore our events" />
            <Block
                title="COMMUNITIES"
                href="/"
                buttonTitle="explore our communities"
            />
            <Block
                title="Community tutors"
                href="/"
                buttonTitle="explore our tutors"
            />
        </div>
    );
}

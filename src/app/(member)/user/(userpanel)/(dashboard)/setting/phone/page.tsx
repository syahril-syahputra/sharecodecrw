'use client';
import TitleFormHeader from '@/components/base/Title/TitleFormHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, CircleAlert } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function Page() {
    return (
        <div className="flex-1">
            <Link href={'/user/setting'}>
                <Button variant={'ghost'}>
                    <ChevronLeft /> Back
                </Button>
            </Link>
            <div className="space-y-8 p-8">
                <TitleFormHeader>Verify your phone number</TitleFormHeader>
                <div className="flex items-start space-x-4">
                    <div className="flex flex-1 items-center space-x-4">
                        <Input placeholder="" className="w-12 text-center" />
                        <Input placeholder="" className="flex-1" />
                    </div>
                    <div className="flex flex-1 items-center space-x-2 pt-2">
                        <CircleAlert />
                        <span>
                            Verify phone number once again, after update.
                        </span>
                    </div>
                </div>
                <Button>VERIFY NEW PHONE NUMBER</Button>
            </div>
        </div>
    );
}

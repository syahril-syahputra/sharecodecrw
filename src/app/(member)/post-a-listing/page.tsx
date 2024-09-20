'use client';
import DialogLoginRequired from '@/components/base/Dialog/DialogLoginRequired';
import { CalendarClock, FolderClock, Users } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react';

export default function Page() {
    const { status } = useSession();
    const isLogin = status === 'authenticated';
    const [dialoig, setdialoig] = useState(false);
    return (
        <div className=" mx-auto max-w-2xl border border-border p-8  ">
            <div className="space-y-4">
                <DialogLoginRequired
                    title="Sign in to post a listing"
                    isOpen={dialoig}
                    onOpenChange={(value) => setdialoig(value)}
                />
                <h1 className="rounded-md bg-border p-4 text-center text-xl font-bold shadow-md">
                    POST A LISTING
                </h1>
                <ul className="flex flex-col space-y-8 py-4">
                    <Link href={!isLogin ? '' : '/user/create-community'}>
                        <li
                            onClick={() => !isLogin && setdialoig(true)}
                            className="flex items-center space-x-2 p-4  font-bold  hover:bg-primary-foreground"
                        >
                            <Users className="text-primary" size={36} />
                            <span>Communities</span>
                        </li>
                    </Link>
                    <Link
                        href={
                            !isLogin ? '' : '/user/crowner/events/create-event'
                        }
                    >
                        <li
                            onClick={() => !isLogin && setdialoig(true)}
                            className="flex items-center space-x-2 p-4  font-bold  hover:bg-primary-foreground"
                        >
                            <FolderClock className="text-primary" size={36} />
                            <span>Events</span>
                        </li>
                    </Link>
                    <Link
                        href={
                            !isLogin
                                ? ''
                                : '/user/crowner/community-tutors/create'
                        }
                    >
                        <li
                            onClick={() => !isLogin && setdialoig(true)}
                            className="flex items-center space-x-2 p-4 font-bold hover:bg-primary-foreground"
                        >
                            <CalendarClock className="text-primary" size={36} />
                            <span>Coommunity Events</span>
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    );
}

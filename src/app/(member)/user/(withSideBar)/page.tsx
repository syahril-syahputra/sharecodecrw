'use client';
import CardCommunity from '@/components/base/Card/CardCommunity';
import CardEvent from '@/components/base/Card/CardEvent';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useFetchCommunity } from '@/feature/community/useFetchCommunity';
import { useFetchEvent } from '@/feature/events/useFetchEvent';
import { useFetchProfile } from '@/feature/user/profile';
import { IDetailCommunity } from '@/types/community';
import { IDetailEvent } from '@/types/events';
import { IProfile } from '@/types/user';
import { Edit, Plus } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function Page() {
    const { data: session } = useSession();
    const [currentProfile, setcurrentProfile] = useState<IProfile>({});
    const { mutate } = useFetchProfile((data) => {
        setcurrentProfile(data);
    });
    const { data: event } = useFetchEvent(
        {
            pageIndex: 1,
            pageSize: 4,
        },
        {
            event_schedule: 'upcoming',
            acceptance_status: '',
            is_visible: 'true',
        },
        { sort_by: 'date_time', sort_type: 'asc' }
    );
    const { data: communities } = useFetchCommunity(
        {
            pageIndex: 1,
            pageSize: 7,
        },
        {
            acceptance_status: 'accepted',
            is_visible: 'true',
        },
        { sort_by: 'title', sort_type: 'asc' }
    );
    useEffect(() => {
        mutate();
    }, []);
    return (
        <section className="flex-1 p-4">
            <div className="font-bold">
                <h1 className="text-2xl">
                    Welcome back, {session?.user.first_name}
                </h1>
            </div>
            <div className="flex items-center justify-between font-bold">
                <h2>Introduction</h2>
                <Link href={'/user/setting/profile'}>
                    <Button variant={'ghost'}>
                        <Edit size={18} className="mr-2" /> Edit Profile
                    </Button>
                </Link>
            </div>
            {currentProfile.about ? (
                <div className="min-h-24">
                    <span className="">{currentProfile.about}</span>
                </div>
            ) : (
                <div className="flex flex-col items-center space-y-2 p-4">
                    <Plus />
                    <span className="font-bold">{currentProfile.about}</span>
                </div>
            )}

            <div className="flex items-center justify-between border-b">
                <div className="space-x-2">
                    <span className="font-semibold">Interests :</span>{' '}
                    {currentProfile.tags?.map((item) => {
                        return (
                            <Badge key={item.id} variant={'secondary'}>
                                {item.title}
                            </Badge>
                        );
                    })}
                </div>
                <div>
                    <Link href="/user/interest">
                        <Button variant={'ghost'}>
                            <Edit size={18} className="mr-2" /> Edit Interest
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="divide-y-2">
                <div className="py-4">
                    <h1 className="pb-2 text-lg font-bold">
                        Your upcoming event
                    </h1>
                    <div>
                        <div className="flex items-start justify-between">
                            {/* <div className="flex p-4">
                            <div className="flex w-24  flex-col items-center justify-between bg-primary px-4 py-2 text-secondary">
                                <span>2</span>
                                <span>Interested</span>
                            </div>
                            <div className="flex  w-24 flex-col items-center justify-between bg-secondary px-4 py-2 ">
                                <span>3</span>
                                <span>RSVP</span>
                            </div>
                        </div> */}
                            <div className="grid flex-1 grid-cols-4 gap-4">
                                {event &&
                                    event.items.map((item: IDetailEvent) => (
                                        <Link
                                            href={
                                                '/user/crowner/events/' +
                                                item.id
                                            }
                                            key={item.id}
                                        >
                                            <CardEvent
                                                variant="vertical"
                                                data={item}
                                            />
                                        </Link>
                                    ))}
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Link href={'/user/crowner/events'}>
                                <Button variant={'ghost'}>More</Button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="py-4">
                    <h1 className="pb-2 text-lg font-bold">My Communities</h1>
                    <div className="grid grid-cols-4 gap-4">
                        <Link href={'/user/create-community'}>
                            <div className="flex h-full flex-col items-center justify-center space-y-2 rounded-md border p-4  shadow-md hover:bg-secondary">
                                <Plus size={48} />
                                <span>Start Your Community</span>
                            </div>
                        </Link>
                        {communities &&
                            communities.items.map((item: IDetailCommunity) => (
                                <Link
                                    href={
                                        '/user/crowner/communities/' + item.id
                                    }
                                    key={item.id}
                                >
                                    <CardCommunity
                                        variant="vertical"
                                        data={item}
                                    />
                                </Link>
                            ))}
                    </div>
                    <div className="flex justify-end">
                        <Link href={'/user/crowner/communities'}>
                            <Button variant={'ghost'}>More</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

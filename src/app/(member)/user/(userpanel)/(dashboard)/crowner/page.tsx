'use client';
import CardCommunity from '@/components/base/Card/CardCommunity';
import CardCommunityTutor from '@/components/base/Card/CardCommunityTutor';
import CardCreate from '@/components/base/Card/CardCreate';
import CardEvent from '@/components/base/Card/CardEvent';
import LoadingPage from '@/components/base/Loading/LoadingPage';
import TitlePage from '@/components/base/Title/TitlePage';
import { Button } from '@/components/ui/button';
import { useFetchDashboardCrowner } from '@/feature/crowner/useFetchDashboardCrowner';
import { IDetailCommunity } from '@/types/community';
import { ICommunityTutor } from '@/types/crowner/community-tutors';
import { IDetailEvent } from '@/types/events';
import Link from 'next/link';
import React from 'react';

export default function Page() {
    const { data, isLoading } = useFetchDashboardCrowner(3, 3, 4, 3);

    if (isLoading) {
        return <LoadingPage />;
    }
    return (
        <section className="flex-1 p-4">
            <TitlePage>Crowner Management</TitlePage>
            <div className="divide-y-2">
                <div className="py-4">
                    <h1 className="pb-2 text-lg font-bold">
                        Your upcoming event
                    </h1>
                    <div>
                        <div className="flex items-start justify-between">
                            <div className="grid flex-1 grid-cols-4 gap-4">
                                <CardCreate
                                    title="Create New Event"
                                    href="/user/crowner/events/create-event"
                                />
                                {data.events &&
                                    data.events.map((item: IDetailEvent) => (
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
                <div>
                    <div className="py-4">
                        <h1 className="pb-2 text-lg font-bold">
                            Your Community
                        </h1>
                        <div>
                            <div className="flex items-start justify-between">
                                <div className="grid flex-1 grid-cols-4 gap-4">
                                    <CardCreate
                                        title="Start new community"
                                        href="/user/create-community"
                                    />
                                    {data.communities &&
                                        data.communities.map(
                                            (item: IDetailCommunity) => (
                                                <Link
                                                    href={
                                                        '/user/crowner/communities/' +
                                                        item.id
                                                    }
                                                    key={item.id}
                                                >
                                                    <CardCommunity
                                                        variant="vertical"
                                                        data={item}
                                                    />
                                                </Link>
                                            )
                                        )}
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Link href={'/user/crowner/communities'}>
                                    <Button variant={'ghost'}>More</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <h1 className="pb-2 text-lg font-bold">
                            Upcomming Community Events
                        </h1>
                        <div>
                            <div className="flex items-start justify-between">
                                <div className="grid flex-1 grid-cols-4 gap-4">
                                    {data.community_events &&
                                        data.community_events.map(
                                            (item: IDetailCommunity) => (
                                                <Link
                                                    href={
                                                        '/user/crowner/events/' +
                                                        item.id
                                                    }
                                                    key={item.id}
                                                >
                                                    <CardCommunity
                                                        variant="vertical"
                                                        data={item}
                                                    />
                                                </Link>
                                            )
                                        )}
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Link href={'/user/crowner/events'}>
                                    <Button variant={'ghost'}>More</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-4">
                    <h1 className="pb-2 text-lg font-bold">Community Tutor</h1>
                    <div>
                        <div className="flex items-start justify-between">
                            <div className="grid flex-1 grid-cols-4 gap-4">
                                <CardCreate
                                    title="Start new Tutor"
                                    href="/community-tutors/create"
                                />
                                {data.community_tutors &&
                                    data.community_tutors.map(
                                        (item: ICommunityTutor) => (
                                            <Link
                                                href={`/crowner/publisher/community-tutors/${item.id}`}
                                                key={item.id}
                                            >
                                                <CardCommunityTutor
                                                    variant="vertical"
                                                    data={item}
                                                />
                                            </Link>
                                        )
                                    )}
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Link href={'/user/crowner/events'}>
                                <Button variant={'ghost'}>More</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

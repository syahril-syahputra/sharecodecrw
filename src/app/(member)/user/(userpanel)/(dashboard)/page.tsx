'use client';
import CardEvent from '@/components/base/Card/CardEvent';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useFetchEvent } from '@/feature/events/useFetchEvent';
import { IDetailEvent } from '@/types/events';
import { Edit, Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function Page() {
    const { data: event } = useFetchEvent(
        {
            pageIndex: 1,
            pageSize: 3,
        },
        {
            event_schedule: 'all',
            acceptance_status: 'idle',
            is_visible: 'true',
        },
        { sort_by: 'title', sort_type: 'desc' }
    );
    return (
        <section className="h-96 flex-1 p-4">
            <div className="flex items-center justify-between font-bold">
                <h1>Introduce Yourself</h1>
                <Button variant={'ghost'}>EDIT</Button>
            </div>
            <div className="flex flex-col items-center space-y-2 p-4">
                <Plus />
                <span className="font-bold">This is an introduction.</span>
            </div>
            <div className="flex justify-between">
                <div className="space-x-2">
                    <span className="font-semibold">Interests :</span>{' '}
                    <Badge variant={'secondary'}>Travelling</Badge>
                    <Badge variant={'secondary'}>Adventure</Badge>
                    <Badge variant={'secondary'}>Walking Tours</Badge>
                </div>
                <div>
                    <Link href="/user/interest">
                        <Button variant={'ghost'}>
                            <Edit />
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
                            <div className="grid flex-1 grid-cols-3 gap-4">
                                {event &&
                                    event.items.map((item: IDetailEvent) => (
                                        <Link
                                            href={'/user/events/' + item.id}
                                            key={item.id}
                                        >
                                            <CardEvent
                                                variant="vertikal"
                                                image={item.image_url}
                                                address={
                                                    item.city +
                                                    ', ' +
                                                    item.province
                                                }
                                                title={item.title}
                                                key={item.id}
                                                price={item.price}
                                                datetime={
                                                    new Date(item.date_time)
                                                }
                                            />
                                        </Link>
                                    ))}
                            </div>
                        </div>
                        <div className="flex justify-end py-4">
                            <Link href={'/user/events'}>
                                <Button variant={'ghost'}>More</Button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="py-4">
                    <h1 className="pb-2 text-lg font-bold">
                        Community Members
                    </h1>
                    <div className="grid grid-cols-4 gap-4">
                        <div className="flex !cursor-pointer flex-col items-center justify-center space-y-2 rounded-md border p-4  shadow-md hover:bg-secondary">
                            <Plus size={48} />
                            <span>Start Your Community</span>
                        </div>
                        {/* <CardEvent />
                        <CardEvent />
                        <CardEvent />
                        <CardEvent />
                        <CardEvent /> */}
                    </div>
                </div>
            </div>
        </section>
    );
}

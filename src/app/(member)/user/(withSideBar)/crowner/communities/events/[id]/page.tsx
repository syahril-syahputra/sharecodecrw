'use client';
import LoadingPage from '@/components/base/Loading/LoadingPage';
import IframeMap from '@/components/base/Maps/IframeMap';
import TitlePage from '@/components/base/Title/TitlePage';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useDetailEvent } from '@/feature/events/useDetailEvents';
import { visibilityStatus } from '@/lib/visibilityStatus';
import dayjs from 'dayjs';
import {
    Clock3,
    DollarSign,
    Edit,
    MapPin,
    MessageCircleHeart,
    SquareArrowOutUpRight,
    UsersRound,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import EventVisibility from './Visibility';
import DeleteEvent from './Delete';
import RsvpInterest from './RsvpInterest';

export default function Page({ params }: { params: { id: string } }) {
    const { data, isLoading, refetch } = useDetailEvent(params.id);

    if (isLoading) {
        return (
            <div className="flex-1">
                <LoadingPage />
            </div>
        );
    }
    return (
        <div className="container py-8">
            <section className="flex items-center justify-between">
                <div className="space-y-4">
                    <TitlePage>
                        {data?.title}{' '}
                        {data?.community_name ? (
                            <Link
                                href={
                                    '/user/crowner/communities/' +
                                    data?.community_id
                                }
                            >
                                {'-'}{' '}
                                <span className="inline-flex hover:underline">
                                    {data?.community_name}
                                    <SquareArrowOutUpRight className="h-4" />
                                </span>
                            </Link>
                        ) : (
                            ''
                        )}
                    </TitlePage>

                    <div className="space-x-2">
                        {data?.tags.map((tag) => {
                            return <Badge key={tag.id}>{tag.title}</Badge>;
                        })}
                    </div>
                    <div className=" capitalize">{`${data?.acceptance_status} | ${visibilityStatus(data?.is_visible)}`}</div>
                </div>
                <div className="flex items-center space-x-2">
                    <EventVisibility
                        refetch={refetch}
                        id={params.id}
                        visibility={data?.is_visible}
                    />
                    <a
                        href={`/user/crowner/communities/events/${params.id}/update`}
                    >
                        <Button size={'sm'} variant={'secondary'}>
                            <Edit className="mr-2" />
                            Edit
                        </Button>
                    </a>
                    <DeleteEvent id={params.id} />
                </div>
            </section>
            <section>
                <div className="lg:flex-cols space-x-4 space-y-2 py-4 lg:flex lg:justify-between lg:space-x-2 lg:space-y-0">
                    <div className="w-full shadow-md lg:w-3/5">
                        <div className="mb-4 rounded-xl border">
                            <Image
                                width={300}
                                height={300}
                                alt={data?.title || ''}
                                src={data?.image_url || '/image/no-image.png'}
                                className="w-full rounded-xl"
                            />
                        </div>
                        <div className="mb-8 space-y-6 p-4">
                            <div className="text-xl font-semibold">
                                Event About
                            </div>
                            <span>{data?.about}</span>
                        </div>
                    </div>
                    <div className="w-full lg:w-2/5">
                        <div className="space-y-2 rounded-xl  border p-4 shadow-md">
                            <div className="flex flex-row">
                                <div className="flex-none">
                                    <MapPin className="text-primary" />
                                </div>
                                <div className="grid-grow grid pl-4">
                                    <span className="font-semibold">
                                        {data?.address}
                                    </span>
                                    <span className="text-muted-foreground">
                                        {data?.city}, {data?.province}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-row">
                                <div className="flex-none">
                                    <Clock3 className="text-primary" />
                                </div>
                                <div className="grid grow grid-rows-2 pl-4">
                                    <span className="font-semibold">
                                        {dayjs(data?.date_time).format(
                                            'dddd, DD MMMM YYYY'
                                        )}
                                    </span>
                                    <span className="text-muted-foreground">
                                        {dayjs(data?.date_time).format('HH:mm')}{' '}
                                        ({data?.gmt_offset})
                                    </span>
                                </div>
                            </div>
                            <div className="mb-4">
                                <IframeMap
                                    latitude={data?.latitude}
                                    longitude={data?.longitude}
                                />
                            </div>
                            <div className="flex flex-row">
                                <div className="flex-none">
                                    <MessageCircleHeart className="text-primary" />
                                </div>
                                <div className="grow pl-4">
                                    <span>
                                        <span className="font-semibold">
                                            {data?.interest_counter
                                                ? data?.interest_counter
                                                : 'No'}
                                        </span>{' '}
                                        people rsvp in this event
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-row">
                                <div className="flex-none">
                                    <UsersRound className="text-primary" />
                                </div>
                                <div className="grow pl-4">
                                    <span>
                                        <span className="font-semibold">
                                            {data?.rsvp_counter
                                                ? data?.rsvp_counter
                                                : 'No'}
                                        </span>{' '}
                                        people rsvp in this event
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-row">
                                <div className="flex-none">
                                    <DollarSign className="text-primary" />
                                </div>
                                <div className="grow pl-4">
                                    <span>{data?.price_formatted}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <Separator className="my-6 w-auto" />
                <RsvpInterest id={data?.id} />
            </section>
        </div>
    );
}

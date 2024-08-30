import { notFound } from 'next/navigation';
import fetchServer from '@/lib/fetchServer';
import React from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { IDetailEvent } from '@/types/events';
import TitlePage from '@/components/base/Title/TitlePage';
import Image from 'next/image';
import { Clock3, MapPin } from 'lucide-react';
import IframeMap from '@/components/base/Maps/IframeMap';
import dayjs from 'dayjs';
import { Badge } from '@/components/ui/badge';
import EventAction from './action';
import QuestionAndAnswer from '@/components/base/QuestionAndAnswer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import Related from './related';
import { Separator } from '@/components/ui/separator';

async function getData(id: string) {
    try {
        const res = await fetchServer({
            url: `/crowner/events/${id || ''}`,
        });
        return res.data.data as IDetailEvent;
    } catch {
        return notFound();
    }
}

export default async function Page({ params }: { params: { id: string } }) {
    const data = await getData(params.id);
    return (
        <div className="container space-y-4 py-8">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/crowner/events">
                            Event
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{data.title}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center justify-between">
                <TitlePage>{data?.title}</TitlePage>
                <EventAction data={data} />
            </div>
            <section className="flex items-center justify-between space-x-4">
                <div className="flex-1 space-y-4">
                    <div>
                        <div className="flex space-x-4 ">
                            <Avatar className="h-8 w-8">
                                <AvatarImage
                                    src={data.host_picture_url || ''}
                                />
                                <AvatarFallback>US</AvatarFallback>
                            </Avatar>
                            <Link href={'/profile/' + data.host_id}>
                                <h3 className="text-lg">
                                    <b>HOST</b> : {data.host_name}
                                </h3>
                            </Link>
                        </div>
                    </div>
                    <div className="">
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
                </div>
                <div className="w-2/5">
                    <div className="space-y-4 rounded-xl  border p-4 shadow-md">
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
                                    {dayjs(data?.date_time).format('HH:mm')} (
                                    {data?.gmt_offset})
                                </span>
                            </div>
                        </div>
                        <div className="mb-4">
                            <IframeMap
                                latitude={data?.latitude}
                                longitude={data?.longitude}
                            />
                        </div>

                        <div className="space-y-2">
                            <div>Interests</div>
                            <div className="">
                                {data.tags.map((item) => (
                                    <Badge
                                        variant={'outline'}
                                        className="text-base"
                                        key={item.id}
                                    >
                                        {item.title}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div>TIPS : </div>
                            <div>HOW TO STAY SAFE</div>
                            <div>Do not send money before the event</div>
                        </div>
                    </div>
                </div>
            </section>
            <Separator className="h-0.5" />
            <section>
                <Related tags={data?.tags} />
            </section>
            <Separator className="h-0.5" />
            <section>
                <QuestionAndAnswer
                    entity_id={params.id}
                    entity_type="crowners"
                />
            </section>
        </div>
    );
}

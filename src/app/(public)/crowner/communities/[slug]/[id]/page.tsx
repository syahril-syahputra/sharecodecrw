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
import TitlePage from '@/components/base/Title/TitlePage';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import IframeMap from '@/components/base/Maps/IframeMap';
import { Badge } from '@/components/ui/badge';
import EventAction from './action';
import { IDetailCommunity } from '@/types/community';
import QuestionAndAnswer from '@/components/base/QuestionAndAnswer';

async function getData(id: string) {
    try {
        const res = await fetchServer({
            url: `/crowner/communities/${id || ''}`,
        });
        return res.data.data as IDetailCommunity;
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
                        <BreadcrumbLink href="/crowner/communities">
                            Communities
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
            <section className="flex  justify-between space-x-4">
                <div className="flex-1">
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
                                Communities About
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
                    </div>
                </div>
            </section>
            <section>
                <QuestionAndAnswer
                    entity_id={params.id}
                    entity_type="crowners"
                />
            </section>
        </div>
    );
}

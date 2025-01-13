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
// import EventAction from './action';
import QuestionAndAnswer from '@/components/base/QuestionAndAnswer';
import { Separator } from '@/components/ui/separator';
import { getCurrentUser } from '@/lib/session';
import { Metadata } from 'next';
import JsonLd from '@/components/base/JsonLd/JsonLd';
import { ICommercialListing } from '@/types/commercial/listings';
import CommercialAction from './action';
import { emptyValueCheck } from '@/lib/utils';

async function getData(id: string) {
    try {
        const res = await fetchServer({
            url: `/commercials/listings/${id || ''}`,
        });
        return res.data.data as ICommercialListing;
    } catch {
        return notFound();
    }
}

export async function generateMetadata({
    params,
}: {
    params: { id: string };
}): Promise<Metadata> {
    const data = await getData(params.id);
    return {
        title: data?.title + ' | Commercial Details - Crowner',
        description: data?.about,
    };
}

export default async function Page({ params }: { params: { id: string } }) {
    const user = await getCurrentUser();
    const data = await getData(params.id);
    return (
        <div className="container space-y-4 py-8">
            <JsonLd
                name={data.title}
                image={data.image_url}
                description={data.about}
                type="commercial"
            />
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/commercial/listings">
                            Commercial Listings
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
                <CommercialAction data={data} />
            </div>
            <section className="flex items-start  justify-between space-x-4">
                <div className="flex-1 space-y-4">
                    <div className="">
                        <div className="mb-4 rounded-xl border">
                            <Image
                                width={300}
                                height={300}
                                alt={data?.title || ''}
                                src={data?.image_url || '/image/no-image.png'}
                                className="mr-4 max-h-96 w-full rounded-md object-cover"
                            />
                        </div>
                        <div className="mb-8 space-y-6">
                            <div className="text-xl font-semibold">About</div>
                            <span>{data?.description}</span>
                        </div>
                    </div>
                </div>
                <div className="w-2/5">
                    <div className="mb-4 space-y-4 rounded-xl border p-4 shadow-md">
                        <div className="flex flex-row">
                            <div className="flex-none">
                                <MapPin className="text-primary" />
                            </div>
                            <div className="grid-grow grid pl-2">
                                <span className="">
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
                    </div>
                    <div className="rounded-xl border p-4 shadow-md">
                        <p className="text-semibold mb-2 text-lg text-muted-foreground">
                            Commercial Details
                        </p>
                        <div className="space-y-2">
                            {data?.commercial_image_url && (
                                <Image
                                    className="mr-4 max-h-64 w-full rounded-md object-cover"
                                    width={200}
                                    height={200}
                                    alt={data?.commercial_name || ''}
                                    src={
                                        data?.commercial_image_url ||
                                        '/image/no-image.png'
                                    }
                                ></Image>
                            )}
                            <div>
                                <p className="text-xl font-semibold">
                                    {data.commercial_name}
                                </p>
                                <p className="text-md mb-4 text-muted-foreground">
                                    {data.service_name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    About
                                </p>
                                <p className="text-foreground">
                                    {emptyValueCheck(data.about)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Separator className="h-0.5" />
            <section>
                <QuestionAndAnswer
                    user_id={user?.id || ''}
                    entity_id={params.id}
                    entity_type="commercial_listings"
                />
            </section>
        </div>
    );
}

import React, { Fragment } from 'react';
import ImageCard from '../Image/ImageCard';
import Link from 'next/link';
import { HandPlatter, MapPin } from 'lucide-react';
import { ICommercialListing } from '@/types/commercial/listings';
import { ICommercialLanding } from '@/types/landing';

export function CardCommercials(props: { data: ICommercialLanding }) {
    return (
        <Fragment>
            <Link
                href={`/commercial/listings/${props.data.slug}/${props.data.id}`}
            >
                <div className="group relative rounded-md border shadow-md">
                    <ImageCard
                        src={props.data.image_url}
                        className="h-56"
                        width={300}
                        height={300}
                    />

                    <div className="opacity-100 transition-opacity duration-300 group-hover:opacity-0">
                        <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-md bg-black bg-opacity-20 font-koulen text-4xl text-white">
                            <span>{props.data.title}</span>
                        </div>
                        <div className="absolute -left-2 -top-2 flex items-center justify-center rounded-md text-lg">
                            <span className="rounded-md border bg-white px-2 text-sm font-semibold text-muted-foreground shadow-sm">
                                {props.data.service_name}
                            </span>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 top-12 flex items-center justify-center rounded-md text-lg text-white">
                            <span className="text-md">
                                {props.data.city && props.data.province
                                    ? `${props.data.city}, ${props.data.province}`
                                    : null}
                            </span>
                        </div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-md font-koulen text-2xl text-white">
                            <span>{props.data.commercial_name}</span>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 top-12 flex items-center justify-center rounded-md text-lg text-white">
                            <span className="text-md">
                                {props.data.service_name}
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </Fragment>
    );
}

export function SecondaryCardCommercials(props: { data: ICommercialListing }) {
    return (
        <div className="space-y-2 rounded-md border p-4 shadow-md">
            <ImageCard src={props.data.image_url} className="h-48" />
            <div className="">
                <div className="text-md line-clamp-1 font-semibold capitalize">
                    {props.data.title}
                </div>
                <div className="flex flex-row">
                    <div className="flex-none">
                        <MapPin size={18} className="text-primary" />
                    </div>
                    <div className="grid-grow !line-clamp-1 grid pl-1 text-sm text-muted-foreground">
                        {props.data.province}, {props.data.city}
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="flex-none">
                        <HandPlatter size={18} className="text-primary" />
                    </div>
                    <div className="grid-grow !line-clamp-1 grid pl-1 text-sm text-muted-foreground">
                        {props.data.service_name}
                    </div>
                </div>
            </div>
        </div>
    );
}

import { IDataLanding } from '@/types/landing';
import React from 'react';
import CardHomeEvent from './CardHomeEvent';
import CardHomeCommunities from './CardHomeCommunities';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import Link from 'next/link';

export default function HomeData(props: { data?: IDataLanding }) {
    return (
        <div className="container space-y-8 py-16">
            <div>
                <div className="flex items-center justify-between py-2">
                    <h1 className="font-koulen text-4xl">Events</h1>
                    <span className="text-xl font-semibold underline">
                        discover more
                    </span>
                </div>
                <Carousel className="w-full">
                    <CarouselContent className="">
                        {props.data?.events.map((data) => (
                            <CarouselItem
                                key={data.id}
                                className="md:basis-1/5 lg:basis-1/5"
                            >
                                <Link
                                    href={
                                        '/crowner/events/' +
                                        data.slug +
                                        '/' +
                                        data.id
                                    }
                                    key={data.id}
                                >
                                    <CardHomeEvent data={data} key={data.id} />
                                </Link>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
            <div>
                <div className="flex items-center justify-between py-2">
                    <h1 className="font-koulen text-4xl">COMMUNITIES</h1>
                    <span className="text-xl font-semibold underline">
                        discover more
                    </span>
                </div>
                <Carousel className="w-full">
                    <CarouselContent className="">
                        {props.data?.communities.map((data) => (
                            <CarouselItem
                                key={data.id}
                                className="md:basis-1/5 lg:basis-1/5"
                            >
                                <Link
                                    href={
                                        '/crowner/communities/' +
                                        data.slug +
                                        '/' +
                                        data.id
                                    }
                                    key={data.id}
                                >
                                    <CardHomeCommunities
                                        data={data}
                                        key={data.id}
                                    />
                                </Link>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
            <div>
                <div className="flex items-center justify-between py-2">
                    <h1 className="font-koulen text-4xl">COMMUNITY TUTORS</h1>
                    <span className="text-xl font-semibold underline">
                        discover more
                    </span>
                </div>
                <Carousel className="w-full">
                    <CarouselContent className="">
                        {props.data?.community_tutors.map((data) => (
                            <CarouselItem
                                key={data.id}
                                className="md:basis-1/5 lg:basis-1/5"
                            >
                                <Link
                                    href={
                                        '/crowner/community-tutors/' +
                                        data.slug +
                                        '/' +
                                        data.id
                                    }
                                    key={data.id}
                                >
                                    <CardHomeCommunities
                                        data={data}
                                        key={data.id}
                                    />
                                </Link>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </div>
    );
}

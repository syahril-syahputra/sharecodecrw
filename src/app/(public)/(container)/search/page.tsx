import CardCommercials from '@/components/base/Card/CardCommercials';
import TitleSearchResult from '@/components/base/Title/TitleSearchResult';
import { Button } from '@/components/ui/button';
import fetchServer from '@/lib/fetchServer';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { Fragment } from 'react';

interface Listing {
    id: string;
    slug: string;
    title: string;
    listing_type: string;
    listing_type_formatted: string;
}

interface CommercialListing {
    id: string;
    title: string;
    slug: string;
    service_name: string;
    commercial_name: string;
}

interface ISearchResult {
    related: Listing[];
    events: number;
    communities: number;
    community_tutors: number;
}

async function getData(value?: string) {
    try {
        const res = await fetchServer({
            url: `/crowner/search?query=${value || ''}`,
        });
        return res.data.data as ISearchResult;
    } catch {
        return notFound();
    }
}

async function getCommercials(value?: string) {
    try {
        const res = await fetchServer({
            url: `/commercials/search?query=${value || ''}`,
        });
        return res.data.data as CommercialListing[];
    } catch {
        return [] as CommercialListing[];
    }
}

export default async function page({
    searchParams,
}: {
    searchParams?: { [search: string]: string };
}) {
    const data = await getData(searchParams?.search);
    const createUrl = (data: Listing) => {
        if (data.listing_type === 'events') {
            return `/crowner/events/${data.slug}/${data.id}`;
        } else if (data.listing_type === 'communities') {
            return `/crowner/communities/${data.slug}/${data.id}`;
        } else if (data.listing_type === 'community_tutors') {
            return `/crowner/community-tutors/${data.slug}/${data.id}`;
        } else {
            return '';
        }
    };

    const commercials = await getCommercials(searchParams?.search);
    const createCommercialUrl = (commercials: CommercialListing) => {
        return `/commercial/listings/${commercials.slug}/${commercials.id}`;
    };
    return (
        <Fragment>
            <h1 className="text-xl text-primary">Search Result</h1>
            <div className="mb-10 py-4">
                <h2 className="text-center font-koulen text-5xl">
                    Commercials
                </h2>
                <div className="grid grid-cols-3 gap-8 py-5">
                    {commercials?.map((item) => (
                        <CardCommercials
                            data={{
                                title: item.title,
                                slug: item.slug,
                                id: item.id,
                                image_url: 'https://picsum.photos/300/200',
                            }}
                        />
                    ))}
                </div>
                {commercials.length == 0 && (
                    <div className="mb-16 text-center">
                        <span className="italic">
                            No commercial found, try another keyword
                        </span>
                    </div>
                )}
                <div className="flex justify-center">
                    <Link
                        className="block"
                        href={`/commercial/listings?title=${searchParams?.search}`}
                    >
                        <Button className="rounded-full">
                            <span className="text-md">
                                {commercials?.length > 0
                                    ? 'More result'
                                    : 'Or find another one!'}
                            </span>
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="border-2 border-t">
                <></>
            </div>
            <div className="space-y-8 py-10">
                <h2 className="text-center font-koulen text-5xl">Crowners</h2>
                <div className="mx-auto max-w-2xl rounded-md bg-white p-4 shadow-xl">
                    <TitleSearchResult>Related Results</TitleSearchResult>
                    <ul>
                        {data.related.map((item) => (
                            <Link href={createUrl(item)} key={item.id}>
                                <li className="cursor-pointer capitalize hover:text-primary">
                                    {item.title} ({item.listing_type_formatted})
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
                <div className="flex items-center space-x-4">
                    <Link
                        className="block flex-1 "
                        href={
                            '/crowner/community-tutors?title=' +
                            searchParams?.search
                        }
                    >
                        <div className="rounded-md bg-white p-4 shadow-xl">
                            <TitleSearchResult>
                                Community Tutors
                            </TitleSearchResult>
                            <span className="block py-8">
                                {data.community_tutors} Listing Found
                            </span>
                        </div>
                    </Link>
                    <Link
                        className="block flex-1 "
                        href={'/crowner/events?title=' + searchParams?.search}
                    >
                        <div className="rounded-md bg-white p-4 shadow-xl">
                            <TitleSearchResult>Events</TitleSearchResult>
                            <span className="block py-8">
                                {data.events} Listing Found
                            </span>
                        </div>
                    </Link>
                    <Link
                        className="block flex-1 "
                        href={
                            '/crowner/communities?title=' + searchParams?.search
                        }
                    >
                        <div className="rounded-md bg-white p-4 shadow-xl">
                            <TitleSearchResult>Communitites</TitleSearchResult>
                            <span className="block py-8">
                                {data.communities} Listing Found
                            </span>
                        </div>
                    </Link>
                </div>
            </div>
        </Fragment>
    );
}

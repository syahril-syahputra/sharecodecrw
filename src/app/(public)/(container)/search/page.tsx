import TitleSearchResult from '@/components/base/Title/TitleSearchResult';
import fetchServer from '@/lib/fetchServer';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

interface Listing {
    id: string;
    slug: string;
    title: string;
    listing_type: string;
    listing_type_formatted: string;
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
    return (
        <div className="space-y-8 py-4">
            <div className="mx-auto max-w-2xl rounded-md p-4 shadow-xl">
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
                    <div className="rounded-md p-4 shadow-xl">
                        <TitleSearchResult>Community Tutors</TitleSearchResult>
                        <span className="block py-8">
                            {data.community_tutors} Listing Found
                        </span>
                    </div>
                </Link>
                <Link
                    className="block flex-1 "
                    href={'/crowner/events?title=' + searchParams?.search}
                >
                    <div className="rounded-md p-4 shadow-xl">
                        <TitleSearchResult>Events</TitleSearchResult>
                        <span className="block py-8">
                            {data.events} Listing Found
                        </span>
                    </div>
                </Link>
                <Link
                    className="block flex-1 "
                    href={'/crowner/communities?title=' + searchParams?.search}
                >
                    <div className="rounded-md p-4 shadow-xl">
                        <TitleSearchResult>Communitites</TitleSearchResult>
                        <span className="block py-8">
                            {data.communities} Listing Found
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    );
}

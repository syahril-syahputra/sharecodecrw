import fetchServer from '@/lib/fetchServer';
import { IPaginationMeta } from '@/types/base/pagination';
import { ICommercialListing } from '@/types/commercial/listings';
import SortListing from './sort';
import FilterCommercialListing from './filter';
import { Fragment } from 'react';
import Link from 'next/link';
import { SecondaryCardCommercials } from '@/components/base/Card/CardCommercials';
import SSRPagination from '@/components/ui/ssr-pagination';

async function getData(filter: string | undefined) {
    try {
        const baseUrl = `/commercials/listings`;
        const convertObject = new URLSearchParams(filter).toString();

        const sortBy = 'sort_by=latest';

        const url = `${baseUrl}?paginate=12&${sortBy}&${convertObject}`;
        const res = await fetchServer({
            url: url,
        });
        return res.data.data as {
            items: ICommercialListing[];
            meta: IPaginationMeta;
        };
    } catch (error) {
        console.log(error);
        // return notFound();
    }
}
export default async function Page({
    searchParams,
}: {
    searchParams?: string;
}) {
    const data = await getData(searchParams);
    return (
        <div className="mt-10">
            <SortListing searchParams={searchParams || ''} />
            <div className="flex">
                <FilterCommercialListing searchParams={searchParams || ''} />
                <div className="flex-1">
                    <section className="px-4">
                        {data?.items.length === 0 && (
                            <div className="bg-primary-foreground p-8 text-center">
                                Data Not Found
                            </div>
                        )}
                        {data && data?.items.length > 0 && (
                            <Fragment>
                                <div className="grid grid-cols-3 gap-4">
                                    {data.items.map(
                                        (item: ICommercialListing) => (
                                            <Link
                                                href={
                                                    '/commercial/listings/' +
                                                    item.slug +
                                                    '/' +
                                                    item.id
                                                }
                                                key={item.id}
                                            >
                                                <SecondaryCardCommercials
                                                    data={item}
                                                />
                                            </Link>
                                        )
                                    )}
                                </div>
                                <div className="mt-8">
                                    <SSRPagination
                                        meta={data?.meta}
                                        baseUrl="/commercial/listings"
                                        searchParams={searchParams || ''}
                                    />
                                </div>
                            </Fragment>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
}

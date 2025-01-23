'use client';
import React from 'react';
import CardServices from '../Card/CardServices';
import { useFetchServices } from '@/feature/services/useFetchServices';
import { IFilterServices } from '@/types/services';
import useTableConfig from '@/lib/useTableConfig';
import InfiniteScroll from '@/components/ui/InfiniteScroll';
import { Skeleton } from '@/components/ui/skeleton';

export default function HomeServices() {
    const { filter, sort, pagination } = useTableConfig<IFilterServices>({
        defaultFilter: {
            title: '',
            rad: '40.79509100',
            lat: '40.79509100',
            lng: '-73.96828500',
        },
    });
    const { data, fetchNextPage, isLoading, hasNextPage } = useFetchServices(
        filter,
        sort,
        pagination,
        () => {}
    );
    const column1 =
        data &&
        data.pages.map((page) =>
            page.items.filter((_, index) => index % 2 === 0)
        );

    const column2 =
        data &&
        data.pages.map((page) =>
            page.items.filter((_, index) => index % 2 !== 0)
        );
    return (
        <div className="pb-10">
            <div className="container flex gap-4">
                <div className="flex w-1/2 flex-col gap-4">
                    {column1 &&
                        column1.map((items) =>
                            items.map((item) => (
                                <CardServices key={item.id} data={item} />
                            ))
                        )}
                </div>
                <div className="flex w-1/2 flex-col gap-4">
                    {column2 &&
                        column2.map((items) =>
                            items.map((item) => (
                                <CardServices key={item.id} data={item} />
                            ))
                        )}
                </div>
            </div>

            {/* <div className="container grid grid-cols-2 gap-4">
                {data &&
                    data.pages.map((page) =>
                        page.items.map((item) => (
                            <CardServices key={item.id} data={item} />
                        ))
                    )}
            </div> */}
            <InfiniteScroll
                hasMore={hasNextPage}
                isLoading={isLoading}
                next={() => fetchNextPage()}
                threshold={1}
            >
                {hasNextPage && (
                    <div className="container  py-8">
                        <div className="border-Input flex flex-1 items-center justify-between space-x-2  px-4 py-4 ">
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-6 w-full" />
                                <Skeleton className="h-6 w-full" />
                            </div>
                        </div>
                    </div>
                )}
            </InfiniteScroll>
        </div>
    );
}

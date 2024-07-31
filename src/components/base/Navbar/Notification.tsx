'use client';
import InfiniteScroll from '@/components/ui/InfiniteScroll';
import { Skeleton } from '@/components/ui/skeleton';
import { useFetchQuestion } from '@/feature/qa/useFetchQueystion';
import useTableConfig from '@/lib/useTableConfig';
import React from 'react';
import CardQuestion from '../QuestionAndAnswer/CardQuestion';
import CardNotification from '../Card/CardNotification';

export default function Notification() {
    const { pagination, filterValue } = useTableConfig<{
        entity_type: string;
        entity_id: string;
    }>({
        pageSize: 2,
        defaultFilter: {
            entity_type: 'crowners',
            entity_id: '01J1RWEFJ5GYD95ZWD28YC7ZQ1',
        },
    });
    const { data, fetchNextPage, isLoading, hasNextPage } = useFetchQuestion(
        pagination,
        filterValue,
        'oldest'
    );

    return (
        <div className="bg-background p-4">
            <div className="sticky top-0 z-10 bg-background py-2 text-right ">
                <span className="cursor-pointer text-sm hover:text-primary">
                    Mark all as read
                </span>
            </div>
            <div>
                {data &&
                    data.pages.map((page) =>
                        page.items.map((item) => (
                            <CardNotification key={item.id} data={item} />
                        ))
                    )}
            </div>
            <InfiniteScroll
                hasMore={hasNextPage}
                isLoading={isLoading}
                next={() => fetchNextPage()}
                threshold={1}
            >
                {hasNextPage && (
                    <div className="border-Input flex items-center justify-between space-x-2 border-b px-4 py-4 ">
                        <Skeleton className="aspect-square h-14 rounded-full" />
                        <div className="flex-1 space-y-1">
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-4 w-full" />
                        </div>
                        <Skeleton className="aspect-square h-14 rounded-md" />
                    </div>
                )}
            </InfiniteScroll>
        </div>
    );
}

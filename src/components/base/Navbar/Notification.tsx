'use client';
import InfiniteScroll from '@/components/ui/InfiniteScroll';
import { Skeleton } from '@/components/ui/skeleton';
import useTableConfig from '@/lib/useTableConfig';
import React from 'react';
// import CardQuestion from '../QuestionAndAnswer/CardQuestion';
import CardNotification from '../Card/CardNotification';
import { useFetchNotification } from '@/feature/notification/useFetchNotification';

// interface IProps {
//     counter: [number, React.Dispatch<React.SetStateAction<number>>];
// }
export default function Notification() {
    const { pagination } = useTableConfig({
        pageSize: 10,
        defaultFilter: {},
    });
    const { data, fetchNextPage, isLoading, hasNextPage } =
        useFetchNotification(pagination);

    return (
        <div className="mb-4 bg-background">
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

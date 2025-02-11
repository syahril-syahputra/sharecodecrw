'use client';
import CardDarkNeonGlow from '@/components/base/Card/CardDarkNeonGlow';
import LastChat from '@/components/base/Chat/LastChat';
import LoadingPage from '@/components/base/Loading/LoadingPage';
import PaginationTable from '@/components/ui/pagination-table';
import { useFetchConversationRooms } from '@/feature/chat/useFetchConversationRooms';
import useTableConfig from '@/lib/useTableConfig';
import { MessagesSquareIcon } from 'lucide-react';
import Link from 'next/link';
import React, { Fragment } from 'react';

export default function Page() {
    const { pagination, setPagination, filterValue } = useTableConfig<{
        listing_type: string;
    }>({
        defaultFilter: {
            listing_type: '',
        },
    });
    const { data } = useFetchConversationRooms(
        pagination,
        filterValue,
        'latest'
    );
    return (
        <div className="flex-1 px-6">
            {false && <LoadingPage />}

            {!false && (
                <Fragment>
                    <CardDarkNeonGlow>
                        <div className="mb-5 flex justify-between">
                            <h1 className="flex space-x-2 text-4xl">
                                <MessagesSquareIcon size={35} />
                                <p>Chats</p>
                            </h1>
                        </div>

                        {data &&
                            data?.items.map((item) => {
                                return (
                                    <Link
                                        key={item.id}
                                        href={`/user/direct-chats/room/${item.id}`}
                                    >
                                        <LastChat key={item.id} data={item} />
                                    </Link>
                                );
                            })}
                        <div className="mt-8">
                            <PaginationTable
                                meta={data?.meta}
                                setPagination={setPagination}
                            />
                        </div>
                    </CardDarkNeonGlow>
                </Fragment>
            )}
        </div>
    );
}

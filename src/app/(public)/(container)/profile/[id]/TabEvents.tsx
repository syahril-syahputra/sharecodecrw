'use client';
import CardEvent from '@/components/base/Card/CardEvent';
import PaginationTable from '@/components/ui/pagination-table';
import { useFetchProfileEvent } from '@/feature/user/profile';
import useTableConfig from '@/lib/useTableConfig';
import { IFilterEvent } from '@/types/events';
import Link from 'next/link';
import React from 'react';

export default function TabEvents(props: { id: string }) {
    const { sort, pagination, setPagination } = useTableConfig<IFilterEvent>({
        pageSize: 10,
        defaultFilter: {},
    });
    const { data, isLoading } = useFetchProfileEvent(
        props.id,
        pagination,
        sort
    );
    return (
        <div>
            <div className="grid grid-cols-5  gap-4">
                {isLoading ? (
                    <></>
                ) : data?.items.length ? (
                    data?.items.map((item) => (
                        <Link
                            href={
                                '/crowner/events/' + item.slug + '/' + item.id
                            }
                            key={item.id}
                        >
                            <CardEvent data={item} variant="vertical" />
                        </Link>
                    ))
                ) : (
                    <div className="text-center text-primary">
                        Data Not Found
                    </div>
                )}
            </div>
            <div className="mt-8">
                <PaginationTable
                    meta={data?.meta}
                    setPagination={setPagination}
                />
            </div>
        </div>
    );
}

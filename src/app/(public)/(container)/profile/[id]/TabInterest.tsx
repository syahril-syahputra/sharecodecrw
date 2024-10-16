'use client';
import CardInterestsFavorites from '@/components/base/Card/CardInterestsFavorites';
import PaginationTable from '@/components/ui/pagination-table';
import { useFetchProfileInterest } from '@/feature/user/profile';
import useTableConfig from '@/lib/useTableConfig';
import { IFilterEvent } from '@/types/events';
import React from 'react';

export default function TabInterest(props: { id: string }) {
    const { sort, pagination, setPagination } = useTableConfig<IFilterEvent>({
        pageSize: 10,
        defaultFilter: {},
    });
    const { data, isLoading } = useFetchProfileInterest(
        props.id,
        pagination,
        sort
    );
    return (
        <div>
            <div className="grid grid-cols-5 gap-4">
                {isLoading ? (
                    <></>
                ) : data?.items.length ? (
                    data?.items.map((item) => (
                        <CardInterestsFavorites
                            key={item.id}
                            data={item}
                            variant="vertical"
                        />
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

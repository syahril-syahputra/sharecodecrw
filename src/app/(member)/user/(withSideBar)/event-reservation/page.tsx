'use client';
import CardEventReservation from '@/components/base/Card/CardEventReservation';
import LoadingPage from '@/components/base/Loading/LoadingPage';
import PaginationTable from '@/components/ui/pagination-table';
import {
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useFetchEventReservation } from '@/feature/event-reservation/useFetchEventReservation';
import useTableConfig from '@/lib/useTableConfig';
import { Select } from '@radix-ui/react-select';
import React, { useState } from 'react';

export default function Page() {
    const [sortBy, setsortBy] = useState('latest');
    const { pagination, setPagination, filterValue } = useTableConfig<{
        listing_type: string;
    }>({
        defaultFilter: {
            listing_type: '',
        },
    });
    const { data, isLoading } = useFetchEventReservation(
        pagination,
        filterValue,
        sortBy
    );
    return (
        <div className="flex-1 p-9">
            {isLoading && <LoadingPage />}

            {!isLoading && (
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <div></div>
                        <div className="flex items-center space-x-4">
                            <span className="whitespace-nowrap">Sort By</span>
                            <Select
                                onValueChange={(value) => setsortBy(value)}
                                value={sortBy}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={'latest'}>
                                        Latest
                                    </SelectItem>
                                    <SelectItem value={'oldest'}>
                                        Oldest
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-4 ">
                        {data &&
                            data?.items.map((item) => {
                                return (
                                    <CardEventReservation
                                        key={item.id}
                                        data={item}
                                    />
                                );
                            })}
                    </div>
                    <div className="mt-8">
                        <PaginationTable
                            meta={data?.meta}
                            setPagination={setPagination}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

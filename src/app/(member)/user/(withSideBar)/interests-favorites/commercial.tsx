'use client';
import CardCommercialInterestsFavorites from '@/components/base/Card/CardCommercialInterestsFavorites';
import LoadingPage from '@/components/base/Loading/LoadingPage';
import PaginationTable from '@/components/ui/pagination-table';
import {
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useFetchCommercialInterestsFavorites } from '@/feature/interests-favorites/useFetchCommercialInterestsFavorites';
import useTableConfig from '@/lib/useTableConfig';
import { Select } from '@radix-ui/react-select';
import React, { useState } from 'react';

export default function CommercialInterest() {
    const [sortBy, setsortBy] = useState('newest');
    const { pagination, setPagination, filterValue } = useTableConfig<{
        listing_type: string;
    }>({
        defaultFilter: {
            listing_type: '',
        },
    });
    const { data, isLoading } = useFetchCommercialInterestsFavorites(
        pagination,
        filterValue,
        sortBy
    );
    return (
        <div className="flex-1 px-8">
            {isLoading && (
                <div className="mt-8">
                    <LoadingPage />
                </div>
            )}

            {!isLoading && (
                <div className="space-y-4">
                    <div className="flex justify-end">
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
                                    <SelectItem value={'newest'}>
                                        Newest
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
                                    <CardCommercialInterestsFavorites
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

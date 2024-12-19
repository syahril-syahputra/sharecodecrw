'use client';
import CardInterestsFavorites from '@/components/base/Card/CardInterestsFavorites';
import LoadingPage from '@/components/base/Loading/LoadingPage';
import { Button } from '@/components/ui/button';
import PaginationTable from '@/components/ui/pagination-table';
import {
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import Spinner from '@/components/ui/spinner';
import { useFetchInterestsFavorites } from '@/feature/interests-favorites/useFetchInterestsFavorites';
import useTableConfig from '@/lib/useTableConfig';
import { Select } from '@radix-ui/react-select';
import React, { useState } from 'react';

export default function CrownerInterest() {
    const [sortBy, setsortBy] = useState('newest');
    const {
        pagination,
        setPagination,
        filterHandler,
        filterValue,
        setfilterValue,
    } = useTableConfig<{
        listing_type: string;
    }>({
        defaultFilter: {
            listing_type: '',
        },
    });
    const { data, isLoading, isFetching } = useFetchInterestsFavorites(
        pagination,
        filterValue,
        sortBy
    );
    const changeFilter = (value: string) => {
        setfilterValue({
            listing_type: value,
        });
        filterHandler();
    };
    return (
        <div className="w-full px-8 py-4">
            {isLoading && <LoadingPage />}

            {!isLoading && (
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <div className="space-x-2">
                            <Button
                                variant={
                                    filterValue.listing_type === ''
                                        ? 'default'
                                        : 'outline'
                                }
                                onClick={() => changeFilter('')}
                            >
                                All
                            </Button>
                            <Button
                                variant={
                                    filterValue.listing_type === 'events'
                                        ? 'default'
                                        : 'outline'
                                }
                                onClick={() => changeFilter('events')}
                            >
                                Event
                            </Button>
                            <Button
                                variant={
                                    filterValue.listing_type === 'communities'
                                        ? 'default'
                                        : 'outline'
                                }
                                onClick={() => changeFilter('communities')}
                            >
                                Communities
                            </Button>
                            <Button
                                variant={
                                    filterValue.listing_type ===
                                    'community_tutors'
                                        ? 'default'
                                        : 'outline'
                                }
                                onClick={() => changeFilter('community_tutors')}
                            >
                                Community Tutors
                            </Button>
                        </div>
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
                        {isFetching && (
                            <div className="flex justify-center p-8">
                                <Spinner />
                            </div>
                        )}
                        {!isFetching &&
                            data &&
                            data?.items.map((item) => {
                                return (
                                    <CardInterestsFavorites
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

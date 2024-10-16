'use client';
import CardCommunityTutor from '@/components/base/Card/CardCommunityTutor';
import PaginationTable from '@/components/ui/pagination-table';
import { useFetchProfileCommunitiyTutors } from '@/feature/user/profile';
import useTableConfig from '@/lib/useTableConfig';
import { IFilterEvent } from '@/types/events';
import Link from 'next/link';
import React from 'react';

export default function TabCommunityTutors(props: { id: string }) {
    const { sort, pagination, setPagination } = useTableConfig<IFilterEvent>({
        pageSize: 10,
        defaultFilter: {},
    });
    const { data, isLoading } = useFetchProfileCommunitiyTutors(
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
                                '/crowner/community-tutors/' +
                                item.slug +
                                '/' +
                                item.id
                            }
                            key={item.id}
                        >
                            <CardCommunityTutor
                                data={item}
                                variant="vertical"
                            />
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

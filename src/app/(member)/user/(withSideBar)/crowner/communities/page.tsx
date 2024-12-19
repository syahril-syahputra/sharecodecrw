'use client';
import CardCommunity from '@/components/base/Card/CardCommunity';
import LoadingFetch from '@/components/base/Loading/LoadingFetch';
import TitleFormHeader from '@/components/base/Title/TitleFormHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PaginationTable from '@/components/ui/pagination-table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useFetchCommunity } from '@/feature/community/useFetchCommunity';
import useTableConfig from '@/lib/useTableConfig';
import { IFilterCommunity } from '@/types/community';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function Page() {
    const {
        filterValue,
        filter,
        sort,
        pagination,
        resetHandler,
        filterHandler,
        setPagination,
        setfilterValue,
    } = useTableConfig<IFilterCommunity>({
        defaultComlumn: 'title',
        defaultFilter: {
            acceptance_status: '',
            is_visible: '',
            title: '',
        },
    });
    const { data, isLoading } = useFetchCommunity(pagination, filter, sort);

    return (
        <div className="flex-1 space-y-4 p-4">
            <div className="flex items-center justify-between border-b">
                <TitleFormHeader>Community You Manage</TitleFormHeader>
                <Link href={'/user/create-community'}>
                    <Button variant={'ghost'}>
                        <Plus />
                        <span className="pl-2">Start Community</span>
                    </Button>
                </Link>
            </div>
            <section className="flex space-x-2 divide-x-2 rounded-md border p-4">
                <div className="grid flex-1 grid-cols-2 gap-4">
                    <div>
                        <Input
                            value={filterValue.title}
                            onChange={(e) =>
                                setfilterValue({
                                    ...filterValue,
                                    title: e.target.value,
                                })
                            }
                            placeholder="Name"
                        />
                    </div>

                    <div>
                        <Select
                            onValueChange={(value) =>
                                setfilterValue({
                                    ...filterValue,
                                    acceptance_status: value,
                                })
                            }
                            value={filterValue.acceptance_status}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Acceptance (all)" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={'idle'}>All</SelectItem>
                                <SelectItem value={'accepted'}>
                                    Accepted
                                </SelectItem>
                                <SelectItem value={'rejected'}>
                                    Rejected
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Select
                            onValueChange={(value) =>
                                setfilterValue({
                                    ...filterValue,
                                    is_visible: value,
                                })
                            }
                            value={filterValue.is_visible}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Visibility (all)" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={'true'}>Visible</SelectItem>
                                <SelectItem value={'false'}>Hidden</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className=" flex flex-col justify-between space-y-2 px-2 md:justify-start">
                    <Button variant={'ghost'} onClick={resetHandler}>
                        Reset
                    </Button>
                    <Button onClick={filterHandler}>Filter</Button>
                </div>
            </section>
            <div className="flex flex-col space-y-2">
                {isLoading ? (
                    <LoadingFetch />
                ) : data?.items.length ? (
                    data?.items.map((item) => (
                        <Link
                            href={'/user/crowner/communities/' + item.id}
                            key={item.id}
                        >
                            <CardCommunity data={item} />
                        </Link>
                    ))
                ) : (
                    <div className="text-center text-primary">
                        Data Not Found
                    </div>
                )}
                <PaginationTable
                    meta={data?.meta}
                    setPagination={setPagination}
                />
            </div>
        </div>
    );
}

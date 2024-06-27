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
            <div className="flex items-center justify-between">
                <TitleFormHeader>Community you manage</TitleFormHeader>
                <Link href={'communities/create-community'}>
                    <Button variant={'ghost'}>
                        <Plus />
                        <span className="pl-2">Create Community</span>
                    </Button>
                </Link>
            </div>
            <section className="flex space-x-2 divide-x-2 bg-slate-100 p-4">
                <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2">
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
                                <SelectValue placeholder="Acceptance" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem key={'all'} value="all">
                                    all
                                </SelectItem>
                                <SelectItem key={'idle'} value="idle">
                                    idle
                                </SelectItem>
                                <SelectItem key={'accepted'} value="accepted">
                                    accepted
                                </SelectItem>
                                <SelectItem key={'rejected'} value="rejected">
                                    rejected
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
                                <SelectValue placeholder="Visibility" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem key={'all'} value="all">
                                    all
                                </SelectItem>
                                <SelectItem key={'true'} value="true">
                                    True
                                </SelectItem>
                                <SelectItem key={'false'} value="false">
                                    False
                                </SelectItem>
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

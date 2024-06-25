'use client';

import CardCommunityTutor from '@/components/base/Card/CardCommunityTutor';
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
import { useFetchCommunityTutors } from '@/feature/crowner/community-tutors/useFetchCommunityTutors';
import useTableConfig from '@/lib/useTableConfig';
import { IFilterCommunityTutor } from '@/types/crowner/community-tutors';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
    const {
        filterValue,
        filter,
        sort,
        pagination,
        resetHandler,
        filterHandler,
        setfilterValue,
        setPagination,
    } = useTableConfig<IFilterCommunityTutor>({
        defaultComlumn: 'title',
        defaultFilter: {
            title: '',
            acceptance_status: '',
            is_visible: '',
        },
    });
    const { data, isLoading } = useFetchCommunityTutors(
        pagination,
        filter,
        sort
    );

    return (
        <div className="flex-1 space-y-4 p-4">
            <div className="flex items-center justify-between border-b">
                <TitleFormHeader>Community Tutors</TitleFormHeader>
                <Link href={'community-tutors/create'}>
                    <Button variant={'outline'}>
                        <Plus /> Create Tutor
                    </Button>
                </Link>
            </div>
            <section className="grid grid-cols-4 gap-4 p-4">
                <div className="col-span-3 grid grid-cols-3 gap-4 border-r pr-4">
                    <Input
                        className="w-full"
                        value={filterValue.title}
                        onChange={(e) =>
                            setfilterValue({
                                ...filterValue,
                                title: e.target.value,
                            })
                        }
                        placeholder="Title"
                    />
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
                            <SelectValue
                                placeholder="Visibility (all)"
                                defaultValue={''}
                            />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={'true'}>visible</SelectItem>
                            <SelectItem value={'false'}>hidden</SelectItem>
                        </SelectContent>
                    </Select>
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
                            <SelectItem value={'idle'}>idle</SelectItem>
                            <SelectItem value={'accepted'}>accepted</SelectItem>
                            <SelectItem value={'rejected'}>rejected</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="w-auto pr-4">
                    <Button variant={'ghost'} onClick={resetHandler}>
                        Reset
                    </Button>
                    <Button onClick={filterHandler}>Filter</Button>
                </div>
            </section>
            <div className="space-y-2 ">
                {isLoading ? (
                    <LoadingFetch />
                ) : data?.items.length ? (
                    data?.items.map((item) => (
                        <CardCommunityTutor
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            image={item.image_url}
                            region={item.city + ', ' + item.province}
                            hourly_rate={item.hourly_rate}
                            hourly_rate_formatted={item.hourly_rate_formatted}
                            is_visible={item.is_visible}
                            acceptance_status={item.acceptance_status}
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

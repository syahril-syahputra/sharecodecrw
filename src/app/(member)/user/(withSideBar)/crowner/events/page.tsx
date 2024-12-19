'use client';
import CardEvent from '@/components/base/Card/CardEvent';
import LoadingFetch from '@/components/base/Loading/LoadingFetch';
import TitleFormHeader from '@/components/base/Title/TitleFormHeader';
import { Button } from '@/components/ui/button';
import { DateRangePicker } from '@/components/ui/dateRangePicker';
import { Input } from '@/components/ui/input';
import PaginationTable from '@/components/ui/pagination-table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useFetchTimezone } from '@/feature/base/timezone';
import { useFetchEvent } from '@/feature/events/useFetchEvent';
import useTableConfig from '@/lib/useTableConfig';
import { IFilterEvent } from '@/types/events';
import dayjs from 'dayjs';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function Page() {
    const { data: dataTimezome } = useFetchTimezone();
    const {
        filterValue,
        filter,
        sort,
        pagination,
        resetHandler,
        filterHandler,
        setPagination,
        setfilterValue,
    } = useTableConfig<IFilterEvent>({
        defaultComlumn: 'title',
        defaultFilter: {
            event_schedule: 'upcoming',
            acceptance_status: '',
            is_visible: '',
            start_date: '',
            end_date: '',
        },
    });
    const { data, isLoading } = useFetchEvent(pagination, filter, sort);

    return (
        <div className="flex-1 space-y-4 p-4">
            <div className="flex items-center justify-between border-b">
                <TitleFormHeader>Your Personal Events</TitleFormHeader>
                <Link href={'events/create-event'}>
                    <Button variant={'ghost'}>
                        <Plus />
                        <span className="pl-2">Create Event</span>
                    </Button>
                </Link>
            </div>
            <section className="flex space-x-2 divide-x-2 rounded-md border p-4">
                <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
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
                        <DateRangePicker
                            placeholder="Pick a date range"
                            value={{
                                from: filterValue.start_date
                                    ? new Date(
                                          dayjs(filterValue.start_date).format(
                                              'YYYY-MM-DD'
                                          )
                                      )
                                    : undefined,
                                to: filterValue.end_date
                                    ? new Date(
                                          dayjs(filterValue.end_date).format(
                                              'YYYY-MM-DD'
                                          )
                                      )
                                    : undefined,
                            }}
                            onChange={(e) => {
                                setfilterValue({
                                    ...filterValue,
                                    start_date: e?.from
                                        ? dayjs(e.from).format('YYYY-MM-DD')
                                        : undefined,
                                    end_date: e?.to
                                        ? dayjs(e.to).format('YYYY-MM-DD')
                                        : undefined,
                                });
                            }}
                        />
                    </div>
                    <div>
                        <Select
                            onValueChange={(value) =>
                                setfilterValue({
                                    ...filterValue,
                                    timezone_id: value,
                                })
                            }
                            value={filterValue.timezone_id}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Timezone" />
                            </SelectTrigger>
                            <SelectContent>
                                {dataTimezome?.map((item) => (
                                    <SelectItem key={item.id} value={item.id}>
                                        {item.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Select
                            onValueChange={(value) =>
                                setfilterValue({
                                    ...filterValue,
                                    event_schedule: value,
                                })
                            }
                            value={filterValue.event_schedule}
                        >
                            <SelectTrigger>
                                <SelectValue
                                    defaultValue={'upcoming'}
                                    placeholder="Upcoming"
                                />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={'upcoming'}>
                                    Upcoming
                                </SelectItem>
                                <SelectItem value={'past'}>Past</SelectItem>
                                <SelectItem value={'all'}>All</SelectItem>
                            </SelectContent>
                        </Select>
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
                                <SelectItem value={'idle'}>Idle</SelectItem>
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
                            href={'/user/crowner/events/' + item.id}
                            key={item.id}
                        >
                            <CardEvent largeImage data={item} />
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

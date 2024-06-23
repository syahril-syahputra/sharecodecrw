'use client';
import CardEvent from '@/components/base/Card/CardEvent';
import LoadingFetch from '@/components/base/Loading/LoadingFetch';
import TitleFormHeader from '@/components/base/Title/TitleFormHeader';
import { Button } from '@/components/ui/button';
import DatePicker from '@/components/ui/datePicker';
import { Input } from '@/components/ui/input';
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
        setfilterValue,
    } = useTableConfig<IFilterEvent>({
        defaultComlumn: 'title',
        defaultFilter: {
            event_schedule: 'all',
            acceptance_status: 'idle',
            is_visible: 'true',
        },
    });
    const { data, isLoading } = useFetchEvent(pagination, filter, sort);

    return (
        <div className="flex-1 space-y-4 p-4">
            <div className="flex items-center justify-between">
                <TitleFormHeader>Your Personal Event</TitleFormHeader>
                <Link href={'events/create-event'}>
                    <Button variant={'ghost'}>
                        <Plus />
                    </Button>
                </Link>
            </div>
            <section className="flex space-x-2 divide-x-2 bg-slate-100 p-4">
                <div className="grid flex-1 grid-cols-1 gap-4 border  dark:bg-slate-800  sm:grid-cols-2 md:grid-cols-3">
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
                        <DatePicker
                            block
                            value={
                                filterValue.start_date
                                    ? new Date(
                                          dayjs(filterValue.start_date).format(
                                              'YYYY-MM-DD'
                                          )
                                      )
                                    : undefined
                            }
                            onChange={(e) =>
                                setfilterValue({
                                    ...filterValue,
                                    start_date: dayjs(e).format('YYYY-MM-DD'),
                                    end_date: dayjs(e).format('YYYY-MM-DD'),
                                })
                            }
                            placeholder="Date"
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
                                <SelectValue placeholder="Timezone" />
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
                                <SelectValue placeholder="Event Schedule" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem key={'all'} value="all">
                                    all
                                </SelectItem>
                                <SelectItem key={'upcoming'} value="upcoming">
                                    upcoming
                                </SelectItem>
                                <SelectItem key={'past'} value="past">
                                    past
                                </SelectItem>
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
                <div className=" flex flex-col justify-between space-y-2 md:justify-start">
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
                        <Link href={'/user/events/' + item.id} key={item.id}>
                            <CardEvent
                                image={item.image_url}
                                address={item.city + ', ' + item.province}
                                title={item.title}
                                key={item.id}
                                datetime={new Date(item.date_time)}
                            />
                        </Link>
                    ))
                ) : (
                    <div className="text-center text-primary">
                        Data Not Found
                    </div>
                )}
            </div>
        </div>
    );
}

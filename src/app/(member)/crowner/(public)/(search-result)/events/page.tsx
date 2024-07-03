'use client';
import CardEvent from '@/components/base/Card/CardEvent';
import { DateRangePicker } from '@/components/ui/dateRangePicker';
import { Label } from '@/components/ui/label';
import PaginationTable from '@/components/ui/pagination-table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useFetchEvents } from '@/feature/crowner/subscriber/events/useFetchEvents';
import useTableConfig from '@/lib/useTableConfig';
import { IDetailEvent, IFilterSubscriberEvent } from '@/types/events';
import dayjs from 'dayjs';
import Link from 'next/link';
import { Input } from '@/components/ui/input';

export default function Page() {
    const { filterValue, filter, pagination, setPagination, setfilterValue } =
        useTableConfig<IFilterSubscriberEvent>({
            defaultComlumn: '',
            defaultFilter: {
                sort_by: 'latest',
            },
        });
    const { data, refetch } = useFetchEvents(pagination, filter);

    return (
        <div className="mt-10">
            <div className="flex">
                <section className="w-1/5">
                    <div className="mt-20 space-y-2 rounded-lg border border p-3">
                        <div>
                            <Label>Date Range</Label>
                            <DateRangePicker
                                placeholder="Pick a date range"
                                value={{
                                    from: filterValue.start_date
                                        ? new Date(
                                              dayjs(
                                                  filterValue.start_date
                                              ).format('YYYY-MM-DD')
                                          )
                                        : undefined,
                                    to: filterValue.end_date
                                        ? new Date(
                                              dayjs(
                                                  filterValue.end_date
                                              ).format('YYYY-MM-DD')
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
                            <Label>Price Range</Label>
                            <div className="flex">
                                <Input
                                    value={filterValue.title}
                                    onChange={(e) =>
                                        setfilterValue({
                                            ...filterValue,
                                            title: e.target.value,
                                        })
                                    }
                                    placeholder="Min"
                                />
                                <span className="mx-2 my-2">{' - '}</span>
                                <Input
                                    value={filterValue.title}
                                    onChange={(e) =>
                                        setfilterValue({
                                            ...filterValue,
                                            title: e.target.value,
                                        })
                                    }
                                    placeholder="Max"
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-4/5 p-4">
                    <div className="my-3 flex items-end justify-end">
                        <Label className="text-md my-auto mr-2 font-normal">
                            Sort by
                        </Label>
                        <div className="w-32">
                            <Select
                                onValueChange={(value) => {
                                    setfilterValue({
                                        ...filterValue,
                                        sort_by: value,
                                    });
                                    refetch();
                                }}
                                value={filterValue.sort_by}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Sort" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={'latest'}>
                                        Latest
                                    </SelectItem>
                                    <SelectItem value={'oldest'}>
                                        Oldest
                                    </SelectItem>
                                    <SelectItem value={'title'}>
                                        Title
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex items-start justify-between">
                        <div className="grid flex-1 grid-cols-3 gap-4">
                            {/* add skeleton */}
                            {data &&
                                data.items.map((item: IDetailEvent) => (
                                    <Link
                                        href={'/crowner/events/slug/' + item.id}
                                        key={item.id}
                                    >
                                        <CardEvent
                                            variant="vertical"
                                            data={item}
                                        />
                                    </Link>
                                ))}
                        </div>
                    </div>
                    <div className="mt-8">
                        <PaginationTable
                            meta={data?.meta}
                            setPagination={setPagination}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
}

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
import MultipleSelector from '@/components/ui/multipleSelector';
import { useFetchInterestFilter } from '@/feature/base/interest';
import { useFetchCity, useFetchState } from '@/feature/base/city';
import Spinner from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import LoadingPage from '@/components/base/Loading/LoadingPage';
import ErrorMessage from '@/components/base/Error/ErrorMessage';

export default function Page() {
    const {
        filterValue,
        filter,
        pagination,
        filterHandler,
        setPagination,
        setfilterValue,
        sort,
    } = useTableConfig<IFilterSubscriberEvent>({
        defaultComlumn: 'latest',
        defaultFilter: {
            sort_by: 'latest',
        },
    });
    const { data, refetch, isLoading, isError, error } = useFetchEvents(
        pagination,
        filter,
        sort
    );
    const { data: dataInterest, isLoading: isLoadingInterest } =
        useFetchInterestFilter();
    const { data: dataState, isLoading: isLoadingProvince } = useFetchState();
    const { data: dataCity, isLoading: isLoadingCity } = useFetchCity(
        filterValue.province_id || '',
        () => {
            setfilterValue({
                ...filterValue,
                city_id: '',
            });
        }
    );
    return (
        <div className="mt-10  w-full">
            <div className="flex ">
                <section className="w-1/5">
                    <div className="mt-20 space-y-2 rounded-lg border p-3">
                        <div className="space-y-2">
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
                        {isLoadingInterest ? (
                            <Spinner />
                        ) : (
                            <div className="space-y-2">
                                <Label>Interests</Label>
                                <div className="flex">
                                    <MultipleSelector
                                        groupBy="group"
                                        placeholder="Choose"
                                        defaultOptions={dataInterest}
                                        emptyIndicator={
                                            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                                No more Item
                                            </p>
                                        }
                                    />
                                </div>
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label>Price Range</Label>
                            <div className=" flex flex-col space-y-2">
                                {isLoadingProvince ? (
                                    <Spinner />
                                ) : (
                                    <Select
                                        onValueChange={(value) =>
                                            setfilterValue({
                                                ...filterValue,
                                                province_id: value,
                                            })
                                        }
                                        value={filterValue.province_id}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Province" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {dataState?.map((item) => (
                                                <SelectItem
                                                    key={item.id}
                                                    value={item.id}
                                                >
                                                    {item.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                                {isLoadingCity ? (
                                    <Spinner />
                                ) : (
                                    <Select
                                        onValueChange={(value) =>
                                            setfilterValue({
                                                ...filterValue,
                                                city_id: value,
                                            })
                                        }
                                        value={filterValue.city_id}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="City" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {dataCity?.map((item) => (
                                                <SelectItem
                                                    key={item.id}
                                                    value={item.id}
                                                >
                                                    {item.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            </div>
                        </div>
                        <div className="space-y-2">
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

                        <Button onClick={filterHandler}>Filter</Button>
                    </div>
                </section>
                <div className="flex-1 ">
                    <section className="block w-full p-4">
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
                    </section>
                    {isError && (
                        <ErrorMessage>
                            {error.message || 'Samething Wrong'}
                        </ErrorMessage>
                    )}
                    <section className="p-4">
                        <div className="">
                            {isLoading && (
                                <div className="">
                                    <LoadingPage />
                                </div>
                            )}
                            {data && data.items.length === 0 && (
                                <div className=" w-full bg-primary-foreground p-8 text-center">
                                    Data Not Found
                                </div>
                            )}
                            {data && data.items.length && (
                                <>
                                    <div className="grid flex-1 grid-cols-3 gap-4">
                                        {data.items.map(
                                            (item: IDetailEvent) => (
                                                <Link
                                                    href={
                                                        '/crowner/events/slug/' +
                                                        item.id
                                                    }
                                                    key={item.id}
                                                >
                                                    <CardEvent
                                                        variant="vertical"
                                                        data={item}
                                                    />
                                                </Link>
                                            )
                                        )}
                                    </div>
                                    <div className="mt-8">
                                        <PaginationTable
                                            meta={data?.meta}
                                            setPagination={setPagination}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

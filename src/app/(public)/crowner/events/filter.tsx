'use client';
import React from 'react';
import { DateRangePicker } from '@/components/ui/dateRangePicker';
import dayjs from 'dayjs';
import MultipleSelector from '@/components/ui/multipleSelector';
import { Input } from '@/components/ui/input';
import Spinner from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useFetchInterestFilter } from '@/feature/base/interest';
import { useFetchCity, useFetchState } from '@/feature/base/city';
import { useFetchTimezone } from '@/feature/base/timezone';
import { IFilterSubscriberEvent } from '@/types/events';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import useFilterConfigSSR from '@/lib/useFilterConfigSSR';

export default function FilterEvent(props: { searchParams: string }) {
    console.log(props);
    const { filterValue, filterHandler, setfilterValue, resetHandler } =
        useFilterConfigSSR<IFilterSubscriberEvent>({
            pageSize: 12,
            baseUrl: '/crowner/events',
            defaultFilter: {},
        });
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
    const { data: dataTimezome, isLoading: isLoadingTimezone } =
        useFetchTimezone();
    return (
        <section className="w-1/5">
            <div className="mt-20 space-y-2 rounded-lg border p-3">
                <div className="space-y-2">
                    <Label>Date Range</Label>
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
                {isLoadingInterest ? (
                    <Spinner />
                ) : (
                    <div className="space-y-2">
                        <Label>Interests</Label>
                        <div className="flex">
                            <MultipleSelector
                                groupBy="group"
                                placeholder="Choose"
                                onChange={(data) => {
                                    const result: string[] = data.map(
                                        (item) => item.value
                                    );
                                    setfilterValue({
                                        ...filterValue,
                                        tag_ids: `[${result.map((i) => {
                                            return `"${i}"`;
                                        })}]`,
                                    });
                                }}
                                value={!filterValue.tag_ids ? [] : undefined}
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
                {isLoadingTimezone ? (
                    <Spinner />
                ) : (
                    <div className="space-y-2">
                        <Label>Timezone</Label>
                        <Select
                            onValueChange={(value) =>
                                setfilterValue({
                                    ...filterValue,
                                    timezone_id: value,
                                })
                            }
                            value={filterValue.timezone_id || ''}
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
                )}
                <div className="space-y-2">
                    <Label>Event Type</Label>
                    <Select
                        onValueChange={(value) =>
                            setfilterValue({
                                ...filterValue,
                                event_type: value === 'all' ? '' : value,
                            })
                        }
                        defaultValue=""
                        value={filterValue.event_type || ''}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Event Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={'all'}>All</SelectItem>
                            <SelectItem value={'community'}>
                                Community
                            </SelectItem>
                            <SelectItem value={'personal'}>Personal</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label>Location</Label>
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
                                value={filterValue.province_id || ''}
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
                                value={filterValue.city_id || ''}
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
                <div className="space-y-4 py-2">
                    <Label>Radius</Label>
                    <Slider
                        defaultValue={[parseInt(filterValue.rad || '') || 0]}
                        onValueChange={(value) =>
                            setfilterValue({
                                ...filterValue,
                                rad: value[0] === 0 ? '' : value[0] + '',
                            })
                        }
                        value={[parseInt(filterValue.rad || '') || 0]}
                        max={100}
                        step={1}
                    />
                    {filterValue.rad && <div>{filterValue.rad} Km</div>}
                </div>
                <div className="space-y-2">
                    <Label>Price Range</Label>
                    <div className="flex">
                        <Input
                            value={filterValue.price_min || ''}
                            onChange={(e) =>
                                setfilterValue({
                                    ...filterValue,
                                    price_min: e.target.value,
                                })
                            }
                            placeholder="Min"
                        />
                        <span className="mx-2 my-2">{' - '}</span>
                        <Input
                            value={filterValue.price_max || ''}
                            onChange={(e) =>
                                setfilterValue({
                                    ...filterValue,
                                    price_max: e.target.value,
                                })
                            }
                            placeholder="Max"
                        />
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <Button onClick={filterHandler}>Filter</Button>
                    <Button variant={'ghost'} onClick={resetHandler}>
                        Reset
                    </Button>
                </div>
            </div>
        </section>
    );
}

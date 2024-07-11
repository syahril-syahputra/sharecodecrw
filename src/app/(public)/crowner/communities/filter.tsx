'use client';
import React from 'react';
import MultipleSelector from '@/components/ui/multipleSelector';
import Spinner from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useFetchInterestFilter } from '@/feature/base/interest';
import { useFetchCity, useFetchState } from '@/feature/base/city';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import useFilterConfigSSR from '@/lib/useFilterConfigSSR';
import { IFilterSubscriberCommunities } from '@/types/community';

export default function FilterEvent(props: { searchParams: string }) {
    console.log(props);
    const { filterValue, filterHandler, setfilterValue, resetHandler } =
        useFilterConfigSSR<IFilterSubscriberCommunities>({
            pageSize: 12,
            baseUrl: '/crowner/communities',
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
    return (
        <section className="w-1/5">
            <div className="mt-20 space-y-2 rounded-lg border p-3">
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
                        onValueChange={(value) => {
                            if (value[0] >= 1) {
                                setfilterValue({
                                    ...filterValue,
                                    rad: value[0] === 0 ? '' : value[0] + '',
                                    lng: '-75.7039630464162',
                                    lat: '45.42022655220129',
                                });
                            } else {
                                const removed = filterValue;
                                delete removed.lat;
                                delete removed.lng;
                                delete removed.rad;
                                setfilterValue({
                                    ...removed,
                                });
                            }
                        }}
                        value={[parseInt(filterValue.rad || '') || 0]}
                        max={100}
                        step={1}
                    />
                    {filterValue.rad && <div>{filterValue.rad} Km</div>}
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

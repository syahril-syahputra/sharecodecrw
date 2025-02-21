'use client';
import React, { useEffect, useState, KeyboardEvent } from 'react';
import CardServices from '../Card/CardServices';
import { useFetchServices } from '@/feature/services/useFetchServices';
import { IFilterServices } from '@/types/services';
import useTableConfig from '@/lib/useTableConfig';
import InfiniteScroll from '@/components/ui/InfiniteScroll';
import { Skeleton } from '@/components/ui/skeleton';
import { useFetchCategory } from '@/feature/base/category';
import { useFetchCity, useFetchState } from '@/feature/base/city';
import { Button } from '@/components/ui/button';
import {
    Filter,
    MapPin,
    Radar,
    RotateCcw,
    Search,
    ShieldCheck,
    SlidersHorizontal,
    Tags,
    User,
} from 'lucide-react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import Spinner from '@/components/ui/spinner';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { InputCustom } from '@/components/ui/inputCustom';
import { Slider } from '@/components/ui/slider';
import clsx from 'clsx';
import { InputSearch } from '@/components/ui/inputSearch';

interface ICordinate {
    lat: number;
    lng: number;
}
export default function HomeServices() {
    const defaultLat = parseFloat(process.env.NEXT_PUBLIC_DEFAULT_LAT || '0');
    const defaultLng = parseFloat(process.env.NEXT_PUBLIC_DEFAULT_LNG || '0');
    const [userLocation] = useState<ICordinate>({
        lat: defaultLat,
        lng: defaultLng,
    });

    const {
        filter,
        sort,
        pagination,
        filterValue,
        filterHandler,
        setfilterValue,
        resetHandler,
    } = useTableConfig<IFilterServices>({
        pageSize: 12,
        defaultFilter: {
            title: '',
            provider: '',
            rad: '50',
            lat: userLocation ? userLocation.lat + '' : '',
            lng: userLocation ? userLocation.lng + '' : '',
        },
    });
    useEffect(() => {
        const location = localStorage.getItem('location');

        if (location) {
            const newlock = JSON.parse(location) as ICordinate;
            setfilterValue({
                ...filterValue,
                lat: newlock.lat + '',
                lng: newlock.lng + '',
            });
        } else {
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setfilterValue({
                            ...filterValue,
                            lat: latitude,
                            lng: longitude,
                            // lat: '40.79509100',
                            // lng: '-73.96828500',
                        });
                    },
                    () => {}
                );
            } else {
                console.log('Geolocation is not available in your browser.');
            }
        }
    }, []);

    useEffect(() => {
        filterHandler();
    }, [filterValue.lat]);

    // useEffect(() => {
    //     const location = localStorage.getItem('location');
    //     console.log(location);
    //     if (location) {
    //         setUserLocation(JSON.parse(location) as ICordinate);
    //         setfilterValue({
    //             ...filterValue,
    //             lat: userLocation.lat + '',
    //             lng: userLocation.lng + '',
    //             // lat: '40.79509100',
    //             // lng: '-73.96828500',
    //         });
    //     } else {
    //         console.log('Geolocation is not available in your browser.');
    //     }
    // }, []);
    const { data: dataState, isLoading: isLoadingProvince } = useFetchState();
    const { data: dataCategory, isLoading: isLoadingCategory } =
        useFetchCategory();
    const { data: dataCity, isLoading: isLoadingCity } = useFetchCity(
        filterValue.province_id || '',
        () => {
            setfilterValue({
                ...filterValue,
                city_id: '',
            });
        }
    );
    useEffect(() => {
        filterHandler();
    }, [filterValue.provider]);

    const { data, fetchNextPage, isLoading, hasNextPage } = useFetchServices(
        filter,
        sort,
        pagination,
        () => {}
    );
    const column1 =
        data &&
        data.pages.map((page) =>
            page.items.filter((_, index) => index % 2 === 0)
        );

    const column2 =
        data &&
        data.pages.map((page) =>
            page.items.filter((_, index) => index % 2 !== 0)
        );

    function resetFilter() {
        resetHandler({ lat: filterValue.lat, lng: filterValue.lng });
    }
    return (
        <div>
            <div className="mx-4">
                <div className="container my-2 flex max-w-xl flex-1 items-center divide-x  divide-border rounded-full bg-[#D9D9D9] p-4 px-4 py-2">
                    <div className="flex  cursor-pointer items-center text-primary hover:text-foreground">
                        <Search size={36} className="px-2 text-gray-700 " />
                    </div>
                    <InputSearch
                        placeholder="Search for service"
                        onChange={(value) => {
                            setfilterValue({
                                ...filterValue,
                                title: value.target.value,
                            });
                        }}
                        value={filterValue.title}
                        onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
                            if (event.key === 'Enter') {
                                filterHandler();
                            }
                        }}
                        className="text-md h-min !border-0 !border-none bg-transparent placeholder-gray-500 !outline-none !ring-0 focus:ring-0 focus-visible:ring-0"
                    />
                </div>
            </div>
            <div className="container flex max-w-xl justify-between space-x-2 px-4 py-4 text-center">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={'default'}
                            className="rounded-lg bg-gray-900 text-white"
                        >
                            <SlidersHorizontal />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-96 border-gray-900 bg-gray-900">
                        <div className="grid gap-4">
                            <div className="space-y-2 px-4 py-4 text-center">
                                <h4 className="flex  items-center space-x-2 text-2xl font-medium leading-none text-white">
                                    <span>Advance Filter</span>
                                </h4>
                            </div>
                            <div className="space-y-6 px-4 text-white">
                                <div className="space-y-2">
                                    <Label className="space-x-3 text-lg ">
                                        <span className="font-serif text-2xl">
                                            T
                                        </span>{' '}
                                        <span>Keyword</span>
                                    </Label>
                                    <div>
                                        <InputCustom
                                            onChange={(value) => {
                                                setfilterValue({
                                                    ...filterValue,
                                                    title: value.target.value,
                                                });
                                            }}
                                            value={filterValue.title}
                                            placeholder="Insert Keyword"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="flex space-x-3  text-lg">
                                        <Tags />
                                        <span>Category</span>
                                    </Label>
                                    <div className=" flex  space-x-2">
                                        {isLoadingCategory ? (
                                            <Spinner />
                                        ) : (
                                            <Select
                                                onValueChange={(value) =>
                                                    setfilterValue({
                                                        ...filterValue,
                                                        category: value,
                                                    })
                                                }
                                                value={
                                                    filterValue.category || ''
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {dataCategory?.map(
                                                        (item) => (
                                                            <SelectItem
                                                                key={item.id}
                                                                value={item.id}
                                                            >
                                                                {item.name}
                                                            </SelectItem>
                                                        )
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="flex space-x-3  text-lg">
                                        <MapPin />
                                        <span>Location</span>
                                    </Label>
                                    <div className="  space-y-4">
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
                                                value={
                                                    filterValue.province_id ||
                                                    ''
                                                }
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
                                                value={
                                                    filterValue.city_id || ''
                                                }
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
                                    <Label className="flex space-x-3  text-lg">
                                        <Radar />
                                        <span>Distance</span>
                                    </Label>

                                    <Slider
                                        defaultValue={[
                                            parseInt(filterValue.rad || '') ||
                                                0,
                                        ]}
                                        onValueChange={(value) => {
                                            if (value[0] >= 1) {
                                                setfilterValue({
                                                    ...filterValue,
                                                    rad:
                                                        value[0] === 0
                                                            ? ''
                                                            : value[0] + '',
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
                                        value={[
                                            parseInt(filterValue.rad || '') ||
                                                0,
                                        ]}
                                        max={50}
                                        step={1}
                                    />
                                    {filterValue.rad && (
                                        <div>{filterValue.rad} Km</div>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 px-8 py-4">
                                <Button
                                    onClick={filterHandler}
                                    variant={'secondary'}
                                    className="flex items-center space-x-2"
                                >
                                    <Filter />
                                    <span> Filter</span>
                                </Button>
                                <Button
                                    variant={'ghost'}
                                    onClick={resetFilter}
                                    className="flex items-center space-x-2 text-white"
                                >
                                    <RotateCcw />
                                    <span> Reset</span>
                                </Button>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>

                <Button
                    variant={'default'}
                    onClick={() => {
                        setfilterValue({
                            ...filterValue,
                            provider: '',
                        });
                    }}
                    className={clsx(
                        filterValue.provider === ''
                            ? 'bg-primary'
                            : 'bg-gray-900',
                        '  rounded-lg text-white '
                    )}
                >
                    <span className="font-urbanist">All</span>
                </Button>
                <Button
                    variant={'default'}
                    onClick={() => {
                        setfilterValue({
                            ...filterValue,
                            provider: 'company',
                        });
                    }}
                    className={clsx(
                        filterValue.provider === 'company'
                            ? '!bg-primary'
                            : 'bg-gray-900',
                        'flex-1 rounded-lg  text-white'
                    )}
                >
                    <span className="inline md:hidden">
                        <ShieldCheck />
                    </span>
                    <span className="hidden font-urbanist md:inline">
                        Company Services
                    </span>
                </Button>
                <Button
                    variant={'default'}
                    onClick={() => {
                        setfilterValue({
                            ...filterValue,
                            provider: 'personal',
                        });
                    }}
                    className={clsx(
                        filterValue.provider === 'personal'
                            ? '!bg-primary'
                            : 'bg-gray-900',
                        'flex-1 rounded-lg  text-white'
                    )}
                >
                    <span className="inline md:hidden">
                        <User />
                    </span>
                    <span className="hidden font-urbanist md:inline">
                        Personal Services
                    </span>
                    <span></span>
                </Button>
            </div>
            <div className="mt-10 pb-10">
                {isLoading && (
                    <div className="container max-w-6xl  ">
                        <div className="border-Input  grid grid-cols-1 items-center justify-between space-x-2 px-4  md:grid-cols-2 ">
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-48 w-full" />
                                <Skeleton className="h-48 w-full" />
                            </div>
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-48 w-full" />
                                <Skeleton className="h-48 w-full" />
                            </div>
                        </div>
                    </div>
                )}
                <div className="container  hidden max-w-7xl gap-8 md:flex">
                    <div className="flex w-1/2 flex-col gap-8">
                        {column1 &&
                            column1.map((items) =>
                                items.map((item) => (
                                    <CardServices key={item.id} data={item} />
                                ))
                            )}
                    </div>
                    <div className="flex w-1/2 flex-col gap-8">
                        {column2 &&
                            column2.map((items) =>
                                items.map((item) => (
                                    <CardServices key={item.id} data={item} />
                                ))
                            )}
                    </div>
                </div>
                <div className="container flex max-w-6xl gap-6 md:hidden">
                    <div className="grid grid-cols-1  gap-6">
                        {data &&
                            data.pages.map((page) =>
                                page.items.map((item) => (
                                    <CardServices key={item.id} data={item} />
                                ))
                            )}
                        ;
                    </div>
                </div>

                <InfiniteScroll
                    hasMore={hasNextPage}
                    isLoading={isLoading}
                    next={() => fetchNextPage()}
                    threshold={1}
                >
                    {hasNextPage && (
                        <div className="container  py-8">
                            <div className="border-Input flex flex-1 items-center justify-between space-x-2  px-4 py-4 ">
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-6 w-full" />
                                    <Skeleton className="h-6 w-full" />
                                </div>
                            </div>
                        </div>
                    )}
                </InfiniteScroll>
            </div>
        </div>
    );
}

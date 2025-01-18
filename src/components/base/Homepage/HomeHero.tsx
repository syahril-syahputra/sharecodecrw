'use client';
import React from 'react';
import HomeSearchBar from './HomeSearchBar';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal, X } from 'lucide-react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
// import { Slider } from '@/components/ui/slider';
import Spinner from '@/components/ui/spinner';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useFetchCity, useFetchState } from '@/feature/base/city';
import { IFilterServices } from '@/types/services';
import useFilterConfigSSR from '@/lib/useFilterConfigSSR';
import { Slider } from '@/components/ui/slider';

export default function HomeHero() {
    const { filterValue, filterHandler, setfilterValue, resetHandler } =
        useFilterConfigSSR<IFilterServices>({
            pageSize: 12,
            baseUrl: '/crowner/events',
            defaultFilter: {
                title: '',
            },
        });
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
        <div className="container max-w-xl space-y-4 px-4 py-16 text-center">
            <h1 className="text-2xl font-bold">Services One Click Away!</h1>
            <HomeSearchBar />
            <div className="flex justify-between space-x-2">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={'default'}
                            className="rounded-xl bg-gray-900 text-white"
                        >
                            <SlidersHorizontal />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-96 border-gray-900 bg-gray-900">
                        <div className="grid gap-4">
                            <div className="space-y-2 p-9 text-center">
                                <h4 className="flex  items-center space-x-2 text-2xl font-medium leading-none text-white">
                                    <X /> <span>Advance Filter</span>
                                </h4>
                            </div>
                            <div className="text- space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-xl text-white">
                                        Title
                                    </Label>
                                    <div>
                                        <Input
                                        // onChange={(value) => {
                                        //     setfilterValue({
                                        //         ...filterValue,
                                        //         title: value.target.value,
                                        //     });
                                        // }}
                                        // value={filterValue.title}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xl text-white">
                                        Location
                                    </Label>
                                    <div className=" flex  space-x-2">
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
                                    <Label className="text-xl text-white">
                                        Distance
                                    </Label>
                                    <Slider
                                        defaultValue={[
                                            parseInt(
                                                filterValue.distance || ''
                                            ) || 0,
                                        ]}
                                        onValueChange={(value) => {
                                            if (value[0] >= 1) {
                                                setfilterValue({
                                                    ...filterValue,
                                                    rad:
                                                        value[0] === 0
                                                            ? ''
                                                            : value[0] + '',
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
                                        value={[
                                            parseInt(
                                                filterValue.distance || ''
                                            ) || 0,
                                        ]}
                                        max={100}
                                        step={1}
                                    />
                                    {filterValue.distance && (
                                        <div>{filterValue.distance} Km</div>
                                    )}
                                </div>
                                {/* <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="width">Width</Label>
                                    <Input
                                        id="width"
                                        defaultValue="100%"
                                        className="col-span-2 h-8"
                                    />
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="maxWidth">Max. width</Label>
                                    <Input
                                        id="maxWidth"
                                        defaultValue="300px"
                                        className="col-span-2 h-8"
                                    />
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="height">Height</Label>
                                    <Input
                                        id="height"
                                        defaultValue="25px"
                                        className="col-span-2 h-8"
                                    />
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="maxHeight">
                                        Max. height
                                    </Label>
                                    <Input
                                        id="maxHeight"
                                        defaultValue="none"
                                        className="col-span-2 h-8"
                                    />
                                </div> */}
                            </div>
                            <div className="flex items-center space-x-4">
                                <Button onClick={filterHandler}>Filter</Button>
                                <Button
                                    variant={'ghost'}
                                    onClick={resetHandler}
                                    className="text-white"
                                >
                                    Reset
                                </Button>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
                {/* <Button
                    variant={'default'}
                    className="rounded-xl bg-gray-900 text-white"
                >
                    <SlidersHorizontal />
                </Button> */}
                <Button
                    variant={'default'}
                    className="rounded-xl  bg-gray-900 text-white"
                >
                    <span>All</span>
                </Button>
                <Button
                    variant={'default'}
                    className="flex-1 rounded-xl  bg-gray-900 text-white"
                >
                    <span>Professional Services</span>
                </Button>
                <Button
                    variant={'default'}
                    className="flex-1 rounded-xl bg-gray-900 text-white"
                >
                    <span>Personal Services</span>
                </Button>
            </div>
        </div>
    );
}

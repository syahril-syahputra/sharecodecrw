'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import Spinner from '@/components/ui/spinner';
import { useFetchCity, useFetchState } from '@/feature/base/city';
import { useFetchCommercialServices } from '@/feature/base/commercial-service';
import useFilterConfigSSR from '@/lib/useFilterConfigSSR';
import { IFilterCommercialListing } from '@/types/commercial/listings';

export default function FilterCommercialListing(props: {
    searchParams: object | string;
}) {
    const currentFilter = props.searchParams as { title: string };
    const {
        filterValue,
        filterHandler,
        setfilterValue: setFilterValue,
        resetHandler,
    } = useFilterConfigSSR<IFilterCommercialListing>({
        pageSize: 12,
        baseUrl: '/commercial/listings',
        defaultFilter: {
            title: currentFilter.title || '',
        },
    });

    const { data: services, isLoading: isLoadingService } =
        useFetchCommercialServices();
    const { data: dataState, isLoading: isLoadingProvince } = useFetchState();
    const { data: dataCity, isLoading: isLoadingCity } = useFetchCity(
        filterValue.province_id || '',
        () => {
            setFilterValue({
                ...filterValue,
                city_id: '',
            });
        }
    );

    return (
        <section className="w-1/5">
            <div className=" space-y-2 rounded-lg border p-3">
                <div className="space-y-2">
                    <Label>Title</Label>
                    <div>
                        <Input
                            onChange={(value) => {
                                setFilterValue({
                                    ...filterValue,
                                    title: value.target.value,
                                });
                            }}
                            value={filterValue.title}
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label>Service</Label>
                    {isLoadingService ? (
                        <Spinner />
                    ) : (
                        <>
                            <div className="flex">
                                <Select
                                    onValueChange={(value) =>
                                        setFilterValue({
                                            ...filterValue,
                                            service_id: value,
                                        })
                                    }
                                    value={filterValue.service_id || ''}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Service" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {services?.map((item) => (
                                            <SelectItem
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {item.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </>
                    )}
                </div>
                <div className="space-y-2">
                    <Label>Location</Label>
                    <div className=" flex flex-col space-y-2">
                        {isLoadingProvince ? (
                            <Spinner />
                        ) : (
                            <Select
                                onValueChange={(value) =>
                                    setFilterValue({
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
                                    setFilterValue({
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
                                setFilterValue({
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
                                setFilterValue({
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

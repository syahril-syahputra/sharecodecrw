import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Map from '@/components/base/Maps/maps';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { LatLng } from '@/components/base/Maps/OpenStreetMap';
import { useFetchCity, useFetchState } from '@/feature/base/city';
import Spinner from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
    province: z.string().min(1, { message: 'Province is required' }),
    city: z.string().min(1),
    longitude: z.number({
        required_error: 'longitude required.',
    }),
    latitude: z.number({
        required_error: 'latitude required.',
    }),
    address: z.string().min(1),
});

interface IProps {
    onFinish: (data: z.infer<typeof formSchema>) => void;
}
export default function Step1(props: IProps) {
    const [getAdreessLoading, setgetAdreessLoading] = useState(false);
    const handleLocationSelected = async (latlng: LatLng) => {
        const { lat, lng } = latlng;

        setgetAdreessLoading(true);
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
        );
        const data = await response.json();
        const address = data.display_name;
        // const address_obj: AddressObject = data.address;
        setgetAdreessLoading(false);
        form.setValue('longitude', lng);
        form.setValue('latitude', lat);
        form.setValue('address', address);
    };
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
    });
    const { data: dataState } = useFetchState();
    const { data: dataCity, isPending: isPendingCity } = useFetchCity(
        form.getValues('province'),
        () => {
            form.setValue('city', '');
        }
    );
    const onSubmitProfile = (value: z.infer<typeof formSchema>) => {
        props.onFinish(value);
    };
    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmitProfile)}
                    className="space-y-8"
                >
                    <div className="text-center">Where will you be located</div>

                    <div className="relative z-10 flex w-full space-x-2">
                        <FormField
                            control={form.control}
                            name="province"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Province" />
                                            </SelectTrigger>
                                        </FormControl>
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
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {!isPendingCity ? (
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="City" />
                                                </SelectTrigger>
                                            </FormControl>
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
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ) : (
                            <div className="flex-1 pl-4">
                                <Spinner />
                            </div>
                        )}
                    </div>
                    <div className="text-center">Select point on the map</div>
                    <div className="col-span-2 space-y-4">
                        <div>
                            <Map
                                className="relative z-0 h-[200px] w-full"
                                onLocationSelected={handleLocationSelected}
                            />
                            <div className="flex space-x-4">
                                <FormField
                                    control={form.control}
                                    name="longitude"
                                    render={() => (
                                        <FormItem className="flex-1">
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="latitude"
                                    render={() => (
                                        <FormItem className="flex-1">
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        {getAdreessLoading ? (
                            <div className="flex items-center space-x-4 text-sm">
                                <Spinner /> <span>Searching Address...</span>
                            </div>
                        ) : (
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormControl>
                                            <Input
                                                placeholder="Address"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                    </div>
                    <div className="flex justify-center">
                        <Button type="submit" className="mx-auto">
                            NEXT
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}

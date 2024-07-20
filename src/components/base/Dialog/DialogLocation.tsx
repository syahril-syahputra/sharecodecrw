'use client';
import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useFetchCity, useFetchState } from '@/feature/base/city';
import Spinner from '@/components/ui/spinner';
import { ILocation } from '@/types/base/location';
import { useSession } from 'next-auth/react';
const formSchema = z.object({
    province: z.string().min(1, { message: 'Province is required' }),
    city: z.string().min(1, { message: 'City is required' }),
});
export default function DialogLocation(props: {
    open: boolean;
    setOpen: (arg: boolean) => void;
    setUserLocation: (arg: ILocation) => void;
}) {
    const { data: session, status } = useSession();

    const defaultLocation: ILocation = {
        lat: parseFloat(
            process.env.NEXT_PUBLIC_DEFAULT_USER_LOCATION_LAT || '0'
        ),
        lng: parseFloat(
            process.env.NEXT_PUBLIC_DEFAULT_USER_LOCATION_LNG || '0'
        ),
        province: process.env.NEXT_PUBLIC_DEFAULT_USER_LOCATION_PROVINCE || '',
        city: process.env.NEXT_PUBLIC_DEFAULT_USER_LOCATION_CITY || '',
    };
    const [isLoading, setisLoading] = useState(false);
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
    async function onSubmitProfile(data: z.infer<typeof formSchema>) {
        try {
            setisLoading(true);
            const result: ILocation = {
                lat: dataCity?.find((x) => x.id === data.city)?.latitude || 0,
                lng: dataCity?.find((x) => x.id === data.city)?.longitude || 0,
                province:
                    dataState?.find((x) => x.id === data.province)?.name || '',
                city: dataCity?.find((x) => x.id === data.city)?.name || '',
            };
            props.setUserLocation(result);
            localStorage.setItem('location', JSON.stringify(result));
            props.setOpen(false);
        } catch (error) {
            console.log(error);
        } finally {
            setisLoading(false);
        }
    }
    const closeDialog = (value: boolean) => {
        if (!localStorage.getItem('location')) {
            if (value === false) {
                if (status === 'authenticated') {
                    const result: ILocation = {
                        lat:
                            session.user.latitude ||
                            parseFloat(
                                process.env
                                    .NEXT_PUBLIC_DEFAULT_USER_LOCATION_LAT ||
                                    '0'
                            ),
                        lng:
                            session.user.longitude ||
                            parseFloat(
                                process.env
                                    .NEXT_PUBLIC_DEFAULT_USER_LOCATION_LNG ||
                                    '0'
                            ),
                        province:
                            session.user.city ||
                            process.env
                                .NEXT_PUBLIC_DEFAULT_USER_LOCATION_PROVINCE ||
                            '',
                        city:
                            session.user.province ||
                            process.env
                                .NEXT_PUBLIC_DEFAULT_USER_LOCATION_CITY ||
                            '',
                    };
                    props.setUserLocation(result);
                    localStorage.setItem('location', JSON.stringify(result));
                    props.setOpen(false);
                } else {
                    props.setUserLocation(defaultLocation);
                    localStorage.setItem(
                        'location',
                        JSON.stringify(defaultLocation)
                    );
                    props.setOpen(false);
                }
            }
        } else {
            props.setOpen(false);
        }
    };
    return (
        <Dialog open={props.open} onOpenChange={closeDialog}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Select your location</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmitProfile)}
                        className="grid grid-cols-1 gap-4"
                    >
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
                            <div className="flex-1">
                                <Spinner />
                            </div>
                        )}
                        <div className="space-y-8">
                            <Button type="submit" loading={isLoading}>
                                SAVE
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

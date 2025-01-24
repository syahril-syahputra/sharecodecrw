'use client';
import React, { useState } from 'react';
import TitleFormHeader from '@/components/base/Title/TitleFormHeader';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { InputCustom } from '@/components/ui/inputCustom';
import dynamic from 'next/dynamic';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { TextareaCustom } from '@/components/ui/textareaCustom';
import Spinner from '@/components/ui/spinner';
import { useFetchInterestFilter } from '@/feature/base/interest';
import MultipleSelector from '@/components/ui/multipleSelector';
// import MultipleSelector, { Option } from '@/components/ui/multipleSelector';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { LatLng } from '@/types/maps';

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
];
const formSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    description: z.string().min(20, { message: 'Description is required' }),

    tags: z.string().array().optional(),
    price: z.coerce.number().optional(),
    pricing_type: z.string().min(1, { message: 'Pricing Type is required' }),

    longitude: z.number({
        required_error: 'longitude required.',
    }),
    latitude: z.number({
        required_error: 'latitude required.',
    }),
    address: z.string().min(1),
    img: z
        .any()
        .refine((files) => files?.length == 1, 'Image is required.')
        .refine(
            (files) => files?.[0]?.size <= MAX_FILE_SIZE,
            `Max file size is 500kb.`
        )
        .refine(
            (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
            '.jpg, .jpeg, .png and .webp files are accepted.'
        ),
});
// interface IInterestList {
//     id: string;
//     data: Option[];
// }

const Map = dynamic(() => import('@/components/base/Maps/maps'), {
    ssr: false,
});
export default function Page() {
    const [getAdreessLoading, setgetAdreessLoading] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
    });

    // const [value, setValue] = useState<IInterestList[]>([]);
    function onSubmitProfile(data: z.infer<typeof formSchema>) {
        console.log(data);
        alert('a');
    }
    // const { data: dataInterest, isPending: pendingInterest } = useFetchInterest(
    //     (data: IInterest[]) => {
    //         setValue(
    //             data.map((item) => {
    //                 return { id: item.id, data: [] };
    //             })
    //         );
    //     }
    // );
    const { data: dataInterest, isLoading: isLoadingInterest } =
        useFetchInterestFilter();
    // function onChange(id: string, data: Option[]) {
    //     const filteredData: IInterestList[] = value.filter(
    //         (item) => item.id !== id
    //     );
    //     const updated: IInterestList[] = [...filteredData, { id, data }];
    //     setValue(updated);
    // }

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
    return (
        <div className="flex w-full flex-1 items-start space-x-4  px-4 text-white">
            <div className=" flex-1 rounded-lg bg-gradient-to-b from-[#1A3652] via-[#020508] to-[#020508] p-4 p-8">
                <h2 className="font-urbanist text-4xl font-bold text-white">
                    Create a Service Listing
                </h2>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmitProfile)}
                        className="space-y-4"
                    >
                        <div className="col-span-2">
                            <TitleFormHeader>
                                Create Community Event
                            </TitleFormHeader>
                        </div>
                        <div className="space-y-8">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <InputCustom
                                                placeholder="Title"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <TextareaCustom
                                                placeholder="Write down event description"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {isLoadingInterest ? (
                                <Spinner />
                            ) : (
                                <div className="space-y-2">
                                    <Label>Tags</Label>
                                    <div className="flex">
                                        <MultipleSelector
                                            groupBy="group"
                                            placeholder="Choose"
                                            onChange={(data) => {
                                                const result: string[] =
                                                    data.map(
                                                        (item) => item.value
                                                    );
                                                console.log(result);
                                            }}
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
                            <div className="flex items-center space-x-2">
                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Price</FormLabel>
                                            <FormControl>
                                                <InputCustom
                                                    placeholder="Price"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="pricing_type"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Pricing Type</FormLabel>
                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem
                                                        key={'per session'}
                                                        value={'per session'}
                                                    >
                                                        per session
                                                    </SelectItem>
                                                    <SelectItem
                                                        key={'per hour'}
                                                        value={'per hour'}
                                                    >
                                                        per hour
                                                    </SelectItem>
                                                    <SelectItem
                                                        key={'starting price'}
                                                        value={'starting price'}
                                                    >
                                                        starting price
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="col-span-2 space-y-4">
                                {getAdreessLoading ? (
                                    <div className="flex items-center space-x-4 text-sm">
                                        <Spinner />{' '}
                                        <span>Searching Address...</span>
                                    </div>
                                ) : (
                                    <FormField
                                        control={form.control}
                                        name="address"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel className="space-y-2">
                                                    <h2 className="text-lg font-semibold">
                                                        Location
                                                    </h2>
                                                    <span>
                                                        Select Your Location.{' '}
                                                        <b>
                                                            note that it will be
                                                            visible publicly
                                                        </b>
                                                    </span>
                                                </FormLabel>
                                                <FormControl>
                                                    <InputCustom
                                                        placeholder="Address"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}
                                <div>
                                    <Map
                                        className="relative z-0 h-[200px] w-full"
                                        onLocationSelected={
                                            handleLocationSelected
                                        }
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
                            </div>
                        </div>

                        {/* <div className="space-y-8">
                            {isSuccess && (
                                <Alert variant={'success'}>
                                    <AlertTitle className="flex items-center space-x-2">
                                        <Check />
                                        <span>
                                            {createResponse.data.message}
                                        </span>
                                    </AlertTitle>
                                </Alert>
                            )}
                            <Button type="submit" loading={isLoadingCreate}>
                                SAVE
                            </Button>
                        </div> */}
                    </form>
                </Form>
            </div>
            <div className="bg-red-600">asdasdas</div>
        </div>
    );
}

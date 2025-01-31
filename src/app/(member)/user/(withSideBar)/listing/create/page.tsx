'use client';
import React, { useEffect, useState } from 'react';
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
// import MultipleSelector, { Option } from '@/components/ui/multipleSelector';
import { Tag, TagInput } from 'emblor';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { LatLng } from '@/types/maps';
import { Check, HardDriveUpload, Zap } from 'lucide-react';
import Image from 'next/image';
import useFilePreview from '@/lib/useFilePreview';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useCreateListing } from '@/feature/listing/useCreateListing';
import { useRouter } from 'next/navigation';
import { errorHelper } from '@/lib/formErrorHelper';
import CardDarkNeonGlow from '@/components/base/Card/CardDarkNeonGlow';
import { Switch } from '@/components/ui/switch';
import { useCalculatePricing } from '@/feature/listing/useCalculatePricing';
import { BodyCreateListing } from '@/types/listing';
import { FileToBase64 } from '@/lib/utils';
import { useFetchCity, useFetchState } from '@/feature/base/city';
import ErrorMessage from '@/components/base/Error/ErrorMessage';
import { useFetchDuration } from '@/feature/base/duration';
import clsx from 'clsx';

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
];
const formSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    description: z
        .string()
        .min(50, { message: 'Description is required 20 character' }),

    tags: z.array(z.string()).min(3, { message: 'tags is required min 3' }),
    price: z.coerce.number(),
    pricing_type: z.string().min(1, { message: 'Pricing Type is required' }),
    province: z.string().min(1, { message: 'Province is required' }),
    city: z.string().min(1, { message: 'City is required' }),
    longitude: z.number({
        required_error: 'longitude required.',
    }),
    latitude: z.number({
        required_error: 'latitude required.',
    }),
    address: z.string().min(1),
    image: z
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

    // city_id: z.string().min(1),
    duration: z.string().min(1),
    is_premium: z.boolean().optional(),
    color_hexadecimal: z
        .string()
        .optional()
        .refine(
            (val) =>
                val === '#258ad8' || val === '#d87925' || val === '#E9E1D3',
            {
                message: 'Please Select Color',
            }
        ),
    is_color: z.boolean().optional(),
    is_uplifter: z.boolean().optional(),
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
    const { data: dataState } = useFetchState();
    const { data: dataCity, isPending: isPendingCity } = useFetchCity(
        form.getValues('province'),
        () => {
            form.setValue('city', '');
        }
    );

    const { data: dataDuration, isLoading: isLoadingDuration } =
        useFetchDuration();
    // const [value, setValue] = useState<IInterestList[]>([]);

    const [tags, setTags] = React.useState<Tag[]>([]);
    useEffect(() => {
        const list = tags.map((x) => x.text);
        form.setValue('tags', list);
    }, [form, tags]);

    const [activeTagIndex, setActiveTagIndex] = React.useState<number | null>(
        null
    );

    const fileRef = form.register('image');
    const result = form.watch(['image']);
    const [filePreview] = useFilePreview(result[0]);

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

    const router = useRouter();
    const {
        mutate: createListing,
        isPending: isLoadingCreate,
        isSuccess,
        isError,
        error,
        data: createResponse,
    } = useCreateListing({
        onSuccess: (result) => {
            // router.push('/user/listing');
            if (result.data.data.url) {
                window.location.href = result.data.data.url;
            } else {
                router.push('/user/listing');
            }

            console.log('ok');
        },
        onError: (error) => errorHelper(form.setError, error),
    });
    async function onSubmit(
        data: z.infer<typeof formSchema>,
        event?: React.BaseSyntheticEvent
    ) {
        const nativeEvent = event && (event.nativeEvent as SubmitEvent);
        const paymentMethod = nativeEvent
            ? (nativeEvent.submitter as HTMLButtonElement).value
            : '';
        const booster = [];
        if (data.is_premium) booster.push('premium');
        if (data.is_color) booster.push('color');
        if (data.is_uplifter) booster.push('uplifter');

        const fileBase64 = (await FileToBase64(data.image[0])) as string;
        const base64 = fileBase64.replace('data:', '').replace(/^.+,/, '');

        const dataBody: BodyCreateListing = {
            boosters: booster,
            title: data.title,
            description: data.description,
            latitude: data.latitude,
            longitude: data.longitude,
            duration: parseInt(data.duration),
            price: data.price,
            payment_type: data.pricing_type,
            city_id: data.city,
            hashtags: data.tags,

            color_hexadecimal: data.is_color
                ? data.color_hexadecimal
                : undefined,
            is_direct: paymentMethod === 'credit_balance' ? false : true,
            image: base64,
        };
        createListing(dataBody);
    }
    const {
        data: pricingResult,
        isLoading: pricingLoading,
        isSuccess: pricingSuccess,
    } = useCalculatePricing(
        form.getValues().duration,
        form.getValues().is_premium,
        form.getValues().is_color,
        form.getValues().is_uplifter
    );

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((data, event) =>
                    onSubmit(data, event)
                )}
                className="space-y-4"
            >
                <div className="flex w-full flex-1 items-start space-x-4  px-4 text-white">
                    <div className=" flex-1 rounded-lg bg-gradient-to-b from-[#1A3652] via-[#020508] to-[#020508] p-4 p-8">
                        <h2 className="font-urbanist text-4xl font-bold text-white">
                            Create a Service Listing
                        </h2>

                        <div className="space-y-8 py-8">
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
                            <FormField
                                control={form.control}
                                name="tags"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Tags</FormLabel>
                                        <FormControl>
                                            <TagInput
                                                {...field}
                                                placeholder="Enter a topic"
                                                tags={tags}
                                                className="!bg-red-200"
                                                setTags={(newTags) => {
                                                    setTags(newTags);
                                                }}
                                                styleClasses={{
                                                    input: 'mb-4 bg-transparent border-white',
                                                }}
                                                inlineTags={false}
                                                inputFieldPosition={'top'}
                                                activeTagIndex={activeTagIndex}
                                                setActiveTagIndex={
                                                    setActiveTagIndex
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
                                                        key={'per_session'}
                                                        value={'per_session'}
                                                    >
                                                        per session
                                                    </SelectItem>
                                                    <SelectItem
                                                        key={'per_hour'}
                                                        value={'per_hour'}
                                                    >
                                                        per hour
                                                    </SelectItem>
                                                    <SelectItem
                                                        key={'starting_price'}
                                                        value={'starting_price'}
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
                                <div className="relative z-10 flex space-x-2">
                                    <FormField
                                        control={form.control}
                                        name="province"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel>Province*</FormLabel>
                                                <Select
                                                    value={field.value}
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Province" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {dataState?.map(
                                                            (item) => (
                                                                <SelectItem
                                                                    key={
                                                                        item.id
                                                                    }
                                                                    value={
                                                                        item.id
                                                                    }
                                                                >
                                                                    {item.name}
                                                                </SelectItem>
                                                            )
                                                        )}
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
                                                    <FormLabel>City*</FormLabel>
                                                    <Select
                                                        value={field.value}
                                                        onValueChange={
                                                            field.onChange
                                                        }
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="City" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {dataCity?.map(
                                                                (item) => (
                                                                    <SelectItem
                                                                        key={
                                                                            item.id
                                                                        }
                                                                        value={
                                                                            item.id
                                                                        }
                                                                    >
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </SelectItem>
                                                                )
                                                            )}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    ) : (
                                        <div className="flex-1 pt-8">
                                            <Spinner />
                                        </div>
                                    )}
                                </div>
                                <FormField
                                    control={form.control}
                                    name="image"
                                    render={() => (
                                        <FormItem>
                                            <FormLabel>
                                                {' '}
                                                <h2 className="text-lg font-semibold">
                                                    Image
                                                </h2>
                                                <span>
                                                    Optionaly. Select an image
                                                    to enhance your listing
                                                </span>
                                            </FormLabel>
                                            <div className="flex items-start">
                                                <FormControl>
                                                    <div className="flex-1">
                                                        <label
                                                            className="relative   cursor-pointer "
                                                            htmlFor="avatar"
                                                        >
                                                            {filePreview ? (
                                                                <Image
                                                                    alt="Avatar"
                                                                    className="mx-auto w-full rounded-md border border-slate-300 bg-gray-100 object-cover"
                                                                    height={200}
                                                                    src={
                                                                        filePreview as string
                                                                    }
                                                                    width={200}
                                                                />
                                                            ) : (
                                                                <div className="flex aspect-square flex-col items-center justify-center space-y-2 rounded-md border border-slate-300 bg-gray-100 ">
                                                                    <Image
                                                                        alt="Avatar"
                                                                        className="mx-auto aspect-square w-[100px] object-cover"
                                                                        height={
                                                                            100
                                                                        }
                                                                        src={
                                                                            '/icons/image.png'
                                                                        }
                                                                        width={
                                                                            100
                                                                        }
                                                                    />
                                                                    <label className="text-2xl text-black">
                                                                        Choose
                                                                        Image
                                                                    </label>
                                                                </div>
                                                            )}

                                                            <div className="absolute bottom-0 left-0 right-0 top-0 flex w-full items-center justify-center rounded-md bg-neutral-800   bg-opacity-60 opacity-0 hover:opacity-100">
                                                                <HardDriveUpload
                                                                    className="text-white"
                                                                    size={60}
                                                                />
                                                            </div>
                                                        </label>

                                                        <FormMessage />
                                                        <input
                                                            id="avatar"
                                                            type="file"
                                                            className="hidden"
                                                            placeholder="shadcn"
                                                            accept="image/*"
                                                            multiple={false}
                                                            {...fileRef}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <div className="flex-1"></div>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="space-y-8">
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
                    </div>
                    <CardDarkNeonGlow className="w-1/3 rounded-lg  bg-gray-900 px-4 py-8">
                        <h1 className="flex items-center space-x-2">
                            <Zap />
                            <span className="text-xl font-semibold">
                                Booster
                            </span>
                        </h1>
                        <div className="space-y-4 py-4">
                            <div className="mb-4 flex items-center justify-between rounded-lg bg-gray-800 p-4 shadow-md">
                                <div>
                                    <h1 className="text-lg font-semibold">
                                        Premium Booster
                                    </h1>
                                    <h2 className="text-sm text-gray-400">
                                        $35* or 35 credits
                                    </h2>
                                    <div className="mt-1 text-sm text-gray-300">
                                        Includes all boosters applied at once by
                                        scaling up the post, making it appear
                                        higher and more visible with a
                                        background color.
                                    </div>
                                    {form.getValues('is_premium') && (
                                        <div className="space-y-2 py-4">
                                            <FormField
                                                control={form.control}
                                                name="color_hexadecimal"
                                                render={({ field }) => (
                                                    <FormItem className="flex-1">
                                                        <Select
                                                            value={field.value}
                                                            onValueChange={
                                                                field.onChange
                                                            }
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select Color" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem
                                                                    key={
                                                                        '#258ad8'
                                                                    }
                                                                    value={
                                                                        '#258ad8'
                                                                    }
                                                                >
                                                                    <div className="flex items-center space-x-2">
                                                                        <div
                                                                            className={clsx(
                                                                                `h-4 w-4 rounded-full !bg-[#258AD8] `
                                                                            )}
                                                                        ></div>
                                                                        <span>
                                                                            Blue
                                                                        </span>
                                                                    </div>
                                                                </SelectItem>
                                                                <SelectItem
                                                                    key={
                                                                        '#d87925'
                                                                    }
                                                                    value={
                                                                        '#d87925'
                                                                    }
                                                                >
                                                                    <div className="flex items-center space-x-2">
                                                                        <div
                                                                            className={clsx(
                                                                                `h-4 w-4 rounded-full !bg-[#D87925] `
                                                                            )}
                                                                        ></div>
                                                                        <span>
                                                                            Orange
                                                                        </span>
                                                                    </div>
                                                                </SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="is_premium"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Switch
                                                        checked={field.value}
                                                        onCheckedChange={
                                                            field.onChange
                                                        }
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="mb-4 flex items-center justify-between rounded-lg bg-gray-800 p-4 shadow-md">
                                <div>
                                    <h1 className="text-lg font-semibold">
                                        Uplifter Booster
                                    </h1>
                                    <h2 className="text-sm text-gray-400">
                                        $13* or 13 credits
                                    </h2>
                                    <div className="mt-1 text-sm text-gray-300">
                                        Lifts the post up, making it appear more
                                        on top for interested parties.
                                    </div>
                                </div>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="is_uplifter"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Switch
                                                        checked={field.value}
                                                        onCheckedChange={
                                                            field.onChange
                                                        }
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="mb-4 flex items-center justify-between rounded-lg bg-gray-800 p-4 shadow-md">
                                <div>
                                    <h1 className="text-lg font-semibold">
                                        Color Booster
                                    </h1>
                                    <h2 className="text-sm text-gray-400">
                                        $5* or 5 credits
                                    </h2>
                                    <div className="mt-1 text-sm text-gray-300">
                                        Makes the post stand out by
                                        incorporating a background color.
                                    </div>
                                    {form.getValues('is_color') && (
                                        <div className="space-y-2 py-4">
                                            <FormField
                                                control={form.control}
                                                name="color_hexadecimal"
                                                render={({ field }) => (
                                                    <FormItem className="flex-1">
                                                        <Select
                                                            value={field.value}
                                                            onValueChange={
                                                                field.onChange
                                                            }
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select Color" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem
                                                                    key={
                                                                        '#258ad8'
                                                                    }
                                                                    value={
                                                                        '#258ad8'
                                                                    }
                                                                >
                                                                    <div className="flex items-center space-x-2">
                                                                        <div
                                                                            className={clsx(
                                                                                `h-4 w-4 rounded-full !bg-[#258AD8] `
                                                                            )}
                                                                        ></div>
                                                                        <span>
                                                                            Blue
                                                                        </span>
                                                                    </div>
                                                                </SelectItem>
                                                                <SelectItem
                                                                    key={
                                                                        '#d87925'
                                                                    }
                                                                    value={
                                                                        '#d87925'
                                                                    }
                                                                >
                                                                    <div className="flex items-center space-x-2">
                                                                        <div
                                                                            className={clsx(
                                                                                `h-4 w-4 rounded-full !bg-[#D87925] `
                                                                            )}
                                                                        ></div>
                                                                        <span>
                                                                            Orange
                                                                        </span>
                                                                    </div>
                                                                </SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="is_color"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Switch
                                                        checked={field.value}
                                                        onCheckedChange={
                                                            field.onChange
                                                        }
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            {!isLoadingDuration && (
                                <FormField
                                    control={form.control}
                                    name="duration"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>
                                                Select publication duration
                                            </FormLabel>
                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Duration" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {dataDuration?.map(
                                                        (item) => (
                                                            <SelectItem
                                                                key={item.id}
                                                                value={
                                                                    item.duration +
                                                                    ''
                                                                }
                                                            >
                                                                {item.name}
                                                            </SelectItem>
                                                        )
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                        </div>
                        {!pricingLoading && pricingSuccess && (
                            <div className="mx-auto max-w-md rounded-xl border p-4 shadow-md">
                                <div className="mb-4 space-y-2">
                                    {pricingResult.items.map((item) => (
                                        <div
                                            key={item.name}
                                            className="mb-2 flex items-center justify-between"
                                        >
                                            <span className="text-lg capitalize">
                                                {item.name}
                                            </span>
                                            <span className="text-lg font-semibold">
                                                ${item.price}
                                            </span>
                                        </div>
                                    ))}

                                    <div className="flex items-center justify-between">
                                        <span className="text-lg capitalize">
                                            tax amount{' '}
                                            <a className="text-sm">
                                                ({pricingResult.tax_percentage}
                                                %)
                                            </a>{' '}
                                        </span>
                                        <span className="text-lg font-semibold">
                                            ${pricingResult.tax_amount}
                                        </span>
                                    </div>
                                    <div className="mt-2 flex items-center justify-between border-t border-white pt-2">
                                        <span className="text-xl font-bold">
                                            total payment
                                        </span>
                                        <span className="text-xl font-bold">
                                            ${pricingResult.total_payment}
                                        </span>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Equivalent to{' '}
                                        {pricingResult.total_credits} credits
                                    </p>
                                </div>
                                {isError && (
                                    <ErrorMessage>
                                        {error.response?.data?.message ||
                                            'Something Wrong'}
                                    </ErrorMessage>
                                )}
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
                                <div className="flex flex-col gap-2">
                                    <Button
                                        loading={isLoadingCreate}
                                        type="submit"
                                        value="credit_card"
                                    >
                                        Pay with Credit Card
                                    </Button>
                                    <Button
                                        loading={isLoadingCreate}
                                        type="submit"
                                        value="credit_balance"
                                        disabled={!pricingResult.is_sufficient}
                                    >
                                        Pay with Credit Balance
                                    </Button>
                                    <div>
                                        Your credit balance :{' '}
                                        {pricingResult.credit_balance}
                                    </div>
                                </div>
                            </div>
                        )}
                    </CardDarkNeonGlow>
                </div>
            </form>
        </Form>
    );
}

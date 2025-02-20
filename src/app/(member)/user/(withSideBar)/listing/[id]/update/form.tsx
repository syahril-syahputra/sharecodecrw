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
import { Check, HardDriveUpload } from 'lucide-react';
import Image from 'next/image';
import useFilePreview from '@/lib/useFilePreview';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { useRouter } from 'next/navigation';
import { errorHelper } from '@/lib/formErrorHelper';
import { FileToBase64 } from '@/lib/utils';
import { useFetchCity, useFetchState } from '@/feature/base/city';
import ErrorMessage from '@/components/base/Error/ErrorMessage';
import { Button } from '@/components/ui/button';
import { useUpdateListing } from '@/feature/listing/useUpdateListing';
import { BodyUpdateListing, IDetailListing } from '@/types/listing';
import { useFetchCommercialServices } from '@/feature/base/commercial-service';

const formSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    description: z
        .string()
        .min(50, { message: 'Description is required 50 character' }),

    hashtags: z.array(z.string()).min(3, { message: 'tags is required min 3' }),
    price: z.coerce.number(),

    service_id: z.string().min(1, { message: 'Service is required' }),
    service_other: z.string().optional(),
    pricing_type: z.string().min(1, { message: 'Pricing Type is required' }),
    province: z.string().min(1, { message: 'Province is required' }),
    city: z.string().min(1, { message: 'City is required' }),
    longitude: z.number({
        required_error: 'longitude required.',
    }),
    latitude: z.number({
        required_error: 'latitude required.',
    }),
    address: z.string().optional(),
    image: z.any().optional(),
});

const Map = dynamic(() => import('@/components/base/Maps/CityMap'), {
    ssr: false,
});
interface IProps {
    data: IDetailListing;
}
export default function FormUpdateListing({ data }: IProps) {
    useEffect(() => {
        setTags(
            data
                ? data?.hashtags.map((x, i) => {
                      return { id: i + '', text: x } as Tag;
                  })
                : []
        );
    }, [data]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
        values: {
            title: data?.title || '',
            description: data?.description || '',
            price: parseInt(data?.price || ''),
            pricing_type: data?.payment_type || '',
            province: data?.province_id || '',
            city: data?.city_id || '',
            service_id: data.service_id,
            service_other: data.service_other,
            address: data?.address || '',
            latitude: data?.latitude || 0,
            longitude: data?.longitude || 0,
            hashtags: data?.hashtags || [],
        },
    });
    const { data: dataState } = useFetchState();
    const { data: dataCity, isPending: isPendingCity } = useFetchCity(
        form.getValues('province'),
        () => {
            if (form.getValues('province') !== data.province_id) {
                form.setValue('city', '');
            }
        }
    );
    // const [value, setValue] = useState<IInterestList[]>([]);

    const [tags, setTags] = React.useState<Tag[]>([]);
    useEffect(() => {
        const list = tags.map((x) => x.text);
        form.setValue('hashtags', list);
    }, [form, tags]);

    const [activeTagIndex, setActiveTagIndex] = React.useState<number | null>(
        null
    );

    const fileRef = form.register('image');
    const result = form.watch(['image']);
    const [filePreview] = useFilePreview(result[0]);

    const router = useRouter();
    const {
        mutate: createListing,
        isPending: isLoadingCreate,
        isSuccess,
        isError,
        error,
        data: createResponse,
    } = useUpdateListing({
        id: data.id,
        onSuccess: (result) => {
            // router.push('/user/listing');
            if (result.data?.data?.url) {
                window.location.href = result.data.data.url;
            } else {
                router.push('/user/listing/' + data.id);
            }

            console.log('ok');
        },
        onError: (error) => errorHelper(form.setError, error),
    });
    async function onSubmit(data: z.infer<typeof formSchema>) {
        let base64 = undefined;
        if (data.image[0]) {
            const fileBase64 = (await FileToBase64(data.image[0])) as string;
            base64 = fileBase64.replace('data:', '').replace(/^.+,/, '');
        }

        const dataBody: BodyUpdateListing = {
            title: data.title,
            description: data.description,
            latitude: selectedCoordinate.lat,
            longitude: selectedCoordinate.lng,
            price: data.price,
            service_id: data.service_id,
            service_other: data.service_other,
            payment_type: data.pricing_type,
            city_id: data.city,
            hashtags: data.hashtags,
            image: base64,
        };
        createListing(dataBody);
    }

    const selectedCity = form.watch(['city']);
    const selectedCoordinateLat =
        selectedCity &&
        dataCity &&
        !isPendingCity &&
        dataCity.find((x) => x.id === selectedCity[0])?.latitude;
    const selectedCoordinateLng =
        selectedCity &&
        dataCity &&
        !isPendingCity &&
        dataCity.find((x) => x.id === selectedCity[0])?.longitude;
    const selectedCoordinate = {
        lat: selectedCoordinateLat || 0,
        lng: selectedCoordinateLng || 0,
    };

    const [isOther, setIsOther] = useState('');
    const { data: dataService } = useFetchCommercialServices();
    return (
        <div className="flex w-full flex-1 items-start space-x-4  px-4 text-white">
            <div className=" flex-1 rounded-lg bg-gradient-to-b from-[#1A3652] via-[#020508] to-[#020508] p-4 p-8">
                <h2 className="font-urbanist text-4xl font-bold text-white">
                    Update Service
                </h2>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit((data) => onSubmit(data))}
                        className="space-y-4"
                    >
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
                                name="service_id"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel className="!font-light text-white">
                                            Category
                                        </FormLabel>
                                        <Select
                                            onValueChange={(value) => {
                                                setIsOther(value);
                                                field.onChange(value);
                                            }}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="rounded-full bg-transparent text-white">
                                                    <SelectValue placeholder="Select Category" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {dataService?.map((item) => (
                                                    <SelectItem
                                                        key={item.id}
                                                        value={item.id}
                                                    >
                                                        {item.name}
                                                    </SelectItem>
                                                ))}
                                                <SelectItem
                                                    key={'Other'}
                                                    value={'Other'}
                                                >
                                                    Other
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {isOther === 'Other' && (
                                <FormField
                                    control={form.control}
                                    name="service_other"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <InputCustom
                                                    placeholder="Insert Service Name"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                            <FormField
                                control={form.control}
                                name="hashtags"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Tags</FormLabel>
                                        <FormControl>
                                            <TagInput
                                                {...field}
                                                placeholder="Enter a topic"
                                                tags={tags}
                                                className="!bg-red-200 "
                                                setTags={(newTags) => {
                                                    setTags(newTags);
                                                }}
                                                styleClasses={{
                                                    input: 'mb-4 bg-transparent border-white !rounded-full',
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
                                <div>
                                    <div className="mb-4 space-y-2">
                                        <h2 className="text-lg font-semibold">
                                            Location
                                        </h2>
                                        <span>
                                            Select Your Location.{' '}
                                            <b>
                                                note that it will be visible
                                                publicly
                                            </b>
                                        </span>
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

                                <Map
                                    className="relative z-0 h-[200px] w-full"
                                    location={selectedCoordinate}
                                />

                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
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
                                                <span>Upload an image</span>
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
                                                            ) : data?.image_url ? (
                                                                <Image
                                                                    alt="Avatar"
                                                                    className="mx-auto w-full rounded-md border border-slate-300 bg-gray-100 object-cover"
                                                                    height={200}
                                                                    src={
                                                                        data?.image_url as string
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
                                                                    <label className="text-2xl !text-black">
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
                            {isError && (
                                <ErrorMessage>
                                    {error.response?.data?.message ||
                                        'Something Wrong'}
                                </ErrorMessage>
                            )}
                            <Button type="submit" loading={isLoadingCreate}>
                                SAVE
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}

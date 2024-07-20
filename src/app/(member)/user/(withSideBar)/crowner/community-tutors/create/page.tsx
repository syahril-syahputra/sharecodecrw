'use client';
import TitleFormHeader from '@/components/base/Title/TitleFormHeader';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
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
import Spinner from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { useFetchCity, useFetchState } from '@/feature/base/city';
import { useFetchInterest } from '@/feature/base/interest';
import useFilePreview from '@/lib/useFilePreview';
import { LatLng } from '@/types/maps';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, HardDriveUpload } from 'lucide-react';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import MultipleSelector, { Option } from '@/components/ui/multipleSelector';
import { IInterest } from '@/types/base/interest';
import { errorHelper } from '@/lib/formErrorHelper';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { useRouter } from 'next/navigation';
import { useCreateCommunityTutor } from '@/feature/crowner/community-tutors/useCreateCommunityTutor';
import { BodyCreateCommunityTutor } from '@/types/crowner/community-tutors';
import Image from 'next/image';

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
];

interface IInterestList {
    id: string;
    data: Option[];
}

const Map = dynamic(() => import('@/components/base/Maps/maps'), {
    ssr: false,
});
const formSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    province: z.string().min(1, { message: 'Province is required' }),
    hourly_rate: z.coerce.number().optional(),
    city: z.string().min(1),
    address: z.string().min(1),
    image: z
        .any()
        .optional()
        .refine(
            (files) => files?.length === 1 || files?.length === 0,
            'Only one image is allowed.'
        )
        .refine(
            (files) =>
                !files ||
                files.length === 0 ||
                files?.[0]?.size <= MAX_FILE_SIZE,
            `Max file size is 500kb.`
        )
        .refine(
            (files) =>
                !files ||
                files.length === 0 ||
                ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
            '.jpg, .jpeg, .png and .webp files are accepted.'
        ),
    // .array(z.any())
    // .optional()
    // .refine((files) => files?.length === 1 || files?.length === 0, 'Only one image is allowed.')
    // .refine(
    //     (files) => !files || files.length === 0 || files[0].size <= MAX_FILE_SIZE,
    //     `Max file size is 500kb.`
    // )
    // .refine(
    //     (files) => !files || files.length === 0 || ACCEPTED_IMAGE_TYPES.includes(files[0].type),
    //     '.jpg, .jpeg, .png, and .webp files are accepted.'
    // ),
    about: z.string().optional(),
    longitude: z.number({
        required_error: 'longitude required.',
    }),
    latitude: z.number({
        required_error: 'latitude required.',
    }),
    tags: z.string().array().optional(),
});
export default function Page() {
    const [getAdreessLoading, setgetAdreessLoading] = useState(false);
    const router = useRouter();

    const {
        mutate,
        isPending: isLoadingCreate,
        isSuccess,
        data: createResponse,
    } = useCreateCommunityTutor({
        onSuccess: () => {
            router.push('/user/crowner/community-tutors');
        },
        onError: (error) => errorHelper(form.setError, error),
    });
    function onSubmitProfile(data: z.infer<typeof formSchema>) {
        const dataInterest = value.map((item) => item.data);
        const resultArray = dataInterest.flatMap((subArray) =>
            subArray.map((item) => item.value)
        );
        if (resultArray.length < 3) {
            form.setError('tags', {
                type: 'custom',
                message: 'Please select min 3 tags',
            });
            return;
        }
        form.setValue('tags', resultArray);

        const body: BodyCreateCommunityTutor = {
            about: data.about,
            image: data.image,
            city_id: data.city,
            hourly_rate: data.hourly_rate,
            tags: resultArray,
            title: data.title,
            address: data.address,
            longitude: data.longitude,
            latitude: data.latitude,
        };
        mutate(body);
    }

    const handleLocationSelected = async (latlng: LatLng) => {
        const { lat, lng } = latlng;

        setgetAdreessLoading(true);
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
        );
        const data = await response.json();
        const address = data.display_name;

        setgetAdreessLoading(false);
        form.setValue('longitude', lng);
        form.setValue('latitude', lat);
        form.setValue('address', address);
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
    });
    const { data: dataInterest, isPending: pendingInterest } = useFetchInterest(
        (data: IInterest[]) => {
            setValue(
                data.map((item) => {
                    return { id: item.id, data: [] };
                })
            );
        }
    );
    const { data: dataState } = useFetchState();
    const { data: dataCity, isPending: isPendingCity } = useFetchCity(
        form.getValues('province'),
        () => {
            form.setValue('city', '');
        }
    );

    const fileRef = form.register('image');
    const result = form.watch(['image']);
    const [filePreview] = useFilePreview(result[0]);

    const [value, setValue] = useState<IInterestList[]>([]);
    function onChange(id: string, data: Option[]) {
        const filteredData: IInterestList[] = value.filter(
            (item) => item.id !== id
        );
        const updated: IInterestList[] = [...filteredData, { id, data }];
        setValue(updated);
    }
    return (
        <div className=" flex-1 space-y-4 p-4">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmitProfile)}
                    className="grid grid-cols-2 gap-4"
                >
                    {' '}
                    <div className="col-span-2">
                        <TitleFormHeader>
                            Create Community Tutor
                        </TitleFormHeader>
                    </div>
                    <div className="space-y-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Title*</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="hourly_rate"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>
                                        Hourly Rate (CAD)
                                        <span className="ml-2 text-xs italic text-muted-foreground">
                                            put 0 for free tutor
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="about"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>
                                        What is your tutor about
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            rows={5}
                                            placeholder="Write down tutor description"
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
                                    <FormLabel>Upload Image</FormLabel>
                                    <FormControl>
                                        <div>
                                            <label
                                                className="relative inline-block cursor-pointer "
                                                htmlFor="avatar"
                                            >
                                                <Image
                                                    alt="Avatar"
                                                    className="mx-auto aspect-square rounded-xl border border-slate-300 object-cover"
                                                    src={
                                                        filePreview
                                                            ? (filePreview as string)
                                                            : '/icons/image.png'
                                                    }
                                                    width={200}
                                                    height={0}
                                                />{' '}
                                                <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center  bg-neutral-800 bg-opacity-60 opacity-0 hover:opacity-100">
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
                                </FormItem>
                            )}
                        />
                        <div className="relative z-10 flex space-x-2">
                            <FormField
                                control={form.control}
                                name="province"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Province*</FormLabel>
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
                                            <FormLabel>City*</FormLabel>
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
                                <div className="flex-1 pt-8">
                                    <Spinner />
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        {pendingInterest || !dataInterest ? (
                            <div className="flex items-center space-x-4 text-sm">
                                <Spinner /> <span>Get Tags...</span>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <FormLabel>Tags</FormLabel>
                                {dataInterest.map((item) => {
                                    const children = item.children.map(
                                        (child) => {
                                            return {
                                                label: child.title,
                                                value: child.id,
                                            };
                                        }
                                    );
                                    return (
                                        <MultipleSelector
                                            key={item.id}
                                            value={
                                                value.find(
                                                    (x) => x.id === item.id
                                                )?.data
                                            }
                                            onChange={(data) =>
                                                onChange(item.id, data)
                                            }
                                            defaultOptions={children}
                                            placeholder={'Select ' + item.title}
                                            emptyIndicator={
                                                <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                                    No more {item.title}
                                                </p>
                                            }
                                        />
                                    );
                                })}
                                <FormField
                                    control={form.control}
                                    name="tags"
                                    render={() => (
                                        <FormItem className="flex-1">
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}
                    </div>
                    <div className="col-span-2 space-y-4">
                        <div>
                            <Map
                                className="relative z-0 h-[300px] w-full"
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
                                        <FormLabel>Address*</FormLabel>
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
                    <div className="space-y-8">
                        {isSuccess && (
                            <Alert variant={'success'}>
                                <AlertTitle className="flex items-center space-x-2">
                                    <Check />
                                    <span>{createResponse.data.message}</span>
                                </AlertTitle>
                            </Alert>
                        )}
                        <Button type="submit" loading={isLoadingCreate}>
                            SAVE
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}

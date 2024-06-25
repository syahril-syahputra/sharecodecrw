'use client';
import {
    BodyCreateCommunityTutor,
    ICommunityTutor,
} from '@/types/crowner/community-tutors';
import MultipleSelector, { Option } from '@/components/ui/multipleSelector';
import dynamic from 'next/dynamic';
import { z } from 'zod';
import { errorHelper } from '@/lib/formErrorHelper';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { useUpdateCommunityTutor } from '@/feature/crowner/community-tutors/useUpdateCommunityTutor';
import { LatLng } from '@/types/maps';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFetchInterest } from '@/feature/base/interest';
import { IInterest } from '@/types/base/interest';
import { useFetchCity, useFetchState } from '@/feature/base/city';
import useFilePreview from '@/lib/useFilePreview';
import TitleFormHeader from '@/components/base/Title/TitleFormHeader';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Check, HardDriveUpload } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import Spinner from '@/components/ui/spinner';
import ErrorMessage from '@/components/base/Error/ErrorMessage';
import { Alert, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface IProps {
    data: ICommunityTutor;
}

interface IInterestList {
    id: string;
    data: Option[];
}

const Map = dynamic(() => import('@/components/base/Maps/maps'), {
    ssr: false,
});

const formSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    city: z.string().min(1),
    province: z.string().min(1, { message: 'Province is required' }),
    hourly_rate: z.coerce.number().optional(),
    address: z.string().min(1),
    image: z.any().optional(),
    about: z.string().optional(),
    longitude: z.number({
        required_error: 'longitude required.',
    }),
    latitude: z.number({
        required_error: 'latitude required.',
    }),
    tags: z.string().array().optional(),
});

export default function FormUpdateCommunityTutor({ data }: IProps) {
    const [getAdreessLoading, setgetAdreessLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();
    const {
        mutate,
        isPending: isLoadingUpdate,
        isSuccess,
        isError,
        error,
        data: createResponse,
    } = useUpdateCommunityTutor({
        onSuccess: (success) => {
            toast({
                title: 'Update Success',
                variant: 'success',
                description: success.data.message,
            });

            router.push('/crowner/community-tutors/' + data.id, {});
        },
        onError: (error) => errorHelper(form.setError, error),
        id: data.id,
    });

    function onSubmitProfile(data: z.infer<typeof formSchema>) {
        const dataInterest = valueTag.map((item) => item.data);
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
        defaultValues: {
            title: data.title,
            longitude: data.longitude,
            latitude: data.latitude,
            address: data.address,
            province: data.province_id,
            city: data.city_id,
            about: data.about,
            hourly_rate: data.hourly_rate,
        },
    });

    const { data: dataInterest, isPending: pendingInterest } = useFetchInterest(
        (dataInterest: IInterest[]) => {
            setValueTag(
                dataInterest.map((item) => {
                    const dataChild: Option[] = [];
                    item.children.forEach((itemChild) => {
                        const cektag = data?.tags.find(
                            (tag) => tag.id === itemChild.id
                        );
                        if (cektag) {
                            dataChild.push({
                                label: itemChild.title,
                                value: itemChild.id,
                            });
                        }
                    });
                    return { id: item.id, data: dataChild };
                })
            );
        }
    );

    const { data: dataState } = useFetchState();
    const { data: dataCity, isPending: isPendingCity } = useFetchCity(
        form.getValues('province'),
        () => {
            if (form.getValues('province') !== data.province_id) {
                form.setValue('city', '');
            }
        }
    );

    const fileRef = form.register('image');
    const result = form.watch(['image']);
    const [filePreview] = useFilePreview(result[0]);

    const [valueTag, setValueTag] = useState<IInterestList[]>([]);
    function onChange(id: string, data: Option[]) {
        const filteredData: IInterestList[] = valueTag.filter(
            (item) => item.id !== id
        );
        const updated: IInterestList[] = [...filteredData, { id, data }];
        setValueTag(updated);
    }

    return (
        <div className=" flex-1 space-y-4 p-4">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmitProfile)}
                    className="grid grid-cols-2 gap-4"
                >
                    <div className="col-span-2">
                        <TitleFormHeader>
                            Update Community Tutor
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
                                        <span className="pl-4 text-xs">
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
                                                className="relative inline-block cursor-pointer"
                                                htmlFor="community_tutor"
                                            >
                                                <img
                                                    alt="community_tutor"
                                                    className="mx-auto aspect-square rounded-xl border border-slate-300 object-cover dark:border-slate-700"
                                                    src={
                                                        filePreview
                                                            ? (filePreview as string)
                                                            : data?.image_url
                                                              ? data?.image_url
                                                              : '/icons/image.png'
                                                    }
                                                />{' '}
                                                <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-xl bg-neutral-800 bg-opacity-60 opacity-0 hover:opacity-100">
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
                            <div className="space-y-4">
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
                                                valueTag.find(
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
                                userLocationBase={{
                                    lat: form.getValues('latitude') || 0,
                                    lng: form.getValues('longitude') || 0,
                                }}
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
                        {isError && (
                            <ErrorMessage>
                                {error.response?.data?.message ||
                                    'Samething Wrong'}
                            </ErrorMessage>
                        )}
                        {isSuccess && (
                            <Alert variant={'success'}>
                                <AlertTitle className="flex items-center space-x-2">
                                    <Check />
                                    <span>{createResponse.data.message}</span>
                                </AlertTitle>
                            </Alert>
                        )}
                        <div className="space-x-4">
                            <Link href={'/user/events/' + data.id}>
                                <Button variant={'link'}>Cancel</Button>
                            </Link>
                            <Button type="submit" loading={isLoadingUpdate}>
                                SAVE
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
}

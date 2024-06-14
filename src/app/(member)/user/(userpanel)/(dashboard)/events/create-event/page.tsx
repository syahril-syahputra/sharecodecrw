'use client';
import TitleFormHeader from '@/components/base/Title/TitleFormHeader';
import { Button } from '@/components/ui/button';
import { DateTimePicker } from '@/components/ui/datetime-picker';
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
import useFilePreview from '@/lib/useFilePreview';
import { zodResolver } from '@hookform/resolvers/zod';
import { HardDriveUpload } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
];
interface LatLng {
    lat: number;
    lng: number;
}

interface AddressObject {
    [key: string]: string;
}

const Map = dynamic(() => import('@/components/base/Maps/maps'), {
    ssr: false,
});
const formSchema = z.object({
    first_name: z.string().min(1, { message: 'Name is required' }),

    datetime: z.date({
        required_error: 'Date of birth is required.',
    }),
    province: z.string().min(1, { message: 'Province is required' }),
    city: z.string().min(1),
    address: z.string().min(1),
    newsletter: z.boolean(),
    photo: z
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
    about_me: z.string().optional(),
});
export default function Page() {
    function onSubmitProfile(data: z.infer<typeof formSchema>) {
        alert(data);
    }

    // const [location, setLocation] = useState<LatLng | null>(null);
    // const [address, setAddress] = useState<string>('');

    const handleLocationSelected = async (latlng: LatLng) => {
        const { lat, lng } = latlng;
        // console.log(lat, lng);

        // const iframeUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.01},${lat - 0.01},${lng + 0.01},${lat + 0.01}&layer=mapnik&marker=${lat},${lng}`;
        // console.log(iframeUrl);

        // Reverse geocoding
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
        );
        const data = await response.json();
        const address = data.display_name;
        const address_obj: AddressObject = data.address;
        alert(JSON.stringify(address_obj));
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

    const fileRef = form.register('photo');
    const result = form.watch(['photo']);
    const [filePreview] = useFilePreview(result[0]);
    return (
        <div className=" flex-1 space-y-4 p-4">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmitProfile)}
                    className="grid grid-cols-2 gap-4"
                >
                    <div className="space-y-8">
                        <TitleFormHeader>Create Event</TitleFormHeader>

                        <FormField
                            control={form.control}
                            name="first_name"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="First Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="datetime"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Datetime</FormLabel>
                                    <FormControl>
                                        <DateTimePicker
                                            jsDate={field.value}
                                            onJsDateChange={field.onChange}
                                            granularity="second"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="first_name"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Timezone</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="first_name"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="about_me"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>
                                        What is your event about
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
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
                            name="photo"
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
                                                    className="mx-auto  border border-slate-300 object-cover dark:border-slate-700"
                                                    height={200}
                                                    src={
                                                        filePreview
                                                            ? (filePreview as string)
                                                            : '/icons/image.png'
                                                    }
                                                    width={200}
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
                        <div className="flex space-x-2">
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
                        <div>
                            <Map onLocationSelected={handleLocationSelected} />
                        </div>
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Address"
                                            readOnly
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div></div>
                    {/* {isSuccessUpdate && (
                        <Alert variant={'success'}>
                            <AlertTitle className="flex items-center space-x-2">
                                <Check />
                                <span>{updateResponse.data.message}</span>
                            </AlertTitle>
                        </Alert>
                    )} */}
                    <div>
                        <Button type="submit" loading={false}>
                            SAVE
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}

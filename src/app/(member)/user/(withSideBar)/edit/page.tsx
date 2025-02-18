'use client';
import CardDarkNeonGlow from '@/components/base/Card/CardDarkNeonGlow';
import LoadingPage from '@/components/base/Loading/LoadingPage';
import { Button } from '@/components/ui/button';
import { useFetchBusiness } from '@/feature/business/useFetchBusiness';
import { X } from 'lucide-react';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useUpdateBusiness } from '@/feature/business/useUpdateBusiness';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFetchCity, useFetchState } from '@/feature/base/city';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import Spinner from '@/components/ui/spinner';
import { LatLng } from '@/types/maps';
import { Fragment, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useFetchCommercialServices } from '@/feature/base/commercial-service';
import { Textarea } from '@/components/ui/textarea';
import { errorHelper } from '@/lib/formErrorHelper';

const Map = dynamic(() => import('@/components/base/Maps/maps'), {
    ssr: false,
});

// const formSchema = z.object({
//     name: z.string().min(1, { message: 'Comapny full name is required' }),
//     first_name: z.string().min(1, { message: 'First name is required' }),
//     last_name: z.string().min(1, { message: 'Last name is required' }),
//     username: z.string().min(1, { message: 'Username is required' }),
//     province: z.string().min(1, { message: 'Province is required' }),
//     city: z.string().min(1, { message: 'City is required' }),
//     service_id: z.string().min(1, { message: 'Service is required' }),
//     service_other: z.string().optional(),
//     phone_number: z.string().min(8),
//     code: z.string().min(1),
//     address: z.string().min(10, { message: 'Address is required' }),
//     longitude: z.number({
//         required_error: 'longitude required.',
//     }),
//     latitude: z.number({
//         required_error: 'latitude required.',
//     }),
//     about: z.string().min(10, { message: 'About is required' }),
// });

const formSchema = (isCompany: boolean | undefined) => {
    return z.object({
        name: isCompany
            ? z.string().min(1, { message: 'Comapny full name is required' })
            : z.string().optional(),
        first_name: !isCompany
            ? z.string().min(1, { message: 'First name is required' })
            : z.string().optional(),
        last_name: !isCompany
            ? z.string().min(1, { message: 'Last name is required' })
            : z.string().optional(),
        username: !isCompany
            ? z.string().min(1, { message: 'Username is required' })
            : z.string().optional(),
        province: z.string().min(1, { message: 'Province is required' }),
        city: z.string().min(1, { message: 'City is required' }),
        service_id: z.string().min(1, { message: 'Service is required' }),
        service_other: z.string().optional(),
        // phone_number: z.string().min(8),
        code: z.string().min(1),
        address: z.string().min(10, { message: 'Address is required' }),
        longitude: z.number({
            required_error: 'longitude required.',
        }),
        latitude: z.number({
            required_error: 'latitude required.',
        }),
        about: z.string().min(10, { message: 'About is required' }),
    });
};

export default function Page() {
    const { toast } = useToast();
    const router = useRouter();
    const { data: business, isFetching } = useFetchBusiness();
    const schema = formSchema(business?.is_company);

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        mode: 'onChange',
        defaultValues: {
            code: '+1',
            city: business?.city_id,
            province: business?.province_id,
            service_id: business?.service_id,
            service_other: '',
            name: business?.name,
            first_name: business?.first_name,
            last_name: business?.last_name,
            username: business?.username ? business?.username : '',
            address: business?.address,
            // phone_number: business?.phone_number
            //     ? business?.phone_number.replace(/^\+1/, '')
            //     : business?.phone_number,
            latitude: business?.latitude,
            longitude: business?.latitude,
            about: business?.about,
        },
    });
    console.log(form);

    const { data: dataState } = useFetchState();
    const { data: dataCity } = useFetchCity(form.getValues('province'), () => {
        if (form.getValues('province') !== business?.province_id) {
            form.setValue('city', '');
        }
    });

    const { mutate, isPending } = useUpdateBusiness({
        onSuccess: async (success) => {
            toast({
                description: success.data.message,
            });
            router.replace('/user');
        },
        onError: (error) => errorHelper(form.setError, error),
    });

    const onSubmit = async (values: z.infer<typeof schema>) => {
        mutate({
            city_id: values.city,
            service_id: values.service_id,
            service_other: values.service_other,
            name: business?.is_company
                ? values.name
                : `${values.first_name} ${values.last_name}`,
            first_name: !business?.is_company ? values.first_name : null,
            last_name: !business?.is_company ? values.last_name : null,
            username: !business?.is_company ? values.username : null,
            address: values.address,
            latitude: values.latitude,
            longitude: values.longitude,
            about: values.about,
        });
    };

    const [getAdreessLoading, setGetAdreessLoading] = useState(false);
    const handleLocationSelected = async (latlng: LatLng) => {
        const { lat, lng } = latlng;

        setGetAdreessLoading(true);
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
        );
        const data = await response.json();
        const address = data.display_name;
        setGetAdreessLoading(false);
        form.setValue('longitude', lng);
        form.setValue('latitude', lat);
        form.setValue('address', address);
    };
    const [baseLocation, setBaseLocation] = useState<LatLng | undefined>();
    useEffect(() => {
        setBaseLocation({
            lat: Number(business?.latitude),
            lng: Number(business?.longitude),
        });
        handleLocationSelected({
            lat: Number(business?.latitude),
            lng: Number(business?.longitude),
        });
    }, [isFetching]);

    const [isOther, setIsOther] = useState('');
    const { data: dataService } = useFetchCommercialServices();

    return (
        <div className="flex-1 px-6">
            {false && <LoadingPage />}

            {!false && (
                <div className="space-y-4">
                    <CardDarkNeonGlow>
                        <div className="flex justify-between">
                            <h1 className="flex space-x-2 text-3xl">
                                <p>Edit your data</p>
                            </h1>
                            <Link href={'/user'}>
                                <Button
                                    size={'sm'}
                                    variant={'destructive'}
                                    className="flex items-center rounded-xl"
                                >
                                    <X className="mr-2" />
                                    Cancel
                                </Button>
                            </Link>
                        </div>
                    </CardDarkNeonGlow>
                    <CardDarkNeonGlow>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="w-full space-y-4 lg:w-1/2"
                            >
                                {business?.is_company && (
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="!font-light text-white">
                                                    Full Company Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="rounded-full border-white bg-transparent text-white"
                                                        placeholder="Company LLC"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}
                                {!business?.is_company && (
                                    <Fragment>
                                        <div className="grid w-full grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="first_name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="!font-light text-white">
                                                            First Name
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                className="rounded-full border-white bg-transparent text-white"
                                                                placeholder="Ella"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="last_name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="!font-light text-white">
                                                            Last Name
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                className="rounded-full border-white bg-transparent text-white"
                                                                placeholder="Martin"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <FormField
                                            control={form.control}
                                            name="username"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="!font-light text-white">
                                                        Username
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            className="rounded-full border-white bg-transparent text-white"
                                                            placeholder="ellamartin"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </Fragment>
                                )}

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
                                                        <SelectValue placeholder="Service" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {dataService?.map(
                                                        (item) => (
                                                            <SelectItem
                                                                key={item.id}
                                                                value={item.id}
                                                            >
                                                                {item.name}
                                                            </SelectItem>
                                                        )
                                                    )}
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
                                                    <Input
                                                        placeholder="Insert Service Name"
                                                        className="rounded-full border-white bg-transparent text-white"
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
                                    name="about"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="!font-light text-white">
                                                About
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    className="rounded-xl border-white bg-transparent text-white"
                                                    placeholder="Description of yourself or your Company"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div>
                                    <FormLabel className="!font-light text-white">
                                        Location
                                    </FormLabel>
                                    <div className="mb-2 mt-2 flex space-x-2">
                                        <FormField
                                            control={form.control}
                                            name="province"
                                            render={({ field }) => (
                                                <FormItem className="flex-1">
                                                    <Select
                                                        onValueChange={
                                                            field.onChange
                                                        }
                                                        defaultValue={
                                                            field.value
                                                        }
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger className="rounded-full bg-transparent text-white">
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
                                        <FormField
                                            control={form.control}
                                            name="city"
                                            render={({ field }) => (
                                                <FormItem className="flex-1">
                                                    <Select
                                                        onValueChange={
                                                            field.onChange
                                                        }
                                                        defaultValue={
                                                            field.value
                                                        }
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger className="rounded-full bg-transparent text-white">
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
                                    </div>
                                </div>
                                <div className="col-span-2 space-y-4">
                                    <div>
                                        <Map
                                            className="relative z-0 h-[300px] w-full rounded-xl"
                                            onLocationSelected={
                                                handleLocationSelected
                                            }
                                            userLocationBase={baseLocation}
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
                                            <Spinner />{' '}
                                            <span>Searching Address...</span>
                                        </div>
                                    ) : (
                                        <FormField
                                            control={form.control}
                                            name="address"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            className="rounded-full border-white bg-transparent text-white"
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
                                <div className="mt-5 flex w-full justify-center">
                                    <Button
                                        className="group relative rounded-xl bg-blue-700 px-6 py-3 !font-semibold text-white transition-all duration-300"
                                        type="submit"
                                        loading={isPending}
                                    >
                                        <span className="absolute -inset-1 rounded-lg bg-blue-500 opacity-50 blur-lg transition-all duration-300 group-hover:opacity-100"></span>
                                        Update
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardDarkNeonGlow>
                </div>
            )}
        </div>
    );
}

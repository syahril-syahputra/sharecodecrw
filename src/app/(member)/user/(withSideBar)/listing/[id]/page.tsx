'use client';
import React from 'react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Check, Pen, Zap } from 'lucide-react';
import Image from 'next/image';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { errorHelper } from '@/lib/formErrorHelper';
import CardDarkNeonGlow from '@/components/base/Card/CardDarkNeonGlow';
import { Switch } from '@/components/ui/switch';
import { useCalculatePricing } from '@/feature/listing/useCalculatePricing';
import { BodyRepublishListing } from '@/types/listing';
import ErrorMessage from '@/components/base/Error/ErrorMessage';
import { useDetailListing } from '@/feature/listing/useDetailListing';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import IframeMap from '@/components/base/Maps/IframeMap';
import clsx from 'clsx';
import { useRepublishListing } from '@/feature/listing/useRepublishListing';
import Link from 'next/link';
import { useFetchDuration } from '@/feature/base/duration';
import DeleteListing from '@/components/base/Publisher/Listings/DeleteListing';

const formSchema = z
    .object({
        duration: z.string().min(1),
        is_premium: z.boolean().optional(),

        is_color: z.boolean().optional(),
        is_uplifter: z.boolean().optional(),
        color_hexadecimal: z
            .string()
            .optional()
            .refine(
                (val) =>
                    val === undefined ||
                    val === '' ||
                    val === '#258ad8' ||
                    val === '#d87925' ||
                    val === '#e9e1d3',
                {
                    message: 'Please Select a Valid Color',
                }
            ),
    })
    .refine(
        (data) => {
            // Jika `is_color` atau `is_premium` bernilai false, color_hexadecimal boleh undefined
            if (!data.is_color || !data.is_premium) {
                return true; // Tidak perlu validasi color_hexadecimal
            }
            return data.color_hexadecimal !== undefined; // Harus diisi jika is_color dan is_premium true
        },
        {
            message:
                'Color must be selected when is_color and is_premium are true',
            path: ['color_hexadecimal'],
        }
    );

export default function Page({ params }: { params: { id: string } }) {
    const { data } = useDetailListing(params.id);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
    });

    const router = useRouter();
    const {
        mutate: createListing,
        isPending: isLoadingCreate,
        isSuccess,
        isError,
        error,
        data: createResponse,
    } = useRepublishListing({
        id: params.id,
        onSuccess: (result) => {
            // router.push('/user/listing');
            if (result.data?.data?.url) {
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

        const dataBody: BodyRepublishListing = {
            duration: parseInt(data.duration),
            boosters: booster,
            color_hexadecimal:
                data.is_color || data.is_premium
                    ? data.color_hexadecimal
                    : undefined,
            is_direct: paymentMethod === 'credit_balance' ? false : true,
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

    const { data: dataDuration, isLoading: isLoadingDuration } =
        useFetchDuration();
    return (
        <div className="flex w-full flex-1 items-start space-x-4  px-4 text-white">
            <div className=" flex-1 rounded-lg bg-gradient-to-b from-[#1A3652] via-[#020508] to-[#020508] p-4 p-8">
                <div className="flex items-center justify-between">
                    <h2 className="font-urbanist text-4xl font-bold text-white">
                        Detail Service
                    </h2>
                    <div className="flex items-center space-x-2">
                        <Link href={`/user/listing/${params.id}/update`}>
                            <Button>Edit</Button>
                        </Link>
                        <DeleteListing id={params.id}/>
                        {/* <Button
                            onClick={() => setrepublishShow((prev) => !prev)}
                        >
                            Republish
                        </Button> */}
                    </div>
                </div>

                <div className="space-y-4 py-8">
                    <div className="flex flex-col space-y-2">
                        <label className="text-xl font-semibold">Title</label>
                        <span>{data?.title}</span>
                    </div>
                    <Separator />
                    <div className="flex flex-col space-y-2">
                        <label className="text-xl font-semibold">
                            Acceptance Status
                        </label>
                        <span>{data?.acceptance_status}</span>
                    </div>
                    <Separator />
                    <div className="flex flex-col space-y-2">
                        <label className="text-xl font-semibold">
                            Description
                        </label>
                        <span>{data?.description}</span>
                    </div>
                    <Separator />
                    <div className="flex flex-col space-y-2">
                        <label className="text-xl font-semibold">Tags</label>
                        <div className="flex items-center space-x-2">
                            {data?.hashtags.map((x, index) => (
                                <Badge key={index}>{x}</Badge>
                            ))}
                        </div>
                    </div>
                    <Separator />
                    <div className="flex flex-col space-y-2">
                        <label className="text-xl font-semibold">Price</label>
                        <span>{data?.price}</span>
                    </div>
                    <Separator />
                    <div className="flex flex-col space-y-2">
                        <label className="text-xl font-semibold">
                            Payment Type
                        </label>
                        <span>{data?.payment_type_formatted}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center">
                        <div className="flex flex-1 flex-col space-y-2">
                            <label className="text-xl font-semibold">
                                Province
                            </label>
                            <span>{data?.province}</span>
                        </div>
                        <div className="flex flex-1 flex-col  space-y-2">
                            <label className="text-xl font-semibold">
                                City
                            </label>
                            <span>{data?.city}</span>
                        </div>
                    </div>

                    <Separator />
                    <IframeMap
                        latitude={data?.latitude}
                        longitude={data?.longitude}
                    />

                    <Separator />
                    <div className="z-20 mb-4 rounded-xl border">
                        <Image
                            width={300}
                            height={300}
                            alt={data?.title || ''}
                            src={data?.image_url || '/image/no-image.png'}
                            className="mr-4 max-h-96 w-full rounded-md object-cover"
                        />
                    </div>
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
                </div>
            </div>
            <CardDarkNeonGlow
                className={clsx(
                    ' w-1/3 rounded-lg  bg-gray-900 px-4 py-8',
                    data?.acceptance_status === 'expired' ? '' : 'hidden'
                )}
            >
                <h1 className="flex items-center space-x-2">
                    <Zap />
                    <span className="text-xl font-semibold">Booster</span>
                </h1>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit((data, event) =>
                            onSubmit(data, event)
                        )}
                        className="space-y-4"
                    >
                        <div className="space-y-4 py-4">
                            <div className="mb-4 flex items-center justify-between rounded-lg bg-gray-800 p-4 shadow-md">
                                <div>
                                    <h1 className="text-lg font-semibold">
                                        Premium Booster
                                    </h1>
                                    <h2 className="text-sm text-gray-400">
                                        $10* or 10 credits
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
                                                                <SelectItem
                                                                    key={
                                                                        '#e9e1d3'
                                                                    }
                                                                    value={
                                                                        '#e9e1d3'
                                                                    }
                                                                >
                                                                    <div className="flex items-center space-x-2">
                                                                        <div
                                                                            className={clsx(
                                                                                `h-4 w-4 rounded-full !bg-[#e9e1d3] `
                                                                            )}
                                                                        ></div>
                                                                        <span>
                                                                            Light
                                                                            Beige
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
                                        $7* or 7 credits
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
                                        disabled={
                                            isLoadingCreate ||
                                            !pricingResult.is_sufficient
                                        }
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
                    </form>
                </Form>
            </CardDarkNeonGlow>
        </div>
    );
}

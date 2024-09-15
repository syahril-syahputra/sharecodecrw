'use client';
import TitleFormHeader from '@/components/base/Title/TitleFormHeader';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import DatePicker from '@/components/ui/datePicker';
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
import Spinner from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { useFetchCity, useFetchState } from '@/feature/base/city';
import {
    useFetchProfile,
    useUpdateEmail,
    useUpdateProfile,
    useUpdateProfilePhoto,
} from '@/feature/user/profile';
import { errorHelper } from '@/lib/formErrorHelper';
import useFilePreview from '@/lib/useFilePreview';
import { IProfile } from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { Check, ChevronLeft, CircleAlert, HardDriveUpload } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
];

const formSchema = z.object({
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
});

const formEmailSchema = z.object({
    email: z
        .string()
        .min(1, { message: 'Email is required' })
        .email({ message: 'Invalid Email' }),
});

const formBasicSchema = z.object({
    first_name: z.string().min(1, { message: 'Name is required' }),
    last_name: z.string().min(1, { message: 'Surname is required' }),

    birthday: z.date({
        required_error: 'Date of birth is required.',
    }),
    province: z.string().min(1, { message: 'Province is required' }),
    city: z.string().min(1),
    newsletter: z.boolean(),
    about_me: z.string().optional(),
});
export default function Page() {
    const { update, data: userData } = useSession();
    const [currentProfule, setcurrentProfule] = useState<IProfile>({});
    const router = useRouter();
    const {
        mutate: mutateFP,
        isPending,
        isSuccess: isSuccessUpdateFoto,
        data: updateFotoResponse,
    } = useUpdateProfilePhoto({
        onSuccess: () => {},
        onError: (error) => errorHelper(form.setError, error),
    });
    async function onSubmit(data: z.infer<typeof formSchema>) {
        mutateFP(data.photo);
    }
    function onSubmitProfile(data: z.infer<typeof formBasicSchema>) {
        mutateProfile({
            first_name: data.first_name,
            last_name: data.last_name,
            dob: dayjs(data.birthday).format('YYYY-MM-DD'),
            city_id: data.city,
            about: data.about_me || '',
            subscribe_newsletter: data.newsletter,
        });
    }
    //email controller
    async function onSubmitEmail(data: z.infer<typeof formEmailSchema>) {
        mutateEmail.mutate(data.email);
    }
    const formEmail = useForm<z.infer<typeof formEmailSchema>>({
        resolver: zodResolver(formEmailSchema),
        mode: 'onChange',
        defaultValues: {
            email: userData?.user.email,
        },
    });
    const mutateEmail = useUpdateEmail({
        onSuccess: async () => {
            await update({
                email: formEmail.getValues().email,
            });
            router.refresh();
        },
        onError: (error) => errorHelper(formEmail.setError, error),
    });
    //end email controller

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
    });

    const formBasic = useForm<z.infer<typeof formBasicSchema>>({
        resolver: zodResolver(formBasicSchema),
        mode: 'onChange',
    });
    const { data: dataState } = useFetchState();
    const { data: dataCity, isPending: isPendingCity } = useFetchCity(
        formBasic.getValues('province'),
        () => {
            if (
                formBasic.getValues('province') !== currentProfule.province_id
            ) {
                formBasic.setValue('city', '');
            }
        }
    );

    useEffect(() => {
        mutate();
    }, []);

    const {
        data: updateResponse,
        mutate: mutateProfile,
        isPending: isSending,
        isSuccess: isSuccessUpdate,
    } = useUpdateProfile({
        onSuccess: () => {},
        onError: (error) => errorHelper(formBasic.setError, error),
    });
    const { mutate, data: dataCurrentProtile } = useFetchProfile((data) => {
        setcurrentProfule(data);
        formEmail.reset({
            email: data.email,
        });
        formBasic.reset({
            first_name: data.first_name,
            last_name: data.last_name,
            birthday: data.dob ? dayjs(data.dob).toDate() : undefined,
            province: data.province_id,
            city: data.city_id,
            about_me: data.about || '',
            newsletter: data.subscribe_newsletter,
        });
    });

    const fileRef = form.register('photo');
    const result = form.watch(['photo']);
    const [filePreview] = useFilePreview(result[0]);
    return (
        <div className=" flex-1 space-y-4 p-4">
            <Link href={'/user/setting'}>
                <Button variant={'ghost'}>
                    <ChevronLeft /> Back
                </Button>
            </Link>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="text-center">
                        <FormField
                            control={form.control}
                            name="photo"
                            render={() => (
                                <FormItem>
                                    <FormControl>
                                        <div>
                                            <label
                                                className="relative inline-block cursor-pointer "
                                                htmlFor="avatar"
                                            >
                                                <Image
                                                    alt="Avatar"
                                                    className="mx-auto aspect-square rounded-full border border-slate-300 object-cover dark:border-slate-700"
                                                    height={200}
                                                    src={
                                                        filePreview
                                                            ? (filePreview as string)
                                                            : dataCurrentProtile?.profile_picture_url
                                                              ? dataCurrentProtile?.profile_picture_url
                                                              : '/icons/user.png'
                                                    }
                                                    width={200}
                                                />{' '}
                                                <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-full bg-neutral-800 bg-opacity-60 opacity-0 hover:opacity-100">
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
                    </div>
                    {isSuccessUpdateFoto && (
                        <Alert variant={'success'}>
                            <AlertTitle className="flex items-center space-x-2">
                                <Check />
                                <span>{updateFotoResponse.data.message}</span>
                            </AlertTitle>
                        </Alert>
                    )}
                    <div className="flex items-center justify-center py-4">
                        <Button type="submit" loading={isPending}>
                            UPLOAD NEW PICTURE
                        </Button>
                    </div>
                </form>
            </Form>
            <TitleFormHeader>Email</TitleFormHeader>
            <Form {...formEmail}>
                <form
                    onSubmit={formEmail.handleSubmit(onSubmitEmail)}
                    className="space-y-8"
                >
                    <div className="flex items-start space-x-4">
                        <FormField
                            control={formEmail.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormControl>
                                        <Input placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center space-x-2 pt-2">
                            <CircleAlert />
                            <span>Verify email once again, after update.</span>
                        </div>
                    </div>

                    <Button type="submit" loading={mutateEmail.isPending}>
                        SAVE
                    </Button>
                </form>
            </Form>
            <Form {...formBasic}>
                <form
                    onSubmit={formBasic.handleSubmit(onSubmitProfile)}
                    className="space-y-8"
                >
                    <TitleFormHeader>Basic Info</TitleFormHeader>
                    <div className="flex items-start space-x-4">
                        <FormField
                            control={formBasic.control}
                            name="first_name"
                            render={({ field }) => (
                                <FormItem className="flex-1">
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
                            control={formBasic.control}
                            name="last_name"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormControl>
                                        <Input
                                            placeholder="Last Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex items-start space-x-4">
                        <FormField
                            control={formBasic.control}
                            name="birthday"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <DatePicker
                                        placeholder="Birth Day"
                                        value={field.value}
                                        block
                                        onChange={field.onChange}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex-1"></div>
                    </div>
                    <TitleFormHeader>Location</TitleFormHeader>
                    <div className="flex space-x-2">
                        <FormField
                            control={formBasic.control}
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
                                control={formBasic.control}
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
                            <div className="flex-1 ">
                                <Spinner />
                            </div>
                        )}
                    </div>
                    <TitleFormHeader>About Me</TitleFormHeader>
                    <FormField
                        control={formBasic.control}
                        name="about_me"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <Textarea
                                        placeholder="Biography"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={formBasic.control}
                        name="newsletter"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="flex items-start space-x-2 py-2">
                                        <Checkbox
                                            id="terms"
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                        <label
                                            htmlFor="terms"
                                            className="text-sm leading-none "
                                        >
                                            Subscribe newsletter
                                        </label>
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {isSuccessUpdate && (
                        <Alert variant={'success'}>
                            <AlertTitle className="flex items-center space-x-2">
                                <Check />
                                <span>{updateResponse.data.message}</span>
                            </AlertTitle>
                        </Alert>
                    )}
                    <Button type="submit" loading={isSending}>
                        SAVE
                    </Button>
                </form>
            </Form>
        </div>
    );
}

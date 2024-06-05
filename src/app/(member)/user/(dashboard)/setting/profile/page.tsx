'use client';
import TitleFormHeader from '@/components/base/Title/TitleFormHeader';
import { Button } from '@/components/ui/button';
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
import { Textarea } from '@/components/ui/textarea';
import useFilePreview from '@/lib/useFilePreview';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft, CircleAlert, HardDriveUpload } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
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
    city: z.string().min(1, { message: 'City is required' }),
    password: z.string().min(1, { message: 'Password is required' }),

    about_me: z.string().min(1, { message: 'About Me is required' }),
});
export default function Page() {
    function onSubmit() {
        alert('lanjut');
    }
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
    });

    const formEmail = useForm<z.infer<typeof formEmailSchema>>({
        resolver: zodResolver(formEmailSchema),
        mode: 'onChange',
    });
    const formBasic = useForm<z.infer<typeof formBasicSchema>>({
        resolver: zodResolver(formBasicSchema),
        mode: 'onChange',
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
                    <div className="flex items-center justify-center py-4">
                        <Button type="submit">UPLOAD NEW PICTURE</Button>
                    </div>
                </form>
            </Form>
            <TitleFormHeader>Email</TitleFormHeader>
            <Form {...formEmail}>
                <form
                    onSubmit={formEmail.handleSubmit(onSubmit)}
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
                    <Button
                        type="submit"
                        loading={formEmail.formState.isSubmitting}
                    >
                        SAVE
                    </Button>
                </form>
            </Form>
            <Form {...formBasic}>
                <form
                    onSubmit={formBasic.handleSubmit(onSubmit)}
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
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Province" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Sulawesi Selatan">
                                                Sulawesi Selatan
                                            </SelectItem>
                                            <SelectItem value="Bali">
                                                Bali
                                            </SelectItem>
                                            <SelectItem value="Jakarta">
                                                Jakarta
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={formBasic.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="City" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="makassar">
                                                Makassar
                                            </SelectItem>
                                            <SelectItem value="bali">
                                                Bali
                                            </SelectItem>
                                            <SelectItem value="Jakarta">
                                                Jakarta
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                    <Button
                        type="submit"
                        loading={formBasic.formState.isSubmitting}
                    >
                        SAVE
                    </Button>
                </form>
            </Form>
        </div>
    );
}

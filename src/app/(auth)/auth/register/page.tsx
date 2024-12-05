'use client';
import ErrorMessage from '@/components/base/Error/ErrorMessage';
import TitleAuth from '@/components/base/Title/TitleAuth';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import DatePicker from '@/components/ui/datePicker';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import TitleSeparator from '@/components/base/Title/TitleSeparator';
import Image from 'next/image';
import Link from 'next/link';
import { PasswordInput } from '@/components/ui/password-input';
import { BodyUserRegistration } from '@/types/auth';
import { errorHelper } from '@/lib/formErrorHelper';
import { useUserRegistration } from '@/feature/auth/register';
import { useFetchCity, useFetchState } from '@/feature/base/city';
import dayjs from 'dayjs';
import { signIn } from 'next-auth/react';
const formSchema = z
    .object({
        first_name: z.string().min(1, { message: 'Name is required' }),
        last_name: z.string().min(1, { message: 'Surname is required' }),
        email: z
            .string()
            .min(1, { message: 'Email is required' })
            .email({ message: 'Invalid Email' }),
        birthday: z.date({
            required_error: 'Date of birth is required.',
        }),
        province: z.string().min(1, { message: 'Province is required' }),
        city: z.string().min(1, { message: 'City is required' }),
        password: z.string().min(1, { message: 'Password is required' }),
        confirm_password: z
            .string()
            .min(1, { message: 'Comfirm Password is required' }),
        newsletter: z.boolean().optional(),
    })
    .refine((data) => data.password === data.confirm_password, {
        message: "Confirm Passwords don't match",
        path: ['confirm_password'],
    });
export default function Page() {
    const { mutate, isPending, isError, error } = useUserRegistration({
        onSuccess: onSucces,
        onError: (error) => errorHelper(form.setError, error),
    });

    async function onSucces() {
        await signIn('credentials', {
            email: form.getValues().email,
            password: form.getValues().password,
            remember_me: false,
            callbackUrl: '/email-verification',
        });
        form.reset();
        // console.log(data);
    }
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const body: BodyUserRegistration = {
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            dob: dayjs(values.birthday).format('YYYY-MM-DD'),
            city_id: values.city,
            password: values.password,
            password_confirmation: values.confirm_password,
            subscribe_newsletter: values.newsletter || false,
        };
        mutate(body);
    }
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
        defaultValues: {
            newsletter: false,
        },
    });
    const { data: dataState } = useFetchState();
    const { data: dataCity } = useFetchCity(form.getValues('province'), () => {
        form.setValue('city', '');
    });

    return (
        <div className="mx-auto max-w-xl space-y-8">
            <section className="space-y-4 text-center">
                <TitleAuth>Sign Up</TitleAuth>
                <div className="font-semibold">
                    To discover more start with creating an account!
                </div>
            </section>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="first_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Name" {...field} />
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
                                <FormControl>
                                    <Input placeholder="Surname" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="birthday"
                        render={({ field }) => (
                            <FormItem>
                                <DatePicker
                                    placeholder="Date of Birth"
                                    value={field.value}
                                    block
                                    onChange={field.onChange}
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <PasswordInput
                                        placeholder="Password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="confirm_password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <PasswordInput
                                        placeholder="Confirm Password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex space-x-2">
                        <FormField
                            control={form.control}
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
                        <FormField
                            control={form.control}
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
                    </div>
                    <FormField
                        control={form.control}
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
                                            I would like to receive marketing
                                            and product communication via
                                            e-mail, phone and app. Read more.
                                        </label>
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {isError && (
                        <ErrorMessage>
                            {error.response?.data?.message || 'Something Wrong'}
                        </ErrorMessage>
                    )}
                    <Button block type="submit" loading={isPending}>
                        Sign Up
                    </Button>
                </form>
            </Form>
            <TitleSeparator>Or With</TitleSeparator>
            <div className="flex flex-col justify-center space-y-4 text-center md:flex-row md:space-x-4 md:space-y-0">
                <Button variant={'outline'} size={'lg'}>
                    <Image
                        src={'/icons/apple-logo.png'}
                        alt="apple"
                        className="mr-2"
                        width={20}
                        height={20}
                    />
                    Sign Up with Apple
                </Button>
                <Button variant={'outline'}>
                    <Image
                        src={'/icons/google.png'}
                        alt="google"
                        width={20}
                        className="mr-2"
                        height={20}
                    />
                    Sign Up with Google
                </Button>
            </div>
            <div className="text-center">
                By registering for an account, you agree to the{' '}
                <Link className="font-semibold" href={'#'}>
                    Terms of Use
                </Link>
                . Please read our{' '}
                <Link className="font-semibold" href={'#'}>
                    Privacy Policy
                </Link>
                .
            </div>
            <div className="text-center">
                <span className="text-sm">Already have an account?</span>{' '}
                <Link
                    href={'/auth/login'}
                    className="text-sm font-semibold text-primary"
                >
                    Sign In
                </Link>
            </div>
        </div>
    );
}

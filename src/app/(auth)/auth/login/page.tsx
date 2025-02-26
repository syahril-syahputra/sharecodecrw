'use client';

import TitleAuth from '@/components/base/Title/TitleAuth';
import React, { useState } from 'react';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import ErrorMessage from '@/components/base/Error/ErrorMessage';
import { PasswordInput } from '@/components/ui/password-input';
import { useSearchParams, useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
// import fetchClient from '@/lib/FetchClient';
import useFCMToken from '@/lib/hooks/useFCMToken';
import TitleSeparator from '@/components/base/Title/TitleSeparator';
import Image from 'next/image';
import fetchClient from '@/lib/FetchClient';
import { ArrowLeftCircle } from 'lucide-react';

const formSchema = z.object({
    email: z
        .string()
        .min(1, { message: 'Email is required' })
        .email({ message: 'Invalid Email' }),

    password: z.string().min(1, { message: 'Password is required' }),
    remember_me: z.boolean().optional(),
});
export default function Page() {
    const fcmToken = useFCMToken();
    const [loginFail, setloginFail] = useState('');
    // const [loadingGoogle, setloadingGoogle] = useState(false);
    const [isLoadingForm, setIsLoadingForm] = useState(false);

    const searchParams = useSearchParams();
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: '',
            remember_me: false,
        },
    });
    // const getUrl = async () => {
    //     setloadingGoogle(true);
    //     try {
    //         const response = await fetchClient({ url: '/auth/google' });
    //         router.push(response.data.data.url);
    //     } catch (error) {
    //         console.log(error);
    //     } finally {
    //         setloadingGoogle(false);
    //     }
    // };
    async function onSubmit(data: z.infer<typeof formSchema>) {
        setloginFail('');
        setIsLoadingForm(true);
        // handle submitting the form
        try {
            const callbackUrl = searchParams.get('callbackUrl') || '/';
            const request = await signIn('username-login', {
                email: data.email,
                token: fcmToken || null,
                password: data.password,
                remember_me: data.remember_me,
                redirect: false,
                callbackUrl: callbackUrl,
            });

            if (request?.error) {
                setIsLoadingForm(false);
                setloginFail(request?.error);
            } else {
                router.refresh();
                router.push('/user');
            }
        } catch (error) {
            setIsLoadingForm(false);
            console.log(error);
        }
    }

    const [loadingGoogle, setLoadingGoogle] = useState(false);
    const getUrl = async () => {
        setLoadingGoogle(true);
        try {
            const response = await fetchClient({ url: '/auth/google' });
            router.push(response.data.data.url);
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingGoogle(false);
        }
    };
    return (
        <div className="relative mx-auto max-w-xl space-y-8 overflow-hidden rounded-xl bg-gray-900 p-10">
            <div className="absolute -right-80 -top-64 h-96 w-full -translate-x-1/2 transform rounded-full bg-primary opacity-30 blur-3xl"></div>
            <div className="mb-6 flex items-center space-x-2">
                <Link href={'/'}>
                    <ArrowLeftCircle
                        className="cursor-pointer text-white"
                        size={28}
                        onClick={() => router.push('/auth/login')}
                    />
                </Link>
                <TitleAuth className="!text-4xl !text-white underline">
                    Sign In
                </TitleAuth>
            </div>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        className="rounded-full border-white bg-transparent text-white"
                                        placeholder="Email"
                                        {...field}
                                    />
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
                                        className="rounded-full border-white bg-transparent text-white"
                                        placeholder="Password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="terms" />
                            <label
                                htmlFor="terms"
                                className="text-sm leading-none text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Remember Me
                            </label>
                        </div>
                        <Link
                            href={'/auth/forget-password'}
                            className="text-sm font-semibold text-white"
                        >
                            Forgot Password?
                        </Link>
                    </div>
                    {loginFail && <ErrorMessage>{loginFail}</ErrorMessage>}

                    <div className="flex w-full justify-center">
                        <Button
                            className="group relative rounded-xl px-6 py-3 !font-semibold text-white transition-all duration-300"
                            type="submit"
                            loading={isLoadingForm}
                        >
                            <span className="group-hover:opacity-300 absolute -inset-1 rounded-lg bg-blue-500 opacity-20 blur-sm transition-all duration-300"></span>
                            {isLoadingForm && form.formState.isSubmitSuccessful
                                ? 'Redirecting'
                                : 'Sign in'}
                        </Button>
                    </div>
                </form>
            </Form>
            <TitleSeparator>Or</TitleSeparator>
            <div className="flex flex-col justify-center space-y-4 text-center md:flex-row md:space-x-4 md:space-y-0">
                <Button
                    variant={'outline'}
                    loading={loadingGoogle}
                    onClick={getUrl}
                >
                    <Image
                        src={'/icons/google.png'}
                        alt="google"
                        width={20}
                        className="mr-2"
                        height={20}
                    />
                    Sign in with Google
                </Button>
            </div>
            <div className="text-center">
                <span className="text-sm text-white">
                    Don&apos;t have an account?
                </span>{' '}
                <Link
                    href={'/auth/register'}
                    className="text-sm font-semibold text-primary"
                >
                    Sign Up
                </Link>
            </div>
        </div>
    );
}

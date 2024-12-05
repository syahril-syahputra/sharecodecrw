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
import Image from 'next/image';
import ErrorMessage from '@/components/base/Error/ErrorMessage';
import TitleSeparator from '@/components/base/Title/TitleSeparator';
import { PasswordInput } from '@/components/ui/password-input';
import { useSearchParams, useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import fetchClient from '@/lib/FetchClient';
import useFCMToken from '@/lib/hooks/useFCMToken';

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
    const [loadingGoogle, setloadingGoogle] = useState(false);
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
    const getUrl = async () => {
        setloadingGoogle(true);
        try {
            const response = await fetchClient({ url: '/auth/google' });
            router.push(response.data.data.url);
        } catch (error) {
            console.log(error);
        } finally {
            setloadingGoogle(false);
        }
    };
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
            // console.log(request);

            if (request?.error) {
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
    return (
        <div className="mx-auto max-w-xl space-y-8">
            <section className="space-y-4 text-center">
                <TitleAuth>Sign In</TitleAuth>
            </section>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
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
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="terms" />
                            <label
                                htmlFor="terms"
                                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Remember Me
                            </label>
                        </div>
                        <Link
                            href={'/auth/forget-password'}
                            className="text-sm font-semibold text-primary"
                        >
                            Forgot Password?
                        </Link>
                    </div>
                    {loginFail && <ErrorMessage>{loginFail}</ErrorMessage>}

                    <Button block type="submit" loading={isLoadingForm}>
                        {form.formState.isSubmitted ? 'Redirecting' : 'Sign in'}
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
                    />{' '}
                    Sign in with Apple
                </Button>

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
                <span className="text-sm">Don&apos;t have an account?</span>{' '}
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

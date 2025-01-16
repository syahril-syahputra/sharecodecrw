'use client';
import CardDarkNeonGlow from '@/components/base/Card/CardDarkNeonGlow';
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
import { PasswordInput } from '@/components/ui/password-input';
import Spinner from '@/components/ui/spinner';
import fetchClient from '@/lib/FetchClient';
import { errorHelper } from '@/lib/formErrorHelper';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z
    .object({
        password: z.string().min(1, { message: 'Password is required' }),
        confirm_password: z
            .string()
            .min(1, { message: 'Comfirm Password is required' }),
    })
    .refine((data) => data.password === data.confirm_password, {
        message: "Confirm Passwords don't match",
        path: ['confirm_password'],
    });
export default function Page() {
    const searchParams = useSearchParams();

    const [isValidating, setisValidating] = useState(true);
    const [isTokenValid, setisTokenValid] = useState(false);
    const [isSet, setisSet] = useState(false);

    const key = searchParams.get('key');
    const confirmation_key = searchParams.get('confirmation_key');

    const [errorResponse, seterrorResponse] = useState('');

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
    });

    useEffect(() => {
        async function fetchData() {
            try {
                await fetchClient({
                    url: '/auth/validate-reset-password-token',
                    method: 'POST',
                    body: {
                        token:
                            'key=' +
                            key +
                            '&confirmation_key=' +
                            confirmation_key,
                    },
                });
                setisTokenValid(true);
            } catch (error) {
                setisTokenValid(false);
                console.log(error);
            } finally {
                setisValidating(false);
            }
        }
        fetchData();
    }, []);

    async function onSubmit() {
        const dataRequest = {
            password: form.getValues().password,
            password_confirmation: form.getValues().confirm_password,
            token: 'key=' + key + '&confirmation_key=' + confirmation_key,
        };
        seterrorResponse('');
        try {
            await fetchClient({
                method: 'POST',
                url: '/auth/reset-password',
                body: dataRequest,
            });
            setisSet(true);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                errorHelper(form.setError, error),
                    seterrorResponse(error.response?.data.message);
            }
        }
    }
    return (
        <div className="container">
            {isSet && (
                <div className='w-full lg:w-6/12 mx-auto'>
                    <div className="mx-auto flex max-w-xl flex-col items-center rounded-lg text-center">
                        <CardDarkNeonGlow>
                            <TitleAuth>
                                Your password has been successfully reset
                            </TitleAuth>
                            <div>
                                <Link href={'/auth/login'}>
                                    <Button variant={'ghost'} className="text-blue-500">
                                        Login
                                    </Button>
                                </Link>
                            </div>
                        </CardDarkNeonGlow>
                    </div>
                </div>
            )}
            {isValidating && (
                <div className='w-full lg:w-6/12 mx-auto'>
                    <div className="mx-auto flex max-w-xl flex-col  items-center rounded-lg text-center">
                        <CardDarkNeonGlow>
                            <TitleAuth>
                                Verifying your reset password link, please wait…
                            </TitleAuth>
                            <div className='flex justify-center'>
                                <Spinner />
                            </div>
                        </CardDarkNeonGlow>
                    </div>
                </div>
            )}
            {!isTokenValid && !isValidating && (
                <div className="mx-auto flex max-w-xl flex-col  items-center space-y-8 rounded-lg text-center">
                    <CardDarkNeonGlow>
                        <TitleAuth>
                            Your reset password link is not valid, please resend new
                            request
                        </TitleAuth>
                        <div>
                            <Link href={'/auth/forget-password'}>
                                <Button variant={'ghost'} className="text-blue-500">
                                    Resend
                                </Button>
                            </Link>
                        </div>
                    </CardDarkNeonGlow>
                </div>
            )}
            {isTokenValid && !isValidating && !isSet && (
                <div className="mx-auto max-w-xl">
                    <CardDarkNeonGlow>
                        <section className="text-center">
                            <TitleAuth>Reset Password</TitleAuth>
                        </section>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4"
                            >
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

                                {errorResponse && (
                                    <ErrorMessage>
                                        {errorResponse || 'Something Wrong'}
                                    </ErrorMessage>
                                )}

                                <div className="flex w-full justify-center">
                                    <Button
                                        className="group relative rounded-xl bg-blue-700 px-6 py-3 !font-semibold text-white transition-all duration-300"
                                        type="submit"
                                        loading={form.formState.isSubmitting}
                                    >
                                        <span className="group-hover:opacity-300 absolute -inset-1 rounded-lg bg-blue-500 opacity-20 blur-sm transition-all duration-300"></span>
                                        Reset Password
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

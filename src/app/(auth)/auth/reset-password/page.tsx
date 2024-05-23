'use client';
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
import Spinner from '@/components/ui/spinner';
import { yupResolver } from '@hookform/resolvers/yup';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface FormInputs {
    password: string;
    password_confirmation: string;
}
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
    const router = useRouter();

    const [isValidating, setisValidating] = useState(true);
    const [isTokenValid, setisTokenValid] = useState(false);

    const key = searchParams.get('key');
    const confirmation_key = searchParams.get('confirmation_key');

    const [errorResponse, seterrorResponse] = useState('');

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
    });

    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             await fetchClient({
    //                 url: '/auth/validate-reset-password-token',
    //                 method: 'POST',
    //                 body: {
    //                     token:
    //                         'key=' +
    //                         key +
    //                         '&confirmation_key=' +
    //                         confirmation_key,
    //                 },
    //             });
    //             setisTokenValid(true);
    //         } catch (error) {
    //             setisTokenValid(false);
    //             console.log(error);
    //         } finally {
    //             setisValidating(false);
    //         }
    //     }
    //     fetchData();
    // }, []);

    async function onSubmit() {
        // handle submitting the form
        // const dataRequest = {
        //     password: data.password,
        //     password_confirmation: data.password_confirmation,
        //     token: 'key=' + key + '&confirmation_key=' + confirmation_key,
        // };
        // seterrorResponse('');
        // try {
        //     await fetchClient({
        //         method: 'POST',
        //         url: '/auth/reset-password',
        //         body: dataRequest,
        //     });
        //     router.push('/auth/login');
        // } catch (error) {
        //     if (axios.isAxiosError(error)) {
        //         if (error.response?.data.errors) {
        //             const obj = error.response?.data.errors;
        //             for (const [key, value] of Object.entries(obj)) {
        //                 if (key in scheme.fields) {
        //                     setError(key as FormErrorKeys, {
        //                         type: 'custom',
        //                         message: value as string,
        //                     });
        //                 }
        //             }
        //         }
        //         seterrorResponse(error.response?.data.message);
        //     }
        // }
    }
    return (
        <div className="container  mt-8 pt-4">
            {isValidating && (
                <div className="mx-auto my-8 flex max-w-xl flex-col  items-center space-y-8 rounded-lg  p-8 text-center">
                    <TitleAuth>Please Wait, verifying your token </TitleAuth>
                    <div>
                        <Spinner />
                    </div>
                </div>
            )}
            {!isTokenValid && !isValidating && (
                <div className="mx-auto my-8 flex max-w-xl flex-col  items-center space-y-8 rounded-lg  p-8 text-center">
                    <TitleAuth>Your link not valid.</TitleAuth>
                    <div>
                        Please click{' '}
                        <Link href={'/auth/forgot-password'}>HERE</Link> resend
                        input your email again
                    </div>
                </div>
            )}
            {isTokenValid && !isValidating && (
                <div className="mx-auto max-w-xl space-y-8">
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
                                            <Input
                                                placeholder="Password"
                                                type="password"
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
                                            <Input
                                                placeholder="Confirm Password"
                                                type="password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                block
                                type="submit"
                                loading={form.formState.isSubmitting}
                            >
                                Reset Password
                            </Button>
                        </form>
                    </Form>
                </div>
            )}
        </div>
    );
}

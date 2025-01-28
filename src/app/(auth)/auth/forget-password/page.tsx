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
import fetchClient from '@/lib/FetchClient';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
    email: z
        .string()
        .min(1, { message: 'Email is required' })
        .email({ message: 'Invalid Email' }),
});

export default function Page() {
    const [sended, setsended] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
    });

    async function onSubmit() {
        try {
            await fetchClient({
                url: '/auth/forgot-password',
                method: 'POST',
                body: { email: form.getValues().email },
            });
        } catch (error) {
            console.log(error);
        } finally {
            setsended(true);
        }
    }
    return (
        <div className="container mt-8">
            {!sended && (
                <div className="mx-auto w-6/12">
                    <div className="relative my-8 overflow-hidden rounded-xl bg-gray-900 p-6 text-white shadow-lg">
                        <div className="absolute -top-72 left-1/2 h-96 w-96 -translate-x-1/2 transform rounded-full bg-blue-800 opacity-40 blur-2xl"></div>
                        <div className="relative space-y-8 text-center text-white">
                            <section className="text-center">
                                <div className="text-lg font-bold text-white">
                                    Enter your email address
                                </div>
                            </section>
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
                                                        placeholder="Email"
                                                        {...field}
                                                        className="rounded-full border-white bg-transparent text-white"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex w-full justify-center">
                                        <Button
                                            className="group relative rounded-xl px-6 py-3 !font-semibold text-white transition-all duration-300"
                                            type="submit"
                                            loading={
                                                form.formState.isSubmitting
                                            }
                                        >
                                            Reset Password
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </div>
                </div>
            )}
            {sended && (
                <div className="mx-auto my-8 max-w-xl space-y-8 rounded-lg  p-8 text-center">
                    <TitleAuth>
                        Your request has been successfully processed
                    </TitleAuth>
                    <div>Please check your email to reset your password!</div>
                </div>
            )}
        </div>
    );
}

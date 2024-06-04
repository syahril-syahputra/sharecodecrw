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
        <div className="container  mt-8 pt-4">
            {!sended && (
                <div className="mx-auto max-w-xl space-y-8">
                    <section className="text-center">
                        <TitleAuth>Enter your email address</TitleAuth>
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

'use client';
import TitleFormHeader from '@/components/base/Title/TitleFormHeader';
import { Button } from '@/components/ui/button';
import { ChevronLeft, CircleAlert } from 'lucide-react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
// import { Alert, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';
import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useUpdatePasswrod } from '@/feature/user/profile';
import { errorHelper } from '@/lib/formErrorHelper';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { PasswordInput } from '@/components/ui/password-input';
import { signOut } from 'next-auth/react';

interface formPassword {
    current_password: string;
    new_password: string;
    new_password_confirmation: string;
}
const formSchemaPasswrod = z
    .object({
        current_password: z.string().min(1),
        new_password: z.string().min(1),
        new_password_confirmation: z.string().min(1),
    })
    .refine((data) => data.new_password === data.new_password_confirmation, {
        message: "Passwords don't match",
        path: ['new_password_confirmation'], // path of error
    });

// type FormFieldPassword = keyof formPassword;
export default function Page() {
    const formPassword = useForm<formPassword>({
        resolver: zodResolver(formSchemaPasswrod),
        mode: 'onChange',
    });

    const { mutate, isPending, isError, error } = useUpdatePasswrod({
        onSuccess: () => {
            signOut();
        },
        onError: (error) => errorHelper(formPassword.setError, error),
    });
    async function onSubmitPassword(
        values: z.infer<typeof formSchemaPasswrod>
    ) {
        mutate(values);
    }
    return (
        <div className="flex-1">
            <Link href={'/user/setting'}>
                <Button variant={'ghost'}>
                    <ChevronLeft /> Back
                </Button>
            </Link>
            <div className="space-y-8 p-8">
                <TitleFormHeader>Update Password</TitleFormHeader>
                <Form {...formPassword}>
                    <form
                        onSubmit={formPassword.handleSubmit(onSubmitPassword)}
                        className="space-y-6"
                    >
                        <FormField
                            control={formPassword.control}
                            name="current_password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <PasswordInput
                                            placeholder="Current Password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={formPassword.control}
                            name="new_password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <PasswordInput
                                            placeholder="New Password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={formPassword.control}
                            name="new_password_confirmation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <PasswordInput
                                            placeholder="Confirm Password"
                                            {...field}
                                        />
                                    </FormControl>
                                    {/* <FormDescription>
                                        This is your public display name.
                                    </FormDescription> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {isError && (
                            <Alert variant={'destructive'}>
                                <AlertTitle>
                                    {error.response?.data.message ||
                                        'please try again letter'}
                                </AlertTitle>
                            </Alert>
                        )}

                        <div className="flex flex-1 items-center space-x-2 pt-2">
                            <CircleAlert />
                            <span>
                                After completed, you will be logged out.
                            </span>
                        </div>

                        <Button type="submit" loading={isPending}>
                            Save
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}

'use client';
import TitleFormHeader from '@/components/base/Title/TitleFormHeader';
import { Button } from '@/components/ui/button';
import { CircleAlert } from 'lucide-react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import React, { Fragment } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useUpdatePasswrod } from '@/feature/user/profile';
import { errorHelper } from '@/lib/formErrorHelper';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { PasswordInput } from '@/components/ui/password-input';
import { signOut } from 'next-auth/react';
import CardDarkNeonGlow from '@/components/base/Card/CardDarkNeonGlow';

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
        <div className="flex-1 px-6">
            <Fragment>
                <CardDarkNeonGlow>
                    <div className="px-5 pb-10">
                        <TitleFormHeader>Update Password</TitleFormHeader>
                        <Form {...formPassword}>
                            <form
                                onSubmit={formPassword.handleSubmit(
                                    onSubmitPassword
                                )}
                                className="space-y-4"
                            >
                                <FormField
                                    control={formPassword.control}
                                    name="current_password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <PasswordInput
                                                    className="rounded-full border-white bg-transparent text-white"
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
                                                    className="rounded-full border-white bg-transparent text-white"
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
                                                    className="rounded-full border-white bg-transparent text-white"
                                                    placeholder="Confirm Password"
                                                    {...field}
                                                />
                                            </FormControl>
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

                                <div className="flex flex-1 items-center space-x-2 pt-2 italic">
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
                </CardDarkNeonGlow>
            </Fragment>
        </div>
    );
}

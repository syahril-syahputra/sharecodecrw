'use client';
import TitleFormHeader from '@/components/base/Title/TitleFormHeader';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useUpdatePhoneNumber } from '@/feature/user/profile';
import { errorHelper } from '@/lib/formErrorHelper';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ChevronLeft, CircleAlert } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
interface formPassword {
    code: string;
    phone_number: string;
}
const formSchema = z.object({
    code: z.string().min(2),
    phone_number: z.string().min(8),
});
export default function Page() {
    const form = useForm<formPassword>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
    });

    const {
        mutate,
        isPending,
        isError,
        error,
        isSuccess,
        data: updateResponse,
    } = useUpdatePhoneNumber({
        onSuccess: () => {
            // signOut();
        },
        onError: (error) => errorHelper(form.setError, error),
    });
    async function onSubmitd(values: z.infer<typeof formSchema>) {
        mutate(values.code + '' + values.phone_number);
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
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmitd)}
                        className="space-y-6"
                    >
                        <div className="flex flex-1 items-start space-x-4">
                            <FormField
                                control={form.control}
                                name="code"
                                render={({ field }) => (
                                    <FormItem className="w-16">
                                        <FormControl>
                                            <Input
                                                placeholder="+1"
                                                className="text-center"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone_number"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormControl>
                                            <Input
                                                placeholder="123 456 789"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex flex-1 items-center space-x-2 pt-2">
                                <CircleAlert />
                                <span>
                                    Verify phone number once again, after
                                    update.
                                </span>
                            </div>
                        </div>
                        {isError && (
                            <Alert variant={'destructive'}>
                                <AlertTitle>
                                    {error.response?.data.message ||
                                        'please try again letter'}
                                </AlertTitle>
                            </Alert>
                        )}
                        {isSuccess && (
                            <Alert variant={'success'}>
                                <AlertTitle className="flex items-center space-x-2">
                                    <Check />
                                    <span>{updateResponse.data.message}</span>
                                </AlertTitle>
                            </Alert>
                        )}
                        <Button type="submit" loading={isPending}>
                            Save
                        </Button>
                    </form>
                </Form>
                {/* <div className="flex items-start space-x-4">
                    <div className="flex flex-1 items-center space-x-4">
                        <Input placeholder="" className="w-12 text-center" />
                        <Input placeholder="" className="flex-1" />
                    </div>
                    <div className="flex flex-1 items-center space-x-2 pt-2">
                        <CircleAlert />
                        <span>
                            Verify phone number once again, after update.
                        </span>
                    </div>
                </div>
                <Button>VERIFY NEW PHONE NUMBER</Button> */}
            </div>
        </div>
    );
}

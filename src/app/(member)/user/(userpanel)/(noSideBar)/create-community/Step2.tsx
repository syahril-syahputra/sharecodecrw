'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    about: z.string().optional(),
});

interface IProps {
    onFinish: (data: z.infer<typeof formSchema>) => void;
}
export default function Step2(props: IProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
    });

    const onSubmitProfile = (value: z.infer<typeof formSchema>) => {
        props.onFinish(value);
    };
    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmitProfile)}
                    className="space-y-8"
                >
                    <div className="text-center">Community Name*</div>

                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <Input placeholder="Title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="text-center">Community About*</div>
                    <FormField
                        control={form.control}
                        name="about"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <Textarea
                                        placeholder="Write down event description"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-center">
                        <Button type="submit" className="mx-auto">
                            NEXT
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}

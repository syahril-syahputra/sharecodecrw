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
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import useFilePreview from '@/lib/useFilePreview';
import { Plus } from 'lucide-react';

const formSchema = z.object({
    img: z.any().optional(),
});

interface IProps {
    onFinish: (data: z.infer<typeof formSchema>) => void;
}
export default function Step4(props: IProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
    });

    const fileRef = form.register('img');
    const result = form.watch(['img']);
    const [filePreview] = useFilePreview(result[0]);
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
                    <div className="text-center">Add Photo</div>

                    <FormField
                        control={form.control}
                        name="img"
                        render={() => (
                            <FormItem>
                                <FormControl>
                                    <div>
                                        <label
                                            className="relative block cursor-pointer "
                                            htmlFor="avatar"
                                        >
                                            <Image
                                                alt="Avatar"
                                                className="mx-auto  border border-slate-300 object-cover dark:border-slate-700"
                                                height={200}
                                                src={
                                                    filePreview
                                                        ? (filePreview as string)
                                                        : '/icons/image.png'
                                                }
                                                width={200}
                                            />{' '}
                                            <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center  bg-neutral-800 bg-opacity-60 opacity-0 hover:opacity-100">
                                                <Plus
                                                    className="text-white"
                                                    size={60}
                                                />
                                            </div>
                                        </label>

                                        <FormMessage />
                                        <input
                                            id="avatar"
                                            type="file"
                                            className="hidden"
                                            placeholder="shadcn"
                                            accept="image/*"
                                            multiple={false}
                                            {...fileRef}
                                        />
                                    </div>
                                </FormControl>
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

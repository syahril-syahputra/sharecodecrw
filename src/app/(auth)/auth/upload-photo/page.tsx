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
import useFilePreview from '@/lib/useFilePreview';
import { zodResolver } from '@hookform/resolvers/zod';
import { HardDriveUpload } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
];

const formSchema = z.object({
    photo: z
        .any()
        .refine((files) => files?.length == 1, 'Image is required.')
        .refine(
            (files) => files?.[0]?.size <= MAX_FILE_SIZE,
            `Max file size is 500kb.`
        )
        .refine(
            (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
            '.jpg, .jpeg, .png and .webp files are accepted.'
        ),
});
export default function Page() {
    function onSubmit() {
        alert('lanjut');
    }
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
    });

    const fileRef = form.register('photo');
    const result = form.watch(['photo']);
    const [filePreview] = useFilePreview(result[0]);
    return (
        <div className="mx-auto max-w-xl space-y-8">
            <section className="space-y-4 text-center">
                <TitleAuth>Upload a Photo</TitleAuth>
            </section>
            <section className="space-y-2">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="text-center">
                            <FormField
                                control={form.control}
                                name="photo"
                                render={() => (
                                    <FormItem>
                                        <FormControl>
                                            <div>
                                                <label
                                                    className="relative inline-block cursor-pointer "
                                                    htmlFor="avatar"
                                                >
                                                    <Image
                                                        alt="Avatar"
                                                        className="mx-auto aspect-square rounded-full border border-slate-300 object-cover dark:border-slate-700"
                                                        height={200}
                                                        src={
                                                            filePreview
                                                                ? (filePreview as string)
                                                                : '/icons/user.png'
                                                        }
                                                        width={200}
                                                    />{' '}
                                                    <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-full bg-neutral-800 bg-opacity-60 opacity-0 hover:opacity-100">
                                                        <HardDriveUpload
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
                        </div>
                        <div className="flex items-center justify-center py-4">
                            <Button type="submit">Next</Button>
                        </div>
                    </form>
                </Form>
                <div className="flex items-center justify-center">
                    <Button variant={'ghost'} className="">
                        Skip Now
                    </Button>
                </div>
            </section>
        </div>
    );
}

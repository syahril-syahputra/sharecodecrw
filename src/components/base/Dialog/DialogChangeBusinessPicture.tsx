'use client';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { useUpdateBusinessDocument } from '@/feature/business/useUpdateBusinessDocument';
import { errorHelper } from '@/lib/formErrorHelper';
import useFilePreview from '@/lib/useFilePreview';
import { zodResolver } from '@hookform/resolvers/zod';
import { HardDriveUpload } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface IProps {
    isOpen: boolean;
    onOpenChange: (value: boolean) => void;
    imageUrl?: string;
    refetch: () => void;
}

const MAX_FILE_SIZE = 1000000;
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

export default function DialogChangeBusinessPicture({
    isOpen,
    onOpenChange,
    imageUrl,
    refetch,
}: IProps) {
    const { toast } = useToast();

    const { mutate, isPending } = useUpdateBusinessDocument({
        onSuccess: async (success) => {
            refetch();
            toast({
                description: success.data.message,
            });
            onOpenChange(false);
        },
        onError: (error) => {
            errorHelper(form.setError, error);
            toast({
                variant: 'destructive',
                description: error.response?.data.message,
            });
        },
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
    });

    async function onSubmit(data: z.infer<typeof formSchema>) {
        mutate({
            file: data.photo,
            type: 'image',
        });
    }

    const fileRef = form.register('photo');
    const result = form.watch(['photo']);
    const [filePreview] = useFilePreview(result[0]);

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Business Picture</DialogTitle>
                    <DialogDescription>
                        Upload your new business picture
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form>
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
                                                                : imageUrl
                                                                  ? imageUrl
                                                                  : '/icons/user.png'
                                                        }
                                                        width={200}
                                                    />{' '}
                                                    <div
                                                        className={`absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-full bg-neutral-800 bg-opacity-60 ${filePreview ? 'opacity-0 hover:opacity-100 ' : 'opacity-100 hover:opacity-100 '}  `}
                                                    >
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
                    </form>
                </Form>
                <DialogFooter>
                    <Button
                        onClick={() => onOpenChange(false)}
                        variant={'ghost'}
                    >
                        Cancel
                    </Button>
                    <Button
                        loading={isPending}
                        disabled={isPending || !fileRef}
                        onClick={form.handleSubmit(onSubmit)}
                        type="submit"
                    >
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

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
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useUpdateBusinessDocument } from '@/feature/business/useUpdateBusinessDocument';
import { errorHelper } from '@/lib/formErrorHelper';
import { zodResolver } from '@hookform/resolvers/zod';
import { File, Upload } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface IProps {
    isOpen: boolean;
    onOpenChange: (value: boolean) => void;
    refetch: () => void;
}

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ['application/pdf'];

const formSchema = z.object({
    vocational_license: z
        .any()
        .refine((files) => files?.length == 1, 'PDF file is required.')
        .refine(
            (files) => files?.[0]?.size <= MAX_FILE_SIZE,
            `Max file size is 500kb.`
        )
        .refine(
            (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
            'only accept PDF file.'
        ),
    vocational_license_name: z.string().optional(),
});

export default function DialogChangeBusinessAdditionalDocument({
    isOpen,
    onOpenChange,
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
            file: data.vocational_license,
            type: 'document',
        });
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        if (file && file.type === 'application/pdf') {
            form.setValue('vocational_license', e.target.files);
            form.setValue('vocational_license_name', file?.name);
        } else {
            alert('Please upload a valid PDF file.');
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Vocatioanl License</DialogTitle>
                    <DialogDescription>
                        Upload your vocational license
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form>
                        <div className="text-center">
                            <FormField
                                control={form.control}
                                name="vocational_license"
                                render={() => (
                                    <FormItem>
                                        <FormLabel className="flex items-end space-x-1 !font-light text-white">
                                            <File size={18} />
                                            <span>Business Licence</span>
                                        </FormLabel>
                                        <FormControl>
                                            <label
                                                htmlFor="pdf-upload"
                                                className="flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-xl border border-gray-500 transition-all hover:border-blue-500"
                                            >
                                                <Input
                                                    id="pdf-upload"
                                                    className="hidden"
                                                    type="file"
                                                    accept="application/pdf"
                                                    multiple={false}
                                                    onChange={handleFileChange}
                                                />
                                                <Upload className="h-8 w-8 text-gray-400" />
                                                <span className="mt-2 text-gray-400">
                                                    {form.getValues(
                                                        'vocational_license_name'
                                                    ) || 'Upload Licence'}
                                                </span>
                                            </label>
                                        </FormControl>
                                        <FormMessage />
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
                        disabled={
                            isPending || !form.getValues('vocational_license')
                        }
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

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
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useUpdateEmail } from '@/feature/user/profile';
import { errorHelper } from '@/lib/formErrorHelper';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleAlert } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface IProps {
    isOpen: boolean;
    onOpenChange: (value: boolean) => void;
    currentEmail?: string;
}

const formEmailSchema = z.object({
    email: z
        .string()
        .min(1, { message: 'Email is required' })
        .email({ message: 'Invalid Email' }),
});

export default function DialogChangeUserEmail({
    isOpen,
    onOpenChange,
    currentEmail,
}: IProps) {
    const { toast } = useToast();
    const { update } = useSession();
    const router = useRouter();
    async function onSubmitEmail(data: z.infer<typeof formEmailSchema>) {
        if (currentEmail !== data.email) {
            mutate(data.email);
        }
    }

    const formEmail = useForm<z.infer<typeof formEmailSchema>>({
        resolver: zodResolver(formEmailSchema),
        mode: 'onChange',
        defaultValues: {
            email: currentEmail,
        },
    });

    const { mutate, isPending } = useUpdateEmail({
        onSuccess: async (success) => {
            await update({
                email: formEmail.getValues().email,
            });
            toast({
                description: success.data.message,
            });
            router.refresh();
        },
        onError: (error) => {
            errorHelper(formEmail.setError, error);
            toast({
                variant: 'destructive',
                description: error.response?.data.message,
            });
        },
    });

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Email</DialogTitle>
                    <DialogDescription>Update your email</DialogDescription>
                </DialogHeader>
                <Form {...formEmail}>
                    <form onSubmit={formEmail.handleSubmit(onSubmitEmail)}>
                        <FormField
                            control={formEmail.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormControl>
                                        <Input placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center pt-2 text-sm italic text-gray-500">
                            <CircleAlert size={20} />
                            <span>Verify email once again, after update.</span>
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
                            isPending ||
                            currentEmail == formEmail.getValues('email')
                        }
                        onClick={formEmail.handleSubmit(onSubmitEmail)}
                        type="submit"
                    >
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

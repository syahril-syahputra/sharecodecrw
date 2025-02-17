'use client';
import { Button } from '@/components/ui/button';

import { CircleAlert, MinusCircle } from 'lucide-react';
import { Fragment, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { useAddhoneNumber } from '@/feature/business/useSendVerificationCode';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';

interface IProps {
    refetch: () => void;
}

const formSchema = z.object({
    code: z.string().min(1, {
        message: 'Please Insert your phone number',
    }),
    phone_number: z.string().min(1, {
        message: 'Please Insert your phone number',
    }),
});

export default function DialogChangePhoneNumber({ refetch }: IProps) {
    const { toast } = useToast();
    const [dialog, setDialog] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            code: '+1',
            phone_number: '',
        },
    });

    const {
        mutate: mutateVerifyPhoneNumber,
        isPending: isPendingVerifyPhoneNumber,
    } = useAddhoneNumber({
        onSuccess: (success) => {
            toast({
                description: success.data.message,
            });
            setDialog(false);
            refetch();
        },
        onError: (error) => {
            toast({
                variant: 'destructive',
                description: error.response?.data.message,
            });
        },
    });
    function verifyPhoneNumber(data: z.infer<typeof formSchema>) {
        mutateVerifyPhoneNumber({
            code: data.code,
            phone: 'userPhoneNumber',
        });
        refetch();
    }

    return (
        <Fragment>
            <button
                onClick={() => setDialog(true)}
                className="text-md flex cursor-pointer items-center rounded-full bg-gray-700 px-2 font-thin transition duration-100 hover:bg-gray-800"
            >
                Add Phone Number
                <MinusCircle size={18} className="ml-2 text-gray-900" />
            </button>
            <AlertDialog open={dialog} onOpenChange={setDialog}>
                <AlertDialogContent className="bg-gray-900 text-white sm:max-w-[425px]">
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Phone Number Verification
                        </AlertDialogTitle>
                    </AlertDialogHeader>
                    <div className="flex justify-center  ">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(verifyPhoneNumber)}
                                className="mx-auto space-y-6 text-center"
                            >
                                <div>
                                    <FormLabel className="!font-light text-white">
                                        Phone Number
                                    </FormLabel>
                                    <div className="mt-2 flex flex-1 items-start space-x-2">
                                        <FormField
                                            control={form.control}
                                            name="code"
                                            render={({ field }) => (
                                                <FormItem className="w-16">
                                                    <FormControl>
                                                        <Input
                                                            placeholder="+1"
                                                            readOnly
                                                            className="rounded-full border-white bg-transparent text-center text-white"
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
                                                            className="rounded-full border-white bg-transparent text-white"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="flex flex-1 items-center space-x-2 pt-2 text-sm text-gray-400">
                                        <CircleAlert size={18} />
                                        <span>
                                            Verify phone number after input new
                                            phone number
                                        </span>
                                    </div>
                                </div>
                            </form>
                        </Form>
                    </div>
                    <AlertDialogFooter>
                        <Button
                            onClick={() => setDialog(false)}
                            variant={'ghost'}
                        >
                            Cancel
                        </Button>
                        <Button
                            loading={isPendingVerifyPhoneNumber}
                            type="submit"
                            onClick={form.handleSubmit(verifyPhoneNumber)}
                        >
                            Submit
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Fragment>
    );
}

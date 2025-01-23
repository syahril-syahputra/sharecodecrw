'use client';
import { Button } from '@/components/ui/button';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import { Loader2, MinusCircle } from 'lucide-react';
import { Fragment, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import {
    useSendVerificationCode,
    useVerifyPhoneNumber,
} from '@/feature/business/useSendVerificationCode';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface IProps {
    refetch: () => void;
    userPhoneNumber: string;
}

const formSchema = z.object({
    verification_code: z.string().min(6, {
        message: 'Your verification code must be 6 characters.',
    }),
});

export default function DialogVerifyPhoneNumber({
    refetch,
    userPhoneNumber,
}: IProps) {
    const { toast } = useToast();
    const [dialog, setDialog] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            verification_code: '',
        },
    });

    const { mutate, isPending } = useSendVerificationCode({
        onSuccess: (success) => {
            toast({
                description: success.data.message,
            });
            setDialog(true);
        },
        onError: (error) => {
            toast({
                variant: 'destructive',
                description: error.response?.data.message,
            });
        },
    });

    const requestVerificationCode = () => {
        if (!userPhoneNumber) {
            toast({
                variant: 'destructive',
                description: 'Please input the correct phone number',
            });
            return;
        }
        mutate(userPhoneNumber);
    };

    const {
        mutate: mutateVerifyPhoneNumber,
        isPending: isPendingVerifyPhoneNumber,
    } = useVerifyPhoneNumber({
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
        if (data.verification_code.length < 6) {
            form.setError('verification_code', {
                type: 'custom',
                message: 'please input the correct code',
            });
            return;
        }
        mutateVerifyPhoneNumber({
            code: data.verification_code,
            phone: userPhoneNumber,
        });
        refetch();
    }

    return (
        <Fragment>
            {isPending ? (
                <button className="text-md flex items-center rounded-full bg-gray-700 px-2 font-thin">
                    verify phone number
                    <Loader2
                        size={18}
                        className="ml-2 animate-spin text-gray-900"
                    />
                </button>
            ) : (
                <button
                    onClick={() => requestVerificationCode()}
                    className="text-md flex cursor-pointer items-center rounded-full bg-gray-700 px-2 font-thin transition duration-100 hover:bg-gray-800"
                >
                    verify phone number
                    <MinusCircle size={18} className="ml-2 text-gray-900" />
                </button>
            )}
            <AlertDialog open={dialog} onOpenChange={setDialog}>
                <AlertDialogContent className="sm:max-w-[425px]">
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Phone Number Verification
                        </AlertDialogTitle>
                    </AlertDialogHeader>
                    <div className="flex justify-center">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(verifyPhoneNumber)}
                                className="mx-auto space-y-6 text-center"
                            >
                                <FormField
                                    control={form.control}
                                    name="verification_code"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <InputOTP
                                                    maxLength={6}
                                                    {...field}
                                                    className="!flex !justify-center"
                                                >
                                                    <InputOTPGroup>
                                                        <InputOTPSlot
                                                            index={0}
                                                        />
                                                        <InputOTPSlot
                                                            index={1}
                                                        />
                                                        <InputOTPSlot
                                                            index={2}
                                                        />
                                                    </InputOTPGroup>
                                                    <InputOTPSeparator />
                                                    <InputOTPGroup>
                                                        <InputOTPSlot
                                                            index={3}
                                                        />
                                                        <InputOTPSlot
                                                            index={4}
                                                        />
                                                        <InputOTPSlot
                                                            index={5}
                                                        />
                                                    </InputOTPGroup>
                                                </InputOTP>
                                            </FormControl>
                                            <FormDescription className="text-center text-gray-500">
                                                Please enter the verification
                                                code sent to your phone.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
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

'use client';
import { Button } from '@/components/ui/button';

import { Fragment, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useDeletePhoneNumber } from '@/feature/user/profile';

interface IProps {
    refetch: () => void;
    userPhoneNumber?: string;
}

export default function DialogDeletePhoneNumber({ refetch }: IProps) {
    const { toast } = useToast();
    const [dialog, setDialog] = useState(false);

    const { mutate, isPending } = useDeletePhoneNumber({
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
    function deletePhoneNumber() {
        mutate();
        refetch();
    }

    return (
        <Fragment>
            <button
                onClick={() => setDialog(true)}
                className="text-md flex cursor-pointer items-center rounded-full bg-red-700 px-4 font-thin transition duration-100 hover:bg-gray-800"
            >
                Delete Phone Number
            </button>
            <AlertDialog open={dialog} onOpenChange={setDialog}>
                <AlertDialogContent className="bg-gray-900 text-white sm:max-w-[425px]">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Phone Number</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogDescription className="text-white">
                        Are you sure you want to delete the attached mobile
                        number?
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                        <Button
                            onClick={() => setDialog(false)}
                            variant={'ghost'}
                        >
                            Cancel
                        </Button>
                        <Button
                            loading={isPending}
                            type="submit"
                            variant={'destructive'}
                            onClick={deletePhoneNumber}
                        >
                            Yes, Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Fragment>
    );
}

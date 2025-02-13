import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Fragment, useState } from 'react';
import { useDeleteListing } from '@/feature/business/useDeleteListing';
import { useToast } from '@/components/ui/use-toast';

export default function DeleteListing(props: { id?: string | undefined }) {
    const { toast } = useToast();
    const [dialog, setDialog] = useState(false);

    const { mutate, isPending } = useDeleteListing({
        onSuccess: (success) => {
            setDialog(false);
            toast({
                description: success.data.message,
            });
        },
        onError: (error) => {
            toast({
                variant: 'destructive',
                description: error.response?.data.message,
            });
        },
        id: props.id,
    });

    return (
        <Fragment>
            <Button
                variant={'destructive'}
                loading={isPending}
                onClick={() => setDialog(true)}
            >
                {/* <Trash className="mr-2" /> */}
                Delete
            </Button>
            <AlertDialog open={dialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete</AlertDialogTitle>
                        <AlertDialogDescription>
                            <span className="italic">
                                Delete listing, this action cannot be undone
                            </span>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setDialog(false)}>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            disabled={isPending}
                            className="bg-destructive"
                            onClick={() => mutate(props.id!)}
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Fragment>
    );
}

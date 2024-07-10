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
import { Fragment, useState } from 'react';
import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDeleteEvent } from '@/feature/events/useDeleteEvent';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

export default function DeleteEvent(props: { id?: string | undefined }) {
    const router = useRouter();
    const { toast } = useToast();

    // Delete
    const [deleteDialog, setDeleteDialog] = useState(false);
    const { mutate, isPending } = useDeleteEvent({
        onSuccess: () => {
            toast({
                variant: 'success',
                description: 'Event has been deleted',
            });
            router.replace('/user/crowner/events');
        },
        onError: (error) => {
            toast({
                variant: 'destructive',
                description: error.message,
            });
        },
    });
    const deleteHandler = () => {
        setDeleteDialog(false);
        mutate(props.id || '');
    };

    return (
        <Fragment>
            <Button
                size={'sm'}
                variant={'destructive'}
                loading={isPending}
                onClick={() => setDeleteDialog(true)}
            >
                <Trash className="mr-2" />
                Delete
            </Button>
            <AlertDialog open={deleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Event?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            onClick={() => setDeleteDialog(false)}
                        >
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={deleteHandler}>
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Fragment>
    );
}

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
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { useDeleteCommunityTutor } from '@/feature/crowner/community-tutors/useDeleteCommunityTutor';

export default function DeleteCommunityTutor(props: { id?: string | undefined }) {
    const router = useRouter();
    const { toast } = useToast();

    // Delete
    const [deleteDialog, setDeleteDialog] = useState(false);
    const { mutate, isPending } = useDeleteCommunityTutor({
        onSuccess: (success) => {
            toast({
                title: 'Delete Success',
                variant: 'success',
                description: success.data.message,
            });
            router.replace('/crowner/community-tutors');
        },
        onError: (error) => {
            toast({
                title: 'Delete Failed',
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
                        <AlertDialogTitle>Delete Community Tutor?</AlertDialogTitle>
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

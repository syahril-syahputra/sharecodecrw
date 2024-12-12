'use client';
import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import ErrorMessage from '../../Error/ErrorMessage';
import { useToast } from '@/components/ui/use-toast';
import { useDeleteQa } from '@/feature/qa/useDeleteQa';
import { RefetchOptions } from '@tanstack/react-query';

export default function DialogDelete(props: {
    open: boolean;
    id: string;
    refetch: (option?: RefetchOptions | undefined) => void;
    setOpen: (arg: boolean) => void;
}) {
    const { toast } = useToast();

    const [error, seterror] = useState('');
    const { mutate, isPending } = useDeleteQa({
        onSuccess: (s) => {
            seterror('');
            toast({
                title: 'Delete Succeed',
                description: s.data.message,
            });
            props.setOpen(false);
            props.refetch();
        },
        onError: (e) => {
            seterror(e.response?.data?.message || e.message);
        },
    });

    const closeDialog = () => {
        props.setOpen(false);
    };
    const sendReport = () => {
        seterror('');
        mutate(props.id);
    };
    return (
        <Dialog open={props.open} onOpenChange={closeDialog}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete</DialogTitle>
                    <DialogDescription>
                        This action can not be undone, are you sure to delete
                        your comment?
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-center space-x-4">
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    <Button loading={isPending} onClick={sendReport}>
                        Yes, Delete
                    </Button>
                    <Button
                        variant={'ghost'}
                        disabled={isPending}
                        onClick={closeDialog}
                    >
                        No, Cancel
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

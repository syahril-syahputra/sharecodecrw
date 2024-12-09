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
import { useFetchReportReason } from '@/feature/report/useFetchReportReason';
import { useCreateReport } from '@/feature/report/useCreateReport';
import ErrorMessage from '../../Error/ErrorMessage';
import { useToast } from '@/components/ui/use-toast';
export default function DialogDelete(props: {
    open: boolean;
    entityId: string;
    entityType: 'crowners' | 'question_answers';
    entitySubType?: 'events' | 'communities' | 'community-tutors';
    setOpen: (arg: boolean) => void;
}) {
    const { toast } = useToast();

    const [error, seterror] = useState('');
    const { mutate, isPending } = useCreateReport({
        onSuccess: () => {
            seterror('');
            toast({
                title: 'Report success',
                description: 'your report has been send!',
            });
            props.setOpen(false);
        },
        onError: (e) => {
            seterror(e.response?.data?.message || e.message);
        },
    });

    const closeDialog = () => {
        props.setOpen(false);
    };
    const sendReport = () => {
        alert('deleted');
        // seterror('');
        // mutate({
        //     entity_id: props.entityId,
        //     message: reason === 'Other' ? otherReason : reason,
        //     entity_type: props.entityType,
        //     entity_sub_type: props.entitySubType,
        // });
    };
    return (
        <Dialog open={props.open} onOpenChange={closeDialog}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete</DialogTitle>
                    <DialogDescription className="text-center">
                        This action can not be undone, are you sure to delete
                        your comment?
                    </DialogDescription>
                </DialogHeader>
                <div className="space-x-4 text-center">
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    <Button loading={isPending} onClick={sendReport}>
                        Yes, Delete
                    </Button>
                    <Button
                        variant={'secondary'}
                        loading={isPending}
                        onClick={closeDialog}
                    >
                        No, Cancel
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

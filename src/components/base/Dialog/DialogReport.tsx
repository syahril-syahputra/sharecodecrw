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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useFetchReportReason } from '@/feature/report/useFetchReportReason';
import { Input } from '@/components/ui/input';
import { useCreateReport } from '@/feature/report/useCreateReport';
import ErrorMessage from '../Error/ErrorMessage';
import { useToast } from '@/components/ui/use-toast';
import { IReport } from '@/types/report';
export default function DialogReport(props: {
    open: boolean;
    entityId: string;
    entityType: IReport['entityType'];
    entitySubType?: IReport['entitySubType'];
    setOpen: (arg: boolean) => void;
}) {
    const { toast } = useToast();
    const [reason, setreason] = useState('');
    const [otherReason, setotherReason] = useState('');

    const { data: dataReason } = useFetchReportReason();
    const [error, seterror] = useState('');
    const { mutate, isPending } = useCreateReport({
        onSuccess: (s) => {
            seterror('');
            setreason('');
            setotherReason('');
            toast({
                title: 'Report success',
                description: s.data.message || 'Your report has been sent!',
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
        seterror('');
        if (!reason) {
            seterror('Please select reason!');
            return;
        }
        if (reason === 'Other' && !otherReason) {
            seterror('Please insert reason!');
            return;
        }
        mutate({
            entity_id: props.entityId,
            message: reason === 'Other' ? otherReason : reason,
            entity_type: props.entityType,
            entity_sub_type: props.entitySubType,
        });
    };
    return (
        <Dialog open={props.open} onOpenChange={closeDialog}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Report</DialogTitle>
                    <DialogDescription>
                        Please select reason you report this!
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <Select
                        value={reason}
                        onValueChange={(e) => {
                            seterror('');
                            setotherReason('');
                            setreason(e);
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select Reason" />
                        </SelectTrigger>

                        <SelectContent>
                            {dataReason?.map((item) => (
                                <SelectItem key={item.id} value={item.label}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {reason === 'Other' && (
                        <Input
                            value={otherReason}
                            placeholder="Insert Reason"
                            onChange={(e) => setotherReason(e.target.value)}
                        />
                    )}
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    <Button loading={isPending} onClick={sendReport}>
                        Send Report
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Share } from 'lucide-react';
import { IDetailEvent } from '@/types/events';
import { useToogleInterest } from '@/feature/crowner/subscriber/events/useToogleInterest';
import { useReserveEvent } from '@/feature/crowner/subscriber/events/useReserveEvent';
import {
    Dialog,
    DialogContent,
    // DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import ShareBox from '@/components/base/Share/ShareBox';

export default function EventAction(props: { data: IDetailEvent }) {
    const { mutate: mutateInterest, isPending: isePendingInterest } =
        useToogleInterest({
            onSuccess: () => {},
            onError: () => {},
        });
    const { mutate: mutateReserve, isPending: isPendingReserve } =
        useReserveEvent({
            onSuccess: () => {},
            onError: () => {},
        });

    return (
        <div className="flex items-center space-x-2">
            <Button
                loading={isePendingInterest}
                onClick={() => mutateInterest(props.data.id)}
                className="bg-interest hover:bg-interest-foreground"
            >
                Interest
            </Button>
            <Button
                loading={isPendingReserve}
                onClick={() => mutateReserve(props.data.id)}
            >
                RSVP
            </Button>

            <Dialog>
                <DialogTrigger asChild>
                    <Button variant={'ghost'}>
                        <Share size={16} className="mr-2" />
                        Share
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Share</DialogTitle>
                        {/* <DialogDescription>testing Share</DialogDescription> */}
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <ShareBox about={props.data.about} />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

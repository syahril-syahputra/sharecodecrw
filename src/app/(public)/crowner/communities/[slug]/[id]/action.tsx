'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Share } from 'lucide-react';
import { useToogleInterest } from '@/feature/crowner/subscriber/events/useToogleInterest';
import {
    Dialog,
    DialogContent,
    // DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import ShareBox from '@/components/base/Share/ShareBox';
import { IDetailCommunity } from '@/types/community';

export default function EventAction(props: { data: IDetailCommunity }) {
    const { mutate: mutateInterest, isPending: isePendingInterest } =
        useToogleInterest({
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

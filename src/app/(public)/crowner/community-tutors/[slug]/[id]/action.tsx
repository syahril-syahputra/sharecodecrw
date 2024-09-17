'use client';
import React, { useState } from 'react';
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
import { ICommunityTutor } from '@/types/crowner/community-tutors';
import { useSession } from 'next-auth/react';
import Report from '@/components/base/report';
import DialogLoginRequired from '@/components/base/Dialog/DialogLoginRequired';
import { useToast } from '@/components/ui/use-toast';

export default function EventAction(props: { data: ICommunityTutor }) {
    const { toast } = useToast();
    const { status } = useSession();
    const [isOpen, setisOpen] = useState(false);
    const isLogin = status === 'authenticated';
    const { mutate: mutateInterest, isPending: isePendingInterest } =
        useToogleInterest({
            onSuccess: (data) => {
                toast({
                    description: data.data.message,
                });
            },
            onError: () => {},
        });

    return (
        <div className="flex items-center space-x-2">
            <Button
                loading={isePendingInterest}
                onClick={() =>
                    isLogin ? mutateInterest(props.data.id) : setisOpen(true)
                }
                className="bg-interest hover:bg-interest-foreground"
            >
                Interest
            </Button>
            <DialogLoginRequired
                title="Sign in to follow community tutor"
                isOpen={isOpen}
                onOpenChange={(value) => setisOpen(value)}
            />

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
            <Report entityId={props.data.id} entityType="crowners" />
        </div>
    );
}

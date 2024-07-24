'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Share } from 'lucide-react';
import { IDetailEvent } from '@/types/events';
import { useToogleInterest } from '@/feature/crowner/subscriber/events/useToogleInterest';
import { useReserveEvent } from '@/feature/crowner/subscriber/events/useReserveEvent';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    // DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import ShareBox from '@/components/base/Share/ShareBox';
import { useSession } from 'next-auth/react';
import { DialogDescription } from '@radix-ui/react-dialog';
import Link from 'next/link';
import Report from '@/components/base/report';

export default function EventAction(props: { data: IDetailEvent }) {
    const { status } = useSession();
    const [isOpen, setisOpen] = useState(false);
    const [isOpenRSVP, setisOpenRSVP] = useState(false);
    const isLogin = status === 'authenticated';
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
                onClick={() =>
                    isLogin ? mutateInterest(props.data.id) : setisOpen(true)
                }
                className="bg-interest hover:bg-interest-foreground"
            >
                Interest
            </Button>
            <Button
                loading={isPendingReserve}
                onClick={() =>
                    isLogin ? mutateReserve(props.data.id) : setisOpenRSVP(true)
                }
            >
                RSVP
            </Button>
            <Dialog open={isOpen} onOpenChange={(value) => setisOpen(value)}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Sign in</DialogTitle>
                        <DialogDescription>
                            Sign in to interest event
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Link href="/auth/login">
                            <Button type="submit">Sign in</Button>
                        </Link>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Dialog
                open={isOpenRSVP}
                onOpenChange={(value) => setisOpenRSVP(value)}
            >
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Sign in</DialogTitle>
                        <DialogDescription>
                            Sign in to RSVP Event
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Link href="/auth/login">
                            <Button type="submit">Sign in</Button>
                        </Link>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
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

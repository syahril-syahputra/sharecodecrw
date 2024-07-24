'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Share } from 'lucide-react';
import { useToogleInterest } from '@/feature/crowner/subscriber/events/useToogleInterest';
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
import { ICommunityTutor } from '@/types/crowner/community-tutors';
import { useSession } from 'next-auth/react';
import { DialogDescription } from '@radix-ui/react-dialog';
import Link from 'next/link';
import Report from '@/components/base/report';

export default function EventAction(props: { data: ICommunityTutor }) {
    const { status } = useSession();
    const [isOpen, setisOpen] = useState(false);
    const isLogin = status === 'authenticated';
    const { mutate: mutateInterest, isPending: isePendingInterest } =
        useToogleInterest({
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
            <Dialog open={isOpen} onOpenChange={(value) => setisOpen(value)}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Sign in</DialogTitle>
                        <DialogDescription>
                            Sign in to follow community tutor
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

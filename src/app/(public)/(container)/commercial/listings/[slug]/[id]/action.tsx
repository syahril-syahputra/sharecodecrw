'use client';
import DialogLoginRequired from '@/components/base/Dialog/DialogLoginRequired';
import ShareBox from '@/components/base/Share/ShareBox';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { useToggleCommercialListingInterest } from '@/feature/commercial/listing/useToogleInterest';
import { ICommercialListing } from '@/types/commercial/listings';
import { Share } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Report from '@/components/base/report';

export default function CommercialAction(props: { data: ICommercialListing }) {
    const { toast } = useToast();
    const { status } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const isLogin = status === 'authenticated';
    const { mutate, isPending } = useToggleCommercialListingInterest({
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
                loading={isPending}
                onClick={() =>
                    isLogin ? mutate(props.data.id) : setIsOpen(true)
                }
                className="bg-interest hover:bg-interest-foreground"
            >
                Interest
            </Button>

            <DialogLoginRequired
                title="Sign in to follow community"
                isOpen={isOpen}
                onOpenChange={(value) => setIsOpen(value)}
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
            <Report
                entityId={props.data.id}
                entityType="commercial_listings"
                entitySubType={null}
            />
        </div>
    );
}

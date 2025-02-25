'use client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useRateBusiness } from '@/feature/rate/useRateBusiness';
import { Star } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { Fragment, useState } from 'react';
import DialogLoginRequired from '../Dialog/DialogLoginRequired';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogAction,
} from '@/components/ui/alert-dialog';

export default function RateBusiness({
    businessId,
    rate,
    variant = 'default',
}: {
    businessId: string;
    rate: number;
    variant?: 'default' | 'blue';
}) {
    const { toast } = useToast();
    const { status } = useSession();
    const [isOpen, setIsModalLogin] = useState(false);

    const isLogin = status === 'authenticated';
    const { mutate, isPending } = useRateBusiness({
        id: businessId,
        onSuccess: (data) => {
            toast({ description: data.data.message });
        },
        onError: (data) => {
            toast({
                variant: 'destructive',
                description: data.message,
            });
        },
    });

    const [isRateModal, setIsRateModal] = useState(false);
    const [giveNewRate, setGiveNewRate] = useState<number>(0);
    const [hoveredStar, setHoveredStar] = useState<number>(0);
    const handleMouseLeave = () => {
        setHoveredStar(0);
    };
    const handleMouseEnter = (value: number) => {
        setHoveredStar(value);
    };
    const handleClick = (value: number) => {
        setGiveNewRate(value);
    };
    const giveRateHandler = () => {
        mutate(giveNewRate);
        setGiveNewRate(0);
    };

    return (
        <Fragment>
            <DialogLoginRequired
                title="Sign in to give a rating"
                isOpen={isOpen}
                onOpenChange={(value) => setIsModalLogin(value)}
            />

            <AlertDialog open={isRateModal} onOpenChange={setIsRateModal}>
                <AlertDialogContent className="sm:max-w-[425px]">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Rate</AlertDialogTitle>
                        <AlertDialogDescription>
                            Give your rating!
                        </AlertDialogDescription>

                        <div className="flex justify-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    size={50}
                                    onMouseEnter={() => handleMouseEnter(star)}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={() => handleClick(star)}
                                    fill={
                                        star <= (hoveredStar || giveNewRate)
                                            ? '#258AD8'
                                            : '#888888'
                                    }
                                    strokeWidth={0}
                                />
                            ))}
                        </div>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            className="rounded-xl border-0"
                            onClick={() => setIsRateModal(false)}
                        >
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            className="rounded-xl"
                            disabled={isPending}
                            onClick={() => giveRateHandler()}
                        >
                            Rate!
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            {variant == 'default' && (
                <Button
                    className="rounded-full bg-accent p-2"
                    onClick={() =>
                        isLogin ? setIsRateModal(true) : setIsModalLogin(true)
                    }
                >
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Fragment key={star}>
                            {star <= rate && (
                                <Star fill="white" strokeWidth={0} />
                            )}

                            {star > rate && <Star />}
                        </Fragment>
                    ))}
                </Button>
            )}
            {variant == 'blue' && (
                <Button
                    size={'sm'}
                    className="rounded-full bg-primary"
                    onClick={() =>
                        isLogin ? setIsRateModal(true) : setIsModalLogin(true)
                    }
                >
                    <Star size={18} className="mr-2" />
                    Rate
                </Button>
            )}
        </Fragment>
    );
}

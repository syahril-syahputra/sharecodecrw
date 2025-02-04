'use client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useStartConversation } from '@/feature/chat/useStartConversation';
import { MessageCircle } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { Fragment, useState } from 'react';
import DialogLoginRequired from '../Dialog/DialogLoginRequired';
import { useRouter } from 'next/navigation';

export default function StartConversation({
    businessId,
}: {
    businessId: string;
}) {
    const { toast } = useToast();
    const { status } = useSession();
    const [isOpen, setIsModalLogin] = useState(false);
    const router = useRouter();

    const isLogin = status === 'authenticated';
    const { mutate, isPending } = useStartConversation({
        onSuccess: (data) => {
            toast({ description: data.data.message });
            router.push(`//user/direct-chats/room/${data.data.data.id}`);
        },
        onError: (data) => {
            toast({
                variant: 'destructive',
                description: data.message,
            });
        },
    });

    const handleStartConversation = () => {
        mutate(businessId);
    };
    return (
        <Fragment>
            <DialogLoginRequired
                title="Sign in to send a message"
                isOpen={isOpen}
                onOpenChange={(value) => setIsModalLogin(value)}
            />
            <Button
                className="rounded-full"
                loading={isPending}
                onClick={() =>
                    isLogin ? handleStartConversation() : setIsModalLogin(true)
                }
            >
                {!isPending && <MessageCircle className="mr-2" />}
                Message Us
            </Button>
        </Fragment>
    );
}

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { useFetchNotificationCounter } from '@/feature/notification/useFetchNotificationCounter';
import clsx from 'clsx';
import { Bell } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Notification from './Notification';
import { messaging } from '@/lib/firebase-config';
import useFCMToken from '@/lib/hooks/useFCMToken';
import { onMessage } from 'firebase/messaging';
import { useMarkAllAsRead } from '@/feature/notification/useMarkAllAsRead';

export default function ButtonNotification() {
    const fcmToken = useFCMToken();

    const [open, setopen] = useState(false);
    const { data: notificationCOunter, status } = useFetchNotificationCounter();
    const [notification, setnotification] = useState(0);

    useEffect(() => {
        if (status === 'success') {
            setnotification(notificationCOunter);
        }
    }, [status]);

    useEffect(() => {
        if ('serviceWorker' in navigator) {
            const fcmmessaging = messaging();
            const unsubscribe = onMessage(fcmmessaging, () => {
                console.log('notification ini ' + notification);
                setnotification(
                    (prevNotification) => (prevNotification || 0) + 1
                );
            });
            return () => unsubscribe();
        }
    }, [fcmToken]);

    const { mutate } = useMarkAllAsRead({
        onSuccess: () => {},
        onError: () => {},
    });

    const onOpenChange = (val: boolean) => {
        setopen(val);
        if (val) {
            setnotification(0);
        } else {
            mutate();
        }
    };

    return (
        <Popover open={open} onOpenChange={onOpenChange}>
            <PopoverTrigger
                asChild
                className="relative hover:cursor-pointer hover:text-primary"
            >
                <div>
                    <Bell className="hover:cursor-pointer hover:text-primary" />
                    <div
                        className={clsx(
                            'absolute -bottom-1 -right-1 rounded-full bg-primary px-1 py-0.5 text-xs font-bold text-white',
                            notification ? 'visible' : 'invisible'
                        )}
                    >
                        {notification}
                    </div>
                </div>
            </PopoverTrigger>
            <PopoverContent className="max-h-[90vh] w-96 overflow-x-hidden overflow-y-scroll p-0">
                <Notification />
            </PopoverContent>
        </Popover>
    );
}

'use client';
import { useEffect, useState } from 'react';

const useNotificationPermission = () => {
    const [permission, setPermission] =
        useState<NotificationPermission>('default');

    useEffect(() => {
        const handler = () => setPermission(Notification.permission);
        handler();
        Notification.requestPermission().then(handler);
        if (navigator.permissions && navigator.permissions.query) {
            navigator.permissions
                .query({ name: 'notifications' })
                .then((notificationPerm) => {
                    notificationPerm.onchange = handler;
                });
        }
    }, []);

    return permission;
};

export default useNotificationPermission;

import fetchClient from '@/lib/FetchClient';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useFetchNotificationCounter = () => {
    return useQuery({
        queryFn: async () => {
            const baseUrl = `/notifications/unread-counters`;
            const response = await fetchClient({
                url: baseUrl,
            });
            return response.data.data as number;
        },
        queryKey: ['fetch.notificationCounter'],
        placeholderData: keepPreviousData,
    });
};

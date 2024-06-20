import fetchClient from '@/lib/FetchClient';
import { ITimeZone } from '@/types/base/timezone';
import { useQuery } from '@tanstack/react-query';

export const useFetchTimezone = () => {
    return useQuery({
        queryFn: async () => {
            const response = await fetchClient({
                url: '/region/timezones',
            });
            return response.data.data as ITimeZone[];
        },
        queryKey: ['fetch.timezone'],
    });
};

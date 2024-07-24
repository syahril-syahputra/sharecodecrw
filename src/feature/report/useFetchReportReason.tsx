import fetchClient from '@/lib/FetchClient';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useFetchReportReason = () => {
    return useQuery({
        queryFn: async () => {
            const response = await fetchClient({
                url: '/reports/reasons',
            });
            return response.data.data as { id: string; label: string }[];
        },
        queryKey: ['fetch.reportreason'],
        placeholderData: keepPreviousData,
    });
};

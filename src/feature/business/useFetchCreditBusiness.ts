import fetchClient from '@/lib/FetchClient';
import { useQuery } from '@tanstack/react-query';

export const useFetchCreditBusiness = () => {
    return useQuery({
        queryFn: async () => {
            const baseUrl = `/businesses/publisher/credits`;
            const response = await fetchClient({
                url: baseUrl,
            });
            return response.data.data as number;
        },
        queryKey: ['fetch.creditbusiness'],
    });
};

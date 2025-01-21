import fetchClient from '@/lib/FetchClient';
import { IPlan } from '@/types/base/plans';
import { useQuery } from '@tanstack/react-query';

export const useFetchPlans = () => {
    return useQuery({
        queryFn: async () => {
            const response = await fetchClient({
                url: '/businesses/plans',
            });
            return response.data.data as IPlan[];
        },
        queryKey: ['fetch.businesses-plans'],
    });
};

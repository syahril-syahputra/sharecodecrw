import fetchClient from '@/lib/FetchClient';
import { IBusiness } from '@/types/user';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useFetchBusiness = () => {
    return useQuery({
        queryFn: async () => {
            const response = await fetchClient({
                url: '/businesses/profiles',
            });

            return response.data.data as IBusiness;
        },
        queryKey: ['fetch.business-detail'],
        placeholderData: keepPreviousData,
    });
};

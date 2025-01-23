import fetchClient from '@/lib/FetchClient';
import { ICategory } from '@/types/base/category';
import { useQuery } from '@tanstack/react-query';

export const useFetchCategory = () => {
    return useQuery({
        queryFn: async () => {
            const response = await fetchClient({
                url: '/businesses/services',
            });
            return response.data.data as ICategory[];
        },
        queryKey: ['fetch.commercialService'],
    });
};

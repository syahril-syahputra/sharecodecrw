import fetchClient from '@/lib/FetchClient';
import { CommercialService } from '@/types/base/commercial-service';
import { useQuery } from '@tanstack/react-query';

export const useFetchCommercialServices = () => {
    return useQuery({
        queryFn: async () => {
            const response = await fetchClient({
                url: '/commercials/services',
            });
            return response.data.data as CommercialService[];
        },
        queryKey: ['fetch.commercialService'],
    });
};

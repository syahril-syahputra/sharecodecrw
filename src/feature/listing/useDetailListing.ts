import fetchClient from '@/lib/FetchClient';
import { IDetailListing } from '@/types/listing';
import { useQuery } from '@tanstack/react-query';

export const useDetailListing = (id?: string) => {
    return useQuery({
        queryFn: async () => {
            const response = await fetchClient({
                url: `/businesses/publisher/listings/${id || ''}`,
            });
            return response.data.data as IDetailListing;
        },
        refetchOnWindowFocus: false,
        queryKey: ['detail.listing', id],
    });
};

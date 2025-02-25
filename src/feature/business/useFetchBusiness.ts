import fetchClient from '@/lib/FetchClient';
import { IBusiness } from '@/types/user';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export const useFetchBusiness = () => {
    const { update } = useSession();
    return useQuery({
        queryFn: async () => {
            const response = await fetchClient({
                url: '/businesses/profiles',
            });
            const result = response.data.data as IBusiness;
            await update({
                profile_picture_url: result.image_url,
            });
            return result;
        },
        queryKey: ['fetch.business-detail'],
        placeholderData: keepPreviousData,
    });
};

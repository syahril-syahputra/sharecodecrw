import fetchClient from '@/lib/FetchClient';
import { DataCity, DataState } from '@/types/base/city';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useFetchState = () => {
    return useQuery({
        queryFn: async () => {
            const response = await fetchClient({
                url: '/region/' + process.env.NEXT_PUBLIC_COUNTRY + '/states',
            });
            return response.data.data as DataState[];
        },
        queryKey: ['fetch.state'],
        placeholderData: keepPreviousData,
    });
};
export const useFetchCity = (stateId: string, onSuccess: () => void) => {
    return useQuery({
        queryFn: async () => {
            const response = await fetchClient({
                url: '/region/' + stateId + '/cities',
            });
            onSuccess();
            return response.data.data as DataCity[];
        },

        queryKey: ['fetch.city', stateId],
        placeholderData: keepPreviousData,
    });
};

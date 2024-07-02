import fetchClient from '@/lib/FetchClient';
import { IInterest } from '@/types/base/interest';
import { useQuery } from '@tanstack/react-query';

export const useFetchInterest = (onSuccess: (data: IInterest[]) => void) => {
    return useQuery({
        queryFn: async () => {
            const response = await fetchClient({
                url: '/tags',
            });
            onSuccess(response.data.data as IInterest[]);
            return response.data.data as IInterest[];
        },
        queryKey: ['fetch.interest'],
        refetchOnWindowFocus: false,
    });
};

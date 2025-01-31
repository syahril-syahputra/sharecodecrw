import fetchClient from '@/lib/FetchClient';
import { useQuery } from '@tanstack/react-query';

export interface IDuration {
    id: string;
    name: string;
    price: number;
    credits: number;
    duration: number;
}
export const useFetchDuration = () => {
    return useQuery({
        queryFn: async () => {
            const response = await fetchClient({
                url: '/businesses/durations',
            });
            return response.data.data as IDuration[];
        },
        queryKey: ['fetch.duration'],
    });
};

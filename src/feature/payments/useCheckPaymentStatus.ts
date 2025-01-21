import { useQuery } from "@tanstack/react-query";
import fetchClient from '@/lib/FetchClient';

export const useCheckPaymentStatus = (id: string) => {
    return useQuery({
        queryFn: async () => {
            const response = await fetchClient({
                url: `/payments/verify?session_id=` + id
            });

            return response;
        },
        queryKey: ["fetch.success-payment"],
        retry: 0,
        refetchOnWindowFocus: false,
    });
};
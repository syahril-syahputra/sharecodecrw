import fetchClient from '@/lib/FetchClient';
import { IError, ISuccess } from '@/types/error';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useSession } from 'next-auth/react';

export const useFetchCreditBusiness = () => {
    const { update } = useSession();
    return useQuery({
        queryFn: async () => {
            const baseUrl = `/businesses/publisher/credits`;
            const response = await fetchClient({
                url: baseUrl,
            });

            const result = response.data.data as string;
            await update({
                credit: result,
            });
            return result;
        },
        queryKey: ['fetch.creditbusiness'],
    });
};

export const useRefreshCreditBusiness = ({
    onSuccess,
    onError,
}: {
    onSuccess: (success: AxiosResponse<ISuccess>) => void;
    onError: (error: AxiosError<IError>) => void;
}) => {
    const { update } = useSession();
    return useMutation({
        mutationFn: async () => {
            const baseUrl = `/businesses/publisher/credits`;
            const response = await fetchClient({
                url: baseUrl,
            });

            const result = response.data.data as string;
            await update({
                credit: result,
            });
            return response;
        },
        onSuccess: onSuccess,
        onError: onError,
    });
};

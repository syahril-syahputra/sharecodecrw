import fetchClient from '@/lib/FetchClient';
import { IError, ISuccess } from '@/types/error';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

export const useDeleteListing = ({
    onSuccess,
    onError,
}: {
    onSuccess: (success: AxiosResponse<ISuccess>) => void;
    onError: (error: AxiosError<IError>) => void;
    id: string | undefined;
}) => {
    return useMutation({
        mutationFn: async (id: string) => {
            const response = await fetchClient({
                method: 'DELETE',
                url: `/businesses/publisher/listings/${id}`,
            });
            return response;
        },
        onSuccess: onSuccess,
        onError: onError,
    });
};

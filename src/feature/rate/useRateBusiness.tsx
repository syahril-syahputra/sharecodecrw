import fetchClient from '@/lib/FetchClient';
import { IError } from '@/types/error';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

interface IProps {
    id: string;
    onSuccess: (data: AxiosResponse) => void;
    onError: (error: AxiosError<IError>) => void;
}
export const useRateBusiness = ({ id, onSuccess, onError }: IProps) => {
    return useMutation({
        mutationFn: async (rate: number) => {
            const response = await fetchClient({
                method: 'POST',
                url: `/businesses/rate/${id}`,
                body: {
                    rate
                }
            });

            return response;
        },
        onError: onError,
        onSuccess: onSuccess,
    });
};

import fetchClient from '@/lib/FetchClient';
import { IError } from '@/types/error';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

interface IProps {
    onSuccess: (data: AxiosResponse) => void;
    onError: (error: AxiosError<IError>) => void;
}
export const useToogleInterest = ({ onSuccess, onError }: IProps) => {
    return useMutation({
        mutationFn: async (id: string) => {
            const response = await fetchClient({
                method: 'POST',
                url: `/crowner/user-subscriber/toggle-interests/${id}`,
            });

            return response;
        },
        onError: onError,
        onSuccess: onSuccess,
    });
};

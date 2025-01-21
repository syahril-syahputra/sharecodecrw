import fetchClient from '@/lib/FetchClient';
import { IError } from '@/types/error';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

interface IProps {
    onSuccess: (data: AxiosResponse) => void;
    onError: (error: AxiosError<IError>) => void;
}
export const useBuyPlan = ({ onSuccess, onError }: IProps) => {
    return useMutation({
        mutationFn: async (body: { plan_id: string; qty: number }) => {
            const response = await fetchClient({
                method: 'POST',
                url: '/businesses/publisher/plans',
                body,
            });

            return response;
        },
        onError: onError,
        onSuccess: onSuccess,
    });
};

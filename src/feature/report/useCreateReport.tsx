import fetchClient from '@/lib/FetchClient';
import { IError } from '@/types/error';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

interface IProps {
    onSuccess: (data: AxiosResponse) => void;
    onError: (error: AxiosError<IError>) => void;
}
export const useCreateReport = ({ onSuccess, onError }: IProps) => {
    return useMutation({
        mutationFn: async (body: {
            entity_id: string;
            entity_type: string;
            message: string;
        }) => {
            const response = await fetchClient({
                method: 'POST',
                url: `/reports/entities`,
                body: body,
            });

            return response;
        },
        onError: onError,
        onSuccess: onSuccess,
    });
};

import fetchClient from '@/lib/FetchClient';
import { IError } from '@/types/error';
import { IBusinessUpdate } from '@/types/user';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

interface IProps {
    onSuccess: (data: AxiosResponse) => void;
    onError: (error: AxiosError<IError>) => void;
}

export const useUpdateBusiness = ({ onSuccess, onError }: IProps) => {
    return useMutation({
        mutationFn: async (body: IBusinessUpdate) => {
            if (body.service_id !== 'Other') {
                delete body.service_other;
            } else {
                delete body.service_id;
            }
            const response = fetchClient({
                method: 'PATCH',
                url: '/businesses/profiles',
                body,
            });
            return response;
        },
        onError: onError,
        onSuccess: onSuccess,
    });
};

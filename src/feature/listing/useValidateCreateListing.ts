import fetchClient from '@/lib/FetchClient';
import { IError } from '@/types/error';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
interface IProps {
    onSuccess: (data: AxiosResponse) => void;
    onError: (error: AxiosError<IError>) => void;
}
export const useValidateCreateListing = ({ onSuccess, onError }: IProps) => {
    return useMutation({
        mutationFn: async () => {
            const response = await fetchClient({
                url: `/businesses/publisher/verification-status`,
            });
            return response;
        },
        onError: onError,
        onSuccess: onSuccess,
    });
};

import fetchClient from '@/lib/FetchClient';
import { BodyUserRegistration } from '@/types/auth';
import { IError } from '@/types/error';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

interface IProps {
    onSuccess: (data: AxiosResponse) => void;
    onError: (error: AxiosError<IError>) => void;
}
export const useUserRegistration = ({ onSuccess, onError }: IProps) => {
    return useMutation({
        mutationFn: async (body: BodyUserRegistration) => {
            const response = await fetchClient({
                method: 'POST',
                url: '/auth/register',
                body: body,
            });

            return response;
        },
        onError: onError,
        onSuccess: onSuccess,
    });
};

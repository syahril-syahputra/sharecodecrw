import fetchClient from '@/lib/FetchClient';
import { IError } from '@/types/error';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

interface IProps {
    onSuccess: (data: AxiosResponse) => void;
    onError: (error: AxiosError<IError>) => void;
}

export const useSendVerificationCode = ({ onSuccess, onError }: IProps) => {
    return useMutation({
        mutationFn: async (phone: string) => {
            const response = await fetchClient({
                method: 'POST',
                url: `/auth/send-phone-verification`,
                body: {
                    phone,
                },
            });

            return response;
        },
        onError: onError,
        onSuccess: onSuccess,
    });
};

export const useVerifyPhoneNumber = ({ onSuccess, onError }: IProps) => {
    return useMutation({
        mutationFn: async ({
            code,
            phone,
        }: {
            code: string;
            phone: string;
        }) => {
            const response = await fetchClient({
                method: 'POST',
                url: `/auth/phone-verification`,
                body: {
                    code,
                    phone,
                },
            });

            return response;
        },
        onError: onError,
        onSuccess: onSuccess,
    });
};

import fetchClient from '@/lib/FetchClient';
import { IError } from '@/types/error';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

interface IProps {
    onSuccess: (data: AxiosResponse) => void;
    onError: (error: AxiosError<IError>) => void;
}
export const useStartConversation = ({ onSuccess, onError }: IProps) => {
    return useMutation({
        mutationFn: async (recipientId: string) => {
            const response = await fetchClient({
                method: 'POST',
                url: `/messages/direct-messages`,
                body: {
                    'recipient_id' : recipientId,
                },
            });

            return response;
        },
        onError: onError,
        onSuccess: onSuccess,
    });
};

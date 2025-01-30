import fetchClient from '@/lib/FetchClient';
import { IError } from '@/types/error';
import { BodyCreateListing } from '@/types/listing';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

interface IProps {
    onSuccess: (data: AxiosResponse) => void;
    onError: (error: AxiosError<IError>) => void;
}

export const useCreateListing = ({ onSuccess, onError }: IProps) => {
    return useMutation({
        mutationFn: async (body: BodyCreateListing) => {
            const response = await fetchClient({
                method: 'POST',
                url: '/businesses/publisher/listings',
                body: body,
            });

            return response;
        },
        onError: onError,
        onSuccess: onSuccess,
    });
};

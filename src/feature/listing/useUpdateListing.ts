import fetchClient from '@/lib/FetchClient';
import { IError } from '@/types/error';
import { BodyUpdateListing } from '@/types/listing';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

interface IProps {
    id: string;
    onSuccess: (data: AxiosResponse) => void;
    onError: (error: AxiosError<IError>) => void;
}

export const useUpdateListing = ({ id, onSuccess, onError }: IProps) => {
    return useMutation({
        mutationFn: async (body: BodyUpdateListing) => {
            const response = await fetchClient({
                method: 'PATCH',
                url: '/businesses/publisher/listings/' + id,
                body: body,
            });

            return response;
        },
        onError: onError,
        onSuccess: onSuccess,
    });
};

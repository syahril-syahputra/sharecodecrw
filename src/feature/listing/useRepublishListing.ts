import fetchClient from '@/lib/FetchClient';
import { IError } from '@/types/error';
import { BodyRepublishListing } from '@/types/listing';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

interface IProps {
    id: string;
    onSuccess: (data: AxiosResponse) => void;
    onError: (error: AxiosError<IError>) => void;
}

export const useRepublishListing = ({ id, onSuccess, onError }: IProps) => {
    return useMutation({
        mutationFn: async (body: BodyRepublishListing) => {
            const response = await fetchClient({
                method: 'POST',
                url: `/businesses/publisher/listings/${id}/re-publish`,
                body: body,
            });

            return response;
        },
        onError: onError,
        onSuccess: onSuccess,
    });
};

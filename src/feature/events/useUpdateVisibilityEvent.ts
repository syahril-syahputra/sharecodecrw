import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { IError, ISuccess } from '@/types/error';
import { IEventVisibility } from '@/types/events';
import fetchClient from '@/lib/FetchClient';

export const useUpdateVisibilityEvent = ({
    onSuccess,
    onError,
    id,
}: {
    onSuccess: (success: AxiosResponse<ISuccess>) => void;
    onError: (error: AxiosError<IError>) => void;
    id: string | undefined;
}) => {
    return useMutation({
        mutationFn: async (body: IEventVisibility) => {
            const response = await fetchClient({
                url: `/crowner/user-publisher/events/${id}/visibility`,
                body,
                method: 'PATCH',
            });
            return response;
        },
        onSuccess: onSuccess,
        onError: onError,
    });
};

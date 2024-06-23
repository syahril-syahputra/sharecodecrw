import fetchClient from '@/lib/FetchClient';
import { IError, ISuccess } from '@/types/error';
import { IEventAcceptanceStatus } from '@/types/events';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

export const useUpdateAcceptanceStatusEvent = ({
    onSuccess,
    onError,
    id,
}: {
    onSuccess: (success: AxiosResponse<ISuccess>) => void;
    onError: (error: AxiosError<IError>) => void;
    id: string | undefined;
}) => {
    return useMutation({
        mutationFn: async (body: IEventAcceptanceStatus) => {
            const response = await fetchClient({
                url: `/crowner/user-publisher/events/${id}/acceptance-status`,
                body,
                method: 'PATCH',
            });
            return response;
        },
        onSuccess: onSuccess,
        onError: onError,
    });
};

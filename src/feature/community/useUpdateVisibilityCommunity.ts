import fetchClient from '@/lib/FetchClient';
import { ICommunityVisibility } from '@/types/community';
import { IError, ISuccess } from '@/types/error';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

export const useUpdateVisibilityCommunity = ({
    onSuccess,
    onError,
    id,
}: {
    onSuccess: (success: AxiosResponse<ISuccess>) => void;
    onError: (error: AxiosError<IError>) => void;
    id: string | undefined;
}) => {
    return useMutation({
        mutationFn: async (body: ICommunityVisibility) => {
            const response = fetchClient({
                method: 'PATCH',
                url: `/crowner/user-publisher/communities/${id}/visibility`,
                body,
            });

            return response;
        },
        onSuccess: onSuccess,
        onError: onError,
    });
};

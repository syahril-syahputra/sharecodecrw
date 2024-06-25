import fetchClient from '@/lib/FetchClient';
import { IError, ISuccess } from '@/types/error';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

export const useDeleteCommunityTutor = ({
    onSuccess,
    onError,
}: {
    onSuccess: (success: AxiosResponse<ISuccess>) => void;
    onError: (error: AxiosError<IError>) => void;
}) => {
    return useMutation({
        mutationFn: async (id: string) => {
            const response = await fetchClient({
                url: `/crowner/user-publisher/community-tutors/${id}`,
                method: 'DELETE',
            });
            return response;
        },
        onSuccess: onSuccess,
        onError: onError,
    });
};

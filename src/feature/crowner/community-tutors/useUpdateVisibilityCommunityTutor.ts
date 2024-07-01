import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { IError, ISuccess } from '@/types/error';
import fetchClient from '@/lib/FetchClient';
import { ICommunityTutorVisibility } from '@/types/crowner/community-tutors';

export const useUpdateVisibilityCommunityTutor = ({
    onSuccess,
    onError,
    id,
}: {
    onSuccess: (success: AxiosResponse<ISuccess>) => void;
    onError: (error: AxiosError<IError>) => void;
    id: string | undefined;
}) => {
    return useMutation({
        mutationFn: async (body: ICommunityTutorVisibility) => {
            const response = await fetchClient({
                url: `/crowner/user-publisher/community-tutors/${id}/visibility`,
                body,
                method: 'PATCH',
            });
            return response;
        },
        onSuccess: onSuccess,
        onError: onError,
    });
};

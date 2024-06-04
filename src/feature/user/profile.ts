import fetchClient from '@/lib/FetchClient';
import { IError } from '@/types/error';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

interface IProps {
    onSuccess: (data: AxiosResponse) => void;
    onError: (error: AxiosError<IError>) => void;
}
export const useUpdateProfilePhoto = ({ onSuccess, onError }: IProps) => {
    return useMutation({
        mutationFn: async (img: FileList) => {
            const formData = new FormData();
            formData.append('profile_picture', img[0]);
            const response = fetchClient({
                method: 'PATCH',
                url: '/user/profile-picture',
                contentType: 'multipart/form-data',
                body: formData,
            });
            return response;
        },
        onError: onError,
        onSuccess: onSuccess,
    });
};

export const useUpdateInterest = ({ onSuccess, onError }: IProps) => {
    return useMutation({
        mutationFn: async (interests: string[]) => {
            const response = fetchClient({
                method: 'PUT',
                url: '/user/interest',
                body: { interests },
            });
            return response;
        },
        onError: onError,
        onSuccess: onSuccess,
    });
};

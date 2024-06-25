import fetchClient from '@/lib/FetchClient';
import { BodyCreateCommunityTutor } from '@/types/crowner/community-tutors';
import { IError } from '@/types/error';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

interface IProps {
    onSuccess: (data: AxiosResponse) => void;
    onError: (error: AxiosError<IError>) => void;
}

export const useCreateCommunityTutor = ({ onSuccess, onError }: IProps) => {
    return useMutation({
        mutationFn: async (body: BodyCreateCommunityTutor) => {
            const formData = new FormData();

            formData.append('title', body.title);
            formData.append('latitude', body.latitude.toString());
            formData.append('longitude', body.longitude.toString());
            formData.append('city_id', body.city_id);
            formData.append('about', body.about || '');
            formData.append('hourly_rate', (body.hourly_rate || 0).toString());
            formData.append('tags', JSON.stringify(body.tags));
            formData.append('address', body.address);
            if (body.image && body.image.length > 0) {
                formData.append('image', body.image[0] || undefined);
            }

            const response = await fetchClient({
                method: 'POST',
                url: '/crowner/user-publisher/community-tutors',
                contentType: 'multipart/form-data',
                body: formData,
            });

            return response;
        },
        onError: onError,
        onSuccess: onSuccess,
    });
};

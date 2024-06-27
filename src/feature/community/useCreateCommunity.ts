import fetchClient from '@/lib/FetchClient';
import { BodyCreateCommunity } from '@/types/community';
import { IError } from '@/types/error';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

interface IProps {
    onSuccess: (data: AxiosResponse) => void;
    onError: (error: AxiosError<IError>) => void;
}
export const useCreateCommunity = ({ onSuccess, onError }: IProps) => {
    return useMutation({
        mutationFn: async (body: BodyCreateCommunity) => {
            console.log(body);
            const formData = new FormData();

            formData.append('title', body.title);
            formData.append('latitude', body.latitude.toString());
            formData.append('longitude', body.longitude.toString());
            formData.append('city_id', body.city_id);
            formData.append('about', body.about || '');
            formData.append('tags', JSON.stringify(body.tags));
            formData.append('address', body.address);
            if (body.img && body.img.length > 0) {
                formData.append('image', body.img[0] || undefined);
            }
            const response = await fetchClient({
                method: 'POST',
                url: '/crowner/user-publisher/communities',
                contentType: 'multipart/form-data',
                body: formData,
            });

            return response;
        },
        onError: onError,
        onSuccess: onSuccess,
    });
};

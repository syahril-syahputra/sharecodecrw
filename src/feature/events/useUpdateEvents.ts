import fetchClient from '@/lib/FetchClient';
import { IError } from '@/types/error';
import { BodyCreateEvent } from '@/types/events';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import dayjs from 'dayjs';

interface IProps {
    onSuccess: (data: AxiosResponse) => void;
    onError: (error: AxiosError<IError>) => void;
    id: string;
}
export const useUpdateEvent = ({ onSuccess, onError, id }: IProps) => {
    return useMutation({
        mutationFn: async (body: BodyCreateEvent) => {
            console.log(body);
            const formData = new FormData();

            const date = dayjs(body.date_time).format('YYYY-MM-DD hh:mm:ss');

            formData.append('title', body.title);
            formData.append('timezone_id', body.timezone_id);
            formData.append('date_time', date.toString());
            formData.append('latitude', body.latitude.toString());
            formData.append('longitude', body.longitude.toString());
            formData.append('city_id', body.city_id);
            formData.append('about', body.about || '');
            formData.append('price', (body.price || 0).toString());
            formData.append('tags', JSON.stringify(body.tags));
            formData.append('address', body.address);
            if (body.img && body.img.length > 0) {
                formData.append('image', body.img[0] || undefined);
            }
            const response = await fetchClient({
                method: 'PATCH',
                url: '/crowner/user-publisher/events/' + id,
                contentType: 'multipart/form-data',
                body: formData,
            });

            return response;
        },
        onError: onError,
        onSuccess: onSuccess,
    });
};

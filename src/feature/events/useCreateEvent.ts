import fetchClient from '@/lib/FetchClient';
import { IError } from '@/types/error';
import { BodyCreateEvent } from '@/types/events';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import dayjs from 'dayjs';

interface IProps {
    onSuccess: (data: AxiosResponse) => void;
    onError: (error: AxiosError<IError>) => void;
}
export const useCreateEvent = ({ onSuccess, onError }: IProps) => {
    return useMutation({
        mutationFn: async (body: BodyCreateEvent) => {
            console.log(body);
            const formData = new FormData();

            const date = dayjs(body.date_time).format('YYYY-MM-DD hh:mm:ss');
            console.log(date);
            formData.append('title', body.title);
            formData.append('timezone_id', body.timezone_id);
            formData.append('date_time', '2024-07-30 21:30:15');
            formData.append('latitude', body.latitude.toString());
            formData.append('longitude', body.longitude.toString());
            formData.append('city_id', body.city_id);
            formData.append('about', body.about || '');
            formData.append('price', (body.price || 0).toString());
            formData.append(
                'tags',
                JSON.stringify([
                    '01HYF706SEXCNVMRBFCM2W7VMZ',
                    '01HYF6W42E13GYKYG5JSWMMD7P',
                    '01HYF6W42E13GYKYG5JX9RZ8E3',
                ])
            );
            formData.append('address', body.address);
            formData.append('img', body.img[0]);
            const response = await fetchClient({
                method: 'POST',
                url: '/crowner/user-publisher/events',
                contentType: 'multipart/form-data',
                body: body,
            });

            return response;
        },
        onError: onError,
        onSuccess: onSuccess,
    });
};

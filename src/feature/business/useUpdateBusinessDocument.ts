import fetchClient from '@/lib/FetchClient';
import { FileToBase64 } from '@/lib/utils';
import { IError } from '@/types/error';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

interface IProps {
    onSuccess: (data: AxiosResponse) => void;
    onError: (error: AxiosError<IError>) => void;
}

interface IDocumentBody {
    file: FileList;
    type: 'document' | 'license' | 'image';
}

export const useUpdateBusinessDocument = ({ onSuccess, onError }: IProps) => {
    return useMutation({
        mutationFn: async (body: IDocumentBody) => {
            const fileBase64 = (await FileToBase64(body.file[0])) as string;
            const base64 = fileBase64.replace('data:', '').replace(/^.+,/, '');
            const bodyParsed = {
                file: base64,
                doc_type: body.type,
            };

            const response = fetchClient({
                method: 'PATCH',
                url: '/businesses/publisher/registry-docs',
                body: bodyParsed,
            });
            return response;
        },
        onError: onError,
        onSuccess: onSuccess,
    });
};

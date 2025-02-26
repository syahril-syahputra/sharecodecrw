import { getSession } from 'next-auth/react';
import { api } from './axios';
import { AxiosResponse } from 'axios';
import { ISuccess } from '@/types/error';

interface fetchClientProps {
    method?: 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH';
    url: string;
    body?: object;
    token?: string;
    header?: object;
    contentType?: string;
    byPassVerification?: boolean;
}

async function fetchClient({
    method = 'GET',
    url,
    body = {},
    token,
    contentType,
    byPassVerification,
}: fetchClientProps) {
    const session = await getSession();
    const accessToken = token || session?.access_token;
    const verified = session?.user.email_verified_at;

    if (!verified && method === 'POST' && !byPassVerification) {
        window.location.href = '/email-verification';

        return Promise.resolve({
            data: {},
            status: 200,
            statusText: 'Redirecting',
            headers: {},
            config: {},
        } as AxiosResponse<ISuccess>);
    } else {
        const response = api({
            method: method,
            url: url,
            data: body,
            headers: {
                Accept: 'application/json',
                'Content-Type': contentType || 'application/json',
                Authorization: 'Bearer ' + accessToken,
            },
        });
        return response;
    }
}

export default fetchClient;

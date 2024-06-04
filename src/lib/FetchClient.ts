import { getSession } from 'next-auth/react';
import { api } from './axios';

interface fetchClientProps {
    method?: 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH';
    url: string;
    body?: object;
    token?: string;
    header?: object;
    contentType?: string;
}

async function fetchClient({
    method = 'GET',
    url,
    body = {},
    token,
    contentType,
}: fetchClientProps) {
    const session = await getSession();
    const accessToken = token || session?.access_token;

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

export default fetchClient;

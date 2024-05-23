import { getSession } from 'next-auth/react';
import { api } from './axios';

interface fetchClientProps {
    method?: 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH';
    url: string;
    body?: object;
    token?: string;
}

async function fetchClient({
    method = 'GET',
    url,
    body = {},
    token,
}: fetchClientProps) {
    const session = await getSession();
    const accessToken = token || session?.access_token;

    const response = api({
        method: method,
        url: url,
        data: body,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
        },
    });
    return response;
}

export default fetchClient;

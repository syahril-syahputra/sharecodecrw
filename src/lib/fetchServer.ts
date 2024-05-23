import { getServerSession } from 'next-auth';
import 'server-only';
import { authOptions } from './auth';
import { api } from './axios';

interface fetchServerProps {
    method?: 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH';
    url: string;
    body?: object;
}

async function fetchServer({
    method = 'GET',
    url,
    body = {},
}: fetchServerProps) {
    const session = await getServerSession(authOptions);

    const response = api({
        method: method,
        url: url,
        data: body,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + session?.access_token,
        },
    });

    return response;
}

export default fetchServer;

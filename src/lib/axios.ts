import Axios from 'axios';
import { signOut } from 'next-auth/react';

const api = Axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
    headers: {
        'Content-type': 'application/json',
    },
});
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            signOut();
        }
        if (error.status === 403) {
            window.location.href = '/request-email-verification';
        }

        return Promise.reject(error);
    }
);
export { api };

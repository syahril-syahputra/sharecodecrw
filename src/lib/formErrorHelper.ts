import { IError } from '@/types/error';
import { AxiosError } from 'axios';
import { UseFormSetError } from 'react-hook-form';

export function errorHelper(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setError: UseFormSetError<any>,
    error: AxiosError<IError>
) {
    if (error.response?.data.errors) {
        const obj = error.response?.data?.errors;
        for (const [key, value] of Object.entries(obj)) {
            setError(key, {
                type: 'custom',
                message: value as string,
            });
        }
    }
}

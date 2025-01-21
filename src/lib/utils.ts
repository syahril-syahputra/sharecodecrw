import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export function emptyValueCheck(
    input: string | number | boolean,
    message: any = '-'
): any {
    return input ? input : message;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export const FileToBase64 = (file: File) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

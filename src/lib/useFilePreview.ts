import { useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useFilePreview(file: any) {
    const [imgSrc, setImgSrc] = useState('');

    useEffect(() => {
        if (file && file[0]) {
            const newUrl = URL.createObjectURL(file[0]);

            if (newUrl !== imgSrc) {
                setImgSrc(newUrl);
            }
        }
    }, [file]);

    return [imgSrc, setImgSrc];
}

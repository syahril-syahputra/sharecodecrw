import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

interface IProps {
    src: string | null;
    className?: string;
    width?: number;
    height?: number;
}
export default function ImageCard(props: IProps) {
    return (
        <div
            className={clsx(
                'flex items-center justify-center overflow-hidden rounded-md bg-border',
                props.className
            )}
        >
            <Image
                alt="image"
                src={props.src || '/icons/image.png'}
                className=" min-h-full min-w-full object-cover"
                width={props.width || 108}
                height={props.height || 108}
            />
        </div>
    );
}

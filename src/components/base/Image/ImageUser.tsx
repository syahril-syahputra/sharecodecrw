import { Avatar } from '@/components/ui/avatar';
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

interface IProps {
    src: string | null;
    className?: string;
}
export default function ImageUser(props: IProps) {
    return (
        <Avatar>
            <Image
                alt="image"
                src={props.src || '/icons/user.png'}
                className=" object-cover"
                width={100}
                height={100}
            />
        </Avatar>
    );
}

import { Avatar } from '@/components/ui/avatar';
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

interface IProps {
    src: string | null;
    className?: string;
}
export default function ImageNotification(props: IProps) {
    return (
        <Avatar
            className={clsx('rounded-sm', props.src ? 'visible' : 'invisible')}
        >
            <Image
                alt="image"
                src={props.src || '/icons/user.png'}
                className=" object-cover"
                width={140}
                height={140}
            />
        </Avatar>
    );
}

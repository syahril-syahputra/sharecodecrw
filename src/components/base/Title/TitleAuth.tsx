import clsx from 'clsx';
import React, { ReactNode } from 'react';

interface IProps {
    children: ReactNode;
    className?: string;
}
export default function TitleAuth(props: IProps) {
    return (
        <div
            className={clsx(
                'text-center text-2xl font-bold text-primary',
                props.className
            )}
        >
            {props.children}
        </div>
    );
}

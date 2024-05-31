import clsx from 'clsx';
import React, { ReactNode } from 'react';
interface IProps {
    children: ReactNode;
    className?: string;
}
export default function TitleFormHeader(props: IProps) {
    return (
        <div
            className={clsx(
                'border-b py-4 text-2xl font-semibold',
                props.className
            )}
        >
            {props.children}
        </div>
    );
}

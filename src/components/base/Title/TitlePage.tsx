import clsx from 'clsx';
import React, { ReactNode } from 'react';
interface IProps {
    children: ReactNode;
    className?: string;
}
export default function TitlePage(props: IProps) {
    return (
        <div
            className={clsx(
                ' text-2xl font-semibold capitalize',
                props.className
            )}
        >
            {props.children}
        </div>
    );
}

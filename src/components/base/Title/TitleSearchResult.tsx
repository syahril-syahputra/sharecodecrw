import clsx from 'clsx';
import React, { ReactNode } from 'react';
interface IProps {
    children: ReactNode;
    className?: string;
}
export default function TitleSearchResult(props: IProps) {
    return (
        <div
            className={clsx(
                ' border-b py-4 text-2xl  capitalize',
                props.className
            )}
        >
            {props.children}
        </div>
    );
}

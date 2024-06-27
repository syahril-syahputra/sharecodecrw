import clsx from 'clsx';
import React from 'react';

interface IProps {
    key: number;
    index: number;
    currentIndex: number;
}
export default function StepIndex(props: IProps) {
    return (
        <div
            className={clsx(
                ' flex-1 rounded-lg p-2',
                props.index <= props.currentIndex
                    ? 'bg-primary'
                    : 'bg-primary-foreground'
            )}
        ></div>
    );
}

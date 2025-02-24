import clsx from 'clsx';
import { Star } from 'lucide-react';
import React from 'react';

interface IProps {
    star: number;
    rater: number;
    isWhite?: boolean;
    variant?: 'big';
}
export default function Rating(props: IProps) {
    if (props.rater === 0) {
        return <div className="flex items-center space-x-1 "></div>;
    }

    if (props.variant == 'big') {
        return (
            <div className="flex items-center">
                <span className="text-6xl text-primary">{props.star}</span>
                <div className="ml-2">
                    <p className="font-urbanist font-thin text-white">
                        {props.rater} Endorsements
                    </p>
                    <div
                        className={clsx(
                            'flex items-center space-x-1 text-gray-500'
                        )}
                    >
                        {Array.from({ length: props.star }).map((_, index) => (
                            <Star
                                key={index}
                                fill={props.isWhite ? '#FFFFFF' : '#258AD8'}
                                strokeWidth={0}
                                className="text-primary"
                            />
                        ))}
                        {Array.from({ length: 5 - Math.floor(props.star) }).map(
                            (_, index) => (
                                <Star
                                    key={index}
                                    fill="#888888"
                                    strokeWidth={0}
                                />
                            )
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex space-x-1 ">
            {Array.from({ length: props.star }).map((_, index) => (
                <Star
                    key={index}
                    fill={props.isWhite ? '#FFFFFF' : '#258AD8'}
                    strokeWidth={0}
                    size={16}
                    className={clsx(
                        props.isWhite ? 'text-white' : 'text-[#258AD8]'
                    )}
                />
            ))}
            {Array.from({ length: 5 - Math.floor(props.star) }).map(
                (_, index) => (
                    <Star
                        key={index}
                        size={16}
                        fill="#888888"
                        strokeWidth={0}
                    />
                )
            )}
            <span className="-mt-[2px] pl-2 text-sm font-thin ">
                {props.rater}
            </span>
        </div>
    );
}

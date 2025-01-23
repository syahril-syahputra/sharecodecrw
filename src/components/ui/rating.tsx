import { Star } from 'lucide-react';
import React from 'react';

interface IProps {
    star: number;
    rater: number;
}
export default function Rating(props: IProps) {
    if (props.rater === 0) {
        return (
            <div className="flex items-center space-x-1 text-gray-500"></div>
        );
    }
    return (
        <div className="flex items-center space-x-1 text-gray-500">
            {props.star === 0}
            {Array.from({ length: props.star }).map((_, index) => (
                <Star
                    key={index}
                    fill="#07b1fb"
                    strokeWidth={0}
                    size={16}
                    className="text-[#07b1fb]"
                />
            ))}
            {Array.from({ length: 5 - props.star }).map((_, index) => (
                <Star key={index} size={16} fill="#888888" strokeWidth={0} />
            ))}
            <span className="pl-2 text-sm font-thin text-white">
                {props.rater}
            </span>
        </div>
    );
}

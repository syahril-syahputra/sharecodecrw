import { Star } from 'lucide-react';
import React from 'react';

interface IProps {
    star: number;
    rater: number;
}
export default function Rating(props: IProps) {
    return (
        <div className="flex items-center space-x-1 text-gray-500">
            {Array.from({ length: props.star }).map((_, index) => (
                <Star
                    key={index}
                    fill="#07b1fb"
                    size={16}
                    className="text-[#07b1fb]"
                />
            ))}
            {Array.from({ length: 5 - props.star }).map((_, index) => (
                <Star key={index} size={16} fill="#888888" />
            ))}
            <span className="text-lg text-white">{props.rater}</span>
        </div>
    );
}

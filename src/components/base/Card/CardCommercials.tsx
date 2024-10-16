import React from 'react';
import ImageCard from '../Image/ImageCard';

interface IProps {
    data: {
        title: string;
        image_url: string;
    };
}
export default function CardCommercials(props: IProps) {
    return (
        <div className="relative space-y-2 rounded-md border  shadow-md">
            <ImageCard src={props.data.image_url} className="h-48" />
            <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black bg-opacity-20 font-koulen text-4xl text-white">
                <span>{props.data.title}</span>
            </div>
        </div>
    );
}

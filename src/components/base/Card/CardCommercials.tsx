import React from 'react';
import ImageCard from '../Image/ImageCard';
import Link from 'next/link';

interface IProps {
    data: {
        id: string;
        title: string;
        image_url: string;
        slug: string;
        province?: string;
        city?: string;
    };
}
export default function CardCommercials(props: IProps) {
    return (
        <Link href={`/commercial/listings/${props.data.slug}/${props.data.id}`}>
            <div className="relative rounded-md border shadow-md">
                <ImageCard src={props.data.image_url} className="h-54" />
                <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-md bg-black bg-opacity-20 font-koulen text-4xl text-white">
                    <span>{props.data.title}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 top-16 flex items-center justify-center rounded-md text-lg text-white">
                    <span>
                        {props.data.city && props.data.province
                            ? `${props.data.city}, ${props.data.province}`
                            : null}
                    </span>
                </div>
            </div>
        </Link>
    );
}

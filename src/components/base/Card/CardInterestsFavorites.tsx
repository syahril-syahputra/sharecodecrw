import React from 'react';
import ImageCard from '../Image/ImageCard';
import { IInterestFavorites } from '@/types/interestsFavorites';
import Link from 'next/link';

interface IProps {
    data: IInterestFavorites;
    variant?: 'horizontal' | 'vertical';
}
export default function CardInterestsFavorites(props: IProps) {
    const url =
        '/crowner/' +
        props.data?.listing_type_formatted?.replace(' ', '-') +
        '/slug/' +
        props.data.id;
    if (props.variant === 'vertical') {
        return (
            <Link href={url}>
                <div className="flex flex-col items-center space-y-4 rounded-md border p-4 shadow-md">
                    <ImageCard
                        src={props.data.image_url}
                        className="h-36 w-56"
                    />
                    <div className="flex flex-1 flex-col space-y-2 ">
                        <div className=" font-semibold capitalize">
                            {props.data.listing_type}
                        </div>
                        <div className="line-clamp-2 text-2xl font-semibold">
                            {props.data.title}
                        </div>
                        <div className="text-muted-foreground">
                            {props.data.province}, {props.data.city}
                        </div>
                    </div>
                </div>
            </Link>
        );
    } else {
        return (
            <Link href={url}>
                <div className="flex  items-center space-x-4 rounded-md border p-4 shadow-md">
                    <ImageCard
                        src={props.data.image_url}
                        className="h-36 w-56"
                    />
                    <div className="flex flex-1 flex-col space-y-2 ">
                        <div className=" font-semibold capitalize">
                            {props.data.listing_type}
                        </div>
                        <div className="text-2xl font-semibold">
                            {props.data.title}
                        </div>
                        <div className="text-muted-foreground">
                            {props.data.province}, {props.data.city}
                        </div>
                    </div>
                </div>
            </Link>
        );
    }
}

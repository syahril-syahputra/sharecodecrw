import React from 'react';
import ImageCard from '../Image/ImageCard';
import { IInterestFavorites } from '@/types/interestsFavorites';
import Link from 'next/link';

interface IProps {
    data: IInterestFavorites;
    variant?: 'horizontal' | 'vertical';
}
export default function CardCommercialInterestsFavorites(props: IProps) {
    const url =
        '/commercial/listings/' +
        (props.data?.slug || 'slug') +
        '/' +
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
                        <div className="font-semibold capitalize">
                            {props.data.listing_type_formatted}
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
                <div className="flex space-x-4 rounded-md border p-4 shadow-md">
                    <ImageCard
                        src={props.data.image_url}
                        className="h-36 w-56"
                    />
                    <div className="flex flex-1 flex-col">
                        <div className="font-semibold capitalize text-muted-foreground">
                            {props.data.listing_type_formatted}
                        </div>
                        <div className="text-2xl font-semibold">
                            {props.data.title}
                        </div>
                        <div className="">
                            {props.data.province}, {props.data.city}
                        </div>
                    </div>
                </div>
            </Link>
        );
    }
}

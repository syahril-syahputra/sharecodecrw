import React from 'react';
import ImageCard from '../Image/ImageCard';
import { IInterestFavorites } from '@/types/interestsFavorites';

interface IProps {
    data: IInterestFavorites;
}
export default function CardInterestsFavorites(props: IProps) {
    return (
        <div className="flex cursor-pointer items-center space-x-4 rounded-md border p-4 shadow-md active:opacity-30">
            <ImageCard src={props.data.image_url} className="h-36 w-56" />
            <div className="flex flex-1 flex-col space-y-2 ">
                <div className=" font-semibold capitalize">
                    {props.data.listing_type}
                </div>
                <div className="text-2xl font-semibold">{props.data.title}</div>
                <div className="text-muted-foreground">
                    {props.data.province}, {props.data.city}
                </div>
            </div>
        </div>
    );
}

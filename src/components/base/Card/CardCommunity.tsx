import { MapPin } from 'lucide-react';
import React from 'react';
import ImageCard from '../Image/ImageCard';
import { IDetailCommunity } from '@/types/community';

interface IProps {
    variant?: 'horizontal' | 'vertikal';
    data: IDetailCommunity;
}
export default function CardCommunity(props: IProps) {
    if (props.variant === 'vertikal') {
        return (
            <div className="space-y-2 rounded-md border p-4 shadow-md">
                <ImageCard src={props.data.image_url} className="h-48" />
                <div className="line-clamp-1 font-semibold capitalize">
                    {props.data.title}
                </div>
                <div className="flex items-center  space-x-2">
                    <MapPin size={21} className="text-primary" />
                    <span className="line-clamp-1">
                        {props.data.province}, {props.data.city}
                    </span>
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex cursor-pointer  space-x-4 rounded-md border p-4 shadow-md active:opacity-30">
                <ImageCard src={props.data.image_url} className="h-36 w-56" />
                <div className="flex flex-1 flex-col  ">
                    <div className="text-lg font-semibold">
                        {props.data.title}
                    </div>
                    <div className="flex flex-1 items-end space-x-2 font-bold">
                        <span>
                            {props.data.province}, {props.data.city}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
CardCommunity.defaultProps = {
    variant: 'horizontal',
};

import { MapPin } from 'lucide-react';
import React from 'react';
import ImageCard from '../Image/ImageCard';
import { IDetailCommunity } from '@/types/community';
import AcceptanceStatus from '../ListingUtilities/AcceptanceStatus';
import VisibilityStatus from '../ListingUtilities/VisibilityStatus';

interface IProps {
    variant?: 'horizontal' | 'vertical';
    data: IDetailCommunity;
}
export default function CardCommunity(props: IProps) {
    if (props.variant === 'vertical') {
        return (
            <div className="space-y-2 rounded-md border p-4 shadow-md">
                <ImageCard src={props.data.image_url} className="h-48" />
                <div className="line-clamp-1 font-semibold capitalize">
                    {props.data.title}
                </div>
                <div className="flex flex-row">
                    <div className="flex-none">
                        <MapPin size={21} className="text-primary" />
                    </div>
                    <div className="grid-grow !line-clamp-1 grid pl-1">
                        {props.data.province}, {props.data.city}
                    </div>
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
                    <div className="text-muted-foreground">
                        {props.data.province}, {props.data.city}
                    </div>
                    <div className="flex flex-1 items-end space-x-2">
                        <span className="space-x-3">
                            <AcceptanceStatus
                                acceptance={props.data.acceptance_status}
                            />
                            <VisibilityStatus
                                is_visible={props.data.is_visible}
                                acceptance={props.data.acceptance_status}
                            />
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

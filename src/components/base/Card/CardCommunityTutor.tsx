import { DollarSign, MapPin } from 'lucide-react';
import React from 'react';
import ImageCard from '../Image/ImageCard';
import AcceptanceStatus from '../ListingUtilities/AcceptanceStatus';
import VisibilityStatus from '../ListingUtilities/VisibilityStatus';
import { ICommunityTutor } from '@/types/crowner/community-tutors';

interface IProps {
    variant?: 'horizontal' | 'vertical';
    data: ICommunityTutor;
}
export default function CardCommunityTutor(props: IProps) {
    if (props.variant === 'vertical') {
        return (
            <div className="space-y-2 rounded-md border p-4">
                <ImageCard src={props.data.image_url} className="h-48" />
                <div className="line-clamp-1 font-semibold capitalize">
                    {props.data.title}
                </div>
                <div className="flex flex-row">
                    <div className="flex-none">
                        <MapPin size={21} className="text-primary" />
                    </div>
                    <div className="!line-clamp-1 grid-grow grid pl-1">
                        {props.data.province}, {props.data.province}
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="flex-none">
                        <DollarSign size={21} className="text-primary" />
                    </div>
                    <div className="pl-1">
                        {props.data.hourly_rate > 0 && (
                            <>
                                <span className="">
                                    {props.data.hourly_rate_formatted}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                    {' '}
                                    / hour
                                </span>
                            </>
                        )}
                        {props.data.hourly_rate == 0 && (
                            <span className="font-semibold ">
                                {props.data.hourly_rate_formatted}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex cursor-pointer space-x-4 rounded-md border p-4 active:opacity-30">
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
                            />
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
CardCommunityTutor.defaultProps = {
    variant: 'horizontal',
};

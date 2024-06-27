import dayjs from 'dayjs';
import { Clock2, DollarSign, MapPin } from 'lucide-react';
import React from 'react';
import ImageCard from '../Image/ImageCard';
import { IDetailEvent } from '@/types/events';

interface IProps {
    variant?: 'horizontal' | 'vertikal';
    data: IDetailEvent;
}
export default function CardEvent(props: IProps) {
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
                <div className="flex items-center  space-x-2">
                    <Clock2 size={21} className="text-primary" />
                    <div className="line-clamp-1 flex space-x-2 text-sm">
                        {dayjs(props.data?.date_time).format(
                            'dddd, DD MMMM YYYY'
                        )}{' '}
                        {dayjs(props.data.date_time).format('HH:mm')} (
                        {props.data.gmt_offset})
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <DollarSign size={21} className="text-sm text-primary" />
                    <span>
                        {props.data.price ? props.data.price : 'Free Event'}
                    </span>
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex cursor-pointer  space-x-4 rounded-md border p-4 shadow-md active:opacity-30">
                <ImageCard src={props.data.image_url} className="h-36 w-56" />
                <div className="flex flex-1 flex-col  ">
                    <div className="flex space-x-4 font-semibold">
                        <span>
                            {dayjs(props.data?.date_time).format(
                                'dddd, DD MMMM YYYY'
                            )}
                        </span>
                        <span>
                            {dayjs(props.data.date_time).format('HH:mm')} (
                            {props.data.gmt_offset})
                        </span>
                    </div>
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
CardEvent.defaultProps = {
    variant: 'horizontal',
};

import React from 'react';
import ImageCard from '../Image/ImageCard';
import IEventReservation from '@/types/eventReservation';
import dayjs from 'dayjs';

interface IProps {
    data: IEventReservation;
}
export default function CardEventReservation(props: IProps) {
    return (
        <div className="flex cursor-pointer items-center space-x-4 rounded-md border p-4 shadow-md active:opacity-30">
            <ImageCard src={props.data.image_url} className="h-36 w-56" />
            <div className="flex flex-1 flex-col space-y-2 ">
                <div className="text-2xl font-semibold">{props.data.title}</div>
                <div className="grid-grow grid pl-1">
                    <span className="line-clamp-1 text-sm">
                        {dayjs(props.data?.date_time).format(
                            'dddd, DD MMMM YYYY'
                        )}{' '}
                    </span>
                    <span className="line-clamp-1 text-sm text-muted-foreground">
                        {dayjs(props.data.date_time).format('HH:mm')} (
                        {props.data.gmt_offset})
                    </span>
                </div>
                <div className="text-muted-foreground">
                    {props.data.province}, {props.data.city}
                </div>
            </div>
        </div>
    );
}

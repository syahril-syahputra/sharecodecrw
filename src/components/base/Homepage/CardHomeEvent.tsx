import dayjs from 'dayjs';
import React from 'react';
import ImageCard from '../Image/ImageCard';
import { IEventLanding } from '@/types/landing';
import { CalendarClock, MapPin } from 'lucide-react';

interface IProps {
    data: IEventLanding;
}
export default function CardHomeEvent(props: IProps) {
    return (
        <div className="space-y-1 rounded-md border bg-white shadow-md">
            <ImageCard src={props.data.image_url} className="h-48" />

            <div className="space-y-2 p-2">
                <div className="line-clamp-1 font-bold capitalize">
                    {props.data.title}
                </div>
                <ul className="list-inside list-disc text-xs">
                    <li className="flex items-center space-x-2">
                        <MapPin size={14} />
                        <span className="line-clamp-1">
                            {props.data.province}, {props.data.city}
                        </span>
                    </li>
                    <li className="flex items-center space-x-2">
                        <CalendarClock size={14} />{' '}
                        <span className="line-clamp-1">
                            {dayjs(props.data?.date_time).format(
                                'dddd, DD MMMM YYYY'
                            )}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

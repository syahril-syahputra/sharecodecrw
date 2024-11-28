import React from 'react';
import ImageCard from '../Image/ImageCard';
import IEventReservation from '@/types/eventReservation';
import dayjs from 'dayjs';
import Link from 'next/link';
import { MessageCircleMore, ReceiptText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface IProps {
    data: IEventReservation;
}
export default function CardEventReservation(props: IProps) {
    const url =
        '/crowner/events/' + (props.data.slug || 'slug') + '/' + props.data.id;
    return (
        <div className="flex  items-center space-x-4 rounded-md border p-4 shadow-md ">
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
            <div className="flex flex-col space-y-4">
                <Link href={url}>
                    <Button variant={'link'}>
                        <ReceiptText className="mr-2" />
                        View Detail
                    </Button>
                </Link>
                <Link href={'/user/event-reservation/chat/' + props.data.id}>
                    <Button variant={'link'} className="text-foreground">
                        <MessageCircleMore className="mr-2" /> Group Chat
                    </Button>
                </Link>
            </div>
        </div>
    );
}

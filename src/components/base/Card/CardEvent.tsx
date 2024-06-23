import dayjs from 'dayjs';
import { Clock2, DollarSign, MapPin } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface IProps {
    variant?: 'horizontal' | 'vertikal';
    key: string | number;
    image: string;
    title: string;
    price?: string;
    address: string;
    datetime: Date;
}
export default function CardEvent(props: IProps) {
    const datetime = dayjs(props.datetime).format(
        'dddd, DD MMMM YYYY | HH.mm (GMT Z)'
    );
    if (props.variant === 'vertikal') {
        return (
            <div className="space-y-2 rounded-md border p-4 shadow-md">
                <div className="bg-border p-4">
                    <Image
                        alt="image"
                        src={props.image || '/icons/image.png'}
                        className=" mx-auto"
                        width={108}
                        height={108}
                    />
                </div>
                <div className="line-clamp-1 font-semibold capitalize">
                    {props.title}
                </div>
                <div className="flex items-center  space-x-2">
                    <MapPin size={21} className="text-primary" />
                    <span className="line-clamp-1">
                        {props.address} {props.variant}
                    </span>
                </div>
                <div className="flex items-center  space-x-2">
                    <Clock2 size={21} className="text-primary" />
                    <span className="line-clamp-1">{datetime}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <DollarSign size={21} className="text-sm text-primary" />
                    <span>{props.price ? props.price : 'Free Event'}</span>
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex cursor-pointer  space-y-2 rounded-md border p-4 shadow-md active:opacity-30">
                <div className="bg-border p-4">
                    <Image
                        alt="image"
                        src={props.image || '/icons/image.png'}
                        className=" mx-auto"
                        width={108}
                        height={108}
                    />
                </div>
                <div className="flex flex-1 flex-col  p-4">
                    <div className="flex items-center space-x-2  text-sm">
                        <span>{datetime}</span>
                    </div>
                    <div className="text-lg font-semibold">{props.title}</div>
                    <div className="flex flex-1 items-end space-x-2">
                        <span>
                            {props.address} {props.variant}
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

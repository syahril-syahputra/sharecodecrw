import React from 'react';
import ImageCard from '../Image/ImageCard';
import { ICommunityLanding } from '@/types/landing';
import { MapPin } from 'lucide-react';

interface IProps {
    data: ICommunityLanding;
}
export default function CardHomeCommunities(props: IProps) {
    return (
        <div className="space-y-1 rounded-md border bg-white shadow-md">
            <ImageCard src={props.data.image_url} className="h-48" />

            <div className="space-y-2 p-2">
                <div className="line-clamp-1 font-bold capitalize">
                    {props.data.title}
                </div>
                <ul className="list-none text-xs">
                    <li className="flex items-center space-x-2">
                        <MapPin size={14} />
                        <span className="line-clamp-1">
                            {props.data.province}, {props.data.city}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

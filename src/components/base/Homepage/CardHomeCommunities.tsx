import React from 'react';
import ImageCard from '../Image/ImageCard';
import { ICommunityLanding } from '@/types/landing';

interface IProps {
    data: ICommunityLanding;
}
export default function CardHomeCommunities(props: IProps) {
    return (
        <div className="space-y-1 rounded-md border bg-white shadow-md">
            <ImageCard src={'https://picsum.photos/400/300'} className="h-48" />

            <div className="space-y-2 p-2">
                <div className="line-clamp-1 font-bold capitalize">
                    {props.data.title}
                </div>
                <ul className="list-inside list-disc text-xs">
                    <li>
                        {props.data.province}, {props.data.city}
                    </li>
                </ul>
            </div>
        </div>
    );
}

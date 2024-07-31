import { INotification } from '@/types/base/notification';
import React from 'react';
import ImageUser from '../Image/ImageUser';
import { humanize } from '@/lib/humanizeDate';
import ImageNotification from '../Image/ImageNotification';

export default function CardNotification({ data }: { data: INotification }) {
    return (
        <div className="border-Input flex items-center justify-between space-x-2 border-b px-4 py-4 ">
            <ImageUser src={data.profile_picture_url} />
            <div className="flex-1 space-y-1">
                <div className="text-sm">{data.message}</div>
                <div className="text-xs">{humanize(data.created_at)}</div>
            </div>
            <ImageNotification src={data.entity_image_url} />
        </div>
    );
}

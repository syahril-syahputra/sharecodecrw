import { INotification } from '@/types/base/notification';
import React from 'react';
import ImageUser from '../Image/ImageUser';
import { humanize } from '@/lib/humanizeDate';
// import ImageNotification from '../Image/ImageNotification';=
import { Badge } from '@/components/ui/badge';
import ImageNotification from '../Image/ImageNotification';
import Link from 'next/link';

export default function CardNotification({ data }: { data: INotification }) {
    return (
        <Link href={data.link || ''}>
            <div className="border-Input relative flex items-start justify-between space-x-3 border-b px-4 py-4 ">
                <ImageUser src={data.notifier_profile_picture_url} />
                <div className="flex-1 space-y-1">
                    <div className="text-sm">
                        {`${data.notifier_first_name} ${data.notifier_last_name} ${data.message}`}
                    </div>
                    <div className="text-xs">{humanize(data.created_at)}</div>
                </div>

                <ImageNotification src={data.entity_picture_url || ''} />
                {!data.is_read && (
                    <Badge className="absolute right-0 top-2 px-1 text-xs">
                        New {data.is_read}
                    </Badge>
                )}
            </div>
        </Link>
    );
}

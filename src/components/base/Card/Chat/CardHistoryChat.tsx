import { humanize } from '@/lib/humanizeDate';
import { IChatHistory } from '@/types/chat';
import React from 'react';

export default function CardHistoryChat(props: {
    data: IChatHistory;
    chatPartnerId: string;
}) {
    const isLeft = props.chatPartnerId === props.data.user_id ? true : false;

    if (isLeft) {
        return (
            <div className="mt-2 flex justify-start">
                <div className="rounded-lg rounded-lg bg-white/10 p-2 shadow-md backdrop-blur-md">
                    <div>
                        <p>{props.data.message}</p>
                    </div>
                    <div className="flex justify-end text-xs">
                        {humanize(props.data.created_at || '')}
                    </div>
                </div>
            </div>
        );
    }

    if (!isLeft) {
        return (
            <div className="mt-2 flex justify-end">
                <div className="rounded-lg rounded-lg bg-white/40 p-2 shadow-md backdrop-blur-md">
                    <div>
                        <p>{props.data.message}</p>
                    </div>
                    <div className="flex justify-end text-xs">
                        {humanize(props.data.created_at || '')}
                    </div>
                </div>
            </div>
        );
    }
}

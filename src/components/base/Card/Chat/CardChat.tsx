import { humanize } from '@/lib/humanizeDate';
import { IDirectChat } from '@/types/chat';
import React from 'react';

export default function CardChat(props: {
    data: IDirectChat;
    chatPartnerId: string;
}) {
    const isLeft =
        props.chatPartnerId === props.data.data?.business_id ? true : false;

    if (isLeft && props.data.event === 'direct-message-received') {
        return (
            <div className="mt-2 flex justify-start">
                <div className="rounded-lg rounded-lg bg-white/10 p-2 shadow-md backdrop-blur-md">
                    <div>
                        <p>{props.data.data?.message}</p>
                    </div>
                    <div className="text-xs ">
                        {humanize(props.data.data?.created_at || '')}
                    </div>
                </div>
            </div>
        );
    }

    if (!isLeft && props.data.event === 'direct-message-received') {
        return (
            <div className="mt-2 flex justify-end">
                <div className="rounded-lg rounded-lg bg-white/40 p-2 shadow-md backdrop-blur-md">
                    <div>
                        <p>{props.data.data?.message}</p>
                    </div>
                    <div className="flex justify-end text-xs">
                        {humanize(props.data.data?.created_at || '')}
                    </div>
                </div>
            </div>
        );
    }
    if (
        props.data.event === 'parse-error' ||
        props.data.event === 'validation-error'
    ) {
        return (
            <div className="mx-auto mt-2 flex items-start p-2">
                <div className="rounded-lg  italic text-red-400">
                    {props.data.data?.message}
                </div>
            </div>
        );
    }

    return null;
}

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { humanize } from '@/lib/humanizeDate';
import { IDirectChat } from '@/types/chat';
import { useSession } from 'next-auth/react';
import React from 'react';

export default function CardChat(props: { data: IDirectChat }) {
    const { data } = useSession();
    const name =
        data?.user.id === props.data.data?.user_id
            ? 'You'
            : props.data.data?.name;
    if (props.data.event === 'chat-direct-user-receive-message') {
        return (
            <div className="flex justify-start">
                <div className="rounded-lg p-2 shadow-md rounded-lg bg-white/10 backdrop-blur-md">
                    <div>
                        <p>{props.data.message}</p>
                    </div>
                    <div className="text-xs">
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
            <div className="mx-auto flex items-start space-x-2 p-2">
                <div className=" space-y-2 rounded-lg  italic text-red-400">
                    <a className="capitalize">{name}</a>{' '}
                    {props.data.data?.message}
                </div>
            </div>
        );
    }

    return null;
}

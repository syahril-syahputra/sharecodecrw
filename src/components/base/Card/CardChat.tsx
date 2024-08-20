import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { humanize } from '@/lib/humanizeDate';
import { IChat } from '@/types/chat';
import { useSession } from 'next-auth/react';
import React from 'react';

export default function CardChat(props: { data: IChat }) {
    const { data } = useSession();
    const name =
        data?.user.id === props.data.data?.user_id
            ? 'You'
            : props.data.data?.name;
    if (props.data.event === 'chat-group-user-receive-message') {
        return (
            <div className="flex items-start space-x-2 p-4">
                <Avatar className=" h-12 w-12 bg-white shadow-md">
                    <AvatarImage src={props.data.data?.profile_picture_url} />
                    <AvatarFallback className="bg-background text-lg font-bold uppercase">
                        {props.data.data?.name?.substring(0, 2)}
                    </AvatarFallback>
                </Avatar>
                <div className=" space-y-2 rounded-lg bg-white p-2 shadow-md">
                    <div>
                        <b className="capitalize">{name}</b> :{' '}
                        {props.data.data?.message}
                    </div>

                    <div className="text-xs">
                        {humanize(props.data.data?.created_at || '')}
                    </div>
                </div>
            </div>
        );
    }
    if (props.data.event === 'chat-group-user-join' && name !== 'You') {
        return (
            <div className="mx-auto flex items-start space-x-2 p-2">
                <div className=" space-y-2 rounded-lg  italic text-green-600">
                    <a className="capitalize">{name}</a>{' '}
                    {props.data.data?.message}
                </div>
            </div>
        );
    }
    if (props.data.event === 'chat-group-user-left' && name !== 'You') {
        return (
            <div className="mx-auto flex items-start space-x-2 p-2">
                <div className=" space-y-2 rounded-lg  italic text-red-400">
                    <a className="capitalize">{name}</a>{' '}
                    {props.data.data?.message}
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

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { humanize } from '@/lib/humanizeDate';
import { IChatHistory } from '@/types/chat';
import { useSession } from 'next-auth/react';
import React from 'react';

export default function CardHistoryChat(props: { data: IChatHistory}) {
    const { data } = useSession();
    const name =
        data?.user.id === props.data.user_id
            ? 'You'
            : props.data.first_name + ' ' + props.data?.last_name;
    return (
        <div className="flex items-start space-x-2 p-4">
            <Avatar className=" h-12 w-12 bg-white shadow-md">
                <AvatarImage src={props.data.profile_picture_url} />
                <AvatarFallback className="bg-background text-lg font-bold uppercase">
                    {props.data.first_name?.substring(0, 2)}
                </AvatarFallback>
            </Avatar>
            <div className=" space-y-2 rounded-lg bg-white p-2 shadow-md">
                <div>
                    <b className="capitalize">{name}</b> : {props.data.message}
                </div>

                <div className="text-xs">
                    {humanize(props.data.created_at || '')}
                </div>
            </div>
        </div>
    );
}

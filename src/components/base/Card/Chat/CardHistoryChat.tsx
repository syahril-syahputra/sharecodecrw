import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { humanize } from '@/lib/humanizeDate';
import { IChatHistory } from '@/types/chat';
import { useSession } from 'next-auth/react';
import React from 'react';

export default function CardHistoryChat(props: { data: IChatHistory }) {
    const { data } = useSession();
    // const isLeft =
    //     data?.user.id === props.data.user_id
    //         ? false
    //         : true;

    // TODO*
    const isLeft = props.data.user_id == 'yes' ? true : false;

    if(isLeft) {
        return (
            <div className="flex justify-start">
                <div className="rounded-lg p-2 shadow-md rounded-lg bg-white/10 backdrop-blur-md">
                    <div>
                        <p>{props.data.message}</p>
                    </div>
                    <div className="text-xs">
                        {humanize(props.data.created_at || '')}
                    </div>
                </div>
            </div>
        );
    }

    if(!isLeft) {
        return (
            <div className="flex justify-end">
                <div className="rounded-lg p-2 shadow-md rounded-lg bg-white/40 backdrop-blur-md">
                    <div>
                        <p>{props.data.message}</p>
                    </div>
                    <div className="text-xs">
                        {humanize(props.data.created_at || '')}
                    </div>
                </div>
            </div>
        );
    }
}

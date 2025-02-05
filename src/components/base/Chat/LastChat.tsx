import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { humanize } from '@/lib/humanizeDate';
import { getInitialsName } from '@/lib/utils';
import { IConversationRoom } from '@/types/chat';

export default function LastChat(props: { data: IConversationRoom }) {
    return (
        <div className="mt-2 flex items-center justify-between rounded-lg bg-white/10 p-4 shadow-lg backdrop-blur-md">
            <div className="flex items-center space-x-4">
                <Avatar>
                    <AvatarImage
                        src={props.data.image_url}
                        alt={props.data.name}
                    />
                    <AvatarFallback className="bg-gray-600">
                        {getInitialsName(props.data.name)}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <h3 className="text-lg font-semibold">{props.data.name}</h3>
                    <p className="w-96 text-sm text-white/50">
                        <p className="truncate">{props.data.last_message}</p>
                    </p>
                </div>
            </div>

            <p className="absolute right-4 top-4 text-xs text-gray-400">
                {humanize(props.data.last_message_created_at || '')}
            </p>

            {props.data.unread_count > 0 && (
                <div className="absolute right-4 top-12 -translate-y-1/2">
                    <span className="flex items-center justify-center rounded-full bg-blue-500 px-[6px] text-sm text-white">
                        {props.data.unread_count}
                    </span>
                </div>
            )}
        </div>
    );
}

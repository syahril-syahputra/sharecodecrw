import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { humanize } from '@/lib/humanizeDate';

export default function LastChat({
    name,
    picture_url,
    message,
    createdAt,
    isRead,
}: {
    name: string;
    picture_url: string;
    message: string;
    createdAt: string;
    isRead: boolean;
}) {
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((part) => part[0])
            .join('')
            .toUpperCase();
    };

    return (
        <div className="flex items-center justify-between rounded-lg bg-white/10 p-4 shadow-lg backdrop-blur-md">
            <div className="flex items-center space-x-4">
                <Avatar>
                    <AvatarImage src={picture_url} alt="@shadcn" />
                    <AvatarFallback className="bg-gray-600">
                        {getInitials(name)}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <h3 className="text-lg font-semibold">{name}</h3>
                    <p className="w-96 text-sm text-white/50">
                        <p className="truncate">{message}</p>
                    </p>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <span className="text-xs text-gray-400">
                    {humanize(createdAt || '')}
                </span>
                {!isRead && (
                    <div className="relative">
                        <span className="absolute -top-6 right-0 h-3 w-3 rounded-full bg-blue-500"></span>
                    </div>
                )}
            </div>
        </div>
    );
}

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Check } from 'lucide-react';
import { useSession } from 'next-auth/react';
export default function CardMember() {
    const { data: session } = useSession();
    return (
        <section className="space-y-4 p-4 text-center">
            <Avatar className="mx-auto h-32 w-32">
                <AvatarImage
                    src={
                        session?.user.profile_picture_url
                            ? session?.user.profile_picture_url
                            : '/icons/user.png'
                    }
                />
                <AvatarFallback>C</AvatarFallback>
            </Avatar>
            <div>
                {session?.user.first_name} {session?.user.last_name}
            </div>
            <div className="flex items-center justify-center">
                <Check />
            </div>
            <div className="text-sm">
                <b>Location</b> : City, Province
            </div>
        </section>
    );
}

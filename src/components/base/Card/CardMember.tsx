import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSession } from 'next-auth/react';
export default function CardMember() {
    const { data: session } = useSession();
    return (
        <section className="space-y-1 pb-2 text-center">
            <Avatar className="mx-auto h-32 w-32 mb-5">
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
            <div className="text-sm">
                <b>Location</b> :{' '}
                {session?.user.province
                    ? session.user.province + ', ' + session.user.city
                    : '...'}
            </div>
        </section>
    );
}

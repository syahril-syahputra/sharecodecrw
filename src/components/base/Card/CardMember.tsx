'use client';
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSession } from 'next-auth/react';
import DialogChangeBusinessPicture from '../Dialog/DialogChangeBusinessPicture';
import { HardDriveUpload } from 'lucide-react';
import { useFetchBusiness } from '@/feature/business/useFetchBusiness';
export default function CardMember() {
    const { data: session } = useSession();

    const { refetch } = useFetchBusiness();
    const initialUserName = session?.user.name
        ? session?.user.name.charAt(0)
        : '';
    const [dialogChangeBusinessPicture, setDialogChangeBusinessPicture] =
        useState(false);
    return (
        <section className="space-y-1 pb-2 text-center">
            <div className="relative inline-block cursor-pointer">
                <Avatar className="mb-2 h-24 w-24">
                    <AvatarImage
                        src={
                            session?.user.profile_picture_url
                                ? session?.user.profile_picture_url
                                : '/icons/user.png'
                        }
                        alt={session?.user.first_name}
                    />
                    <AvatarFallback>{initialUserName}</AvatarFallback>
                </Avatar>

                <div
                    onClick={() => setDialogChangeBusinessPicture(true)}
                    className="absolute bottom-0 left-0 right-0 top-0 flex cursor-pointer items-center justify-center rounded-full bg-neutral-800 bg-opacity-60 opacity-0 transition duration-100 hover:opacity-100"
                >
                    <HardDriveUpload className="text-white" size={20} />
                </div>
                <DialogChangeBusinessPicture
                    imageUrl={
                        session?.user.profile_picture_url
                            ? session?.user.profile_picture_url
                            : '/icons/user.png'
                    }
                    isOpen={dialogChangeBusinessPicture}
                    onOpenChange={(value) =>
                        setDialogChangeBusinessPicture(value)
                    }
                    refetch={refetch}
                />
            </div>
            {/* <Avatar className="mx-auto mb-5 h-32 w-32">
                <AvatarImage
                    src={
                        session?.user.profile_picture_url
                            ? session?.user.profile_picture_url
                            : '/icons/user.png'
                    }
                />
                <AvatarFallback>{initialUserName}</AvatarFallback>
            </Avatar> */}

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

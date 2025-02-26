'use client';
import React from 'react';
import { LogOut } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signOut } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSession } from 'next-auth/react';
interface IProps {
    session?: { email: string };
    image?: string;
}
export default function MenuUser(props: IProps) {
    const { data: session } = useSession();

    return (
        <div className="flex items-center space-x-4 py-4">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="mx-auto h-12 w-12 cursor-pointer">
                        <AvatarImage
                            src={
                                session?.user.profile_picture_url
                                    ? session?.user.profile_picture_url
                                    : '/icons/user.png'
                            }
                        />
                        <AvatarFallback>C</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>
                        {props.session?.email}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        onClick={() => signOut()}
                        className="cursor-pointer"
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

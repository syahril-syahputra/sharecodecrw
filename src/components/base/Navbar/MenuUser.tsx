'use client';
import React from 'react';
import { HandCoins, LogOut, User2 } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
interface IProps {
    session?: { email: string };
    image?: string;
}
export default function MenuUser(props: IProps) {
    return (
        <div className="flex items-center space-x-4 py-4">
            <Link
                href={'/user/interests-favorites'}
                className="flex items-center space-x-2"
            >
                <HandCoins />
                <span>2</span>
            </Link>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="mx-auto h-12 w-12">
                        <AvatarImage
                            src={props.image ? props.image : '/icons/user.png'}
                        />
                        <AvatarFallback>C</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>
                        {props.session?.email}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link href={'/user'}>
                        <DropdownMenuItem>
                            <User2 className="mr-2 h-4 w-4" />
                            <span>Dashboard</span>
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem onClick={() => signOut()}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

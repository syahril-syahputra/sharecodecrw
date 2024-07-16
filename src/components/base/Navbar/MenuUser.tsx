'use client';
import React from 'react';
import {
    Bell,
    Heart,
    LogOut,
    MessageSquare,
    UserIcon,
    User2,
} from 'lucide-react';
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
interface IProps {
    session?: { email: string };
}
export default function MenuUser(props: IProps) {
    return (
        <div className="flex items-center space-x-4 py-4">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <UserIcon className="hover:cursor-pointer hover:text-primary" />
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
            <Heart />
            <Bell />
            <MessageSquare />
        </div>
    );
}

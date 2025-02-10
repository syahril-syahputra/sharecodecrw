'use client';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function AuthButton() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <div className="flex hidden space-x-2 md:flex">
                <Link href={'/auth/login'}>
                    <Button block variant={'default'}>
                        Sign In
                    </Button>
                </Link>
                <Link href={'/auth/register'}>
                    <Button block variant={'secondary'} className="">
                        Sign Up
                    </Button>
                </Link>
            </div>

            <div className="flex md:hidden">
                <DropdownMenu onOpenChange={(x) => setIsOpen(x)}>
                    <DropdownMenuTrigger asChild className="cursor-pointer">
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mr-5 w-40">
                        <DropdownMenuLabel>
                            <Link href={'/auth/login'}>
                                <Button block variant={'default'}>
                                    Sign In
                                </Button>
                            </Link>
                        </DropdownMenuLabel>
                        <DropdownMenuLabel>
                            <Link href={'/auth/register'}>
                                <Button
                                    block
                                    variant={'secondary'}
                                    className=""
                                >
                                    Sign Up
                                </Button>
                            </Link>
                        </DropdownMenuLabel>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}

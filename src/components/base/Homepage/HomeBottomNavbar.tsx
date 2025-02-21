'use client';
import React, { useState } from 'react';
import {
    Bot,
    Home,
    ListX,
    Menu,
    MessageCircle,
    Search,
    Settings,
} from 'lucide-react';
import clsx from 'clsx';
import Link from 'next/link';

export default function HomeBottomNavbar() {
    const [open, setopen] = useState(false);
    return (
        <div className="fixed bottom-0 left-0 right-0 flex items-center justify-center space-x-4 p-4">
            <div className="flex w-min overflow-x-hidden rounded-full bg-white/40 p-4 shadow-xl backdrop-blur-md">
                <button
                    className="text-black  hover:text-primary"
                    onClick={() => setopen((prev) => !prev)}
                >
                    {open ? <ListX size={24} /> : <Menu size={24} />}
                </button>
                <div
                    className={clsx(
                        'flex transform gap-6 overflow-hidden transition-transform duration-300',
                        open
                            ? 'ml-6 max-w-full -translate-x-0 opacity-100'
                            : 'max-w-0 -translate-x-full opacity-0'
                    )}
                >
                    <button className="text-black  hover:text-primary">
                        <Link href={'/user'}>
                            <Home size={24} />
                        </Link>
                    </button>
                    <button className="text-black  hover:text-primary">
                        <Link href={'/'}>
                            <Search size={24} />
                        </Link>
                    </button>
                    <button className="text-black  hover:text-primary">
                        <Link href={'/user/direct-chats'}>
                            <MessageCircle size={24} />
                        </Link>
                    </button>
                    <button className="text-black  hover:text-primary">
                        <Link href={'/user/setting'}>
                            <Settings size={24} />
                        </Link>
                    </button>
                </div>
            </div>
            <div className="w-min space-x-4  rounded-full bg-white/40 p-4 shadow-xl backdrop-blur-md hover:text-primary">
                <Bot />
            </div>
        </div>
    );
}

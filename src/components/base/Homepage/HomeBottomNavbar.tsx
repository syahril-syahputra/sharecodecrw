'use client';
import React, { useState } from 'react';
import {
    Bell,
    Bot,
    Home,
    Menu,
    MessageCircle,
    Search,
    Settings,
} from 'lucide-react';
import clsx from 'clsx';

export default function HomeBottomNavbar() {
    const [open, setopen] = useState(false);
    return (
        <div className="fixed bottom-0 left-0 right-0 flex items-center justify-center space-x-4 p-4">
            <div className=" bottom-4 left-1/2 flex -translate-x-1/2 transform items-center  overflow-hidden rounded-full bg-white px-6 py-3 shadow-lg">
                <button
                    className="text-black"
                    onClick={() => setopen((prev) => !prev)}
                >
                    <Menu size={24} />
                </button>
                <div
                    className={clsx(
                        'flex transform gap-6 overflow-hidden transition-transform duration-300',
                        open
                            ? 'ml-6 max-w-full -translate-x-0 opacity-100'
                            : 'max-w-0 -translate-x-full opacity-0'
                    )}
                >
                    <button className="text-black">
                        <Home size={24} />
                    </button>
                    <button className="text-black">
                        <Search size={24} />
                    </button>
                    <button className="text-black">
                        <Bell size={24} />
                    </button>
                    <button className="text-black">
                        <MessageCircle size={24} />
                    </button>
                    <button className="text-black">
                        <Settings size={24} />
                    </button>
                </div>
            </div>
            <div className="w-min space-x-4 rounded-full bg-white/40 p-4 shadow-2xl backdrop-blur-md">
                <Bot />
            </div>
            {/* <div className="flex w-min space-x-4 rounded-full bg-white/40 p-4 shadow-xl backdrop-blur-md">
                    {user && (
                        <Link href={'/user'}>
                            <Home />
                        </Link>
                    )}
                    <Link href={'/'}>
                        <Search />
                    </Link>
                </div> */}
        </div>
    );
}

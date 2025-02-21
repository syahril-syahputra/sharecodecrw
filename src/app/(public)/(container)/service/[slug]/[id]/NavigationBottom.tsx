'use client';
import React from 'react';
import { ArrowLeft, Bot, MessageCircle, Pin, Star } from 'lucide-react';
import Link from 'next/link';

export default function NavigationBottom() {
    return (
        <div className="fixed bottom-0 left-0 right-0 flex items-center justify-center space-x-4 p-4">
            <div className="flex w-min space-x-6 overflow-x-hidden rounded-full bg-white/40 p-4 shadow-xl backdrop-blur-md">
                <button className="text-black  hover:text-primary">
                    <ArrowLeft size={24} />
                </button>

                <button className="text-black   hover:text-primary">
                    <Link href={'/'}>
                        <Pin size={24} />
                    </Link>
                </button>
                <button className="text-black  hover:text-primary">
                    <Link href={'/'}>
                        <Star size={24} />
                    </Link>
                </button>
                <button className="text-black  hover:text-primary">
                    <Link href={'/user/direct-chats'}>
                        <MessageCircle size={24} />
                    </Link>
                </button>
            </div>
            <div className="w-min space-x-4  rounded-full bg-white/40 p-4 shadow-xl backdrop-blur-md hover:text-primary">
                <Bot />
            </div>
        </div>
    );
}

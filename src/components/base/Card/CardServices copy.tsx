import { Card } from '@/components/ui/card';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import Rating from '@/components/ui/rating';
import { Radius } from 'lucide-react';

export default function CardServices() {
    return (
        <Card className="rounded-2xl bg-gradient-to-bl from-gray-700 to-black p-8 text-white shadow-lg">
            <div>
                <div className="relative max-w-sm overflow-hidden rounded-lg bg-black p-6 text-white shadow-lg">
                    <div className="absolute -top-72 left-1/2 h-96 w-96 -translate-x-1/2 transform rounded-full bg-blue-800 opacity-40 blur-2xl"></div>
                    <div className="relative text-white">
                        <h2 className="mb-4 text-3xl font-bold">
                            House Moving
                        </h2>
                        <p className="bg-gradient-to-b from-gray-200 to-transparent bg-clip-text text-transparent">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex items-center space-x-4 font-bold capitalize">
                <Avatar>
                    <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span>User Name</span>
            </div>
            <div className="flex justify-between space-x-8 py-8">
                <div className="flex-1 space-y-4">
                    <h1 className="text-2xl font-semibold">Title Services</h1>
                    <h2 className="text-xl">
                        Officia occaecat eiusmod commodo duis qui duis pariatur
                        eiusmod excepteur ut cillum cillum nisi. Est cillum
                        fugiat fugiat reprehenderit reprehenderit exercitation.
                        Excepteur nostrud sint officia reprehenderit.
                    </h2>
                </div>
                <Image
                    src={'https://picsum.photos/200/300'}
                    width={100}
                    height={100}
                    alt="picture"
                    className="h-48 w-48 rounded-2xl"
                />
            </div>
            <div className="flex justify-between">
                <Rating star={4} rater={100} />
                <div className="flex items-center space-x-2 px-4 text-gray-200">
                    <Radius /> <span>32Km</span>
                </div>
                <div className="flex-1 text-right">
                    <span className="text-2xl font-bold">$450</span>{' '}
                    <span className="text-base">/ month</span>
                </div>
            </div>
        </Card>
    );
}

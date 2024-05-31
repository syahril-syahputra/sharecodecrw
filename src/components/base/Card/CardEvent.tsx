import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import React from 'react';

export default function CardEvent() {
    return (
        <div className="space-y-2 rounded-md border p-4 shadow-md">
            <div className="bg-border p-4">
                <Image
                    alt="image"
                    src={'/icons/image.png'}
                    className=" mx-auto"
                    width={108}
                    height={108}
                />
            </div>
            <div className="font-semibold">Title</div>
            <div className="flex items-start justify-between">
                <div>Province/City</div>
                <Badge variant={'secondary'}>Badge</Badge>
            </div>
        </div>
    );
}

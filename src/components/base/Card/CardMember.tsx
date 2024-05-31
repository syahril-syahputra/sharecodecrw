import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Check } from 'lucide-react';
export default function CardMember() {
    return (
        <section className="space-y-4 p-4 text-center">
            <Avatar className="mx-auto h-32 w-32">
                <AvatarImage src="/icons/user.png" />
                <AvatarFallback>C</AvatarFallback>
            </Avatar>
            <div>Username</div>
            <div className="flex items-center justify-center">
                <Check />
            </div>
            <div className="text-sm">
                <b>Location</b> : City, Province
            </div>
        </section>
    );
}

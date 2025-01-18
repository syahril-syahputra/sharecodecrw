'use client';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { KeyboardEvent, useState } from 'react';

export default function HomeSearchBar() {
    const [search, setsearch] = useState('');
    const router = useRouter();
    const serachData = () => {
        const query = {
            search,
        };
        const convertObject = new URLSearchParams(query).toString();
        router.push('/search?' + convertObject);
    };
    const handleSearch = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            serachData();
        }
    };
    return (
        <div className="flex flex-1 items-center  divide-x divide-border rounded-full border border-border bg-gray-300 px-4 py-2 shadow-md">
            <div
                className="flex cursor-pointer items-center text-primary hover:text-foreground"
                onClick={serachData}
            >
                <Search size={36} className="px-2 text-gray-600 " />
            </div>
            <Input
                placeholder="Search for service"
                value={search}
                onChange={(v) => setsearch(v.target.value)}
                onKeyDown={handleSearch}
                className="h-min border-0 bg-gray-300 outline-none  focus:ring-0 focus-visible:ring-0"
            />
        </div>
    );
}

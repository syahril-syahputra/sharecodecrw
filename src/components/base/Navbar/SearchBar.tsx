'use client';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { KeyboardEvent, useState } from 'react';

export default function SearchBar() {
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
        <div className="flex flex-1  items-center divide-x divide-border rounded-lg border border-border px-4 py-2 shadow-md">
            <Input
                placeholder="Search"
                value={search}
                onChange={(v) => setsearch(v.target.value)}
                onKeyDown={handleSearch}
                className="h-min border-0  focus:ring-0 focus-visible:ring-0"
            />

            <div
                className="flex cursor-pointer items-center text-primary hover:text-foreground"
                onClick={serachData}
            >
                <Search size={36} className=" px-2 " />
                <span>Search</span>
            </div>
        </div>
    );
}

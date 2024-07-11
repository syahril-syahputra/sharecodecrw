'use client';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { generateUrlforSort } from '@/lib/generateUrl';
import { useRouter } from 'next/navigation';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SortEvent(props: { searchParams: any }) {
    const currentFilter = props.searchParams;
    if (currentFilter.sort_by) {
        delete currentFilter.sort_by;
    }
    const router = useRouter();
    return (
        <section className="block w-full p-4">
            <div className="my-3 flex items-end justify-end">
                <Label className="text-md my-auto mr-2 font-normal">
                    Sort by
                </Label>
                <div className="w-32">
                    <Select
                        onValueChange={(value) => {
                            router.push(
                                generateUrlforSort(
                                    value,
                                    props.searchParams,
                                    '/crowner/communities'
                                )
                            );
                        }}
                        value={props.searchParams.sort_by}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select Sort" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={'latest'}>Latest</SelectItem>
                            <SelectItem value={'oldest'}>Oldest</SelectItem>
                            <SelectItem value={'title'}>Title</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </section>
    );
}

import fetchServer from '@/lib/fetchServer';
import { IOtherUser } from '@/types/user';
import { notFound } from 'next/navigation';
import React from 'react';
import ProfileUser from './client';
async function getData(id: string) {
    try {
        const res = await fetchServer({
            url: `/businesses/registries/${id || ''}`,
        });
        return res.data.data as IOtherUser;
    } catch {
        return notFound();
    }
}

export default async function page({ params }: { params: { id: string } }) {
    const { id } = params;
    const data = await getData(id);
    return <ProfileUser data={data} />;
}

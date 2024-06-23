import fetchServer from '@/lib/fetchServer';
import { IDetailEvent } from '@/types/events';
import { notFound } from 'next/navigation';
import React from 'react';
import FormUpdateEvent from './form';

async function getData(id: string) {
    try {
        const res = await fetchServer({
            url: `/crowner/user-publisher/events/${id || ''}`,
        });
        return res.data.data as IDetailEvent;
    } catch (error) {
        return notFound();
    }
}
export default async function Page({ params }: { params: { id: string } }) {
    const data = await getData(params.id);
    return (
        <div className="container py-8">
            <FormUpdateEvent data={data} />
        </div>
    );
}

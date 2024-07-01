import fetchServer from '@/lib/fetchServer';
import { notFound } from 'next/navigation';
import React from 'react';
import FormUpdateCommunity from './form';
import { IDetailCommunity } from '@/types/community';

async function getData(id: string) {
    try {
        const res = await fetchServer({
            url: `/crowner/user-publisher/communities/${id || ''}`,
        });
        return res.data.data as IDetailCommunity;
    } catch (error) {
        return notFound();
    }
}
export default async function Page({ params }: { params: { id: string } }) {
    const data = await getData(params.id);
    return (
        <div className="container py-8">
            <FormUpdateCommunity data={data} />
        </div>
    );
}

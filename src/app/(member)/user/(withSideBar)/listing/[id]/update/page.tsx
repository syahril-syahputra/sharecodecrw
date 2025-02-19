import fetchServer from '@/lib/fetchServer';
import { notFound } from 'next/navigation';
import React from 'react';
import { IDetailListing } from '@/types/listing';
import FormUpdateListing from './form';

async function getData(id: string) {
    try {
        const res = await fetchServer({
            url: `/businesses/publisher/listings/${id || ''}`,
        });
        return res.data.data as IDetailListing;
    } catch (error) {
        return notFound();
    }
}
export default async function Page({ params }: { params: { id: string } }) {
    const data = await getData(params.id);
    return (
        <div className="container py-8">
            <FormUpdateListing data={data} />
        </div>
    );
}

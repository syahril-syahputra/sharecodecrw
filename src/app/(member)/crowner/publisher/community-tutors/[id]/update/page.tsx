import { notFound } from 'next/navigation';
import fetchServer from '@/lib/fetchServer';
import React from 'react';
import { ICommunityTutor } from '@/types/crowner/community-tutors';
import FormUpdateCommunityTutor from './form';

async function getData(id: string) {
    try {
        const res = await fetchServer({
            url: `/crowner/user-publisher/community-tutors/${id || ''}`,
        });
        return res.data.data as ICommunityTutor;
    } catch {
        return notFound();
    }
}

export default async function Page({ params }: { params: { id: string } }) {
    const data = await getData(params.id);
    return (
        <div className="container py-8">
            <FormUpdateCommunityTutor data={data} />
        </div>
    );
}

import fetchServer from '@/lib/fetchServer';
import React from 'react';
import InterestForm from './InterestForm';
import { IInterest } from '@/types/base/interest';

async function fetchState() {
    try {
        const response = await fetchServer({
            url: '/tags',
        });
        return response.data.data as IInterest[];
    } catch (error) {
        return [];
    }
}
export default async function page() {
    const data = await fetchState();

    return <InterestForm data={data} />;
}

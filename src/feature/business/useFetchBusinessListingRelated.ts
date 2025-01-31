import fetchServer from '@/lib/fetchServer';
import { IServices } from '@/types/services';
import { notFound } from 'next/navigation';

export async function getRelatedListing(
    id: string,
    type: 'business' | 'listing'
) {
    const fetchType =
        type == 'listing'
            ? `&listing_id=${id || ''}`
            : `&business_id=${id || ''}`;
    try {
        const res = await fetchServer({
            url: `/businesses/related-listings?lat=40.79509100&lng=-73.96828500&rad=40${fetchType}`,
        });
        return res.data.data.items as IServices[];
    } catch {
        return [] as IServices[];
    }
}

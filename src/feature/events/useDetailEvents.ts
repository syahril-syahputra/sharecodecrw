import fetchClient from '@/lib/FetchClient';
import { IPaginationMeta } from '@/types/base/pagination';
import { IDetailEvent, IEventInterest, IEventRsvp } from '@/types/events';
import { useQuery } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';

export const useDetailEvent = (id?: string) => {
    return useQuery({
        queryFn: async () => {
            const response = await fetchClient({
                url: `/crowner/user-publisher/events/${id || ''}`,
            });
            return response.data.data as IDetailEvent;
        },
        refetchOnWindowFocus: false,
        queryKey: ['detail.event', id],
    });
};

export const useFetchEventRsvps = (
    id: string | undefined,
    page: PaginationState
) => {
    return useQuery({
        queryFn: async () => {
            const baseUrl = `/crowner/user-publisher/events/${id}/rsvps`;
            const queryParams = new URLSearchParams({
                page: page.pageIndex.toString(),
                paginate: '40',
            });
            const url = `${baseUrl}?${queryParams.toString()}`;
            const response = await fetchClient({
                url,
            });

            return response.data.data as {
                items: IEventRsvp[];
                meta: IPaginationMeta;
            };
        },
        refetchOnWindowFocus: false,
        queryKey: ['detail.eventRsvps', id, page],
    });
};

export const useFetchEventInterest = (
    id: string | undefined,
    page: PaginationState
) => {
    return useQuery({
        queryFn: async () => {
            const baseUrl = `/crowner/user-publisher/events/${id}/interests`;
            const queryParams = new URLSearchParams({
                page: page.pageIndex.toString(),
                paginate: '40',
            });
            const url = `${baseUrl}?${queryParams.toString()}`;
            const response = await fetchClient({
                url,
            });

            return response.data.data as {
                items: IEventInterest[];
                meta: IPaginationMeta;
            };
        },
        refetchOnWindowFocus: false,
        queryKey: ['detail.eventInterests', id, page],
    });
};

import fetchClient from '@/lib/FetchClient';
import { IPaginationMeta, ISortMeta } from '@/types/base/pagination';
import { IDetailEvent, IFilterSubscriberEvent } from '@/types/events';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';

export const useFetchEvents = (
    page: PaginationState,
    filter: IFilterSubscriberEvent,
) => {
    return useQuery({
        queryFn: async () => {
            const baseUrl = `/crowner/events`;
            const queryParams = new URLSearchParams({
                page: page.pageIndex.toString(),
                paginate: '12',
                ...filter
            });
            const url = `${baseUrl}?${queryParams.toString()}`;
            const response = await fetchClient({
                url: url,
            });
            return response.data.data as {
                items: IDetailEvent[];
                meta: IPaginationMeta;
            };
        },
        queryKey: ['fetch.eventSubscriber', page, filter],
        placeholderData: keepPreviousData,
    });
};

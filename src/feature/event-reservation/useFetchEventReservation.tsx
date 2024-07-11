import fetchClient from '@/lib/FetchClient';
import { IPaginationMeta } from '@/types/base/pagination';
import IEventReservation from '@/types/eventReservation';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';

export const useFetchEventReservation = (
    page: PaginationState,
    filter: { listing_type: string },
    sort: string
) => {
    return useQuery({
        queryFn: async () => {
            const baseUrl = `/crowner/user-subscriber/reserved-events`;
            const queryParams = new URLSearchParams({
                page: page.pageIndex.toString(),
                paginate: page.pageSize.toString(),
                ...filter,
                sort,
            });
            const url = `${baseUrl}?${queryParams.toString()}`;
            const response = await fetchClient({
                url: url,
            });
            return response.data.data as {
                items: IEventReservation[];
                meta: IPaginationMeta;
            };
        },
        queryKey: ['fetch.interesertFavorites', page, filter, sort],
        placeholderData: keepPreviousData,
    });
};

import fetchClient from '@/lib/FetchClient';
import { IPaginationMeta, ISortMeta } from '@/types/base/pagination';
import { IDetailEvent, IFilterEvent } from '@/types/events';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';

export const useFetchEvent = (
    page: PaginationState,
    filter: IFilterEvent,
    sort: ISortMeta
) => {
    return useQuery({
        queryFn: async () => {
            const baseUrl = `/crowner/user-publisher/events`;
            const queryParams = new URLSearchParams({
                page: page.pageIndex.toString(),
                paginate: page.pageSize.toString(),
                ...filter,
                ...sort,
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
        queryKey: ['fetch.event', page, filter, sort],
        placeholderData: keepPreviousData,
    });
};

import fetchClient from '@/lib/FetchClient';
import { IPaginationMeta } from '@/types/base/pagination';
import { IAnswer } from '@/types/base/QA';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';

export const useFetchAnswer = (
    enable: boolean,
    id: string,
    page: PaginationState,
    filter: object,
    sort: string
) => {
    return useQuery({
        queryFn: async () => {
            const baseUrl = `/discussions/${id}/answers`;
            const queryParams = new URLSearchParams({
                page: page.pageIndex.toString(),
                paginate: page.pageSize.toString(),
                ...filter,
                // order_by: sort,
            });
            const url = `${baseUrl}?${queryParams.toString()}`;
            const response = await fetchClient({
                url: url,
            });
            return response.data.data as {
                items: IAnswer[];
                meta: IPaginationMeta;
            };
        },
        enabled: enable,
        queryKey: ['fetch.answer', id, page, filter, sort],
        placeholderData: keepPreviousData,
    });
};

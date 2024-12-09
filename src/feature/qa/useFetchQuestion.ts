import fetchClient from '@/lib/FetchClient';
import { IPaginationMeta } from '@/types/base/pagination';
import { IQuestion } from '@/types/base/QA';
import { useInfiniteQuery } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';

export const useFetchQuestion = (
    page: PaginationState,
    filter: { entity_id: string; entity_type: string },
    sort: string
) => {
    return useInfiniteQuery({
        queryFn: async ({ pageParam }) => {
            const baseUrl = `/discussions`;
            const queryParams = new URLSearchParams({
                page: pageParam + '',
                paginate: page.pageSize.toString(),
                ...filter,
                order_by: sort,
            });
            const url = `${baseUrl}?${queryParams.toString()}`;
            const response = await fetchClient({
                url: url,
            });
            return response.data.data as {
                items: IQuestion[];
                meta: IPaginationMeta;
            };
        },
        queryKey: ['fetch.queestion'],
        initialPageParam: 1,
        getNextPageParam: ({ meta }) =>
            meta.page < meta.total_page ? meta.page + 1 : null,
    });
};

import fetchClient from '@/lib/FetchClient';
import { IPaginationMeta, ISortMeta } from '@/types/base/pagination';
import { IFilterServices, IServices } from '@/types/services';
import { useInfiniteQuery } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';

export const useFetchServices = (
    filter: IFilterServices,
    sort: ISortMeta,
    page: PaginationState,
    onSuccess: () => void
) => {
    return useInfiniteQuery({
        queryFn: async ({ pageParam }) => {
            const newFilter = { ...filter };
            delete newFilter.city_id;
            delete newFilter.province_id;
            const baseUrl = `/businesses/listings`;
            const queryParams = new URLSearchParams({
                page: pageParam + '',
                paginate: page.pageSize.toString(),
                ...newFilter,
                ...sort,
            });
            const url = `${baseUrl}?${queryParams.toString()}`;
            const response = await fetchClient({
                url: url,
            });
            onSuccess();
            return response.data.data as {
                items: IServices[];
                meta: IPaginationMeta;
            };
        },
        queryKey: ['fetch.services', filter, sort, page],
        initialPageParam: 1,
        refetchOnWindowFocus: false,
        getNextPageParam: ({ meta }) =>
            meta.page < meta.total_page ? meta.page + 1 : null,
    });
};

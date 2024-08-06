import fetchClient from '@/lib/FetchClient';
import { INotification } from '@/types/base/notification';
import { IPaginationMeta } from '@/types/base/pagination';
import { useInfiniteQuery } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';

export const useFetchNotification = (page: PaginationState) => {
    return useInfiniteQuery({
        queryFn: async ({ pageParam }) => {
            console.log(pageParam);
            const baseUrl = `/notifications`;
            const queryParams = new URLSearchParams({
                page: pageParam + '',
                paginate: page.pageSize.toString(),
            });
            const url = `${baseUrl}?${queryParams.toString()}`;
            const response = await fetchClient({
                url: url,
            });
            return response.data.data as {
                items: INotification[];
                meta: IPaginationMeta;
            };
        },
        queryKey: ['fetch.notification'],
        initialPageParam: 1,
        getNextPageParam: ({ meta }) =>
            meta.page < meta.total_page ? meta.page + 1 : null,
    });
};

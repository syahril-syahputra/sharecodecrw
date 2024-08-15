import fetchClient from '@/lib/FetchClient';
import { IPaginationMeta } from '@/types/base/pagination';
import { IChat } from '@/types/chat';
import { useInfiniteQuery } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';

export const useFetchHistoryChat = (roomId: string, page: PaginationState) => {
    return useInfiniteQuery({
        queryFn: async ({ pageParam }) => {
            console.log(pageParam);
            const baseUrl = `/messages/group/` + roomId;
            const queryParams = new URLSearchParams({
                page: pageParam + '',
                paginate: page.pageSize.toString(),
            });
            const url = `${baseUrl}?${queryParams.toString()}`;
            const response = await fetchClient({
                url: url,
            });
            return response.data.data as {
                items: IChat[];
                meta: IPaginationMeta;
            };
        },
        queryKey: ['fetch.historyChat'],
        initialPageParam: 1,
        getNextPageParam: ({ meta }) =>
            meta.page < meta.total_page ? meta.page + 1 : null,
    });
};

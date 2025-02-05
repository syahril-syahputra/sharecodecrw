import fetchClient from '@/lib/FetchClient';
import { IPaginationMeta } from '@/types/base/pagination';
import { IChatHistory } from '@/types/chat';
import { useInfiniteQuery } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';

export const useFetchHistoryDirectChat = (
    roomId: string,
    page: PaginationState,
    onSuccess: () => void
) => {
    return useInfiniteQuery({
        queryFn: async ({ pageParam }) => {
            const baseUrl = `/messages/direct-messages/${roomId}/conversations`;
            const queryParams = new URLSearchParams({
                page: pageParam + '',
                paginate: page.pageSize.toString(),
            });
            const url = `${baseUrl}?${queryParams.toString()}`;
            const response = await fetchClient({
                url: url,
            });
            onSuccess();
            return response.data.data as {
                items: IChatHistory[];
                meta: IPaginationMeta;
            };

            // const items: IChatHistory[] = response.data.data.data
            // const meta: IPaginationMeta = response.data.data.meta
            // return {
            //     items,
            //     meta
            // }
        },
        queryKey: ['fetch.historyDirectChat'],
        initialPageParam: 1,
        refetchOnWindowFocus: false,
        getNextPageParam: ({ meta }) =>
            meta.page < meta.total_page ? meta.page + 1 : null,
    });
};

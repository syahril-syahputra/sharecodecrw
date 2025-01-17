import fetchClient from '@/lib/FetchClient';
import { IPaginationMeta } from '@/types/base/pagination';
import { IChatHistory } from '@/types/chat';
import { useInfiniteQuery } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';

export const useFetchChatRooms = (
    page: PaginationState,
    onSuccess: () => void
) => {
    return useInfiniteQuery({
        queryFn: async ({ pageParam }) => {
            const baseUrl = `/messages/direct-chats`;
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
        },
        queryKey: ['fetch.direct-chat-rooms'],
        initialPageParam: 1,
        refetchOnWindowFocus: false,
        getNextPageParam: ({ meta }) =>
            meta.page < meta.total_page ? meta.page + 1 : null,
    });
};

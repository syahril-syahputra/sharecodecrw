import fetchClient from '@/lib/FetchClient';
import { IPaginationMeta } from '@/types/base/pagination';
import { IConversationRoom } from '@/types/chat';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';

export const useFetchConversationRooms = (
    page: PaginationState,
    filter: { listing_type: string },
    sort: string
) => {
    return useQuery({
        queryFn: async () => {
            const baseUrl = `/messages/direct-messages`;
            const queryParams = new URLSearchParams({
                page: page.pageIndex.toString(),
                paginate: page.pageSize.toString(),
                ...filter,
                sort_by: sort,
            });
            const url = `${baseUrl}?${queryParams.toString()}`;
            const response = await fetchClient({
                url: url,
            });
            return response.data.data as {
                items: IConversationRoom[];
                meta: IPaginationMeta;
            };
        },
        queryKey: ['fetch.conversationRooms', page, filter, sort],
        placeholderData: keepPreviousData,
    });
};

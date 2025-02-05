import fetchClient from '@/lib/FetchClient';
import { IConversationDetail } from '@/types/chat';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useFetchConversationRoom = (id: string) => {
    return useQuery({
        queryFn: async () => {
            const response = await fetchClient({
                url: `/messages/direct-messages/${id}`,
            });
            return response.data.data as IConversationDetail;
        },
        queryKey: ['fetch.conversationRoom'],
        placeholderData: keepPreviousData,
    });
};

import fetchClient from '@/lib/FetchClient';
import { IPaginationMeta } from '@/types/base/pagination';
import {
    ICommunityTutor,
    ICommunityTutorInterest,
} from '@/types/crowner/community-tutors';
import { useQuery } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';

export const useFetchCommunityTutor = (id?: string) => {
    return useQuery({
        queryFn: async () => {
            const response = await fetchClient({
                url: `/crowner/user-publisher/community-tutors/${id || ''}`,
            });
            return response.data.data as ICommunityTutor;
        },
        refetchOnWindowFocus: false,
        enabled: !!id,
        queryKey: ['detail.tutor', id],
    });
};

export const useFetchCommunityTutorInterest = (
    id: string | undefined,
    page: PaginationState
) => {
    return useQuery({
        queryFn: async () => {
            const baseUrl = `/crowner/user-publisher/community-tutors/${id}/interests`;
            const queryParams = new URLSearchParams({
                page: page.pageIndex.toString(),
                paginate: '40',
            });
            const url = `${baseUrl}?${queryParams.toString()}`;
            const response = await fetchClient({
                url,
            });

            return response.data.data as {
                items: ICommunityTutorInterest[];
                meta: IPaginationMeta;
            };
        },
        refetchOnWindowFocus: false,
        queryKey: ['detail.tutorInterest', id, page],
    });
};

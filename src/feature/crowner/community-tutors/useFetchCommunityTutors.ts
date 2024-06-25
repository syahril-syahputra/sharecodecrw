import fetchClient from '@/lib/FetchClient';
import { IPaginationMeta, ISortMeta } from '@/types/base/pagination';
import { ICommunityTutor, IFilterCommunityTutor } from '@/types/crowner/community-tutors';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';

export const useFetchCommunityTutors = (
    page: PaginationState,
    filter: IFilterCommunityTutor,
    sort: ISortMeta
) => {
    return useQuery({
        queryFn: async () => {
            const baseUrl = `/crowner/user-publisher/community-tutors`;
            const queryParams = new URLSearchParams({
                page: page.pageIndex.toString(),
                paginate: page.pageSize.toString(),
                ...filter,
                ...sort,
            });
            const url = `${baseUrl}?${queryParams.toString()}`;
            const response = await fetchClient({
                url: url,
            });
            return response.data.data as {
                items: ICommunityTutor[];
                meta: IPaginationMeta;
            };
        },
        queryKey: ['fetch.tutors', page, filter, sort],
        placeholderData: keepPreviousData,
    });
};

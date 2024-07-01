import fetchClient from '@/lib/FetchClient';
import { IPaginationMeta, ISortMeta } from '@/types/base/pagination';
import {
    ICommunityFollower,
    IDetailCommunity,
    IFilterCommunity,
} from '@/types/community';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';

export const useFetchCommunity = (
    page: PaginationState,
    filter: IFilterCommunity,
    sort: ISortMeta
) => {
    return useQuery({
        queryFn: async () => {
            const baseUrl = `/crowner/user-publisher/communities`;
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
                items: IDetailCommunity[];
                meta: IPaginationMeta;
            };
        },
        queryKey: ['fetch.event', page, filter, sort],
        placeholderData: keepPreviousData,
    });
};
export const useFetchCommunityFollowers = (
    id: string | undefined,
    page: PaginationState
) => {
    return useQuery({
        queryFn: async () => {
            const baseUrl = `/crowner/user-publisher/communities/${id}/followers`;
            const queryParams = new URLSearchParams({
                page: page.pageIndex.toString(),
                paginate: '40',
            });
            const url = `${baseUrl}?${queryParams.toString()}`;
            const response = await fetchClient({
                url,
            });

            return response.data.data as {
                items: ICommunityFollower[];
                meta: IPaginationMeta;
            };
        },
        refetchOnWindowFocus: false,
        queryKey: ['detail.communityFollowers', id, page],
    });
};

import fetchClient from '@/lib/FetchClient';
import { IPaginationMeta } from '@/types/base/pagination';
import { IInterestFavorites } from '@/types/interestsFavorites';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';

export const useFetchInterestsFavorites = (
    page: PaginationState,
    filter: { listing_type: string },
    sort: string
) => {
    return useQuery({
        queryFn: async () => {
            const baseUrl = `/crowner/user-subscriber/interests`;
            const queryParams = new URLSearchParams({
                page: page.pageIndex.toString(),
                paginate: page.pageSize.toString(),
                ...filter,
                sort,
            });
            const url = `${baseUrl}?${queryParams.toString()}`;
            const response = await fetchClient({
                url: url,
            });
            return response.data.data as {
                items: IInterestFavorites[];
                meta: IPaginationMeta;
            };
        },
        queryKey: ['fetch.interesertFavorites', page, filter, sort],
        placeholderData: keepPreviousData,
    });
};

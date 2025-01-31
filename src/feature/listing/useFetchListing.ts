import fetchClient from '@/lib/FetchClient';
import { IListing, IListingFilter } from '@/types/listing';
import { ITableMeta, ITableSort } from '@/types/table';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';

export const useFetchListing = (
    page: PaginationState,
    filter: IListingFilter,
    sort: ITableSort
) => {
    return useQuery({
        queryFn: async () => {
            const baseUrl = `/businesses/publisher/listings`;
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
                items: IListing[];
                meta: ITableMeta;
            };
        },
        queryKey: ['fetch.listing', page, filter, sort],
        placeholderData: keepPreviousData,
    });
};

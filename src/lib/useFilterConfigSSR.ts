import { ISortMeta } from '@/types/base/pagination';
import { PaginationState } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ITableConfig<T> {
    baseUrl: string;
    defaultComlumn?: string;
    defaultComlumnType?: 'asc' | 'desc';
    defaultFilter: T;
    pageSize?: number;
}

export default function useFilterConfigSSR<T>(config: ITableConfig<T>) {
    const router = useRouter();
    const intialFilter: T = config.defaultFilter;
    const [filterValue, setfilterValue] = useState<T>(intialFilter);
    const [sort, setsort] = useState<ISortMeta>({
        sort_by: config.defaultComlumn || '',
        sort_type: config.defaultComlumnType || 'asc',
    });
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 1,
        pageSize: config.pageSize || 10,
    });

    const filterHandler = () => {
        setPagination((prev) => ({ ...prev, pageIndex: 1 }));
        const convertObject = new URLSearchParams(
            filterValue as string
        ).toString();
        const url = `${config.baseUrl}?${convertObject}`;
        router.push(url);
    };
    const resetHandler = () => {
        setPagination((prev) => ({ ...prev, pageIndex: 1 }));
        setfilterValue(intialFilter);
        router.push('/crowner/events');
    };
    return {
        filterValue,
        sort,
        pagination,
        setsort,
        setfilterValue,
        setPagination,
        resetHandler,
        filterHandler,
    };
}

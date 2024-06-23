import { ISortMeta } from '@/types/base/pagination';
import { PaginationState } from '@tanstack/react-table';
import { useState } from 'react';

interface ITableConfig<T> {
    defaultComlumn?: string;
    defaultComlumnType?: 'asc' | 'desc';
    defaultFilter: T;
}

export default function useTableConfig<T>(config: ITableConfig<T>) {
    const intialFilter: T = config.defaultFilter;
    const [filterValue, setfilterValue] = useState<T>(intialFilter);
    const [filter, setfilter] = useState<T>(intialFilter);
    const [sort, setsort] = useState<ISortMeta>({
        sort_by: config.defaultComlumn || '',
        sort_type: config.defaultComlumnType || 'asc',
    });
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 1,
        pageSize: 10,
    });

    const filterHandler = () => {
        setPagination((prev) => ({ ...prev, pageIndex: 1 }));
        setfilter(filterValue);
    };
    const resetHandler = () => {
        setPagination((prev) => ({ ...prev, pageIndex: 1 }));
        setfilter(intialFilter);
        setfilterValue(intialFilter);
    };
    return {
        filterValue,
        filter,
        sort,
        pagination,
        setsort,
        setfilterValue,
        setfilter,
        setPagination,
        resetHandler,
        filterHandler,
    };
}

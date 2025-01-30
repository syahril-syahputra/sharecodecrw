export interface ITableMeta {
    page: number;
    paginate: number;
    total_data: number;
    total_page: number;
}
export interface ITableSort {
    sort_by: string;
    sort_type: 'asc' | 'desc';
}

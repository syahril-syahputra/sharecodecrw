export interface IPaginationMeta {
    page: number;
    paginate: number;
    total_data: number;
    total_page: number;
}
export interface ISortMeta {
    sort_by: string;
    sort_type: 'asc' | 'desc';
}

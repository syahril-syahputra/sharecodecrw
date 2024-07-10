/* eslint-disable @typescript-eslint/no-explicit-any */
export function generateUrlforPage(
    page: number,
    currentFilterValue: any,
    baseUrl: string
) {
    const currentFilter = currentFilterValue;
    if (currentFilter.page) {
        delete currentFilter.page;
    }
    if (currentFilter) {
        const convertObject = new URLSearchParams(
            currentFilter as string
        ).toString();
        return baseUrl + '?' + convertObject + '&page=' + page;
    }
    return baseUrl + '?' + '&page=' + page;
}
/* eslint-disable @typescript-eslint/no-explicit-any */
export function generateUrlforSort(
    page: string,
    currentFilterValue: any,
    baseUrl: string
) {
    const currentFilter = currentFilterValue;
    if (currentFilter.sort_by) {
        delete currentFilter.sort_by;
    }
    if (currentFilter) {
        const convertObject = new URLSearchParams(
            currentFilter as string
        ).toString();
        return baseUrl + '?' + convertObject + '&sort_by=' + page;
    }
    return baseUrl + '?' + '&sort_by=' + page;
}

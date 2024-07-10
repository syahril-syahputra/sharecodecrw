/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLabel,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { generateUrlforPage } from '@/lib/generateUrl';
import { IPaginationMeta } from '@/types/base/pagination';
import clsx from 'clsx';
import Link from 'next/link';

interface PageItem {
    meta?: IPaginationMeta;
    baseUrl: string;
    searchParams: string;
}

function PageItem(props: PageItem) {
    let outOfRange = false;

    const meta = props.meta
        ? props.meta
        : { total_page: 1, paginate: 1, page: 1, total_data: 0 };

    return Array.from({ length: meta.total_page }, (_, i) => {
        if (
            i <= 2 ||
            i >= meta.total_page - 2 ||
            Math.abs(i - meta.page) <= 2
        ) {
            {
                outOfRange = false;
                return (
                    <Link
                        href={generateUrlforPage(
                            i + 1,
                            props.searchParams,
                            props.baseUrl
                        )}
                    >
                        <PaginationItem key={i} className="hidden md:block">
                            <PaginationLabel isActive={meta.page === i + 1}>
                                {i + 1}
                            </PaginationLabel>
                        </PaginationItem>
                    </Link>
                );
            }
        } else {
            if (!outOfRange) {
                outOfRange = true;
                return (
                    <PaginationItem key={i} className="hidden md:block">
                        <PaginationEllipsis />
                    </PaginationItem>
                );
            }
        }
    });
}
export default function SSRPagination(props: PageItem) {
    const meta = props.meta
        ? props.meta
        : { total_page: 1, paginate: 1, page: 1, total_data: 0 };

    if (meta.total_data !== 0) {
        return (
            <Pagination className="rounded-xl">
                <PaginationContent className="flex w-full justify-between  md:justify-center">
                    <Link
                        className={clsx(
                            meta.page > 1 ? 'visible' : 'invisible'
                        )}
                        href={generateUrlforPage(
                            meta.page - 1,
                            props.searchParams,
                            props.baseUrl
                        )}
                        // href={props.url + '&page=' + (meta.page - 1)}
                    >
                        <PaginationItem>
                            <PaginationPrevious />
                        </PaginationItem>
                    </Link>
                    <PageItem
                        meta={meta}
                        baseUrl={props.baseUrl}
                        searchParams={props.searchParams}
                    />
                    <div className="sm:hidden">Page {meta.page}</div>
                    <Link
                        className={clsx(
                            meta.page < meta.total_page
                                ? 'visible'
                                : 'invisible'
                        )}
                        href={generateUrlforPage(
                            meta.page + 1,
                            props.searchParams,
                            props.baseUrl
                        )}
                    >
                        <PaginationItem>
                            <PaginationNext />
                        </PaginationItem>
                    </Link>
                </PaginationContent>
            </Pagination>
        );
    } else {
        return null;
    }
}

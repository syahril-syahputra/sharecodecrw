import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLabel,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { IPaginationMeta } from '@/types/base/pagination';
import { PaginationState } from '@tanstack/react-table';
import clsx from 'clsx';

interface PageItem {
    meta?: IPaginationMeta;
    setPagination: (page: PaginationState) => void;
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
                    <PaginationItem
                        onClick={() =>
                            props.setPagination({
                                pageIndex: i + 1,
                                pageSize: meta.paginate,
                            })
                        }
                        key={i}
                        className="hidden md:block"
                    >
                        <PaginationLabel isActive={meta.page === i + 1}>
                            {i + 1}
                        </PaginationLabel>
                    </PaginationItem>
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
export default function PaginationTable(props: PageItem) {
    const meta = props.meta
        ? props.meta
        : { total_page: 1, paginate: 1, page: 1, total_data: 0 };

    if (meta.total_data !== 0) {
        return (
            <Pagination className="rounded-xl">
                <PaginationContent className="flex w-full justify-between  md:justify-center">
                    <PaginationItem
                        onClick={() =>
                            props.setPagination({
                                pageIndex: meta.page - 1,
                                pageSize: meta.paginate,
                            })
                        }
                        className={clsx(
                            meta.page > 1 ? 'visible' : 'invisible'
                        )}
                    >
                        <PaginationPrevious />
                    </PaginationItem>
                    <PageItem meta={meta} setPagination={props.setPagination} />
                    <div className="sm:hidden">Page {meta.page}</div>
                    <PaginationItem
                        onClick={() =>
                            props.setPagination({
                                pageIndex: meta.page + 1,
                                pageSize: meta.paginate,
                            })
                        }
                        className={clsx(
                            meta.page < meta.total_page
                                ? 'visible'
                                : 'invisible'
                        )}
                    >
                        <PaginationNext />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        );
    } else {
        return null;
    }
}

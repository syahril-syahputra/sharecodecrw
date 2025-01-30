import {
    ColumnDef,
    PaginationState,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { ReactNode, useMemo } from 'react';
import { Skeleton } from './skeleton';
import { ITableMeta, ITableSort } from '@/types/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronDown } from 'lucide-react';
import PaginationTable from './pagination-table';
import clsx from 'clsx';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from './button';
import { ScrollArea, ScrollBar } from './scroll-area';

interface DataTableProps<TData, TValue> {
    topLeft?: string | ReactNode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    columns: ColumnDef<TData, TValue | any>[];
    data?: TData[];
    meta?: ITableMeta;
    loading: boolean;
    error: Error | null;
    sort?: ITableSort;
    className?: string;
    setSort?: (page: ITableSort) => void;
    setPagination: (page: PaginationState) => void;
}

function TableSkeleton(props: { row: number; col: number }) {
    const renderRows = () => {
        const rows = [];

        for (let i = 0; i < props.row; i++) {
            rows.push(
                <TableRow key={i} className="!bg-muted/50">
                    {renderColumns()}
                </TableRow>
            );
        }

        return rows;
    };
    const renderColumns = () => {
        const columns = [];
        for (let i = 0; i < props.col; i++) {
            columns.push(
                <TableCell key={i}>
                    <Skeleton className="h-6 w-full" />
                </TableCell>
            );
        }

        return columns;
    };
    return renderRows();
}

export default function DataTable<TData, TValue>({
    topLeft,
    columns,
    data,
    meta,
    loading,
    error,
    sort,
    className,
    setPagination,
    setSort = () => {},
}: DataTableProps<TData, TValue>) {
    const defaultData = useMemo(() => [], []);
    const table = useReactTable({
        data: data || defaultData,
        columns,
        pageCount: meta?.total_page ?? -1,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
    });

    const SortIcon = (props: { columnId: string }) => {
        if (sort?.sort_by === props.columnId) {
            return sort.sort_type === 'asc' ? (
                <ArrowUp className=" h-4 w-4 dark:text-white" />
            ) : (
                <ArrowDown className=" h-4 w-4 dark:text-white" />
            );
        } else {
            return <ArrowUpDown className=" h-4 w-4" />;
        }
    };
    const sortHandler = (id: string = '') => {
        setSort({
            sort_by: id,
            sort_type:
                id === sort?.sort_by
                    ? sort?.sort_type === 'asc'
                        ? 'desc'
                        : 'asc'
                    : 'asc',
        });
    };
    return (
        <div className="rounded-lg ">
            <div className="flex items-center justify-between p-4">
                <div className="font-bold">{topLeft}</div>

                <div className="flex items-center justify-end space-x-4">
                    <span className="hidden md:inline-block">
                        Filter Column{' '}
                    </span>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" className="ml-auto">
                                Columns <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    );
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <a>|</a>
                    <span>Show </span>
                    <div className="w-[80px] text-center">
                        <Select
                            onValueChange={(value) =>
                                setPagination({
                                    pageIndex: 1,
                                    pageSize: parseInt(value),
                                })
                            }
                            value={meta?.paginate.toString()}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Row per page" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="15">15</SelectItem>
                                <SelectItem value="50">50</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <span className="hidden md:block">
                        from <b>{meta?.total_data}</b> rows
                    </span>
                </div>
            </div>
            <ScrollArea className={clsx(className)}>
                <Table>
                    <TableHeader className="">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow
                                key={headerGroup.id}
                                className="!bg-slate-800 "
                            >
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className="!text-gray-300"
                                        >
                                            {header.column.columnDef
                                                .enableSorting ? (
                                                <div
                                                    onClick={() =>
                                                        sortHandler(
                                                            header.column
                                                                .columnDef.id
                                                        )
                                                    }
                                                    className="flex cursor-pointer justify-between space-x-2 !text-gray-300 hover:text-slate-300 dark:hover:text-white"
                                                >
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                              header.column
                                                                  .columnDef
                                                                  .header,
                                                              header.getContext()
                                                          )}
                                                    {header.column.columnDef
                                                        .enableSorting && (
                                                        <SortIcon
                                                            columnId={
                                                                header.column
                                                                    .columnDef
                                                                    .id || ''
                                                            }
                                                        />
                                                    )}
                                                </div>
                                            ) : header.isPlaceholder ? null : (
                                                flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext()
                                                )
                                            )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    {error && (
                        <TableBody>
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center text-red-500"
                                >
                                    {error?.message}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    )}
                    {loading && (
                        <TableBody>
                            <TableSkeleton
                                col={columns.length}
                                row={meta?.paginate || 10}
                            />
                        </TableBody>
                    )}
                    {!loading && !error && (
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={
                                            row.getIsSelected() && 'selected'
                                        }
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    )}
                </Table>
                <ScrollBar orientation="horizontal" />
                <ScrollBar orientation="vertical" />
            </ScrollArea>
            <PaginationTable meta={meta} setPagination={setPagination} />
        </div>
    );
}

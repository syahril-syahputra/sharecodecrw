'use client';
import { createColumnHelper } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import useTableConfig from '@/lib/useTableConfig';
import { ListRestart, Plus, Search } from 'lucide-react';
import dayjs from 'dayjs';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import DataTable from '@/components/ui/data-table';
import { useFetchListing } from '@/feature/listing/useFetchListing';
import CardDarkNeonGlow from '@/components/base/Card/CardDarkNeonGlow';
import { IListing, IListingFilter } from '@/types/listing';
import { InputCustom } from '@/components/ui/inputCustom';
import Link from 'next/link';

export default function Page() {
    const {
        filterValue,
        filter,
        sort,
        pagination,
        setsort,
        resetHandler,
        setfilter,
        filterHandler,
        setPagination,
        setfilterValue,
    } = useTableConfig<IListingFilter>({
        defaultFilter: {
            title: '',
            acceptance_status: '',
        },
    });
    const [titleSearch, settitleSearch] = useState('');

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        const checkTextChange = () => {
            timeoutId = setTimeout(() => {
                setfilter(filterValue);
            }, 500);
        };
        checkTextChange();
        return () => clearTimeout(timeoutId);
    }, [filterValue]);

    const { error, data, isFetching } = useFetchListing(
        pagination,
        filter,
        sort
    );
    const columnHelper = createColumnHelper<IListing>();
    const columns = [
        columnHelper.display({
            id: 'number',
            header: () => <span className="block text-center">No.</span>,
            cell: (props) => (
                <span className="block text-center">
                    {props.row.index +
                        1 +
                        (pagination.pageIndex - 1) * pagination.pageSize}
                </span>
            ),
            enableHiding: false,
        }),
        columnHelper.accessor('title', {
            id: 'title',
            header: () => <span>Title</span>,
            cell: (info) => info.getValue(),
            enableSorting: true,
        }),
        columnHelper.accessor('acceptance_status', {
            id: 'acceptance_status',
            header: () => <span>Acceptance Status</span>,
            cell: (info) => (
                <span className="capitalize">{info.getValue()}</span>
            ),
            enableSorting: true,
        }),
        columnHelper.accessor('city', {
            id: 'city',
            header: () => <span>City</span>,
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('province', {
            id: 'province',
            header: () => <span>Province</span>,
            cell: (info) => info.getValue(),
        }),

        // columnHelper.accessor("is_published", {
        //     id: "is_published",
        //     header: () => <span>Publish</span>,
        //     cell: (info) => (info.getValue() ? "Published" : "Unpublish"),
        // }),

        columnHelper.accessor('created_at', {
            id: 'created_at',
            header: () => <span>Created At</span>,
            cell: (info) =>
                dayjs(info.getValue()).format(' MMM DD, YYYY HH:mm:ss'),
            enableSorting: true,
        }),

        columnHelper.display({
            id: 'actions',
            cell: (props) => (
                <div className="text-right">
                    <Link href={'/user/listing/' + props.row.original.id}>
                        <Button variant={'secondary'}>View</Button>
                    </Link>
                </div>
            ),
            enableHiding: false,
        }),
    ];

    return (
        <CardDarkNeonGlow className=" mx-4 ">
            <div className="space-y-8 p-0">
                <h1 className="text-2xl font-bold">Listing</h1>

                <div className="flex flex-1 items-center rounded-lg border border-gray-400 p-4">
                    <div className="grid  flex-1 grid-cols-4 gap-4">
                        <InputCustom
                            className="w-full"
                            placeholder="Insert Title "
                            value={titleSearch}
                            onChange={(e) => {
                                const val: string = e.target.value;
                                settitleSearch(val);
                                if (e.target.value.length >= 3) {
                                    setfilterValue({
                                        ...filterValue,
                                        title: e.target.value,
                                    });
                                }
                            }}
                        />

                        <Select
                            onValueChange={(
                                value:
                                    | ''
                                    | 'all'
                                    | 'created'
                                    | 'awaiting_approval'
                                    | 'published'
                                    | 'rejected'
                                    | 'expired'
                            ) =>
                                setfilterValue({
                                    ...filterValue,
                                    acceptance_status:
                                        value === 'all' ? '' : value,
                                })
                            }
                            value={filterValue.acceptance_status}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Acceptance Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={'all'}>All</SelectItem>
                                <SelectItem value={'created'}>
                                    Created
                                </SelectItem>
                                <SelectItem value={'awaiting_approval'}>
                                    Awaiting Approval
                                </SelectItem>
                                <SelectItem value={'published'}>
                                    Published
                                </SelectItem>

                                <SelectItem value={'rejected'}>
                                    Rejected
                                </SelectItem>

                                <SelectItem value={'expired'}>
                                    Expired
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="w-auto pr-4">
                        <Button onClick={filterHandler}>
                            <Search className="mr-2" />
                            Search
                        </Button>
                        <Button variant={'ghost'} onClick={resetHandler}>
                            <ListRestart className="mr-2" />
                            Reset
                        </Button>
                    </div>
                </div>

                <DataTable
                    topLeft={
                        <Link href={'/user/listing/create'}>
                            <Button size="sm">
                                <Plus />
                                Create Listing
                            </Button>
                        </Link>
                    }
                    columns={columns}
                    data={data?.items}
                    meta={data?.meta}
                    loading={isFetching}
                    error={error}
                    sort={sort}
                    setPagination={setPagination}
                    setSort={setsort}
                    className="min-h-80 md:h-[calc(100vh-350px)]"
                />
            </div>
        </CardDarkNeonGlow>
    );
}

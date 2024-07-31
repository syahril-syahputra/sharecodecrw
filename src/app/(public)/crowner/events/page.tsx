import CardEvent from '@/components/base/Card/CardEvent';
// import { useFetchEvents } from '@/feature/crowner/subscriber/events/useFetchEvents';
import Link from 'next/link';
import FilterEvent from './filter';
import fetchServer from '@/lib/fetchServer';
import { IDetailEvent } from '@/types/events';
import { IPaginationMeta } from '@/types/base/pagination';
import SSRPagination from '@/components/ui/ssr-pagination';
import SortEvent from './sort';
async function getData(filter: string | undefined) {
    try {
        const baseUrl = `/crowner/events`;
        const convertObject = new URLSearchParams(filter).toString();
        const url = `${baseUrl}?paginate=12&${convertObject}`;
        console.log(url);
        const res = await fetchServer({
            url: url,
        });
        return res.data.data as {
            items: IDetailEvent[];
            meta: IPaginationMeta;
        };
    } catch {
        // return notFound();
    }
}
export default async function Page({
    searchParams,
}: {
    searchParams?: string;
}) {
    const data = await getData(searchParams);
    return (
        <div className="mt-10  w-full">
            <div className="flex ">
                <FilterEvent searchParams={searchParams || ''} />
                <div className="flex-1 ">
                    <SortEvent searchParams={searchParams || ''} />
                    {/* {isError && (
                        <ErrorMessage>
                            {error.message || 'Samething Wrong'}
                        </ErrorMessage>
                    )} */}
                    <section className="p-4">
                        <div className="">
                            {data?.items.length === 0 && (
                                <div className=" w-full bg-primary-foreground p-8 text-center">
                                    Data Not Found
                                </div>
                            )}
                            {data && data?.items.length > 0 && (
                                <>
                                    <div className="grid flex-1 grid-cols-3 gap-4">
                                        {data.items.map(
                                            (item: IDetailEvent) => (
                                                <Link
                                                    href={
                                                        '/crowner/events/' +
                                                        item.slug +
                                                        '/' +
                                                        item.id
                                                    }
                                                    key={item.id}
                                                >
                                                    <CardEvent
                                                        variant="vertical"
                                                        data={item}
                                                    />
                                                </Link>
                                            )
                                        )}
                                    </div>
                                    <div className="mt-8">
                                        <SSRPagination
                                            meta={data?.meta}
                                            baseUrl="/crowner/events"
                                            searchParams={searchParams || ''}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

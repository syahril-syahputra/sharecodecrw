// import { useFetchEvents } from '@/feature/crowner/subscriber/events/useFetchEvents';
import Link from 'next/link';
import FilterEvent from './filter';
import fetchServer from '@/lib/fetchServer';
import { IPaginationMeta } from '@/types/base/pagination';
import SSRPagination from '@/components/ui/ssr-pagination';
import SortEvent from './sort';
import CardCommunityTutor from '@/components/base/Card/CardCommunityTutor';
import { ICommunityTutor } from '@/types/crowner/community-tutors';
async function getData(filter: string | undefined) {
    try {
        const baseUrl = `/crowner/community-tutors`;
        const convertObject = new URLSearchParams(filter).toString();

        const sortBy = 'sort_by=latest';

        const url = `${baseUrl}?paginate=12&${sortBy}&${convertObject}`;
        const res = await fetchServer({
            url: url,
        });
        console.log(res);
        return res.data.data as {
            items: ICommunityTutor[];
            meta: IPaginationMeta;
        };
    } catch (error) {
        console.log(error);
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
                                            (item: ICommunityTutor) => (
                                                <Link
                                                    href={
                                                        '/crowner/community-tutors/' +
                                                        item.slug +
                                                        '/' +
                                                        item.id
                                                    }
                                                    key={item.id}
                                                >
                                                    <CardCommunityTutor
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
                                            baseUrl="/crowner/community-tutors"
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

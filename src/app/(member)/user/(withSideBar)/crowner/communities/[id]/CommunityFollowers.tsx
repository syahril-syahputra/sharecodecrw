/* eslint-disable @typescript-eslint/no-explicit-any */
import PaginationTable from '@/components/ui/pagination-table';
import { Skeleton } from '@/components/ui/skeleton';
import { Fragment } from 'react/jsx-runtime';
import useTableConfig from '@/lib/useTableConfig';
import CardListUser from '@/components/base/Card/CardListUser';
import { useFetchCommunityFollowers } from '@/feature/community/useFetchCommunity';

export default function CommunityFollowers({ id }: { id: string | undefined }) {
    const { pagination, setPagination } = useTableConfig({
        defaultFilter: {},
    });
    const { data, isFetching, isError, error } = useFetchCommunityFollowers(
        id,
        pagination
    );

    return (
        <Fragment>
            {isError && (
                <div className="bg-red-500 p-8 text-center font-bold text-white">
                    {(error as any).response?.data.message || error.message}
                </div>
            )}
            {!isFetching && !isError && data?.items?.length == 0 && (
                <p className="mx-auto w-full text-center text-lg text-muted-foreground">
                    This community has no follower
                </p>
            )}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {isFetching &&
                    Array(8)
                        .fill(0)
                        .map((_, i) => {
                            return (
                                <Skeleton key={i} className="h-20 rounded" />
                            );
                        })}
                {!isFetching &&
                    !isError &&
                    data?.items?.map((follower) => {
                        return (
                            <CardListUser
                                key={follower.user_id}
                                userId={follower.user_id}
                                firstName={follower.first_name}
                                lastName={follower.last_name}
                                email={follower.email}
                                profilePict={follower.profile_picture_url}
                            />
                        );
                    })}
            </div>
            <div className="mt-8">
                <PaginationTable
                    meta={data?.meta}
                    setPagination={setPagination}
                />
            </div>
        </Fragment>
    );
}

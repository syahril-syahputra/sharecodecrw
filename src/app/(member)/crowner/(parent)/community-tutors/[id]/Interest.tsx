/* eslint-disable @typescript-eslint/no-explicit-any */
import CardListUser from '@/components/base/Card/CardListUser';
import PaginationTable from '@/components/ui/pagination-table';
import { Skeleton } from '@/components/ui/skeleton';
import { useFetchCommunityTutorInterest } from '@/feature/crowner/community-tutors/useFetchCommunityTutor';
import useTableConfig from '@/lib/useTableConfig';

export default function CommunityTutorInterests(props: {
    id: string | undefined;
}) {
    // Interest
    const {
        pagination: paginationInterest,
        setPagination: setPaginationInterest,
    } = useTableConfig({
        defaultFilter: {},
    });
    const {
        data: dataInterest,
        isFetching: isFetchingInterest,
        isError: isErrorInterest,
        error: errorInterest,
    } = useFetchCommunityTutorInterest(props.id, paginationInterest);

    return (
        <div className="w-full">
            <div>
                {isErrorInterest && (
                    <div className="bg-red-500 p-8 text-center font-bold text-white">
                        {(errorInterest as any).response?.data.message ||
                            errorInterest.message}
                    </div>
                )}
                {!isFetchingInterest &&
                    !isErrorInterest &&
                    dataInterest?.items?.length == 0 && (
                        <p className="mx-auto w-full text-center text-lg text-muted-foreground">
                            This tutor has no interest
                        </p>
                    )}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {isFetchingInterest &&
                        Array(8)
                            .fill(0)
                            .map((_, i) => {
                                return (
                                    <Skeleton
                                        key={i}
                                        className="h-20 rounded"
                                    />
                                );
                            })}
                    {!isFetchingInterest &&
                        !isErrorInterest &&
                        dataInterest?.items?.map((interest) => {
                            return (
                                <CardListUser
                                    key={interest.user_id}
                                    firstName={interest.first_name}
                                    lastName={interest.last_name}
                                    email={interest.email}
                                    profilePict={interest.profile_picture_url}
                                />
                            );
                        })}
                </div>
                <div className="mt-8">
                    <PaginationTable
                        meta={dataInterest?.meta}
                        setPagination={setPaginationInterest}
                    />
                </div>
            </div>
        </div>
    );
}

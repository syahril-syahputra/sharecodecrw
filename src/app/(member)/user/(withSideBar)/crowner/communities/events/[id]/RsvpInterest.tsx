/* eslint-disable @typescript-eslint/no-explicit-any */
import CardListUser from '@/components/base/Card/CardListUser';
import PaginationTable from '@/components/ui/pagination-table';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    useFetchEventInterest,
    useFetchEventRsvps,
} from '@/feature/events/useDetailEvents';
import useTableConfig from '@/lib/useTableConfig';

export default function RsvpInterest(props: { id: string | undefined }) {
    // RSVP
    const { pagination: paginationRsvp, setPagination: setPaginationRsvp } =
        useTableConfig({
            defaultFilter: {},
        });
    const {
        data: dataRsvp,
        isFetching: isFetchingRsvp,
        isError: isErrorRsvp,
        error: errorRsvp,
    } = useFetchEventRsvps(props.id, paginationRsvp);

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
    } = useFetchEventInterest(props.id, paginationInterest);

    return (
        <div className="w-full">
            <Tabs defaultValue="rsvp" className="">
                <TabsList className="mb-4">
                    <TabsTrigger value="rsvp">RSVP</TabsTrigger>
                    <TabsTrigger value="interest">Interest</TabsTrigger>
                </TabsList>
                <TabsContent value="rsvp">
                    {isErrorRsvp && (
                        <div className="bg-red-500 p-8 text-center font-bold text-white">
                            {(errorRsvp as any).response?.data.message ||
                                errorRsvp.message}
                        </div>
                    )}
                    {!isFetchingRsvp &&
                        !isErrorRsvp &&
                        dataRsvp?.items?.length == 0 && (
                            <p className="mx-auto w-full text-center text-lg text-muted-foreground">
                                This event has no reservation
                            </p>
                        )}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {isFetchingRsvp &&
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
                        {!isFetchingRsvp &&
                            !isErrorRsvp &&
                            dataRsvp?.items?.map((rsvp) => {
                                return (
                                    <CardListUser
                                        key={rsvp.user_id}
                                        userId={rsvp.user_id}
                                        firstName={rsvp.first_name}
                                        lastName={rsvp.last_name}
                                        email={rsvp.email}
                                        profilePict={rsvp.profile_picture_url}
                                    />
                                );
                            })}
                    </div>
                    <div className="mt-8">
                        <PaginationTable
                            meta={dataRsvp?.meta}
                            setPagination={setPaginationRsvp}
                        />
                    </div>
                </TabsContent>
                <TabsContent value="interest">
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
                                This event has no interest
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
                                        userId={interest.user_id}
                                        firstName={interest.first_name}
                                        lastName={interest.last_name}
                                        email={interest.email}
                                        image_url={interest.image_url}
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
                </TabsContent>
            </Tabs>
        </div>
    );
}

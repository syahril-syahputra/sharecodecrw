'use client';
import LoadingPage from '@/components/base/Loading/LoadingPage';
import IframeMap from '@/components/base/Maps/IframeMap';
import TitlePage from '@/components/base/Title/TitlePage';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useFetchCommunityTutor } from '@/feature/crowner/community-tutors/useFetchCommunityTutor';
import { DollarSign, Edit, MapPin, MessageCircleHeart } from 'lucide-react';
import Image from 'next/image';
import { visibilityStatus } from '@/lib/visibilityStatus';
import CommunityTutorVisibility from './Visibility';
import DeleteCommunityTutor from './Delete';
import { Button } from '@/components/ui/button';
import CommunityTutorInterests from './Interest';
import AcceptanceStatus from '@/components/base/ListingUtilities/AcceptanceStatus';
import VisibilityStatus from '@/components/base/ListingUtilities/VisibilityStatus';

export default function Page({ params }: { params: { id: string } }) {
    const { data, isLoading, refetch } = useFetchCommunityTutor(params.id);

    if (isLoading) {
        return (
            <div className="flex-1">
                <LoadingPage />
            </div>
        );
    }

    return (
        <div className="container py-8">
            <TitlePage className="mb-4 border-b">{data?.title}</TitlePage>
            <section className="flex items-center justify-between">
                <div className="space-y-4">
                    <div className="space-x-2">
                        {data?.tags.map((tag) => {
                            return <Badge key={tag.id}>{tag.title}</Badge>;
                        })}
                    </div>
                    <div className="my-auto space-x-3">
                        <AcceptanceStatus
                            acceptance={data?.acceptance_status}
                        />
                        <VisibilityStatus is_visible={data?.is_visible} />
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <CommunityTutorVisibility
                        refetch={refetch}
                        id={params.id}
                        visibility={data?.is_visible}
                    />
                    <a
                        href={`/crowner/publisher/community-tutors/${params.id}/update`}
                    >
                        <Button size={'sm'} variant={'secondary'}>
                            <Edit className="mr-2" />
                            Edit
                        </Button>
                    </a>
                    <DeleteCommunityTutor id={params.id} />
                </div>
            </section>
            <section>
                <div className="lg:flex-cols space-x-4 space-y-2 py-4 lg:flex lg:justify-between lg:space-x-2 lg:space-y-0">
                    <div className="w-full rounded-xl shadow-md lg:w-3/5">
                        <div className="mb-4 rounded-xl border">
                            <Image
                                width={300}
                                height={300}
                                alt={data?.title || ''}
                                src={data?.image_url || '/image/no-image.png'}
                                className="w-full rounded-t-xl"
                            />
                        </div>
                        <div className="mb-8 space-y-6 p-4">
                            <div className="text-xl font-semibold">
                                Community Tutor About
                            </div>
                            <span>{data?.about}</span>
                        </div>
                    </div>
                    <div className="w-full lg:w-2/5">
                        <div className="space-y-2 rounded-xl border p-4 shadow-md">
                            <div className="flex flex-row">
                                <div className="flex-none">
                                    <MapPin className="text-primary" />
                                </div>
                                <div className="grid-grow grid pl-4">
                                    <span className="font-semibold">
                                        {data?.address}
                                    </span>
                                    <span className="text-muted-foreground">
                                        {data?.city}, {data?.province}
                                    </span>
                                </div>
                            </div>
                            <div className="mb-4">
                                <IframeMap
                                    latitude={data?.latitude}
                                    longitude={data?.longitude}
                                />
                            </div>
                            <div className="flex flex-row">
                                <div className="flex-none">
                                    <MessageCircleHeart className="text-primary" />
                                </div>
                                <div className="grow pl-4">
                                    <span>
                                        <span className="font-semibold">
                                            {data?.interest_counter
                                                ? data?.interest_counter
                                                : 'No'}
                                        </span>{' '}
                                        people interest in this tutor
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-row">
                                <div className="flex-none">
                                    <DollarSign className="text-primary" />
                                </div>
                                <div className="grow pl-4">
                                    {data?.hourly_rate == 0 && (
                                        <span className="font-semibold text-primary">
                                            {data?.hourly_rate_formatted}
                                        </span>
                                    )}
                                    {data?.hourly_rate != 0 && (
                                        <>
                                            <span className="text-primary">
                                                {data?.hourly_rate_formatted}
                                            </span>
                                            <span className="text-sm text-muted-foreground">
                                                {' '}
                                                / hour
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <Separator className="my-6 w-auto" />
                <CommunityTutorInterests id={data?.id} />
            </section>
        </div>
    );
}

import IframeMap from '@/components/base/Maps/IframeMap';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import fetchServer from '@/lib/fetchServer';
import {
    Contact,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
    ShieldCheck,
    SquareArrowOutUpRight,
    UserCheck,
} from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { IBusinessListing } from '@/types/business/listings';
import Rating from '@/components/ui/rating';
import RateBusiness from '@/components/base/Rate/RateBusiness';
import Link from 'next/link';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import CardService from '@/components/base/Card/CardService';
import { getCurrentUser } from '@/lib/session';
import QuestionAndAnswerDark from '@/components/base/QuestionAndAnswerDark';
import { Button } from '@/components/ui/button';
import { IServices } from '@/types/services';
import { getRelatedListing } from '@/feature/business/useFetchBusinessListingRelated';

async function getData(id: string) {
    try {
        const res = await fetchServer({
            url: `/businesses/listings/${id || ''}?lat=40.79509100&lng=-73.96828500`,
        });
        return res.data.data as IBusinessListing;
    } catch {
        return notFound();
    }
}

export default async function Page({ params }: { params: { id: string } }) {
    const user = await getCurrentUser();
    const data = await getData(params.id);
    const relatedListing = await getRelatedListing(params.id, 'listing');
    const initialUserName = data?.cmp_name ? data?.cmp_name.charAt(0) : '';
    return (
        <div className="container space-y-4 py-8">
            <section className="flex items-start justify-between space-x-4">
                <div className="relative flex-1 space-y-4 overflow-hidden rounded-xl bg-gradient-to-b from-teal-700 to-gray-900 p-20">
                    <div className="space-y-10">
                        <div className="z-20 mb-4 rounded-xl">
                            <Image
                                width={500}
                                height={500}
                                alt={data?.title || ''}
                                src={data?.image_url || '/image/no-image.png'}
                                className="mr-4 max-h-96 w-full rounded-md object-cover"
                            />
                        </div>
                        <div className="mb-8">
                            <div className="text-6xl font-semibold text-white">
                                {data.title}
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <Avatar>
                                    <AvatarImage src={data.cmp_image_url} />
                                    <AvatarFallback>
                                        {initialUserName}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="font-urbanist text-white">
                                    {data.cmp_name}
                                </span>
                            </div>
                            <div className="flex items-center space-x-2 font-light">
                                {data.is_company ? (
                                    <Badge className="flex bg-gray-900 p-2 px-4">
                                        <ShieldCheck className="mr-2" />
                                        Company
                                    </Badge>
                                ) : (
                                    <Badge className="flex bg-gray-900 p-2 px-4">
                                        <UserCheck className="mr-2" />
                                        Individual
                                    </Badge>
                                )}
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center space-x-2 font-urbanist">
                                <Badge className="bg-gray-700 bg-gray-900 p-2 font-light">
                                    {data.service_name}
                                </Badge>
                            </div>
                        </div>
                        <div className="font-urbanist text-lg font-light text-white">
                            <span>{data.description}</span>
                        </div>
                        <div className="flex justify-center">
                            <Rating
                                variant={'big'}
                                star={data.rating || 0}
                                rater={data.total_reviews}
                            />
                        </div>
                        <div>
                            <div className="mb-3 text-4xl text-white">
                                Similar Services
                            </div>
                            <Carousel className="">
                                <CarouselContent className="space-x-4">
                                    {relatedListing?.map((data: IServices) => (
                                        <CarouselItem
                                            key={data.id}
                                            className="basis-96"
                                        >
                                            <Link
                                                href={`/service/${data.slug}/${data.id}`}
                                                key={data.id}
                                            >
                                                <CardService
                                                    image_url={
                                                        data?.image_url ?? ''
                                                    }
                                                    title={data.title}
                                                    price={data.price}
                                                    payment_type={
                                                        data.payment_type
                                                    }
                                                    variant='full'
                                                />
                                            </Link>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </div>
                        <QuestionAndAnswerDark
                            user_id={user?.id || ''}
                            entity_id={params.id}
                            entity_type="business_listings"
                        />
                    </div>
                </div>
                <div className="w-4/12 space-y-6 rounded-xl bg-gray-900 p-10">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <Avatar>
                                <AvatarImage src={data.cmp_image_url} />
                                <AvatarFallback>
                                    {initialUserName}
                                </AvatarFallback>
                            </Avatar>
                            <span className="font-urbanist text-white">
                                {data.cmp_name}
                            </span>
                        </div>
                        <div className="flex items-center space-x-2 font-light">
                            {data.is_company ? (
                                <Badge className="flex bg-gray-500 px-3">
                                    <ShieldCheck className="mr-2" size={18} />
                                    Company
                                </Badge>
                            ) : (
                                <Badge className="flex bg-gray-500 px-3">
                                    <UserCheck className="mr-2" size={18} />
                                    Individual
                                </Badge>
                            )}
                        </div>
                        <Link
                            href={`/profile/${data.cmp_id}`}
                            className="text-primary"
                        >
                            <SquareArrowOutUpRight size={16} />
                        </Link>
                    </div>
                    <div>
                        <span className="font-urbanist font-thin text-white">
                            {data.cmp_about}
                        </span>
                    </div>
                    <div className="flex justify-center">
                        <div className="">
                            <p className="mb-1 text-lg text-white">
                                Rate {data.cmp_name}
                            </p>
                            <div className="flex justify-center">
                                <RateBusiness
                                    businessId={data.cmp_id}
                                    rate={data.rating}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center space-x-2 text-white">
                            <Contact size={22} />
                            <span className="text-xl">Contact</span>
                        </div>
                        {data?.phone && (
                            <div className="">
                                <div className="flex items-center space-x-2 font-urbanist font-thin text-white">
                                    <Phone size={15} />
                                    <span className="text-md">
                                        {data.phone}
                                    </span>
                                </div>
                            </div>
                        )}
                        {data?.email && (
                            <div className="">
                                <div className="flex items-center space-x-2 font-urbanist font-thin text-white">
                                    <Mail size={15} />
                                    <span className="text-md">
                                        {data.email}
                                    </span>
                                </div>
                            </div>
                        )}
                        <div className="mt-4">
                            <div className="mb-1 flex items-start space-x-2 font-urbanist font-thin text-white">
                                <div>
                                    <MapPin
                                        size={15}
                                        className="mt-1 text-white"
                                    />
                                </div>
                                <span className="text-md">{data.address}</span>
                            </div>
                            <div className="mb-4">
                                <IframeMap
                                    latitude={data?.latitude}
                                    longitude={data?.longitude}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="text-xl text-white">
                            <p className="font-bold">${data.price}</p>
                            <p className="font-urbanist text-sm">
                                {data.payment_type}
                            </p>
                        </div>
                        <div>
                            <Button className="rounded-full">
                                <MessageCircle className="mr-2" />
                                Message
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

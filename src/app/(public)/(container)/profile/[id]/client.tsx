import CardDarkNeonGlow from '@/components/base/Card/CardDarkNeonGlow';
import RateBusiness from '@/components/base/Rate/RateBusiness';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { emptyValueCheck } from '@/lib/utils';
import { IOtherUser } from '@/types/user';
import {
    BookMarked,
    Contact,
    Mail,
    MapPin,
    Notebook,
    Phone,
    ShieldCheck,
    Star,
    UserCheck,
} from 'lucide-react';
import { Fragment } from 'react';
import Link from 'next/link';
import CardService from '@/components/base/Card/CardService';
import { IServices } from '@/types/services';

export default function ProfileUser(props: {
    data: IOtherUser;
    relatedListing: IServices[];
}) {
    const { data } = props;

    const initialUserName = data?.cmp_name ? data?.cmp_name.charAt(0) : '';
    return (
        <CardDarkNeonGlow className="mt-4">
            <div className="space-y-10 px-10 pb-20 pt-20">
                <div className="flex space-x-4">
                    <div className="my-auto">
                        <Avatar className="h-24 w-24">
                            <AvatarImage
                                src={data?.image_url}
                                alt={data?.cmp_name}
                            />
                            <AvatarFallback>{initialUserName}</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="space-y-3">
                        <div className="flex space-x-4">
                            <p className="text-3xl font-semibold">
                                {data?.cmp_name}
                            </p>
                            <div className="mt-2">
                                {data?.is_company ? (
                                    <div className="flex space-x-2">
                                        <ShieldCheck />
                                        <span>Company</span>
                                    </div>
                                ) : (
                                    <div className="flex space-x-2">
                                        <UserCheck />
                                        <span>Individual</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            {data?.total_reviews == 0 ? (
                                <span className="text-lg italic text-muted-foreground">
                                    No review
                                </span>
                            ) : (
                                <div className="flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Fragment key={star}>
                                            {star <= (data?.rating ?? 0) && (
                                                <Star
                                                    fill="#3b82f6"
                                                    strokeWidth={0}
                                                />
                                            )}
                                            {star > (data?.rating ?? 0) && (
                                                <Star
                                                    fill="gray"
                                                    strokeWidth={0}
                                                />
                                            )}
                                        </Fragment>
                                    ))}
                                    <span className="ml-2 text-muted-foreground">
                                        {data?.total_reviews}
                                    </span>
                                </div>
                            )}
                            <RateBusiness
                                variant="blue"
                                rate={data?.rating ?? 0}
                                businessId={data?.id ?? ''}
                            />
                        </div>
                        <div>
                            {data?.service_name && (
                                <Badge className="bg-gray-700 px-4 py-2 text-sm font-light">
                                    {data?.service_name}
                                </Badge>
                            )}
                        </div>
                    </div>
                </div>
                {/* about */}
                <div className="space-y-5">
                    <div>
                        <div className="flex items-center space-x-2">
                            <BookMarked size={25} />
                            <span className="text-2xl font-semibold">
                                About
                            </span>
                        </div>
                        <span>
                            {emptyValueCheck(
                                data?.about ?? '',
                                <span className="italic text-muted-foreground">
                                    no about given
                                </span>
                            )}
                        </span>
                    </div>
                    <div>
                        <div className="flex items-center space-x-2">
                            <Contact size={25} />
                            <span className="text-2xl font-semibold">
                                Contact
                            </span>
                        </div>
                        {data?.phone_number && (
                            <div className="flex items-center space-x-2 font-thin text-white">
                                <Phone size={15} />
                                <span className="text-md">
                                    {data?.phone_number}
                                </span>
                            </div>
                        )}
                        {data?.email && (
                            <div className="flex items-center space-x-2 font-thin text-white">
                                <Mail size={15} />
                                <span className="text-md">{data?.email}</span>
                            </div>
                        )}
                        {data?.address && (
                            <div className="flex items-center space-x-2 font-thin text-white">
                                <MapPin size={15} />
                                <span className="text-md">
                                    {data?.city}, {data?.province} |{' '}
                                    {data?.address}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
                {/* listings */}
                <div>
                    <div className="mb-4 flex items-center space-x-2">
                        <Notebook size={25} />
                        <span className="text-2xl font-semibold">Listings</span>
                    </div>
                    <Carousel className="">
                        <CarouselContent className="space-x-4">
                            {props.relatedListing?.map((data: IServices) => (
                                <CarouselItem
                                    key={data.id}
                                    className="basis-96"
                                >
                                    <Link
                                        href={`/service/${data.slug}/${data.id}`}
                                        key={data.id}
                                    >
                                        <CardService
                                            image_url={data?.image_url ?? ''}
                                            title={data.title}
                                            price={data.price}
                                            payment_type={data.payment_type}
                                        />
                                    </Link>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </div>
        </CardDarkNeonGlow>
    );
}

import CardDarkNeonGlow from "@/components/base/Card/CardDarkNeonGlow";
import RateBusiness from "@/components/base/Rate/RateBusiness";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { emptyValueCheck } from "@/lib/utils";
import { IOtherUser } from "@/types/user";
import { BookMarked, Contact, Mail, MapPin, Notebook, Phone, ShieldCheck, Star, UserCheck } from "lucide-react";
import { Fragment } from "react";
import Link from 'next/link';
import CardService from "@/components/base/Card/CardService";

export default function ProfileUser(props: { data: IOtherUser }) {
    const { data } = props;

    const initialUserName =
        data?.cmp_name
            ? data?.cmp_name.charAt(0)
            : '';
    return (
        <CardDarkNeonGlow>
            <div className="pt-20 px-10 space-y-10 pb-20">
                <div className="flex space-x-4">
                    <div className="my-auto">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={data?.image_url} alt={data?.cmp_name}/>
                            <AvatarFallback>{initialUserName}</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="space-y-3">
                        <div className="flex space-x-4">
                            <p className="text-3xl font-semibold">{data?.cmp_name}</p>
                            <div className="mt-2">
                                {data?.is_company ? (
                                    <div className="flex space-x-2">
                                        <ShieldCheck/>
                                        <span>Company</span>
                                    </div>
                                ) : (
                                    <div className="flex space-x-2">
                                        <UserCheck/>
                                        <span>Individual</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex space-x-4 items-center">
                            {data?.total_reviews == 0 ? (
                                <span className="text-muted-foreground italic text-lg">No review</span>
                            ) : (
                                <div className="flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Fragment key={star}>
                                            {star <= data?.rating! && 
                                                <Star fill="#3b82f6" strokeWidth={0}/>
                                            }
                                            {star > data?.rating! && 
                                                <Star fill="gray" strokeWidth={0}/>
                                            }
                                        </Fragment>
                                    ))}
                                    <span className="text-muted-foreground ml-2">{data?.total_reviews}</span>
                                </div>
                            )}
                            <RateBusiness variant='blue' rate={data?.rating!} businessId={data?.id!}/>
                        </div>
                        <div>
                            {data?.service_name && (
                                <Badge className="bg-gray-700 px-4 py-2 font-light text-sm">
                                    {data?.service_name}
                                </Badge>
                            )}
                        </div>
                    </div>                    
                </div>
                {/* about */}
                <div className="space-y-5">
                    <div>
                        <div className="flex space-x-2 items-center">
                            <BookMarked size={25}/>
                            <span className="text-2xl font-semibold">About</span>
                        </div>
                        <span>
                            {emptyValueCheck(data?.about!, <span className="text-muted-foreground italic">no about given</span>)}
                        </span>
                    </div>
                    <div>
                        <div className="flex items-center space-x-2">
                            <Contact size={25} />
                            <span className="text-2xl font-semibold">Contact</span>
                        </div>
                        {data?.phone_number && (
                            <div className="flex items-center space-x-2 font-thin text-white">
                                <Phone size={15} />
                                <span className="text-md">{data?.phone_number}</span>
                            </div>
                        )}
                        {data?.email && (
                            <div className="flex items-center space-x-2 font-thin text-white">
                                <Mail size={15} />
                                <span className="text-md">
                                    {data?.email}
                                </span>
                            </div>
                        )}
                         {data?.address && (
                            <div className="flex items-center space-x-2 font-thin text-white">
                                <MapPin size={15} />
                                <span className="text-md">
                                    {data?.city}, {data?.province} | {data?.address}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
                {/* listings */}
                <div>
                    <div className="flex space-x-2 items-center mb-4">
                        <Notebook size={25}/>
                        <span className="text-2xl font-semibold">Listings</span>
                    </div>
                    <Carousel className="">
                        <CarouselContent className="space-x-4">
                            {/* {props.data?.events.map((data) => ( */}
                                <CarouselItem
                                    key={data.id}
                                    className="basis-96"
                                >
                                    <Link
                                        href={'/crowner/events/'}
                                        key={data.id}
                                    >
                                        <CardService image_url={data?.image_url!} title="House moving" price="66" payment_type="per hour"/>
                                    </Link>
                                </CarouselItem>
                                <CarouselItem
                                    key={data.id}
                                    className="basis-96"
                                >
                                    <Link
                                        href={'/crowner/events/'}
                                        key={data.id}
                                    >
                                        <CardService image_url={data?.image_url!} title="House moving" price="66" payment_type="per hour"/>
                                    </Link>
                                </CarouselItem>
                                <CarouselItem
                                    key={data.id}
                                    className="basis-96"
                                >
                                    <Link
                                        href={'/crowner/events/'}
                                        key={data.id}
                                    >
                                        <CardService image_url={data?.image_url!} title="House moving" price="66" payment_type="per hour"/>
                                    </Link>
                                </CarouselItem>
                                <CarouselItem
                                    key={data.id}
                                    className="basis-96"
                                >
                                    <Link
                                        href={'/crowner/events/'}
                                        key={data.id}
                                    >
                                        <CardService image_url={data?.image_url!} title="House moving" price="66" payment_type="per hour"/>
                                    </Link>
                                </CarouselItem>
                                <CarouselItem
                                    key={data.id}
                                    className="basis-96"
                                >
                                    <Link
                                        href={'/crowner/events/'}
                                        key={data.id}
                                    >
                                        <CardService image_url={data?.image_url!} title="House moving" price="66" payment_type="per hour"/>
                                    </Link>
                                </CarouselItem>
                            {/* ))} */}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </div>
            
        </CardDarkNeonGlow>
    )
}
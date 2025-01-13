import IframeMap from '@/components/base/Maps/IframeMap';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import fetchServer from '@/lib/fetchServer';
import { ICommercialListing } from '@/types/commercial/listings';
import {
    Contact,
    Globe,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
    ShieldCheck,
    Star,
    StarHalf,
} from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';

async function getData(id: string) {
    try {
        const res = await fetchServer({
            url: `/commercials/listings/${id || ''}`,
        });
        return res.data.data as ICommercialListing;
    } catch {
        return notFound();
    }
}

export default async function Page({ params }: { params: { id: string } }) {
    const data = await getData(params.id);
    return (
        <div className="container space-y-4 py-8">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/commercial/listings">
                            Services
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{data.title}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <section className="flex items-start justify-between space-x-4">
                <div className="relative flex-1 space-y-4 overflow-hidden rounded-xl bg-gradient-to-b from-teal-700 to-gray-900 p-16">
                    <div className="space-y-10">
                        <div className="z-20 mb-4 rounded-xl border">
                            <Image
                                width={300}
                                height={300}
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
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <span className="text-white">Kadek Cahya</span>
                            </div>
                            <div className="flex items-center">
                                <Badge className="flex bg-gray-900 p-2 px-4">
                                    <ShieldCheck />
                                    Company
                                </Badge>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center space-x-2">
                                <Badge className="bg-gray-700 bg-gray-900 p-2 font-light">
                                    Education
                                </Badge>
                                <Badge className="bg-gray-700 bg-gray-900 p-2 font-light">
                                    Consultant
                                </Badge>
                            </div>
                        </div>
                        <div className="text-lg font-light text-white">
                            <span>
                                Improving educational opportunities has always
                                been at the center of achieving sustainable and
                                inclusive economic growth. As automation and
                                artificial intelligence raise the bar for
                                workplace skills, the power of education to
                                transform individual and societal trajectories
                                has never been higher. Yet deep inequalities
                                remain between and within countries – in access,
                                quality, and affordability of education.
                                McKinsey is committed to improving lifelong
                                learning opportunities and outcomes around the
                                globe by collaborating with clients on their
                                top-of-mind issues while always keeping equity
                                at the forefront of our work. Our teams include
                                former teachers, institutional leaders,
                                policymakers, and researchers with deep
                                expertise across all levels of education from
                                early childhood and K-12 to higher education and
                                workforce development.
                            </span>
                        </div>
                        <div className="flex justify-center">
                            <div className="flex items-center">
                                <span className="text-6xl text-blue-500">
                                    4.5
                                </span>
                                <div className="">
                                    <p className="font-thin text-white">
                                        15k Endorsements
                                    </p>
                                    <div className="flex space-x-1 text-blue-500">
                                        <Star />
                                        <Star />
                                        <Star />
                                        <Star />
                                        <StarHalf />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-white">
                            <div className="mb-3 text-4xl">
                                Similar Services
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <div className="h-40 w-48 rounded-xl bg-gray-500 p-4">
                                    <span className="bottom-0 text-sm">
                                        Service
                                    </span>
                                </div>
                                <div className="h-40 w-48 rounded-xl bg-gray-500 p-4">
                                    <span className="bottom-0 text-sm">
                                        Service
                                    </span>
                                </div>
                                <div className="h-40 w-48 rounded-xl bg-gray-500 p-4">
                                    <span className="bottom-0 text-sm">
                                        Service
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="text-white">
                            <div className="mb-3 text-4xl">Q&A</div>
                            <div>
                                <div className="mb-2 flex items-center space-x-2">
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div className="">
                                        <p className="font-normal text-white">
                                            Cahya
                                        </p>
                                        <span className="font-light">
                                            Can i join it for free?
                                        </span>
                                    </div>
                                </div>
                                <div className="ml-20 flex items-center space-x-2">
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div className="">
                                        <p className="font-normal text-white">
                                            Kadek
                                        </p>
                                        <span className="font-light">
                                            Yes you can?
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-2/5 space-y-6 rounded-xl bg-gray-900 p-16">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <span className="text-white">Kadek Cahya</span>
                        </div>
                        <div className="flex items-center">
                            <Badge className="flex bg-gray-500 p-1 px-4">
                                <ShieldCheck />
                                Company
                            </Badge>
                        </div>
                    </div>
                    <div>
                        <span className="font-thin text-white">
                            Snoopy is an anthropomorphic beagle in the comic
                            strip Peanuts by Charles M. Schulz. He also appears
                            in all of the Peanuts films and television specials.
                        </span>
                    </div>
                    <div className="flex justify-center">
                        <div className="">
                            <p className="text-2xl text-white">
                                Rate Kadek Cahya
                            </p>
                            <div className="flex justify-center">
                                <Badge className="bg-amber-500 p-2">
                                    <Star />
                                    <Star />
                                    <Star />
                                    <Star />
                                    <Star />
                                </Badge>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center space-x-2 text-white">
                            <Contact size={22} />
                            <span className="text-xl">Contact</span>
                        </div>
                        <div className="ml-4">
                            <div className="flex items-center space-x-2 font-thin text-white">
                                <Phone size={15} />
                                <span className="text-md">000 000 000 000</span>
                            </div>
                        </div>
                        <div className="ml-4">
                            <div className="flex items-center space-x-2 font-thin text-white">
                                <Globe size={15} />
                                <span className="text-md">www.crowner.com</span>
                            </div>
                        </div>
                        <div className="ml-4">
                            <div className="flex items-center space-x-2 font-thin text-white">
                                <Mail size={15} />
                                <span className="text-md">
                                    kdkchy@gmail.com
                                </span>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="flex items-center space-x-2 font-thin text-white">
                                <MapPin size={15} />
                                <span className="text-md">
                                    123street, Richmond BC
                                </span>
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
                            <p>$99.99</p>
                            <p className="text-sm font-thin">per hour</p>
                        </div>
                        <div>
                            <Badge className="bg-blue-500 px-5 py-2 text-lg">
                                <MessageCircle className="mr-2" />
                                Message
                            </Badge>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

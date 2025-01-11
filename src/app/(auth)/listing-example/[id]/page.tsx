import IframeMap from "@/components/base/Maps/IframeMap";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import fetchServer from "@/lib/fetchServer";
import { emptyValueCheck } from "@/lib/utils";
import { ICommercialListing } from "@/types/commercial/listings";
import { Contact, Globe, Mail, MapPin, MessageCircle, Phone, ShieldCheck, Star, StarHalf } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge"

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
                <div className="p-16 overflow-hidden relative flex-1 space-y-4 rounded-xl bg-gradient-to-b from-teal-700 to-gray-900">
                    <div className="space-y-10">
                        <div className="mb-4 rounded-xl border z-20">
                            <Image
                                width={300}
                                height={300}
                                alt={data?.title || ''}
                                src={data?.image_url || '/image/no-image.png'}
                                className="mr-4 max-h-96 w-full rounded-md object-cover"
                            />
                        </div>
                        <div className="mb-8">
                            <div className="text-6xl font-semibold text-white">{data.title}</div>
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
                                <Badge className="bg-gray-900 p-2 flex px-4"><ShieldCheck/>Company</Badge>
                            </div>           
                        </div>
                        <div>
                            <div className="flex items-center space-x-2">
                                <Badge className="bg-gray-900 p-2 font-light bg-gray-700">Education</Badge>
                                <Badge className="bg-gray-900 p-2 font-light bg-gray-700">Consultant</Badge>
                            </div>
                        </div>
                        <div className="text-white text-lg font-light">
                            <span>
                                Improving educational opportunities has always been at the center of achieving sustainable and inclusive economic growth. As automation and artificial intelligence raise the bar for workplace skills, the power of education to transform individual and societal trajectories has never been higher. Yet deep inequalities remain between and within countries – in access, quality, and affordability of education.
                                McKinsey is committed to improving lifelong learning opportunities and outcomes around the globe by collaborating with clients on their top-of-mind issues while always keeping equity at the forefront of our work. Our teams include former teachers, institutional leaders, policymakers, and researchers with deep expertise across all levels of education from early childhood and K-12 to higher education and workforce development.
                            </span>
                        </div>
                        <div className="flex justify-center">
                            <div className="flex items-center">
                                <span className="text-6xl text-blue-500">4.5</span>
                                <div className="">
                                    <p className="text-white font-thin">15k Endorsements</p>
                                    <div className="flex space-x-1 text-blue-500"><Star/><Star/><Star/><Star/><StarHalf/></div>
                                </div>
                            </div>
                        </div>
                        <div className="text-white">
                            <div className="text-4xl mb-3">Similar Services</div>
                            <div className="grid grid-cols-3 gap-2">
                                <div className="w-48 h-40 bg-gray-500 rounded-xl p-4">
                                    <span className="bottom-0 text-sm">Service</span>
                                </div>
                                <div className="w-48 h-40 bg-gray-500 rounded-xl p-4">
                                    <span className="bottom-0 text-sm">Service</span>
                                </div>
                                <div className="w-48 h-40 bg-gray-500 rounded-xl p-4">
                                    <span className="bottom-0 text-sm">Service</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-white">
                            <div className="text-4xl mb-3">Q&A</div>
                            <div>
                                <div className="flex items-center space-x-2 mb-2">
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div className="">
                                        <p className="text-white font-normal">Cahya</p>
                                        <span className="font-light">Can i join it for free?</span>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2 ml-20">
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div className="">
                                        <p className="text-white font-normal">Kadek</p>
                                        <span className="font-light">Yes you can?</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-2/5 bg-gray-900 p-16 rounded-xl space-y-6">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <span className="text-white">Kadek Cahya</span>
                        </div>
                        <div className="flex items-center">
                            <Badge className="bg-gray-500 p-1 flex px-4"><ShieldCheck/>Company</Badge>
                        </div>           
                    </div>
                    <div>
                        <span className="text-white font-thin">Snoopy is an anthropomorphic beagle in the comic strip Peanuts by Charles M. Schulz. He also appears in all of the Peanuts films and television specials.</span>
                    </div>
                    <div className="flex justify-center">
                        <div className="">
                            <p className="text-white text-2xl">Rate Kadek Cahya</p>
                            <div className="flex justify-center">
                                <Badge className="bg-amber-500 p-2"><Star/><Star/><Star/><Star/><Star/></Badge>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex text-white items-center space-x-2">
                            <Contact size={22}/>
                            <span className="text-xl">Contact</span>
                        </div>
                        <div className="ml-4">
                            <div className="flex text-white font-thin items-center space-x-2">
                                <Phone size={15}/>
                                <span className="text-md">000 000 000 000</span>
                            </div>
                        </div>
                        <div className="ml-4">
                            <div className="flex text-white font-thin items-center space-x-2">
                                <Globe size={15}/>
                                <span className="text-md">www.crowner.com</span>
                            </div>
                        </div>
                        <div className="ml-4">
                            <div className="flex text-white font-thin items-center space-x-2">
                                <Mail size={15}/>
                                <span className="text-md">kdkchy@gmail.com</span>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="flex text-white font-thin items-center space-x-2">
                                <MapPin size={15}/>
                                <span className="text-md">123street, Richmond BC</span>
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
                        <div className="text-white text-xl">
                            <p>$99.99</p>
                            <p className="font-thin text-sm">per hour</p>
                        </div>
                        <div>
                            <Badge className="px-5 py-2 bg-blue-500 text-lg"><MessageCircle className="mr-2"/>Message</Badge>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}
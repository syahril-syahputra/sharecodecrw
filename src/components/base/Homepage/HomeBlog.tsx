import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';

export default function HomeBlog() {
    return (
        <div>
            {/* <div className="-mb-6 h-24 w-full -skew-x-[2deg] -skew-y-[2deg]  bg-red-200"></div> */}
            <div className="h-[24px] w-0 border-b-[0vw] border-r-[100vw] border-t-[5vw] border-r-white border-t-transparent "></div>
            {/* <div className="inline-block h-0 w-full border-b-[50px] border-r-0 border-t-0 border-solid border-b-blue-500 border-l-[100%] border-l-transparent border-r-transparent border-t-transparent"></div> */}
            <div className="bg-white">
                <div className="container flex items-center justify-between ">
                    <div className="max-w-lg  flex-1 ">
                        <h1 className="mb-4 font-koulen text-4xl font-bold">
                            BLOGS
                        </h1>
                        <p className="mb-6 font-inter text-lg text-gray-700">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry&apos;s standard dummy text ever since the
                            1500s, when an unknown printer took a galley of type
                            and scrambled it to make a type specimen book.
                        </p>
                        <Button variant={'secondary'}>Read now</Button>
                    </div>
                    <div className="flex max-w-6xl items-center gap-10 p-10">
                        {/* Section Text */}

                        <div className="flex flex-1 justify-center gap-5">
                            <div className="relative">
                                <div className="absolute inset-0 mb-8 translate-x-2 translate-y-2 skew-x-[3deg]  skew-y-[3deg] rounded-lg bg-gray-400 "></div>
                                <Image
                                    src="https://picsum.photos/300/400"
                                    alt="Random"
                                    width={200}
                                    height={300}
                                    className="h-64 w-48 skew-x-[3deg]  skew-y-[3deg] rounded-lg object-cover shadow-lg"
                                />
                            </div>
                            <div className="relative pt-8">
                                <div className="absolute inset-0 mt-9 translate-x-2 translate-y-2 skew-x-[3deg]  skew-y-[3deg] rounded-lg bg-gray-400 "></div>
                                <Image
                                    src="https://picsum.photos/300/400"
                                    alt="Random"
                                    width={200}
                                    height={300}
                                    className="h-64 w-48 skew-x-[3deg]  skew-y-[3deg] rounded-lg object-cover shadow-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

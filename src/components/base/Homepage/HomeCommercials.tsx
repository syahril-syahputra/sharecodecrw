import React from 'react';
import CardCommercials from '../Card/CardCommercials';

export default function HomeCommercials() {
    return (
        <div className="bg-white">
            <div className="h-[24px] w-0 border-b-[0vw] border-l-[100vw] border-t-[5vw] border-l-[#E9F2FF] border-t-transparent "></div>
            <div className="bg-[#E9F2FF]">
                <div className="container  py-8">
                    <h2 className="py-2 text-center font-koulen text-4xl">
                        COMMERCIALS
                    </h2>
                    <div className="grid grid-cols-3 gap-8 p-10">
                        <CardCommercials
                            data={{
                                image_url: 'https://picsum.photos/300/200',
                                title: 'Lawyer',
                            }}
                        />
                        <CardCommercials
                            data={{
                                image_url: 'https://picsum.photos/300/200',
                                title: 'Lawyer',
                            }}
                        />
                        <CardCommercials
                            data={{
                                image_url: 'https://picsum.photos/300/200',
                                title: 'Lawyer',
                            }}
                        />
                        <CardCommercials
                            data={{
                                image_url: 'https://picsum.photos/300/200',
                                title: 'Lawyer',
                            }}
                        />
                        <CardCommercials
                            data={{
                                image_url: 'https://picsum.photos/300/200',
                                title: 'Lawyer',
                            }}
                        />
                        <CardCommercials
                            data={{
                                image_url: 'https://picsum.photos/300/400',
                                title: 'Lawyer',
                            }}
                        />
                    </div>
                    <div className="mx-auto max-w-xl py-4 text-center text-xl">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry&apos;s standard dummy text ever since the
                        1500s.
                    </div>
                </div>
            </div>
        </div>
    );
}

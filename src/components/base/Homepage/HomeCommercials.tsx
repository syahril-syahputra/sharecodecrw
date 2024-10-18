import React from 'react';
import CardCommercials from '../Card/CardCommercials';

export default function HomeCommercials() {
    return (
        <div className="scroll-mt-20 bg-white" id="commercials">
            <div className="bg-[#E9F2FF]">
                <div className="container  pb-32 pt-8">
                    <h2 className="pb-2 pt-8 text-center font-koulen text-6xl">
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

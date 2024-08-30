import CardCommunityTutor from '@/components/base/Card/CardCommunityTutor';
import fetchServer from '@/lib/fetchServer';
import { IPaginationMeta } from '@/types/base/pagination';
import { ICommunityTutor } from '@/types/crowner/community-tutors';
import { ITags } from '@/types/user';
import Link from 'next/link';
import React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';

async function getData(tags: string) {
    try {
        const baseUrl = `/crowner/community-tutors`;
        const url = `${baseUrl}?paginate=10&tag_ids=${tags}`;
        console.log(url);
        const res = await fetchServer({
            url: url,
        });
        return res.data.data as {
            items: ICommunityTutor[];
            meta: IPaginationMeta;
        };
    } catch {
        // return notFound();
    }
}

interface IProps {
    tags: ITags[];
}
export default async function Related(props: IProps) {
    // const tags = props?.tags?.map((tag) => tag.id);
    const tags = `[${props.tags.map((i) => {
        return `"${i.id}"`;
    })}]`;
    const data = await getData(tags);
    return (
        <div>
            <h1 className="py-4 text-2xl font-semibold">Other Event</h1>
            <Carousel className="w-full ">
                <CarouselContent className="-ml-1">
                    {data?.items.map((item, index) => {
                        return (
                            <CarouselItem
                                key={index}
                                className="md:basis-1/5 lg:basis-1/5"
                            >
                                <Link
                                    href={
                                        '/crowner/events/' +
                                        item.slug +
                                        '/' +
                                        item.id
                                    }
                                >
                                    <CardCommunityTutor
                                        data={item}
                                        variant="vertical"
                                    />
                                </Link>{' '}
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
}

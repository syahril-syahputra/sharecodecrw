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

async function getData(id: string, tags: string) {
    try {
        const baseUrl = `/crowner/related-crowners`;
        const url = `${baseUrl}?exclude_id=${id}&type=community-tutors&tag_ids=${tags}`;
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
    id: string;
    tags: ITags[];
}
export default async function Related(props: IProps) {
    // const tags = props?.tags?.map((tag) => tag.id);
    const tags = `[${props.tags.map((i) => {
        return `"${i.id}"`;
    })}]`;
    const data = await getData(props.id, tags);
    return (
        <div>
            <h1 className="py-4 text-2xl font-semibold">
                Other Community Tutors
            </h1>
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
                                        '/crowner/community-tutors/' +
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

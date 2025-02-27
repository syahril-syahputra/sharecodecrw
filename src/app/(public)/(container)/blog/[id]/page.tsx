import JsonLd from '@/components/base/JsonLd/JsonLd';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import fetchServer from '@/lib/fetchServer';
import { IArticle } from '@/types/blog';
import dayjs from 'dayjs';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react';

async function getData(id: string) {
    try {
        const res = await fetchServer({
            url: `/articles/${id || ''}`,
        });
        return res.data.data as IArticle;
    } catch {
        return notFound();
    }
}

export async function generateMetadata({
    params,
}: {
    params: { id: string };
}): Promise<Metadata> {
    const data = await getData(params.id);
    return {
        title: data.title + ' | Blog - Crowner',
        description: data.category,
    };
}

export default async function page({ params }: { params: { id: string } }) {
    const data = await getData(params.id);
    return (
        <div className="space-y-4">
            <JsonLd
                name={data.title}
                image={data.image_url}
                description={data.category}
                type="blog"
            />
            {/* {JSON.stringify(data)} */}
            <div className="space-y-2">
                <h2 className="font-bold text-gray-600 text-primary">
                    {data?.category}
                </h2>
                <h1 className="text-2xl">{data?.title}</h1>
                <div className="text-sm text-gray-600">
                    {data.creator} -{' '}
                    {dayjs(data.createdAt).format('HH MMM YYYY')}
                </div>
                <div className=" space-x-2">
                    {data.hashtags.map((item, key) => (
                        <Badge key={key}>{item}</Badge>
                    ))}
                </div>
            </div>

            <Separator className="h-0.5"></Separator>
            <div className=" mx-auto max-w-4xl space-y-4 py-8">
                <Image
                    src={data.image_url || ''}
                    width={500}
                    height={500}
                    className="h-auto max-h-[400px] w-full rounded-lg object-cover"
                    alt={data.title}
                />
                <article>
                    <div
                        className="post__content"
                        dangerouslySetInnerHTML={{
                            __html: data?.body,
                        }}
                    ></div>
                </article>
            </div>
        </div>
    );
}

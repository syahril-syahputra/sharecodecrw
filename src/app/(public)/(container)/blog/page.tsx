import SearchBlog from '@/components/base/blog/SearchBlog';
import CardArticle from '@/components/base/Card/CardArticle';
import { Separator } from '@/components/ui/separator';
import SSRPagination from '@/components/ui/ssr-pagination';
import fetchServer from '@/lib/fetchServer';
import { IPaginationMeta } from '@/types/base/pagination';
import { IArticle } from '@/types/blog';
import { notFound } from 'next/navigation';
import React from 'react';

async function getData() {
    try {
        const res = await fetchServer({
            url: `/article-categories`,
        });
        return res.data.data as object[];
    } catch {
        return notFound();
    }
}
async function getArticle(filter: string | undefined) {
    try {
        const baseUrl = `/articles`;
        const convertObject = new URLSearchParams(filter).toString();
        const url = `${baseUrl}?paginate=12&${convertObject}`;
        const res = await fetchServer({
            url: url,
        });
        return res.data.data as {
            items: IArticle[];
            meta: IPaginationMeta;
        };
    } catch {
        // return notFound();
    }
}
export default async function Page({
    searchParams,
}: {
    searchParams?: string;
}) {
    const data = await getData();
    const article = await getArticle(searchParams);
    return (
        <div>
            <SearchBlog category={data} />
            <Separator className="my-4 h-0.5" />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                {article?.items.length ? (
                    article.items.map((item, index) => (
                        <CardArticle key={index} data={item} />
                    ))
                ) : (
                    <p>No article found.</p>
                )}
            </div>
            <div className="mt-8">
                <SSRPagination
                    meta={article?.meta}
                    baseUrl="/blog"
                    searchParams={searchParams || ''}
                />
            </div>
        </div>
    );
}

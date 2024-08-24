import SearchBlog from '@/components/base/blog/SearchBlog';
import CardArticle from '@/components/base/Card/CardArticle';
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
        const url = `${baseUrl}?paginate=10&${convertObject}`;
        const res = await fetchServer({
            url: url,
        });
        console.log(res.data.data);
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
            <div className="flex divide-x py-4">
                <div className="w-64 space-y-2 divide-y p-4">
                    {article?.items.length ? (
                        article.items.map((item, index) => (
                            <CardArticle key={index} data={item} />
                        ))
                    ) : (
                        <p>No article found.</p>
                    )}
                </div>
                <div className="flex-1 p-4 ">kosong</div>
            </div>
        </div>
    );
}

import { humanize } from '@/lib/humanizeDate';
import { IArticle } from '@/types/blog';
import React from 'react';
// import ImageCard from '../Image/ImageCard';
import { ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function CardArticle(props: { data: IArticle }) {
    return (
        <div className="flex h-full flex-col justify-between space-y-8 rounded-lg border px-2  py-4 ">
            <div className="space-y-4  ">
                {/* <ImageCard src={props.data.image_url || null} className="h-48" /> */}
                <div className="flex items-center space-x-2 font-semibold text-primary">
                    <BookOpen />
                    <span>Article</span>
                </div>
                <h1 className="text-xl font-bold">{props.data.title}</h1>
                <div className="text-xs">
                    {props.data.creator} . {humanize(props.data.createdAt)}
                </div>
            </div>
            <Link href={'/blog/' + props.data.id}>
                <div className="flex items-center space-x-1 font-semibold hover:cursor-pointer hover:text-primary">
                    <span>Read More</span>
                    <ArrowRight />
                </div>
            </Link>
        </div>
    );
}

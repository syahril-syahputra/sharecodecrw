import { humanize } from '@/lib/humanizeDate';
import { IArticle } from '@/types/blog';
import React from 'react';

export default function CardArticle(props: { data: IArticle }) {
    return (
        <div className="space-y-4 px-2 py-4 hover:cursor-pointer hover:bg-border">
            <h1 className="text-sm">{props.data.title}</h1>
            <div className="text-xs">
                {props.data.creator} . {humanize(props.data.createdAt)}
            </div>
        </div>
    );
}

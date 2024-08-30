import CardCommunityTutor from '@/components/base/Card/CardCommunityTutor';
import fetchServer from '@/lib/fetchServer';
import { IPaginationMeta } from '@/types/base/pagination';
import { ICommunityTutor } from '@/types/crowner/community-tutors';
import { ITags } from '@/types/user';
import Link from 'next/link';
import React from 'react';

async function getData(tags: string) {
    try {
        const baseUrl = `/crowner/community-tutors`;
        const url = `${baseUrl}?paginate=5&tag_ids=${tags}`;
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
            <div className="grid grid-cols-5 gap-5">
                {data?.items.map((item) => {
                    return (
                        <Link
                            href={
                                '/crowner/events/' + item.slug + '/' + item.id
                            }
                            key={item.id}
                        >
                            <CardCommunityTutor
                                data={item}
                                variant="vertical"
                            />
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

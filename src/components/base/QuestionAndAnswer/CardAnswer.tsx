import { IAnswer } from '@/types/base/QA';
import React from 'react';
import ImageUser from '../Image/ImageUser';
import { humanize } from '@/lib/humanizeDate';
import Report from '../report';
import Link from 'next/link';
import DeleteMessage from './DeleteMessage/DeleteMessage';
import { Badge } from '@/components/ui/badge';

export default function CardAnswer(props: {
    data: IAnswer;
    userId: string;
    refetch: () => void;
    setCounter: (val: (prevCount: number) => number) => void;
}) {
    const deleteMesage = () => {
        props.refetch();
        props.setCounter((prevCount: number) => prevCount - 1);
    };
    return (
        <div className="border-Input space-y-4 border-b px-4 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 ">
                    <span className="inline-flex items-center space-x-2 font-bold">
                        <ImageUser src={props.data.profile_picture_url} />

                        <Link href={'/profile/' + props.data.user_id}>
                            <span className="text-lg capitalize">
                                {props.data.first_name} {props.data.last_name}
                            </span>
                        </Link>
                    </span>
                    {props.data.is_author && <Badge>Author</Badge>}
                    <span className="text-sm">
                        {humanize(props.data.created_at)}
                    </span>
                </div>
                {props.userId !== props.data.user_id && (
                    <Report
                        entityId={props.data.id}
                        entityType="question_answers"
                    />
                )}
                {props.userId == props.data.user_id && (
                    <DeleteMessage refetch={deleteMesage} id={props.data.id} />
                )}
            </div>
            <div>{props.data.message}</div>
        </div>
    );
}

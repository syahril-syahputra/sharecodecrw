import { IAnswer } from '@/types/base/QA';
import React from 'react';
import ImageUser from '../Image/ImageUser';
import { humanize } from '@/lib/humanizeDate';
import Report from '../report';
import Link from 'next/link';
import DeleteMessage from './DeleteMessage/DeleteMessage';
import { Badge } from '@/components/ui/badge';
import { Dot } from 'lucide-react';

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
        <div className="space-y-4 py-4">
            <div className='flex justify-between -mb-2'>
                <div className="font-urbanist flex items-start space-x-3 text-white">
                    <div className="flex items-center justify-center w-10 h-10 bg-gray-700 rounded-full">
                        <ImageUser src={props.data.profile_picture_url} />
                    </div>
                    <div className='text-gray-400'>
                        <div className='flex space-x-1'>
                            <p className="text-sm">{props.data.first_name} {props.data.last_name}</p>
                            {props.data.is_author && <Badge>Author</Badge>}
                            <Dot className='text-white ml-1' size={20}/>
                            <span className="text-sm">
                                {humanize(props.data.created_at)}
                            </span>
                        </div>
                        <p className="text-base font-semibold">
                            {props.data.message}
                        </p>
                    </div>
                </div>
                <div className='flex space-x-2'>
                    {props.userId !== props.data.user_id && (
                        <Report
                            entityId={props.data.id}
                            entityType="question_answers"
                        />
                    )}
                    {props.userId == props.data.user_id && (
                        <DeleteMessage refetch={props.refetch} id={props.data.id} />
                    )}
                </div>
            </div>
        </div>
    );
}

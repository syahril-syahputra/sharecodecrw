import { IQuestion } from '@/types/base/QA';
import React, { useState } from 'react';
import ImageUser from '../Image/ImageUser';
import ListAnswer from './ListAnswer';
import { humanize } from '@/lib/humanizeDate';
import Report from '../report';
import DeleteMessage from './DeleteMessage/DeleteMessage';
import { Badge } from '@/components/ui/badge';
import { Dot } from 'lucide-react';

export default function CardQuestion(props: {
    data: IQuestion;
    userId: string;
    refetch: () => void;
}) {
    const [showInputAnswer, setshowInputAnswer] = useState(false);

    return (
        <div className="space-y-4 px-4 py-4">
            <div className="-mb-2 flex justify-between">
                <div className="flex items-start space-x-3 font-urbanist text-white">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700">
                        <ImageUser src={props.data.profile_picture_url} />
                    </div>
                    <div className="text-gray-400">
                        <div className="flex space-x-1">
                            <p className="text-sm">
                                {props.data.first_name} {props.data.last_name}
                            </p>
                            {props.data.is_author && <Badge>Author</Badge>}
                            <Dot className="ml-1 text-white" size={20} />
                            <span className="text-sm">
                                {humanize(props.data.created_at)}
                            </span>
                        </div>
                        <p className="text-base font-semibold">
                            {props.data.message}
                        </p>
                    </div>
                </div>
                <div className="flex space-x-2">
                    {props.userId !== props.data.user_id && (
                        <Report
                            entityId={props.data.id}
                            entityType="question_answers"
                        />
                    )}
                    {props.userId == props.data.user_id && (
                        <DeleteMessage
                            refetch={props.refetch}
                            id={props.data.id}
                        />
                    )}
                </div>
            </div>
            <div className="space-x-4">
                <div className="flex items-start">
                    <ListAnswer
                        counter={props.data.answer_counter}
                        showInput={showInputAnswer}
                        setShowInput={setshowInputAnswer}
                        questionId={props.data.id}
                        userId={props.userId}
                    />
                </div>
            </div>
        </div>
    );
}

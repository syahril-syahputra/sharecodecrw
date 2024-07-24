import { IQuestion } from '@/types/base/QA';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import ImageUser from '../Image/ImageUser';
import ListAnswer from './ListAnswer';
import { humanize } from '@/lib/humanizeDate';
import Report from '../report';

export default function CardQuestion(props: { data: IQuestion }) {
    const [showInputAnswer, setshowInputAnswer] = useState(false);

    return (
        <div className="border-Input space-y-4 border-b px-4 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 ">
                    <span className="inline-flex items-center space-x-2 font-bold">
                        <ImageUser src={props.data.profile_picture_url} />
                        <span className="text-lg capitalize">
                            {props.data.first_name} {props.data.last_name}
                        </span>
                    </span>

                    <span className="text-sm">
                        {humanize(props.data.created_at)}
                    </span>
                </div>
                <Report
                    entityId={props.data.id}
                    entityType="question_answers"
                />
            </div>
            <div>{props.data.message}</div>
            <div className="space-x-4">
                <div className="flex items-start">
                    <Button
                        variant={'ghost'}
                        onClick={() => setshowInputAnswer(!showInputAnswer)}
                    >
                        Reply
                    </Button>
                    <ListAnswer
                        counter={props.data.answer_counter}
                        showInput={showInputAnswer}
                        setShowInput={setshowInputAnswer}
                        questionId={props.data.id}
                    />
                </div>
            </div>
        </div>
    );
}

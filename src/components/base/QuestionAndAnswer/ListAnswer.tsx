import { useFetchAnswer } from '@/feature/qa/useFetchAnswer';
import useTableConfig from '@/lib/useTableConfig';
import React, { useState } from 'react';
import CardAnswer from './CardAnswer';
import { IAnswer } from '@/types/base/QA';
import InputAnswer from './InputAnswer';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useCreateAnswer } from '@/feature/qa/useCreateAnswer';

interface IProps {
    counter: number;
    questionId: string;
    showInput: boolean;
    setShowInput: (value: boolean) => void;
}

export default function ListAnswer(props: IProps) {
    const [counter, setcounter] = useState(props.counter);
    const [value, setvalue] = useState('');
    const [showReplies, setshowReplies] = useState(false);
    const { pagination, filterValue } = useTableConfig({
        pageSize: 1000,
        defaultFilter: {},
    });
    const { data, isLoading, refetch } = useFetchAnswer(
        showReplies,
        props.questionId,
        pagination,
        filterValue,
        'latest'
    );
    const { mutate, isPending } = useCreateAnswer({
        id: props.questionId,
        onSuccess: () => {
            refetch();
            setvalue('');
            setshowReplies(true);
            props.setShowInput(false);
            setcounter(counter + 1);
        },
        onError: () => {},
    });
    const createAnswer = () => {
        mutate({ message: value });
    };

    return (
        <div className="flex-1">
            <div>
                <Button
                    variant={'ghost'}
                    onClick={() => setshowReplies(!showReplies)}
                >
                    {showReplies ? <ChevronUp /> : <ChevronDown />} {counter}{' '}
                    Replies
                </Button>
            </div>
            {props.showInput && (
                <InputAnswer
                    value={value}
                    isLoading={isPending || isLoading}
                    setvalue={(val) => setvalue(val)}
                    quertionId={props.questionId}
                    send={createAnswer}
                />
            )}

            {showReplies && (
                <div className="border-Border border-l p-4">
                    {data?.items.map((item: IAnswer) => (
                        <CardAnswer key={item.id} data={item} />
                    ))}
                </div>
            )}
        </div>
    );
}

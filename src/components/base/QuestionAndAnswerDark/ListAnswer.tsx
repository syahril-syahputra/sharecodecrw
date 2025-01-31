import { useFetchAnswer } from '@/feature/qa/useFetchAnswer';
import useTableConfig from '@/lib/useTableConfig';
import React, { useState } from 'react';
import CardAnswer from './CardAnswer';
import { IAnswer } from '@/types/base/QA';
import InputAnswer from './InputAnswer';
import { MinusCircle, PlusCircle } from 'lucide-react';
import { useCreateAnswer } from '@/feature/qa/useCreateAnswer';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';

interface IProps {
    userId: string;
    counter: number;
    questionId: string;
    showInput: boolean;
    setShowInput: (value: boolean) => void;
}

export default function ListAnswer(props: IProps) {
    const [errors, setErrors] = useState<object | undefined>();
    const { toast } = useToast();
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
        onError: (err) => {
            setErrors(err.response?.data.errors);
            toast({
                variant: 'destructive',
                description: err.response?.data.message,
            });
        },
    });
    const createAnswer = () => {
        setErrors(undefined);
        mutate({ message: value });
    };

    const counterString = counter != 0 ? `${counter} answers` : '0 answer';

    return (
        <div className="flex-1 items-center font-urbanist">
            {!showReplies && (
                <div
                    className="mt-2 flex items-center px-2"
                    onClick={() => setshowReplies(!showReplies)}
                >
                    <PlusCircle
                        className="mr-1 cursor-pointer text-white"
                        size={20}
                        strokeWidth={1.5}
                    />
                    <span className="text-gray-400">{counterString}</span>
                </div>
            )}
            {showReplies && (
                <div
                    className="mt-2 flex px-2"
                    onClick={() => setshowReplies(!showReplies)}
                >
                    <MinusCircle
                        className="mr-1 cursor-pointer text-white"
                        size={20}
                        strokeWidth={1.5}
                    />
                    <span className="text-gray-400">{counterString}</span>
                </div>
            )}

            {showReplies && (
                <div className="relative ml-8">
                    <div className="absolute -left-[14px] -top-[5px] h-full w-px bg-gradient-to-b from-white to-transparent"></div>
                    <InputAnswer
                        value={value}
                        isLoading={isPending || isLoading}
                        setvalue={(val) => setvalue(val)}
                        quertionId={props.questionId}
                        send={createAnswer}
                        errors={errors}
                    />
                    <div className="">
                        {data?.items.map((item: IAnswer) => (
                            <CardAnswer
                                key={item.id}
                                data={item}
                                userId={props.userId}
                                refetch={refetch}
                                setCounter={setcounter}
                            />
                        ))}
                    </div>
                </div>
            )}

            {isLoading && (
                <div className="space-y-1">
                    <Skeleton className="h-6 rounded"></Skeleton>
                    <Skeleton className="h-8 rounded"></Skeleton>
                </div>
            )}
        </div>
    );
}

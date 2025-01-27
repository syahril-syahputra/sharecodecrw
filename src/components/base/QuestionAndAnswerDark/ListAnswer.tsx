import { useFetchAnswer } from '@/feature/qa/useFetchAnswer';
import useTableConfig from '@/lib/useTableConfig';
import React, { useState } from 'react';
import CardAnswer from './CardAnswer';
import { IAnswer } from '@/types/base/QA';
import InputAnswer from './InputAnswer';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, MinusCircle, PlusCircle } from 'lucide-react';
import { useCreateAnswer } from '@/feature/qa/useCreateAnswer';
import { Skeleton } from '@/components/ui/skeleton';

interface IProps {
    userId: string;
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

    const counterString = counter != 0 ?
        `${counter} answers` : ''

    return (
        <div className="flex-1 font-urbanist items-center">
            {!showReplies && (
                <div className='px-2 mt-2 flex'
                    onClick={() => setshowReplies(!showReplies)}    
                >
                    <PlusCircle className='text-white cursor-pointer mr-1' size={20} strokeWidth={1.5}/>
                    <span className='text-gray-400'>{counterString}</span>
                </div>
            )}
            {showReplies && (
                <div className='px-2 mt-2 flex'
                    onClick={() => setshowReplies(!showReplies)}    
                >
                    <MinusCircle className='text-white cursor-pointer mr-1' size={20} strokeWidth={1.5}/>
                    <span className='text-gray-400'>{counterString}</span>

                </div>
            )}

            

            {showReplies && (
                <div className='relative ml-8'>
                    <div className="absolute bg-gradient-to-b from-white to-transparent -left-[14px] -top-[5px] w-px h-full"></div>
                    <InputAnswer
                        value={value}
                        isLoading={isPending || isLoading}
                        setvalue={(val) => setvalue(val)}
                        quertionId={props.questionId}
                        send={createAnswer}
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

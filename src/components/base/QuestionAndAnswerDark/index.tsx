'use client';
import React, { useState } from 'react';
import InputQuestion from './InputQuestion';
import { useFetchQuestion } from '@/feature/qa/useFetchQuestion';
import useTableConfig from '@/lib/useTableConfig';
import CardQuestion from './CardQuestion';
import { useCreateQuestion } from '@/feature/qa/useCreateQuestion';
import InfiniteScroll from '@/components/ui/InfiniteScroll';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';

interface IProps {
    entity_id: string;
    entity_type: string;
    user_id: string;
}
export default function QuestionAndAnswer(props: IProps) {
    const { toast } = useToast();
    const [questionValue, setquestionValue] = useState('');
    const [ errors, setErrors ] = useState<object | undefined>();
    const { pagination, filterValue } = useTableConfig<{
        entity_type: string;
        entity_id: string;
    }>({
        defaultFilter: {
            entity_type: props.entity_type,
            entity_id: props.entity_id,
        },
    });
    const { data, refetch, fetchNextPage, isLoading, hasNextPage } =
        useFetchQuestion(pagination, filterValue, 'oldest');
    const { mutate, isPending } = useCreateQuestion({
        onSuccess: () => {
            refetch();
            setquestionValue('');
        },
        onError: (err) => {
            setErrors(err.response?.data.errors)
            toast({
                variant: 'destructive',
                description: err.response?.data.message
            })
        },
    });
    const sendQuestion = () => {
        setErrors(undefined)
        mutate({
            entity_id: props.entity_id,
            entity_type: props.entity_type,
            message: questionValue,
        });
    };
    return (
        <div>
            <InputQuestion
                value={questionValue}
                onChange={(val) => setquestionValue(val)}
                loading={isPending}
                send={sendQuestion}
                errors={errors}
            />
            <div>
                <div>
                    {data &&
                        data.pages.map((page) =>
                            page.items.map((item) => (
                                <CardQuestion
                                    key={item.id}
                                    data={item}
                                    userId={props.user_id}
                                    refetch={refetch}
                                />
                            ))
                        )}
                </div>

                <InfiniteScroll
                    hasMore={hasNextPage}
                    isLoading={isLoading}
                    next={() => fetchNextPage()}
                    threshold={1}
                >
                    {hasNextPage && (
                        <div className="border-Input space-y-4 border-b px-4 py-4">
                            <div className="flex items-center space-x-2 ">
                                <span className="inline-flex items-center space-x-2 font-bold">
                                    <Skeleton className="aspect-square h-14 rounded-full" />
                                    <span className="flex space-x-4">
                                        <Skeleton className="h-6 w-48 " />{' '}
                                        <Skeleton className="h-6 w-48" />
                                    </span>
                                </span>
                            </div>
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-6 w-full" />
                            <div className="flex space-x-4 py-4">
                                <Skeleton className=" h-4 w-48" />
                                <Skeleton className=" h-4 w-48 " />
                            </div>
                        </div>
                    )}
                </InfiniteScroll>
            </div>
        </div>
    );
}

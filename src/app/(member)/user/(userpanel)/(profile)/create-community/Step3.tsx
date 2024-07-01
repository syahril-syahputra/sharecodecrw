'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useFetchInterest } from '@/feature/base/interest';
import { IInterest } from '@/types/base/interest';
import MultipleSelector, { Option } from '@/components/ui/multipleSelector';
import Spinner from '@/components/ui/spinner';

const formSchema = z.object({
    tags: z.string().array().optional(),
});
interface IInterestList {
    id: string;
    data: Option[];
}

interface IProps {
    onFinish: (data: string[]) => void;
}
export default function Step3(props: IProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
    });

    const onSubmitProfile = () => {
        const dataInterest = value.map((item) => item.data);
        const resultArray = dataInterest.flatMap((subArray) =>
            subArray.map((item) => item.value)
        );
        if (resultArray.length < 3) {
            form.setError('tags', {
                type: 'custom',
                message: 'Please select min 3 tags',
            });
            return;
        }
        props.onFinish(resultArray);
    };
    const [value, setValue] = useState<IInterestList[]>([]);
    function onChange(id: string, data: Option[]) {
        const filteredData: IInterestList[] = value.filter(
            (item) => item.id !== id
        );
        const updated: IInterestList[] = [...filteredData, { id, data }];
        setValue(updated);
    }
    const { data: dataInterest, isPending: pendingInterest } = useFetchInterest(
        (data: IInterest[]) => {
            setValue(
                data.map((item) => {
                    return { id: item.id, data: [] };
                })
            );
        }
    );
    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmitProfile)}
                    className="space-y-8"
                >
                    <div className="text-center">Community Name*</div>

                    <div>
                        {pendingInterest || !dataInterest ? (
                            <div className="flex items-center space-x-4 text-sm">
                                <Spinner /> <span>Get Tags...</span>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {dataInterest.map((item) => {
                                    const children = item.children.map(
                                        (child) => {
                                            return {
                                                label: child.title,
                                                value: child.id,
                                            };
                                        }
                                    );
                                    return (
                                        <MultipleSelector
                                            key={item.id}
                                            value={
                                                value.find(
                                                    (x) => x.id === item.id
                                                )?.data
                                            }
                                            onChange={(data) =>
                                                onChange(item.id, data)
                                            }
                                            defaultOptions={children}
                                            placeholder={'Select ' + item.title}
                                            emptyIndicator={
                                                <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                                    No more {item.title}
                                                </p>
                                            }
                                        />
                                    );
                                })}
                                <FormField
                                    control={form.control}
                                    name="tags"
                                    render={() => (
                                        <FormItem className="flex-1">
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex justify-center">
                        <Button type="submit" className="mx-auto">
                            NEXT
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}

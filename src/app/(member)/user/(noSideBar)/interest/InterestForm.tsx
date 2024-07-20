'use client';
import ErrorMessage from '@/components/base/Error/ErrorMessage';
import { Button } from '@/components/ui/button';
import MultipleSelector, { Option } from '@/components/ui/multipleSelector';
import { useUpdateInterest } from '@/feature/user/profile';
import { IInterest } from '@/types/base/interest';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface IList {
    id: string;
    data: Option[];
}
export default function InterestForm({ data }: { data: IInterest[] }) {
    const router = useRouter();
    const [error, seterror] = useState('');
    const [value, setValue] = useState<IList[]>(
        data.map((item) => {
            return { id: item.id, data: [] };
        })
    );
    function onChange(id: string, data: Option[]) {
        seterror('');
        const filteredData: IList[] = value.filter((item) => item.id !== id);
        const updated: IList[] = [...filteredData, { id, data }];
        setValue(updated);
    }
    const { mutate, isPending } = useUpdateInterest({
        onSuccess: onSuccess,
        onError: (error) => seterror(error.message),
    });
    function send() {
        seterror('');
        const data = value.map((item) => item.data);
        const resultArray = data.flatMap((subArray) =>
            subArray.map((item) => item.value)
        );
        if (resultArray.length < 3) {
            seterror('Please select min 3 interest');
            return;
        }
        mutate(resultArray);
    }
    function onSuccess() {
        router.push('/user');
    }
    return (
        <div className="mx-auto max-w-xl space-y-4 pt-4">
            {data.map((item) => {
                const children = item.children.map((child) => {
                    return {
                        label: child.title,
                        value: child.id,
                    };
                });
                return (
                    <MultipleSelector
                        key={item.id}
                        value={value.find((x) => x.id === item.id)?.data}
                        onChange={(data) => onChange(item.id, data)}
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
            <div className="flex flex-col items-center justify-center space-y-4">
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <Button loading={isPending} onClick={send}>
                    Next
                </Button>
            </div>

            <div className="flex items-center justify-center">
                <Link href="/user">
                    <Button variant={'ghost'} className="">
                        Skip Now
                    </Button>
                </Link>
            </div>
        </div>
    );
}

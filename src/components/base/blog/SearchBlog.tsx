'use client';
import { Button } from '@/components/ui/button';
import { Combobox, ComboBoxDataTyoe } from '@/components/ui/combobox';
import { Input } from '@/components/ui/input';
import MultipleSelector from '@/components/ui/multipleSelector';
import { useFetchInterestFilter } from '@/feature/base/interest';
import useFilterConfigSSR from '@/lib/useFilterConfigSSR';
import { IFilterArticle } from '@/types/blog';
import React, { useState } from 'react';

interface IProps {
    category: object;
}
export default function SearchBlog(props: IProps) {
    const [selectedCategory, setselectedCategory] = useState('');

    const categories = props.category as { id: string; name: string }[];
    const converted: ComboBoxDataTyoe[] = categories.map((item) => ({
        value: item.id,
        label: item.name,
    }));
    const { data: dataInterest, isLoading: isLoadingInterest } =
        useFetchInterestFilter();
    const { filterValue, filterHandler, setfilterValue } =
        useFilterConfigSSR<IFilterArticle>({
            pageSize: 10,
            baseUrl: '/blog',
            defaultFilter: {},
        });
    return (
        <div>
            <div className=" space-y-4">
                <Input
                    placeholder="Search in blog"
                    value={filterValue.title}
                    onChange={(value) => {
                        setfilterValue({
                            ...filterValue,
                            title: value.target.value,
                        });
                    }}
                />
                <div className="flex items-center space-x-4">
                    <Combobox
                        data={converted}
                        value={selectedCategory}
                        onChange={(value) => {
                            setselectedCategory(value);
                            setfilterValue({
                                ...filterValue,
                                category_id: value,
                            });
                        }}
                        placeholder="category"
                    />
                    <div className="flex-1">
                        {!isLoadingInterest && (
                            <MultipleSelector
                                groupBy="group"
                                placeholder="Choose"
                                onChange={(data) => {
                                    const result: string[] = data.map(
                                        (item) => item.value
                                    );
                                    setfilterValue({
                                        ...filterValue,
                                        tags: `[${result.map((i) => {
                                            return `"${i}"`;
                                        })}]`,
                                    });
                                }}
                                value={!filterValue.tags ? [] : undefined}
                                defaultOptions={dataInterest}
                                emptyIndicator={
                                    <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                        No more Item
                                    </p>
                                }
                            />
                        )}
                    </div>
                    <Button onClick={filterHandler}>Search</Button>
                </div>
            </div>
        </div>
    );
}

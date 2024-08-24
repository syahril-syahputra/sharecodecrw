'use client';
import { Button } from '@/components/ui/button';
import { Combobox, ComboBoxDataTyoe } from '@/components/ui/combobox';
import { Input } from '@/components/ui/input';
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
    const { filterValue, filterHandler, setfilterValue } =
        useFilterConfigSSR<IFilterArticle>({
            pageSize: 10,
            baseUrl: '/blog',
            defaultFilter: {},
        });
    return (
        <div>
            <div className="flex items-center space-x-4">
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
                <Combobox
                    data={converted}
                    value={selectedCategory}
                    onChange={(value) => {
                        setselectedCategory(value);
                        setfilterValue({
                            ...filterValue,
                            category: value,
                        });
                    }}
                    placeholder="category"
                />
                <Button onClick={filterHandler}>Search</Button>
            </div>
        </div>
    );
}

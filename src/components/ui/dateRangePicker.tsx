'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
interface IProps {
    className?: string;
    placeholder?: string;
    value?: DateRange;
    onChange: (date?: DateRange) => void;
}
export function DateRangePicker({
    className,
    placeholder,
    value,
    onChange,
}: IProps) {
    return (
        <div className={cn('grid gap-2', className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={'outline'}
                        className={cn(
                            'w-auto justify-start text-left font-normal',
                            !value && 'text-muted-foreground'
                        )}
                    >
                        {value?.from ? (
                            value.to ? (
                                <>
                                    {format(value.from, 'dd LLL y')} -{' '}
                                    {format(value.to, 'dd LLL y')}
                                </>
                            ) : (
                                format(value.from, 'dd LLL y')
                            )
                        ) : (
                            <span>{placeholder}</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={value?.from}
                        selected={value}
                        onSelect={onChange}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}

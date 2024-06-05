import React from 'react';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
interface IProps {
    placeholder?: string;
    value: Date;
    block?: boolean;
    onChange: (date?: Date) => void;
}
export default function DatePicker(props: IProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn(
                        ' flex justify-between text-left font-normal',
                        props.block && 'w-full',
                        !props.value && 'text-muted-foreground'
                    )}
                >
                    <span className="-ml-1">
                        {props.value ? (
                            format(props.value, 'PPP')
                        ) : (
                            <span>{props.placeholder}</span>
                        )}
                    </span>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className=" w-auto p-0">
                <Calendar
                    captionLayout="dropdown-buttons"
                    mode="single"
                    selected={props.value}
                    onSelect={props.onChange}
                    disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                    }
                    fromYear={1960}
                    toYear={2030}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}

'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

export type ComboBoxDataTyoe = {
    value: string;
    label: string;
};

interface IProps {
    placeholder?: string;
    value: string | null;
    onChange?: (value: string) => void;
    data: ComboBoxDataTyoe[];
}
export function Combobox(props: IProps) {
    const [open, setOpen] = React.useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {props.value
                        ? props.data.find(
                              (framework) => framework.value === props.value
                          )?.label
                        : props.placeholder}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command
                    filter={(value, search) => {
                        const item = props.data.find(
                            (item) => item.value === value
                        );
                        if (!item) return 0;
                        if (
                            item.label
                                .toLowerCase()
                                .includes(search.toLowerCase())
                        )
                            return 1;

                        return 0;
                    }}
                >
                    <CommandInput
                        placeholder={`Search ${props.placeholder}...`}
                    />
                    <CommandList>
                        <CommandEmpty>
                            No {props.placeholder} found.
                        </CommandEmpty>
                        <CommandGroup>
                            {props.data.map((framework) => (
                                <CommandItem
                                    key={framework.value}
                                    value={framework.value}
                                    onSelect={(currentValue) => {
                                        props.onChange?.(
                                            currentValue === props.value
                                                ? ''
                                                : currentValue
                                        );

                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            'mr-2 h-4 w-4',
                                            props.value === framework.value
                                                ? 'opacity-100'
                                                : 'opacity-0'
                                        )}
                                    />
                                    {framework.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputSearch = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    'flex h-10 w-full rounded-full !border-0 !border-none px-3 py-2 text-sm',
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
InputSearch.displayName = 'InputSearch';

export { InputSearch };

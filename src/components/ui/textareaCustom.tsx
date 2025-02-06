import * as React from 'react';

import { cn } from '@/lib/utils';

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextareaCustom = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                className={cn(
                    'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                    'rounded-3xl border border-white bg-transparent !outline-none !ring-0 focus:outline-none focus:ring-0',
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
TextareaCustom.displayName = 'TextareaCustom';

export { TextareaCustom };

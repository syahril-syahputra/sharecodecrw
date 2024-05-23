import { Alert, AlertTitle } from '@/components/ui/alert';
import { Ban } from 'lucide-react';
import React, { ReactNode } from 'react';

export default function ErrorMessage(props: { children: ReactNode }) {
    return (
        <Alert variant={'destructive'}>
            <Ban className="h-4 w-4 !text-destructive" />
            <AlertTitle>{props.children}</AlertTitle>
        </Alert>
    );
}

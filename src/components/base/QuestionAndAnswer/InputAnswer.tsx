import { Button } from '@/components/ui/button';
import { AutosizeTextarea } from '@/components/ui/useAutosizeTextArea';
import React from 'react';

interface IProps {
    value: string;
    isLoading: boolean;
    setvalue: (value: string) => void;
    quertionId: string;
    send: () => void;
}
export default function InputAnswer(props: IProps) {
    return (
        <div className="space-y-4 border-b border-primary-foreground py-4">
            <AutosizeTextarea
                placeholder="Input Answer"
                className="flex-1"
                readOnly={props.isLoading}
                onChange={(e) => props.setvalue(e.target.value)}
                value={props.value}
            />
            <div className="flex justify-end">
                <Button
                    className="px-16"
                    onClick={props.send}
                    loading={props.isLoading}
                >
                    Reply
                </Button>
            </div>
        </div>
    );
}

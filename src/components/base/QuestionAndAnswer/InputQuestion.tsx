import { Button } from '@/components/ui/button';
import { AutosizeTextarea } from '@/components/ui/useAutosizeTextArea';
import React from 'react';

interface IProps {
    value: string;
    loading: boolean;
    onChange: (val: string) => void;
    send: () => void;
}
export default function InputQuestion(props: IProps) {
    return (
        <div className="space-y-4">
            <div>Q&A</div>
            <AutosizeTextarea
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
                placeholder="Input Question"
                minHeight={86}
            />
            <div className="flex justify-end">
                <Button
                    onClick={props.send}
                    loading={props.loading}
                    className="px-16"
                >
                    Ask
                </Button>
            </div>
        </div>
    );
}

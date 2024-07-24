'use client';
import { Info } from 'lucide-react';
import React, { useState } from 'react';
import DialogReport from '../Dialog/DialogReport';

interface IProps {
    entityId: string;
    entityType: 'crowners' | 'question_answers';
}
export default function Report(props: IProps) {
    const [open, setopen] = useState(false);
    return (
        <div className="" title="Report">
            <Info
                size={18}
                onClick={() => setopen(true)}
                className="cursor-pointer text-gray-600 hover:text-primary"
            />
            <DialogReport
                entityId={props.entityId}
                entityType={props.entityType}
                open={open}
                setOpen={setopen}
            />
        </div>
    );
}

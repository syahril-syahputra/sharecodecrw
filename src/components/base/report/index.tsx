'use client';
import { Flag } from 'lucide-react';
import React, { useState } from 'react';
import DialogReport from '../Dialog/DialogReport';
import DialogLoginRequired from '../Dialog/DialogLoginRequired';
import { useSession } from 'next-auth/react';

interface IProps {
    entityId: string;
    entityType: 'crowners' | 'question_answers';
}
export default function Report(props: IProps) {
    const { status } = useSession();

    const isLogin = status === 'authenticated';
    const [open, setopen] = useState(false);
    const [isNotLoginModal, setisNotLoginModal] = useState(false);
    return (
        <div className="" title="Report">
            <Flag
                size={18}
                onClick={() =>
                    isLogin ? setopen(true) : setisNotLoginModal(true)
                }
                className="cursor-pointer text-gray-600 hover:text-primary"
            />
            <DialogLoginRequired
                title="Sign in to Report"
                isOpen={isNotLoginModal}
                onOpenChange={(value) => setisNotLoginModal(value)}
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

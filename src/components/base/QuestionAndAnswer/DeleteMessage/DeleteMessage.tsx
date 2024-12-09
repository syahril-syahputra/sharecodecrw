'use client';
import { Trash } from 'lucide-react';
import React, { useState } from 'react';
import DialogReport from '../../Dialog/DialogReport';
import DialogLoginRequired from '../../Dialog/DialogLoginRequired';
import { useSession } from 'next-auth/react';
import DialogDelete from './DialogDelete';

interface IProps {
    entityId: string;
    entityType: 'question_answers';
}
export default function DeleteMessage(props: IProps) {
    const { status } = useSession();

    const isLogin = status === 'authenticated';
    const [open, setopen] = useState(false);
    const [isNotLoginModal, setisNotLoginModal] = useState(false);
    return (
        <div className="" title="Delete">
            <Trash
                size={18}
                onClick={() =>
                    isLogin ? setopen(true) : setisNotLoginModal(true)
                }
                className="cursor-pointer text-gray-600 hover:text-primary"
            />
            <DialogLoginRequired
                title="Sign in to Delete"
                isOpen={isNotLoginModal}
                onOpenChange={(value) => setisNotLoginModal(value)}
            />
            <DialogDelete
                entityId={props.entityId}
                entityType={props.entityType}
                open={open}
                setOpen={setopen}
            />
        </div>
    );
}

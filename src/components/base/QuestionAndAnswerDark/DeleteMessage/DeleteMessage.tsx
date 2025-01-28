'use client';
import { Trash } from 'lucide-react';
import React, { useState } from 'react';
import DialogLoginRequired from '../../Dialog/DialogLoginRequired';
import { useSession } from 'next-auth/react';
import DialogDelete from './DialogDelete';

interface IProps {
    id: string;
    refetch: () => void;
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
                id={props.id}
                open={open}
                setOpen={setopen}
                refetch={props.refetch}
            />
        </div>
    );
}

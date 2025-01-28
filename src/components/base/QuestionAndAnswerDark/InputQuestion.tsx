import { Button } from '@/components/ui/button';
import { AutosizeTextarea } from '@/components/ui/useAutosizeTextArea';
import React, { useState } from 'react';
import DialogLoginRequired from '../Dialog/DialogLoginRequired';
import { useSession } from 'next-auth/react';

interface IProps {
    value: string;
    loading: boolean;
    onChange: (val: string) => void;
    send: () => void;
}
export default function InputQuestion(props: IProps) {
    const { status } = useSession();
    const isLogin = status === 'authenticated';

    const [isShowLogin, setisShowLogin] = useState(false);
    const send = () => {
        if (isLogin) {
            props.send();
        } else {
            setisShowLogin(true);
        }
    };
    return (
        <div className="space-y-4">
            <div className="mb-3 text-4xl text-white">Q&A</div>
            <AutosizeTextarea
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
                placeholder="Input Question"
                minHeight={86}
                className='!bg-transparent border !border-white text-white'
            />
            <div className="flex justify-end">
                <Button
                    onClick={send}
                    loading={props.loading}
                    className="px-16"
                >
                    Ask
                </Button>
            </div>

            <DialogLoginRequired
                title="Sign in to create question"
                isOpen={isShowLogin}
                onOpenChange={(value) => setisShowLogin(value)}
            />
        </div>
    );
}

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import Link from 'next/link';
import React from 'react';

interface IProps {
    isOpen: boolean;
    onOpenChange: (value: boolean) => void;
    title: string;
}
export default function DialogLoginRequired({
    isOpen,
    onOpenChange,
    title,
}: IProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Sign in</DialogTitle>
                    <DialogDescription>{title}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Link href="/auth/login">
                        <Button type="submit">Sign in</Button>
                    </Link>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

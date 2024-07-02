import { Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface IProps {
    title: string;
    href: string;
}
export default function CardCreate(props: IProps) {
    return (
        <Link
            href={props.href}
            className="flex !cursor-pointer flex-col items-center justify-center space-y-2 rounded-md border p-4  shadow-md hover:bg-secondary"
        >
            <div className="flex flex-col items-center justify-center">
                <Plus size={48} />
                <span>{props.title}</span>
            </div>{' '}
        </Link>
    );
}

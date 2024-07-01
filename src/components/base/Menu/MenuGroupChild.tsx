import Link from 'next/link';
import React, { ReactNode } from 'react';

export default function MenuGroupChild(props: {
    title: string;
    children: ReactNode;
    href: string;
}) {
    return (
        <div className=" py-4">
            <Link href={props.href}>
                <div className="px-2 py-1">{props.title}</div>
            </Link>
            <ul className="list-none pl-6 capitalize">{props.children}</ul>
        </div>
    );
}

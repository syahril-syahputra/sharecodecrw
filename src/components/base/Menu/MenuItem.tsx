'use client';

import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Link from 'next/link';
import React, { ReactNode } from 'react';

const Item = (props: { selected: boolean; children: ReactNode }) => {
    return (
        <li
            className={clsx(
                'cursor-pointer rounded-xl p-2 hover:text-primary',
                props.selected && 'bg-gray-700'
            )}
        >
            {props.children}
        </li>
    );
};
export default function MenuItem(props: {
    children: ReactNode;
    href?: string;
    url: string;
}) {
    const pathname = usePathname();
    const selectedUrl = pathname.split('/')[3] || pathname.split('/')[2];
    if (props.href) {
        return (
            <Link href={props.href}>
                <Item selected={selectedUrl === props.url}>
                    {props.children} {pathname}
                </Item>
                ;
            </Link>
        );
    }
    return (
        <Item selected={selectedUrl === props.url}>
            {props.children} {}
        </Item>
    );
}

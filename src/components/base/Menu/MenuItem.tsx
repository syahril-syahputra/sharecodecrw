import Link from 'next/link';
import React, { ReactNode } from 'react';

const Item = (props: { children: ReactNode }) => {
    return (
        <li className="cursor-pointer hover:text-primary">{props.children}</li>
    );
};
export default function MenuItem(props: {
    children: ReactNode;
    href?: string;
}) {
    if (props.href) {
        return (
            <Link href={props.href}>
                <Item>{props.children}</Item>;
            </Link>
        );
    }
    return <Item>{props.children}</Item>;
}

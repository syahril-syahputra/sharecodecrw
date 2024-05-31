import React, { ReactNode } from 'react';

export default function MenuGroup(props: { children: ReactNode }) {
    return (
        <ul className="list-none space-y-2 py-4 capitalize">
            {props.children}
        </ul>
    );
}

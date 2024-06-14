import React, { ReactNode } from 'react';

export default function MenuGroupChild(props: {
    title: string;
    children: ReactNode;
}) {
    return (
        <div className=" py-4">
            <div className="px-2 py-1">{props.title}</div>
            <ul className="list-none pl-6 capitalize">{props.children}</ul>
        </div>
    );
}

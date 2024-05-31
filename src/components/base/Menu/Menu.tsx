import React, { ReactNode } from 'react';

export default function Menu(props: { children: ReactNode }) {
    return <div className=" divide-y-2 divide-border">{props.children}</div>;
}

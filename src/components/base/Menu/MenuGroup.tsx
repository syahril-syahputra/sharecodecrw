import React, { ReactNode } from 'react';

export default function MenuGroup(props: { children: ReactNode }) {
    return <ul className="list-none py-4 capitalize">{props.children}</ul>;
}

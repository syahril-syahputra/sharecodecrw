import React, { ReactNode } from 'react';

export default function TitleSeparator(props: { children: ReactNode }) {
    return (
        <div className="my-4 flex items-center">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="mx-4 text-gray-500">{props.children}</span>
            <div className="flex-grow border-t border-gray-400"></div>
        </div>
    );
}
